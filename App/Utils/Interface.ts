export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CartProduct extends Product {
  quantity: number;
}

export interface BillingInfo {
  payable: number;
  delivery: number;
  total: number;
}
