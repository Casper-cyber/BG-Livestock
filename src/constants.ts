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
    image: './a2a2milkwithcream.png', // Removed the leading slash, added ./
    category: 'dairy'
  },
  {
    id: 'a2a2-milk-nocream',
    name: 'A2A2 Milk without Cream',
    baseName: 'A2A2 Milk',
    variation: 'without cream',
    description: 'Fresh raw A2A2 Jersey milk with cream removed. For non-herdshare members, this product is sold as pet milk.',
    price: '$8',
    numericPrice: 8,
    unit: 'gallon',
    image: './a2a2milknocream.png',
    category: 'dairy'
  },
  {
    id: 'traditional-milk',
    name: 'Traditional Milk with Cream',
    baseName: 'Traditional Milk',
    variation: 'with cream',
    description: 'High-quality traditional raw Jersey milk with natural cream top. For non-herdshare members, this product is sold as pet milk.',
    price: '$10',
    numericPrice: 10,
    unit: 'gallon',
    image: './tradmilkwithcream.png',
    category: 'dairy'
  },
  {
    id: 'farm-butter',
    name: 'Farm Butter',
    baseName: 'Farm Butter',
    variation: 'fresh',
    description: 'Freshly churned, rich farm butter made from our premium Jersey cream.',
    price: '$6',
    numericPrice: 6,
    unit: 'lb',
    image: './farmbutter.png',
    category: 'dairy'
  },
  {
    id: 'heavy-cream',
    name: 'Heavy Cream',
    baseName: 'Heavy Cream',
    variation: 'pure',
    description: 'Thick, luscious heavy cream perfect for whipping, cooking, or adding to coffee.',
    price: '$7',
    numericPrice: 7,
    unit: 'pint',
    image: './heavycream.png',
    category: 'dairy'
  },
  {
    id: 'pasture-eggs',
    name: 'Pasture Raised Eggs',
    baseName: 'Eggs',
    variation: 'free-range',
    description: 'Fresh farm eggs from chickens raised freely on our organic pastures.',
    price: '$5',
    numericPrice: 5,
    unit: 'dozen',
    image: './pastureeggs.png',
    category: 'dairy'
  }
];