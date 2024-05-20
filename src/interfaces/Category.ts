export interface Category {
  id: number;
  name: string;
  description: string;
  banner: string;
  subcategories: Category[];
}
