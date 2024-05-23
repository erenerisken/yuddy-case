import { Brand } from './Brand';

export interface Product {
  id: number;
  name: string;
  images: string[];
  basePrice: number;
  discountedPrice?: number;
  discountRatio?: number;
  summary: string;
  description: string;
  stock: number;
  brandID: number;
  isNewProduct: boolean;
  isOnSale: boolean;
  specification: {
    [key: string]: string;
  };
}

export interface PaginatedProducts {
  products: Product[];
  brands: Brand[];
  totalCount: number;
}
