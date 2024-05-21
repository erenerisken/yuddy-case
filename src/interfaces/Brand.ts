export interface Brand {
  id: number;
  name: string;
  description: string;
  logo: {
    sm: string;
    md: string;
  };
  productCount: number;
}
