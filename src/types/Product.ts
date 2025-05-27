
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'velas' | 'inciensos' | 'cristales' | 'accesorios';
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
