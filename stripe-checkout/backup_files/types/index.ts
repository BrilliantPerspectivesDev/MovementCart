export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutResponse {
  sessionId: string;
  url: string | null;
} 