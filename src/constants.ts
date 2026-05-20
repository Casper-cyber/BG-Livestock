export interface Product {
  id: string;
  name: string;
  baseName: string;
  variation?: string;
  description: string;
  price: string;
  numericPrice: number;
  unit: string;
  image: string;
  category: 'dairy' | 'eggs';
}

export const VENMO_USER = "@BeechgroveLivestock";
export const PAYPAL_EMAIL = "payments@beechgrovelivestock.com";

export const PRODUCTS: Product[] = [
  {
    id: 'a2a2-milk-cream',
    name: 'A2A2 Milk with Cream',
    baseName: 'A2A2 Milk',
    variation: 'with cream',
    description: 'Rich, creamy raw A2A2 Jersey milk. For non-herdshare members, this product is sold as pet milk.',
    price: '$11',
    numericPrice: 11,
    unit: 'gallon',
    image: '/images/a2a2milkwithcream.png',
    category: 'dairy'
  },
  {
    id: 'a2a2-milk-no-cream',
    name: 'A2A2 Milk without Cream',
    baseName: 'A2A2 Milk',
    variation: 'without cream',
    description: 'Fresh raw A2A2 Jersey milk with cream removed. For non-herdshare members, this product is sold as pet milk.',
    price: '$8',
    numericPrice: 8,
    unit: 'gallon',
    image: '/images/a2a2milknocream.png',
    category: 'dairy'
  },
  {
    id: 'traditional-milk-cream',
    name: 'Traditional Milk with Cream',
    baseName: 'Traditional Milk',
    variation: 'with cream',
    description: 'High-quality traditional raw Jersey milk with natural cream top. For non-herdshare members, this product is sold as pet milk.',
    price: '$10',
    numericPrice: 10,
    unit: 'gallon',
    image: '/images/tradmilkwithcream.png',
    category: 'dairy'
  },
  {
    id: 'traditional-milk-no-cream',
    name: 'Traditional Milk without Cream',
    baseName: 'Traditional Milk',
    variation: 'without cream',
    description: 'Clean traditional raw Jersey milk with cream removed. For non-herdshare members, this product is sold as pet milk.',
    price: '$7',
    numericPrice: 7,
    unit: 'gallon',
    image: '/images/tradmilknocream.png',
    category: 'dairy'
  },
  {
    id: 'heavy-cream',
    name: 'Heavy Cream',
    baseName: 'Heavy Cream',
    description: 'Thick, ultra-rich heavy cream, perfect for whipping or baking.',
    price: '$10',
    numericPrice: 10,
    unit: 'quart',
    image: '/images/heavycream.png',
    category: 'dairy'
  },
  {
    id: 'butter',
    name: 'Butter',
    baseName: 'Butter',
    description: 'Handmade farm-fresh butter from our Jersey cows.',
    price: '$8',
    numericPrice: 8,
    unit: 'pound',
    image: '/images/farmbutter.png',
    category: 'dairy'
  },
  {
    id: 'free-range-eggs',
    name: 'Free-Range Eggs',
    baseName: 'Free-Range Eggs',
    description: 'Fresh pasture-raised eggs collected daily from our happy hens.',
    price: '$4',
    numericPrice: 4,
    unit: 'dozen',
    image: '/images/pastureeggs.png',
    category: 'eggs'
  }
];
