export interface HighlightItem {
  id: string;
  text: string;
  color: [number, number, number];
  hint: string;
  starts?: string[];
  ends?: string[];
  range: number[];
  throughIds?: string[];
}
