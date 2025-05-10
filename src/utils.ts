import Color from 'color';

import { RANGE_END, RANGE_START } from './constants';

import type { HighlightItem } from './interface';

export function typeAsserts<T>(value: unknown): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error('Value is null or undefined');
  }
}

export function splitRanges(
  highlights: HighlightItem[],
  text: string,
): HighlightItem[] {
  // 创建事件点数组
  const events = highlights.flatMap<
    HighlightItem & {
      point: number;
      type: 'start' | 'end';
      id: string;
    }
  >(({ id, range: [start, end], ...props }) => [
    { ...props, point: start, type: 'start', id, range: [start, end] },
    { ...props, point: end, type: 'end', id, range: [start, end] },
  ]);

  // 按点和类型排序
  events.sort((a, b) =>
    a.point === b.point ? (a.type === 'start' ? -1 : 1) : a.point - b.point,
  );

  // 记录活跃区间
  const activeIntervals = new Set<string>();

  // 构建结果数组
  return events.reduce<HighlightItem[]>((result, event, index) => {
    const lastPoint = index > 0 ? events[index - 1].point : null;

    // 更新活跃区间
    if (event.type === 'start') {
      activeIntervals.add(event.id);
    } else {
      activeIntervals.delete(event.id);
    }

    if (lastPoint !== null && lastPoint !== event.point) {
      const newRange: [number, number] = [lastPoint, event.point];
      const slicedText = text.slice(lastPoint, event.point);

      // 获取开始和结束标识
      const starts = highlights
        .filter((highlight) => highlight.range[0] === lastPoint)
        .map((highlight) => highlight.id);

      const ends = highlights
        .filter((highlight) => highlight.range[1] === event.point)
        .map((highlight) => highlight.id);

      // 查找父区间
      const throughIds = highlights
        .filter(
          (highlight) =>
            highlight.range[0] <= lastPoint &&
            highlight.range[1] >= event.point,
        )
        .map((highlight) => highlight.id);

      result.push({
        ...event,
        text: slicedText,
        range: newRange,
        starts,
        ends,
        throughIds,
      });
    }

    return result;
  }, []);
}

export function getRange({
  selection,
  root,
}: {
  selection: Selection;
  root: HTMLSpanElement;
}) {
  // 检查选区是否在根节点内
  if (!root.contains(selection.anchorNode)) return;

  const range = selection.getRangeAt(0);
  const { startContainer, endContainer, startOffset, endOffset } = range;

  // 获取节点的索引值
  const getNodeIndex = (node: Node): string | undefined => {
    let currentNode: Node | HTMLSpanElement | null = node;
    let isParent = false;

    // 向上遍历DOM树直到找到带有索引的节点或到达根节点
    while (currentNode && currentNode !== root) {
      if (currentNode.nodeType === Node.ELEMENT_NODE) {
        typeAsserts<HTMLSpanElement>(currentNode);
        const datasetIndex =
          currentNode.dataset?.[isParent ? RANGE_START : RANGE_END];

        if (datasetIndex) {
          return datasetIndex;
        }
      }

      // 优先检查前一个兄弟节点,否则检查父节点
      if (currentNode.previousSibling) {
        isParent = false;
        currentNode = currentNode.previousSibling;
      } else {
        isParent = true;
        currentNode = currentNode.parentElement;
      }
    }

    // 到达根节点时返回0
    return currentNode === root ? '0' : undefined;
  };

  const startIndex = getNodeIndex(startContainer);
  const endIndex = getNodeIndex(endContainer);

  if (!startIndex || !endIndex) return;

  return {
    startIndex: Number(startIndex) + startOffset,
    endIndex: Number(endIndex) + endOffset,
  };
}

export function generateId(flag?: string) {
  return Math.random().toString(36).slice(2) + Date.now().toString(36) + flag;
}

export type RGB = [number, number, number];
export type ColorGenerator = (v: string) => RGB;

export function createUniqueColorGenerator(theme: RGB[]): ColorGenerator {
  const usedColorMap: Map<string, RGB> = new Map();
  let currentIndex = 0;

  return (v: string): RGB => {
    const usedColor = usedColorMap.get(v);
    if (usedColor) return usedColor;

    let rgb: RGB;
    
    if (currentIndex < theme.length) {
      // 如果还有基础颜色可用，直接使用基础颜色
      rgb = [...theme[currentIndex]];
    } else {
      // 当基础颜色用完后，对最后一个基础颜色进行偏移
      const baseColor = theme[theme.length - 1];
      // 使用字符串生成一个随机偏移量
      const hashCode: number = v.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);

      rgb = [
        Math.min(255, Math.max(0, baseColor[0] + (hashCode % 30) - 15)),
        Math.min(255, Math.max(0, baseColor[1] + ((hashCode >> 8) % 30) - 15)),
        Math.min(255, Math.max(0, baseColor[2] + ((hashCode >> 16) % 30) - 15)),
      ];
    }

    usedColorMap.set(v, rgb);
    currentIndex++;

    return rgb;
  };
}

export function colorGenerator(color: [number, number, number], alpha: number) {
  if (!color) return;

  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}

export function getRGB(color: string) {
  return Color(color).rgb().array() as RGB;
}

export function getRGBs(colors: string[]) {
  return colors.map((value) => getRGB(value));
}
