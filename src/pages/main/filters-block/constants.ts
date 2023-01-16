import { onlineStoreData } from '../../../data/data';

export const categories = new Set(onlineStoreData.products.map((product) => product.category));
export const brands = new Set(onlineStoreData.products.map((product) => product.brand));
export const prices = new Set(onlineStoreData.products.map((product) => product.price));
export const pricesArray = [...prices].sort((a, b) => a - b);
export const stocks = new Set(onlineStoreData.products.map((product) => product.stock));
export const stocksArray = [...stocks].sort((a, b) => a - b);
