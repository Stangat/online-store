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

export interface IProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  stockSelect?: number;
  thumbnail: string;
  images: string[];
  stockSelect?: number
}
export enum FiltersBlockValue {
  element_missing = -1,
}
export type DiscontType = {
  id: number;
  promoCode: string;
  discont: number;
  description: string;
};