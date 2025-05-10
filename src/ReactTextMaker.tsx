/* eslint-disable react-hooks/exhaustive-deps */
import Mousetrap from 'mousetrap';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';

import {
  DEFAULT_THEME,
  EMPTY_ARRAY,
  HIGHLIGHT_HINT,
  PADDING_SIZE,
  RANGE_END,
  RANGE_START,
  UNSELECTED_OPACITY,
} from './constants';
import { useCompareMemo } from './hooks/useCompareMemo';
import { useEvent } from './hooks/useEvent';
import {
  colorGenerator,
  createUniqueColorGenerator,
  generateId,
  getRange,
  getRGB,
  getRGBs,
  splitRanges,
  typeAsserts,
} from './utils';

import type { HighlightItem } from './interface';
import type {
  ColorGenerator } from './utils';
// eslint-disable-next-line import/order
import './index.css';

export interface ReactTextMakerProps {
  disabled?: boolean;
  text: string;
  hint: string;
  className?: string;
  style?: React.CSSProperties;
  theme?: (string | { hint: string; color?: string })[];
  value?: (Pick<HighlightItem, 'text' | 'hint' | 'range'> & { color?: string })[];
  maxCount?: number;
  hintStyle?: React.CSSProperties;
  onMarkClick?: (ids: string[]) => void;
  onMarkAdd?: (item: HighlightItem) => void;
  onMarkRemove?: (item: HighlightItem[]) => void | boolean;
  onChange?: (value: HighlightItem[]) => void;
}

