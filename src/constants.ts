import a2a2MilkWithCream from './assets/images/a2a2_milk_with_cream_v2_1779111209106.png';
import a2a2MilkNoCream from './assets/images/a2a2_milk_no_cream_v2_1779111227828.png';
import tradMilkWithCream from './assets/images/trad_milk_with_cream_v2_1779111244806.png';
import tradMilkNoCream from './assets/images/trad_milk_no_cream_v2_1779111261103.png';
import heavyCream from './assets/images/heavy_cream_v2_1779111277669.png';
import farmButter from './assets/images/farm_butter_v2_1779111294625.png';
import pastureEggs from './assets/images/pasture_eggs_v2_final_1779111337671.png';
import heavyCreamJarSpoon from './assets/images/heavy_cream_jar_spoon_1779108364576.png';

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
export const VENMO_PROFILE_URL = "https://account.venmo.com/u/Theresia-Anderson-2";
export const PAYPAL_EMAIL = "Info@beechgrovelivestock.com";

export const PRODUCTS: Product[] = [
  {
    id: 'a2a2-milk-cream',
    name: 'A2 Milk with cream',
    baseName: 'A2 Milk',
    variation: 'with cream',
    description: 'Rich, creamy raw A2/A2 Jersey milk. For non-herdshare members, this product is sold as pet milk.',
    price: '$11',
    numericPrice: 11,
    unit: 'gallon',
    image: a2a2MilkWithCream,
    category: 'dairy'
  },
  {
    id: 'a2a2-milk-no-cream',
    name: 'A2 Milk no cream',
    baseName: 'A2 Milk',
    variation: 'no cream',
    description: 'Fresh raw A2/A2 Jersey milk with cream removed. For non-herdshare members, this product is sold as pet milk.',
    price: '$8.00',
    numericPrice: 8,
    unit: 'gallon',
    image: a2a2MilkNoCream,
    category: 'dairy'
  },
  {
    id: 'traditional-milk-cream',
    name: 'Milk with cream',
    baseName: 'Milk',
    variation: 'with cream',
    description: 'High-quality traditional raw Jersey milk with natural cream top. For non-herdshare members, this product is sold as pet milk.',
    price: '$10',
    numericPrice: 10,
    unit: 'gallon',
    image: tradMilkWithCream,
    category: 'dairy'
  },
  {
    id: 'traditional-milk-no-cream',
    name: 'Milk no cream',
    baseName: 'Milk',
    variation: 'no cream',
    description: 'Clean traditional raw Jersey milk with cream removed. For non-herdshare members, this product is sold as pet milk.',
    price: '$7.00',
    numericPrice: 7,
    unit: 'gallon',
    image: tradMilkNoCream,
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
    image: heavyCream,
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
    image: farmButter,
    category: 'dairy'
  },
  {
    id: 'sour-cream',
    name: 'Sour Cream',
    baseName: 'Sour Cream',
    description: 'Thick, tangy, and rich sour cream, handmade from our premium Jersey dairy.',
    price: '$4',
    numericPrice: 4,
    unit: 'pint',
    image: heavyCreamJarSpoon,
    category: 'dairy'
  },
  {
    id: 'free-range-eggs',
    name: 'Eggs',
    baseName: 'Eggs',
    description: 'Fresh pasture-raised eggs collected daily from our happy hens.',
    price: '$4',
    numericPrice: 4,
    unit: 'dozen',
    image: pastureEggs,
    category: 'eggs'
  }
];
