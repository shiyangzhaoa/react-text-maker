import type { HighlightItem } from './interface';

export const HIGHLIGHT_HINT = 'hint';
export const RANGE_START = 'start';
export const RANGE_END = 'end';
export const PADDING_SIZE = 2;
export const EMPTY_ARRAY: HighlightItem[] = [];
export const UNSELECTED_OPACITY = 0.5;

// ZEBRA MILDLINER
export const DEFAULT_THEME = [
  // Fluorescent series
  '#FFE66D',      // Yellow
  '#A8E6CF',      // Green
  '#A8D8EA',      // Blue
  '#FFB6C1',      // Pink
  '#FFB347',      // Orange
  '#D8BFD8',      // Purple
  '#FF6B6B',      // Red
  '#B8B8B8',      // Gray

  // Soft series
  '#FFF9C4',      // Soft yellow
  '#C8E6C9',      // Soft green
  '#BBDEFB',      // Soft blue
  '#F8BBD0',      // Soft pink
  '#FFE0B2',      // Soft orange
  '#E1BEE7',      // Soft purple
  '#FFCDD2',      // Soft red
  '#E0E0E0',      // Soft gray

  // Dark series
  '#FBC02D',      // Dark yellow
  '#388E3C',      // Dark green
  '#1976D2',      // Dark blue
  '#C2185B',      // Dark pink
  '#F57C00',      // Dark orange
  '#7B1FA2',      // Dark purple
  '#D32F2F',      // Dark red
  '#616161'       // Dark gray
];