function _ReactTextMaker({
  disabled = false,
  theme,
  className,
  style,
  hintStyle,
  text,
  hint,
  value,
  maxCount,
  onMarkClick,
  onMarkAdd,
  onMarkRemove,
  onChange,
}: ReactTextMakerProps) {
  const [highlightItems, setHighlightItems] = useState<HighlightItem[]>(EMPTY_ARRAY);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const textRef = useRef<HTMLSpanElement>(null);

  const hlRef = useCompareMemo(() => value, isEqual, [value]);
  const themeRef = useCompareMemo(() => theme, isEqual, [theme]);
  const changeEvent = useEvent(onChange);
  const markClickEvent = useEvent(onMarkClick);
  const markAddEvent = useEvent(onMarkAdd);
  const markRemoveEvent = useEvent(onMarkRemove);
  const getUniqueColor = useMemo(() => {
    if (!themeRef) {
      return createUniqueColorGenerator(getRGBs(DEFAULT_THEME));
    }

    if (themeRef.every((t) => typeof t === 'string')) {
      typeAsserts<string[]>(themeRef);
      return createUniqueColorGenerator(getRGBs(themeRef));
    }

    typeAsserts<{ hint: string; color?: string }[]>(themeRef);

    const gen: ColorGenerator = (val) => {
      const color = themeRef.find((t) => t.hint === val)?.color;
      if (color) {
        return getRGB(color);
      }

      const index = themeRef.findIndex((t) => t.hint === val);
      return getRGB(DEFAULT_THEME[index]);
    };
    
    return gen;
  }, [themeRef]);

  useEffect(() => {
    if (hlRef) {
      setHighlightItems(
        hlRef.map((item, index) => ({
          ...item,
          id: generateId(item.hint),
          index,
          color: item.color ? getRGB(item.color) : getUniqueColor(item.hint),
        }))
      );
    } else {
      setHighlightItems([]);
    }
  }, [getUniqueColor, hlRef, value]);

  useEffect(() => {
    setSelectedIds([]);
  }, [hint]);

  useEffect(() => {
    Mousetrap.bind(['delete', 'backspace'], (e) => {
      if (!selectedIds.length) return;
      if (disabled) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      setHighlightItems((items) => {
        const removedItems = items.filter((item) => selectedIds.includes(item.id));
        const newItems = items.filter((item) => !selectedIds.includes(item.id));
        const shouldRemove = markRemoveEvent(removedItems);

        if (shouldRemove === false) {
          return items;
        }
        changeEvent(newItems);
        return newItems;
      });
    });

    return () => {
      Mousetrap.unbind(['delete', 'backspace']);
    };
  }, [disabled, selectedIds, changeEvent, markRemoveEvent]);

  useEffect(() => {
    if (disabled) return;

    const node = textRef.current;
    if (!node) {
      return;
    }

    const handleMouseup = (e: MouseEvent) => {
      e.preventDefault();

      if (maxCount && highlightItems.length >= maxCount) {
        return;
      }

      const selection = document.getSelection();
      const selectedText = selection?.toString();
      const range = getRange({
        selection: document.getSelection()!,
        root: node,
      });

      if (range && selectedText && hint) {
        const { startIndex, endIndex } = range;

        const newMark: HighlightItem = {
          id: generateId(selectedText),
          text: selectedText!,
          color: getUniqueColor(hint),
          hint: hint,
          range: [startIndex, endIndex],
        };
        setHighlightItems((items) => {
          const newItems: HighlightItem[] = [
            ...items,
            newMark,
          ];

          changeEvent(newItems);
          markAddEvent(newMark);
          return newItems;
        });
        selection?.removeAllRanges();
      }
    };

    document.addEventListener('mouseup', handleMouseup);

    return () => {
      document.removeEventListener('mouseup', handleMouseup);
    };
  }, [hint, disabled, changeEvent, maxCount, highlightItems.length, getUniqueColor, markAddEvent]);

  useEffect(() => {
    if (disabled) return;
    const node = textRef.current;
    if (!node) return;

    const handleClick = (e: MouseEvent) => {
      if (node?.contains(e.target as HTMLElement)) {
        return;
      }
      setSelectedIds([]);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [disabled, setSelectedIds]);

  const sortedHighlights: HighlightItem[] = [...highlightItems].sort((a, b) => {
    if (a.range[0] === b.range[0]) {
      return a.range[1] - b.range[1];
    }
    return a.range[0] - b.range[0];
  });

  const ranges = splitRanges(sortedHighlights, text);

  const renderHighlight = () => {
    if (!sortedHighlights.length) {
      return text;
    }

    // Render split highlight ranges
    const result: React.ReactNode[] = [];

    // Add unhighlighted text at the beginning
    if (ranges[0]?.range[0] > 0) {
      result.push(text.slice(0, ranges[0].range[0]));
    }

    // Render highlighted sections
    ranges.forEach((item) => {
      if (
        !item.throughIds?.length &&
        !item.starts?.length &&
        !item.ends?.length
      ) {
        result.push(item.text);
        return;
      }

      const datasets = {
        [`data-${RANGE_START}`]: item.range[0],
        [`data-${RANGE_END}`]: item.range[1],
      };

      result.push(
        <span
          key={`${item.id}-${item.range[0]}-${item.range[1]}`}
          className={disabled ? undefined : 'cursor-pointer'}
          onClick={(e) => {
            if (disabled) return;
            e.stopPropagation();
            const activeEl = document.activeElement;
            if (activeEl instanceof HTMLElement) {
              activeEl.blur();
            }

            const ids = item.throughIds?.length ? item.throughIds : [item.id];
            markClickEvent(ids);
            setSelectedIds(ids);
          }}
          {...datasets}
        >
          {renderColor(
            item.text,
            sortedHighlights,
            item.throughIds?.find((id) => selectedIds.includes(id)) ? 1 : UNSELECTED_OPACITY,
            selectedIds,
            item.throughIds
          )}
          {item.ends?.map((endTag) => {
            const endItem = sortedHighlights.find((l) => l.id === endTag);
            const datasets = {
              [`data-${HIGHLIGHT_HINT}`]: endItem?.hint,
            };

            return endItem ? (
              <span
                key={endTag}
                style={{
                  ...hintStyle,
                  backgroundColor: colorGenerator(
                    endItem.color,
                    selectedIds.includes(endItem.id) ? 1 : UNSELECTED_OPACITY
                  ),
                  fontWeight: selectedIds.includes(endItem.id) ? 'bold' : 'normal',
                  color: selectedIds.includes(endItem.id) ? '#000' : '#555',
                  transition: 'background-color 0.2s ease',
                }}
                className="highlight-hint"
                onClick={(e) => {
                  if (disabled) return;
                  e.stopPropagation();
                  const activeEl = document.activeElement;
                  if (activeEl instanceof HTMLElement) {
                    activeEl.blur();
                  }
                  markClickEvent([endItem.id]);
                  setSelectedIds([endItem.id]);
                }}
                {...datasets}
              />
            ) : null;
          })}
        </span>
      );
    });

    // Add unhighlighted text at the end
    const lastItem = ranges[ranges.length - 1];
    if (lastItem && lastItem.range[1] < text.length) {
      result.push(text.slice(lastItem.range[1]));
    }

    return result;
  };

  return (
    <span
      ref={textRef}
      style={style}
      className={`react-text-maker break-all whitespace-pre-wrap ${className || ''}`}
    >
      {renderHighlight()}
    </span>
  );
}

function renderColor(
  text: string,
  sortedHighlights: HighlightItem[],
  opacity: number,
  selectedIds: string[],
  ids: string[] = [],
  depth = ids.length - 1
) {
  if (ids.length) {
    const newIds = [...ids].sort(
      (a, b) => selectedIds.indexOf(a) - selectedIds.indexOf(b)
    );
    const id = newIds.shift();
    const item = sortedHighlights.find((l) => l.id === id);

    return (
      <span
        style={{
          padding: `${PADDING_SIZE * depth}px 0`,
          backgroundColor: item?.color
            ? colorGenerator(item.color, opacity)
            : undefined,
          transition: 'background-color 0.2s ease',
        }}
      >
        {renderColor(text, sortedHighlights, opacity, selectedIds, newIds, depth - 1)}
      </span>
    );
  }
  return text;
}

export const ReactTextMaker = memo(_ReactTextMaker);

export { DEFAULT_THEME } from './constants';
