import { motion } from "motion/react";
import { Sprout, Star, Clock, AlertCircle, Leaf, Mail, Building, Truck, Calendar, Plus, Minus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

// Statically import images to guarantee Vite production bundler hashing
import spinach1 from "../assets/images/spinach_1.png";
import spinach2 from "../assets/images/spinach_2.png";
import lettuceImg from "../assets/images/lettuce.png";
import napaCabbageImg from "../assets/images/napa_cabbage_1779969044139.png";
import bokChoyImg from "../assets/images/bok_choy_1779969066595.png";
import cabbageImg from "../assets/images/cabbagehead.jpeg";
import broccoliImg from "../assets/images/broccolihead.jpeg";
import squashImg from '../assets/images/squash.png.jpg';
import carrotsImg from '../assets/images/baby_carrots.jpg';
import zucchiniImg from '../assets/images/zucchini.jpg';

const STATIC_IMAGES: Record<string, string> = {
  spinach_1: spinach1,
  spinach_2: spinach2,
  lettuce: lettuceImg,
  napa_cabbage: napaCabbageImg,
  bok_choy: bokChoyImg,
  cabbage_head: cabbageImg,
  broccoli_head: broccoliImg,
};

export interface GardenItem {
  id: string;
  name: string;
  status: "available" | "coming_soon";
  price?: string;
  unit?: string;
  description: string;
  season: string;
  imageNames?: string[]; // Easily supports placeholders Spinach 1, Spinach 2, Lettuce
  isOrganic?: boolean;
  imageUrl?: string;
  image?: string;
}

// Easily editable garden inventory list containing the requested live Spinach and Lettuce structures
const GARDEN_INVENTORY: GardenItem[] = [
  {
    id: "yellow-squash",
    name: "Yellow Straight Neck Squash",
    status: "available",
    price: "$0.50",
    unit: "each",
    description: "Tender, thin-skinned yellow summer squash harvested fresh in the morning.",
    season: "In Season Now",
    imageNames: ["Squash"],
    isOrganic: false,
    image: squashImg
  },
  {
    id: "baby-carrots",
    name: "Baby Carrots",
    status: "available",
    price: "$1.00",
    unit: "quart bag",
    description: "Sweet, crunchy, and freshly washed baby carrots packed in quart bags.",
    season: "In Season Now",
    imageNames: ["Baby Carrots"],
    isOrganic: false,
    image: carrotsImg
  },
  {
    id: "bok-choy-large",
    name: "Bok Choy (Large)",
    status: "available",
    price: "$4.00",
    unit: "head",
    description: "Large, sweet, and crisp Bok Choy heads, amazing for stir-fries and fresh salads.",
    season: "In Season Now",
    imageNames: ["Bok Choy"],
    isOrganic: false
  },
  {
    id: "cabbage-head",
    name: "Cabbage",
    status: "available",
    price: "$2.00",
    unit: "head",
    description: "Crisp and firm green cabbage, packed with fresh flavor and harvested daily.",
    season: "In Season Now",
    imageNames: ["Cabbage Head"],
    isOrganic: false
  },
  {
    id: "broccoli-head",
    name: "Broccoli",
    status: "available",
    price: "$4.00",
    unit: "head",
    description: "Compact, nutrient-packed fresh broccoli heads cut straight from our garden.",
    season: "In Season Now",
    imageNames: ["Broccoli Head"],
    isOrganic: false
  },
  {
    id: "zucchini",
    name: "Zucchini",
    status: "available",
    price: "$0.50",
    unit: "each",
    description: "Young, tender dark green zucchini grown in fertile soils and harvested sweet.",
    season: "In Season Now",
    imageNames: ["Zucchini"],
    isOrganic: false,
    image: zucchiniImg
  }
];

const CropImageContainer = ({ item }: { item: GardenItem }) => {
  const [imageError, setImageError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if ((!item.imageNames || item.imageNames.length === 0) && !item.imageUrl && !item.image) {
    return null;
  }

  const product = item;
  const currentImageName = product.imageNames && product.imageNames[activeImageIndex];
  const urlSafeName = currentImageName ? currentImageName.toLowerCase().replace(/\s+/g, '_') : '';
  const src = product.image || product.imageUrl || STATIC_IMAGES[urlSafeName];

  // Directly render the image for the specified JPG assets without fallback checking or placeholder checks
  if (product.image) {
    return (
      <div className="relative aspect-[16/10] bg-farm-cream/30 rounded-lg overflow-hidden border border-farm-brown/10 mb-5 group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] bg-farm-cream/30 rounded-lg overflow-hidden border border-farm-brown/10 mb-5 group">
      {src && !imageError ? (
        <img
          src={src}
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-farm-cream/60 to-farm-beige/20 text-farm-brown/60">
          <div className="p-3 bg-white/85 rounded-full shadow-sm mb-2 border border-farm-brown/5 text-farm-green">
            <Leaf size={20} className="animate-pulse" />
          </div>
          <p className="text-xs font-serif font-semibold text-farm-brown">{product.name}</p>
          <span className="text-[8px] uppercase tracking-widest text-farm-brown/40 mt-1 bg-farm-cream px-2 py-0.5 rounded-full border border-farm-brown/5">
            Photograph Placeholder
          </span>
          <p className="text-[8px] text-farm-green/70 font-sans mt-2 max-w-[85%] leading-normal">
            To display: Upload <code className="bg-white/95 px-1.5 py-0.5 rounded text-farm-brown font-mono font-bold">{urlSafeName}.png</code> into <code className="bg-white/95 px-1.5 py-0.5 rounded text-farm-brown font-mono font-bold">/src/assets/images/</code>
          </p>
        </div>
      )}

      {/* Slide dots if there are multiple images */}
      {product.imageNames && product.imageNames.length > 1 && (
        <div className="absolute bottom-2 right-2 flex gap-1 z-10 bg-farm-brown/60 px-2 py-1 rounded-full backdrop-blur-[2px]">
          {product.imageNames.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setImageError(false);
                setActiveImageIndex(idx);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                activeImageIndex === idx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/75'
              }`}
              title={`View ${product.imageNames?.[idx]}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const VegetableCard = ({ item, index }: { key?: string; item: GardenItem; index: number }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const isAvail = item.status === "available";
  const isOrganic = item.isOrganic !== false;

  const priceVal = item.price ? parseFloat(item.price.replace('$', '')) : 0;
  const total = (priceVal * quantity).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`glove-cursor-target relative p-8 rounded-xl border flex flex-col justify-between h-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-farm-brown/10 hover:border-farm-brown/25 transition-all ${isAvail ? 'ring-2 ring-farm-green/20' : ''}`}
    >
      <div>
        {/* Status Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className={`text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${isAvail ? 'bg-farm-green text-white shadow-sm' : 'bg-farm-brown/10 text-farm-brown/60'}`}>
            {isAvail ? "In Season Now" : "Planted"}
          </span>
          <span className="text-[10px] font-serif text-farm-brown/50 italic">
            {item.season}
          </span>
        </div>

        {/* Crop Image Slot with Placeholder State */}
        <CropImageContainer item={item} />

        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="text-2xl font-serif text-farm-brown font-semibold tracking-tight leading-tight">
            {item.name}
          </h3>
          {item.price && (
            <div className="text-right shrink-0">
              <span className="text-xl font-serif font-extrabold text-farm-green block leading-none">
                {item.price}
              </span>
              <span className="text-[8px] text-farm-brown/50 font-sans font-bold uppercase tracking-wider block mt-1">
                per {item.unit}
              </span>
            </div>
          )}
        </div>
        
        <p className="text-sm font-serif italic text-farm-brown/70 leading-relaxed mb-6">
          {item.description}
        </p>
      </div>

      <div>
        {/* Payment Integration Area */}
        {isAvail ? (
          <div className="mt-4 p-4 bg-farm-cream/20 rounded-xl border border-farm-brown/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-farm-brown/60 uppercase tracking-wider text-[9px]">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-6 h-6 rounded bg-white hover:bg-farm-cream flex items-center justify-center font-bold text-farm-brown text-xs border border-farm-brown/10 active:scale-95 transition-all"
                  title="Decrease quantity"
                >
                  -
                </button>
                <span className="font-mono text-sm font-bold text-farm-brown w-5 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-6 h-6 rounded bg-white hover:bg-farm-cream flex items-center justify-center font-bold text-farm-brown text-xs border border-farm-brown/10 active:scale-95 transition-all"
                  title="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-dotted border-farm-brown/10 text-xs">
              <span className="font-bold text-farm-brown/40 uppercase tracking-wider text-[9px]">Total Cost:</span>
              <span className="text-base font-serif font-extrabold text-farm-green">${total}</span>
            </div>

            <div className="pt-1">
              <button
                onClick={() => {
                  const imageKey = item.imageNames && item.imageNames[0] ? item.imageNames[0].toLowerCase().replace(/\s+/g, '_') : '';
                  const itemImage = item.image || item.imageUrl || STATIC_IMAGES[imageKey];
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: priceVal,
                    unit: item.unit || 'head',
                    category: 'vegetables',
                    image: itemImage
                  }, quantity);
                }}
                className="w-full bg-farm-green text-white py-3 px-4 rounded-lg font-bold uppercase tracking-[0.1em] text-[10px] shadow-sm hover:shadow-md hover:bg-farm-green/90 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                title={`Add ${quantity} x ${item.name} to Cart`}
              >
                <ShoppingCart size={13} />
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-farm-cream/10 rounded-xl border border-dashed border-farm-brown/15 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-farm-brown/40 block">
              Coming Soon
            </span>
            <span className="text-[10px] font-serif italic text-farm-brown/50 block mt-1">
              Expected {item.season}
            </span>
          </div>
        )}

        <div className="pt-6 mt-6 border-t border-dotted border-farm-brown/10 flex justify-between items-center">
          <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-farm-brown/50">Grow Method</span>
          {isOrganic ? (
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-farm-green flex items-center gap-1">
              <Leaf size={10} className="fill-farm-green/10 text-farm-green shrink-0" /> ORGANIC
            </span>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-farm-brown/50">
              TRADITIONAL
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const VegetablesOrderInquiry = () => {
  const { addToCart } = useCart();
  const availableItems = GARDEN_INVENTORY.filter(item => item.status === "available");
  const [selectedItemId, setSelectedItemId] = useState(availableItems[0]?.id || "");
  const [quantity, setQuantity] = useState(1);
  const [logistics, setLogistics] = useState<'pickup' | 'delivery'>('pickup');
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const currentItem = availableItems.find(item => item.id === selectedItemId);
  const priceVal = currentItem?.price ? parseFloat(currentItem.price.replace('$', '')) : 0;
  const total = (priceVal * quantity).toFixed(2);

  return (
    <div id="vegetable-order-inquiry" className="glove-cursor-target mt-24 max-w-4xl mx-auto relative">
      {/* Wood Frame Overlay */}
      <div className="absolute inset-0 border-[10px] border-farm-brown/10 rounded-3xl -m-3 pointer-events-none wood-texture opacity-50" />
      
      <div className="bg-white paper-texture rounded-2xl border border-farm-brown/10 shadow-xl overflow-hidden relative p-5 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">
          
          {/* Left panel: Info */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <span className="text-farm-green text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">Direct Access</span>
              <h3 className="text-2xl xs:text-3xl md:text-4xl font-bold font-serif text-farm-brown leading-tight">Order Inquiry</h3>
              <p className="font-script text-xl md:text-2xl text-farm-green mt-1">Kitchen Garden Harvest</p>
            </div>

            <p className="text-sm font-serif italic text-farm-brown/80 leading-relaxed">
              "Our vegetables are grown right here on our family farm utilizing organic practices. To secure your harvest bag or whole heads of lettuce, place an inquiry directly below. We will coordinate details with you immediately."
            </p>

            <div className="space-y-4 pt-6 border-t border-dotted border-farm-brown/25 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-farm-green/10 rounded-full text-farm-green mt-0.5 shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="font-bold text-farm-brown uppercase tracking-wider text-[10px] mb-0.5">Contact & Inquiries</p>
                  <a href="mailto:Info@beechgrovelivestock.com" className="font-mono text-farm-green hover:underline font-bold text-sm">
                    Info@beechgrovelivestock.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-farm-green/10 rounded-full text-farm-green mt-0.5 shrink-0">
                  <Star size={16} className="fill-farm-green/10 animate-pulse" />
                </div>
                <div>
                  <p className="font-bold text-farm-brown uppercase tracking-wider text-[10px] mb-0.5">Secure Payments</p>
                  <p className="text-farm-brown/70 leading-normal font-serif italic text-[13px]">
                    We accept offline payments via Venmo or PayPal email. Submitting this form generates a formatted email to draft your order specifications seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Active Form Area */}
          <div className="p-5 md:p-8 bg-farm-cream/15 rounded-2xl border border-farm-brown/10 space-y-4 md:space-y-6 relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-farm-green/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            {/* Step 1: Select Crop */}
            <div className="space-y-2">
              <label htmlFor="crop-select" className="text-[10px] font-bold uppercase tracking-widest text-farm-brown/60 block">
                Select Vegetable
              </label>
              <select
                id="crop-select"
                value={selectedItemId}
                onChange={(e) => {
                  setSelectedItemId(e.target.value);
                  setQuantity(1); // Reset quantity to 1 on item change
                }}
                className="w-full bg-white border border-farm-brown/10 rounded-lg p-3 outline-none focus:border-farm-green focus:ring-1 focus:ring-farm-green transition-all font-serif text-sm text-farm-brown"
              >
                {availableItems.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.price} per {item.unit})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Quantity Counter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-farm-brown/60">
                  Quantity ({currentItem?.unit}s)
                </span>
                <div className="flex items-center gap-3 bg-white rounded-full px-3 py-1.5 border border-farm-brown/10 shadow-sm">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-farm-cream/35 hover:bg-farm-cream flex items-center justify-center font-bold text-farm-brown hover:text-farm-green transition-colors active:scale-90"
                    title="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-mono text-base font-bold text-farm-brown w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 rounded-full bg-farm-cream/35 hover:bg-farm-cream flex items-center justify-center font-bold text-farm-brown hover:text-farm-green transition-colors active:scale-90"
                    title="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Logistics Method */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLogistics('pickup')}
                className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border-2 transition-all ${
                  logistics === 'pickup' 
                    ? 'border-farm-green bg-farm-green/5 text-farm-green font-bold' 
                    : 'border-farm-brown/10 bg-white text-farm-brown/60 hover:border-farm-brown/30'
                }`}
              >
                <Building size={18} className={logistics === 'pickup' ? 'text-farm-green' : 'opacity-40'} />
                <span className="text-[9px] uppercase font-bold tracking-wider">Farm Pickup</span>
              </button>
              <button
                type="button"
                onClick={() => setLogistics('delivery')}
                className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border-2 transition-all ${
                  logistics === 'delivery' 
                    ? 'border-farm-green bg-farm-green/5 text-farm-green font-bold' 
                    : 'border-farm-brown/10 bg-white text-farm-brown/60 hover:border-farm-brown/30'
                }`}
              >
                <Truck size={18} className={logistics === 'delivery' ? 'text-farm-green' : 'opacity-40'} />
                <span className="text-[9px] uppercase font-bold tracking-wider">Delivery</span>
              </button>
            </div>

            {/* Step 4: Preferred Date */}
            <div className="space-y-2">
              <label htmlFor="preferred-date" className="text-[10px] font-bold uppercase tracking-widest text-farm-brown/60 flex items-center gap-1.5">
                <Calendar size={12} /> Preferred {logistics === 'pickup' ? 'Pickup' : 'Delivery'} Date
              </label>
              <input
                id="preferred-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-farm-brown/10 rounded-lg p-3 outline-none focus:border-farm-green focus:ring-1 focus:ring-farm-green transition-all font-serif text-sm text-farm-brown"
              />
            </div>

            {/* Step 5: Notes */}
            <div className="space-y-2">
              <label htmlFor="order-notes" className="text-[10px] font-bold uppercase tracking-widest text-farm-brown/60 block">
                Additional Notes
              </label>
              <textarea
                id="order-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full bg-white border border-farm-brown/10 rounded-lg p-3 outline-none focus:border-farm-green focus:ring-1 focus:ring-farm-green transition-all font-serif text-sm text-farm-brown resize-none"
                placeholder="Preferred harvest details or requests..."
              />
            </div>

            {/* Cost Summary & Actions */}
            <div className="pt-4 border-t border-dotted border-farm-brown/15 space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-serif italic text-farm-brown/60">Estimated Cost</span>
                <span className="text-3xl font-bold font-serif text-farm-green">${total}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const imageKey = currentItem?.imageNames && currentItem.imageNames[0] ? currentItem.imageNames[0].toLowerCase().replace(/\s+/g, '_') : '';
                    const itemImage = currentItem?.image || currentItem?.imageUrl || STATIC_IMAGES[imageKey];
                    addToCart({
                      id: currentItem?.id || 'spinach-bag',
                      name: currentItem?.name || 'Fresh Spinach',
                      price: priceVal,
                      unit: currentItem?.unit || 'bag',
                      category: 'vegetables',
                      image: itemImage
                    }, quantity);
                  }}
                  className="w-full bg-farm-green text-white py-4 rounded-xl font-bold uppercase tracking-[0.1em] text-[11px] shadow-md hover:shadow-lg hover:bg-farm-green/90 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  title="Add selected garden item to cart"
                >
                  <ShoppingCart size={14} />
                  Add to Shopping Cart
                </button>
              </div>
              <p className="text-[9px] text-center opacity-40 uppercase tracking-widest text-[#4A2E1F] font-bold">
                Payments safely finished externally via secure systems
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default function VegetablesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-farm-white py-12 md:py-20 paper-texture"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Header Block */}
        <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
          <p className="text-farm-green uppercase text-[10px] font-bold tracking-[0.4em] mb-3">Fresh Harvest</p>
          <h1 className="text-3xl xs:text-4xl md:text-6xl font-serif text-farm-brown tracking-tight mb-4">
            Our Kitchen Garden
          </h1>
          <div className="w-16 h-1 bg-farm-green mx-auto mb-6 md:mb-8" />
          
          <div className="bg-farm-cream/40 border border-farm-brown/10 p-5 md:p-8 rounded-2xl relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-24 h-24 bg-farm-green/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <p className="font-serif text-base md:text-xl italic text-farm-brown/90 leading-relaxed">
              "Our garden is waking up! Right now we have crisp lettuce and fresh spinach available, with a wide variety of fresh seasonal vegetables arriving in the coming weeks."
            </p>
          </div>
        </div>

        {/* Inventory Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8 pb-3 md:pb-4 border-b border-farm-brown/10">
          <h2 className="text-xl xs:text-2xl md:text-3xl font-serif text-farm-brown">Garden Status & Inventory</h2>
          <div className="text-[9px] font-bold uppercase tracking-widest text-farm-brown/60 flex items-center gap-1.5 shrink-0">
            <Clock size={12} className="text-farm-green" /> Updated Weekly
          </div>
        </div>

        {/* Grid of Crops */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GARDEN_INVENTORY.map((item, index) => (
            <VegetableCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Order Inquiry Form and Direct Contact Panel */}
        <VegetablesOrderInquiry />

      </div>
    </motion.div>
  );
}
