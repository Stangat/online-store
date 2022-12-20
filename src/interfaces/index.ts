export interface IComponent {
  execute: (...args: number[]) => void;
}
export interface Coords {
  bottom: number;
  left: number;
  leftX: number;
  rigth: number;
  top: number;
  width: number;
}