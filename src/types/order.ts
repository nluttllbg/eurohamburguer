export type MenuCategory =
  | 'Todos os Itens'
  | 'Burgers & Smash'
  | 'Linha Especial & Brasa'
  | 'Porções & Acompanhamentos'
  | 'Bebidas & Geladas';

export interface MenuExtra {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'Todos os Itens'>;
  description: string;
  fullDescription: string;
  price: number;
  unitLabel: string;
  image: string;
  badge?: string;
  isBurger?: boolean;
  prepTime?: string;
}

export type BurgerDoneness = 'Ao Ponto (Suculento)' | 'Ao Ponto para Bem' | 'Bem Passado';

export interface CartItem {
  cartKey: string;
  item: MenuItem;
  quantity: number;
  doneness?: BurgerDoneness;
  extras: MenuExtra[];
  notes?: string;
}

export type FulfillmentType = 'delivery' | 'pickup';
export type PaymentMethod = 'Pix' | 'Cartão de Crédito' | 'Cartão de Débito' | 'Dinheiro';

export interface QualityPillar {
  id: string;
  title: string;
  description: string;
  icon: 'flame' | 'bread' | 'store' | 'truck';
  accent: 'ember' | 'gold' | 'sand';
}

export interface Testimonial {
  id: string;
  initials: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
}
