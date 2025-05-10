import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ReactTextMaker } from '../ReactTextMaker';
import { DEFAULT_THEME } from '../constants';

describe('ReactTextMaker', () => {
  const defaultProps = {
    text: 'Hello, World!',
    hint: 'test',
  };

  beforeEach(() => {
    // Reset the document selection before each test
    Object.defineProperty(window, 'getSelection', {
      value: () => ({
        toString: () => '',
        removeAllRanges: vi.fn(),
        getRangeAt: () => ({
          getBoundingClientRect: () => ({
            top: 0,
            left: 0,
            width: 100,
            height: 20,
          }),
          commonAncestorContainer: {
            nodeType: 3,
            textContent: 'Hello, World!',
          },
        }),
        addRange: vi.fn(),
      }),
      writable: true,
    });
  });

  it('renders with initial text', () => {
    render(<ReactTextMaker {...defaultProps} />);
    const textElement = screen.getByText(/Hello, World!/);
    expect(textElement).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<ReactTextMaker {...defaultProps} className="custom-class" />);
    const container = screen.getByText(/Hello, World!/).closest('.react-text-maker');
    expect(container).toHaveClass('custom-class');
    expect(container).toHaveClass('react-text-maker');
  });

  it('renders with custom style', () => {
    const style = { color: 'red' };
    render(<ReactTextMaker {...defaultProps} style={style} />);
    const container = screen.getByText(/Hello, World!/).closest('.react-text-maker');
    expect(container).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('renders with initial highlights', () => {
    const initialHighlights = [
      {
        text: 'Hello',
        hint: 'test',
        range: [0, 5],
        color: DEFAULT_THEME[0],
      },
    ];
    render(<ReactTextMaker {...defaultProps} value={initialHighlights} />);
    
    const highlightElement = screen.getByText('Hello');
    const parent = highlightElement.parentElement;
    expect(parent?.querySelector('span')).toHaveStyle({
      backgroundColor: 'rgba(255, 230, 109, 0.5)',
    });
  });

  it('calls onMarkClick when clicking highlight', () => {
    const onMarkClick = vi.fn();
    const initialHighlights = [
      {
        text: 'Hello',
        hint: 'test',
        range: [0, 5],
        color: DEFAULT_THEME[0],
      },
    ];
    render(
      <ReactTextMaker
        {...defaultProps}
        value={initialHighlights}
        onMarkClick={onMarkClick}
      />
    );

    const highlightElement = screen.getByText('Hello');
    fireEvent.click(highlightElement);
    expect(onMarkClick).toHaveBeenCalled();
    expect(onMarkClick.mock.calls[0][0]).toEqual(expect.arrayContaining([expect.any(String)]));
  });

  it('respects maxCount limit', () => {
    const onChange = vi.fn();
    const initialHighlights = [
      {
        text: 'Hello',
        hint: 'test',
        range: [0, 5],
        color: DEFAULT_THEME[0],
      },
    ];
    render(
      <ReactTextMaker
        {...defaultProps}
        value={initialHighlights}
        maxCount={1}
        onChange={onChange}
      />
    );

    // Mock selection for second highlight
    Object.defineProperty(window, 'getSelection', {
      value: () => ({
        toString: () => 'World',
        removeAllRanges: vi.fn(),
        getRangeAt: () => ({
          getBoundingClientRect: () => ({
            top: 0,
            left: 0,
            width: 100,
            height: 20,
          }),
          commonAncestorContainer: {
            nodeType: 3,
            textContent: 'Hello, World!',
            parentElement: screen.getByText(/World/).closest('.react-text-maker'),
          },
        }),
        addRange: vi.fn(),
      }),
    });

    // Try to add another highlight
    const textContainer = screen.getByText(/World/);
    fireEvent.mouseUp(textContainer);
    
    // Should not call onChange because maxCount is reached
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies correct styles to selected highlight', () => {
    const initialHighlights = [
      {
        text: 'Hello',
        hint: 'test',
        range: [0, 5],
        color: DEFAULT_THEME[0],
      },
    ];
    render(<ReactTextMaker {...defaultProps} value={initialHighlights} />);

    const highlightElement = screen.getByText('Hello');
    fireEvent.click(highlightElement);

    const parent = highlightElement.parentElement;
    expect(parent?.querySelector('span')).toHaveStyle({
      backgroundColor: 'rgba(255, 230, 109, 1)',
    });
  });

  it('handles disabled state correctly', () => {
    const onMarkClick = vi.fn();
    const initialHighlights = [
      {
        text: 'Hello',
        hint: 'test',
        range: [0, 5],
        color: DEFAULT_THEME[0],
      },
    ];
    render(
      <ReactTextMaker
        {...defaultProps}
        value={initialHighlights}
        onMarkClick={onMarkClick}
        disabled
      />
    );

    // Click should not work when disabled
    fireEvent.click(screen.getByText('Hello'));
    expect(onMarkClick).not.toHaveBeenCalled();
  });

  it('handles overlapping highlights correctly', () => {
    const onChange = vi.fn();
    const initialHighlights = [
      {
        text: 'Hello',
        hint: 'test',
        range: [0, 5],
        color: DEFAULT_THEME[0],
      },
    ];
    render(
      <ReactTextMaker
        {...defaultProps}
        value={initialHighlights}
        onChange={onChange}
      />
    );

    // Mock selection that overlaps with existing highlight
    Object.defineProperty(window, 'getSelection', {
      value: () => ({
        toString: () => 'Hello, W',
        removeAllRanges: vi.fn(),
        getRangeAt: () => ({
          getBoundingClientRect: () => ({
            top: 0,
            left: 0,
            width: 100,
            height: 20,
          }),
          commonAncestorContainer: {
            nodeType: 3,
            textContent: 'Hello, World!',
            parentElement: screen.getByText(/Hello/).closest('.react-text-maker'),
          },
        }),
        addRange: vi.fn(),
      }),
    });

    // Try to add overlapping highlight
    const textContainer = screen.getByText(/Hello/);
    fireEvent.mouseUp(textContainer);
    
    // Should not allow overlapping highlights
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies custom theme colors correctly', () => {
    const customTheme = ['#FF0000', '#00FF00', '#0000FF'];
    const initialHighlights = [
      {
        text: 'Hello',
        hint: 'test',
        range: [0, 5],
      },
    ];
    render(
      <ReactTextMaker
        {...defaultProps}
        value={initialHighlights}
        theme={customTheme}
      />
    );

    const highlightElement = screen.getByText('Hello');
    const parent = highlightElement.parentElement;
    expect(parent?.querySelector('span')).toHaveStyle({
      backgroundColor: 'rgba(255, 0, 0, 0.5)',
    });
  });

  it('handles invalid highlight ranges gracefully', () => {
    const invalidHighlights = [
      {
        text: 'Invalid',
        hint: 'test',
        range: [20, 25], // Out of text bounds
      },
    ];
    
    // Should not throw error for invalid ranges
    expect(() => 
      render(
        <ReactTextMaker
          {...defaultProps}
          value={invalidHighlights}
        />
      )
    ).not.toThrow();
  });
}); 