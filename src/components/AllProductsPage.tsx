import { motion } from "motion/react";
import { useState } from "react";
import { ShoppingCart, Leaf, Egg, Milk, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { PRODUCTS, Product } from "../constants";
import { GARDEN_INVENTORY, GardenItem } from "./VegetablesPage";

// Local helper to statically map names for image placeholders if needed
import spinach1 from "../assets/images/spinach_1.png";
import spinach2 from "../assets/images/spinach_2.png";
import lettuceImg from "../assets/images/lettuce.png";
import napaCabbageImg from "../assets/images/napa_cabbage_1779969044139.png";
import bokChoyImg from "../assets/images/bok_choy_1779969066595.png";
import cabbageImg from "../assets/images/cabbagehead.jpeg";
import broccoliImg from "../assets/images/broccolihead.jpeg";

const STATIC_IMAGES: Record<string, string> = {
  spinach_1: spinach1,
  spinach_2: spinach2,
  lettuce: lettuceImg,
  napa_cabbage: napaCabbageImg,
  bok_choy: bokChoyImg,
  cabbage_head: cabbageImg,
  broccoli_head: broccoliImg,
};

// Component for rendering product images with optional placeholders or base64 data
const ProductImage = ({ 
  item, 
  isVegetable 
}: { 
  item: Product | GardenItem; 
  isVegetable: boolean 
}) => {
  const [imageError, setImageError] = useState(false);

  // Vegetable Base64 or local static image selection
  if (isVegetable) {
    const veg = item as GardenItem;
    const base64Image = veg.image; // e.g. "data:image/jpeg;base64,..."
    const imageKey = veg.imageNames && veg.imageNames[0] 
      ? veg.imageNames[0].toLowerCase().replace(/\s+/g, '_') 
      : '';
    const imgSource = base64Image || veg.imageUrl || STATIC_IMAGES[imageKey];

    if (imgSource && !imageError) {
      return (
        <div className="relative aspect-[16/10] bg-farm-cream/30 rounded-lg overflow-hidden border border-farm-brown/10 mb-4 group">
          <img
            src={imgSource}
            alt={veg.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }

    return (
      <div className="relative aspect-[16/10] bg-farm-cream/30 rounded-lg overflow-hidden border border-farm-brown/10 mb-4 flex flex-col items-center justify-center p-4 text-center text-farm-brown/60">
        <div className="p-3 bg-white/85 rounded-full shadow-xs mb-2 border border-farm-brown/5 text-farm-green">
          <Leaf size={20} className="animate-pulse" />
        </div>
        <p className="text-xs font-serif font-semibold text-farm-brown">{veg.name}</p>
        <span className="text-[8px] uppercase tracking-widest text-farm-brown/40 mt-1 bg-farm-cream px-2 py-0.5 rounded-full">
          Photograph Placeholder
        </span>
      </div>
    );
  }

  // Dairy / Eggs standard images
  const prod = item as Product;
  return (
    <div className="relative aspect-[16/10] bg-farm-cream/30 rounded-lg overflow-hidden border border-farm-brown/10 mb-4 group">
      {prod.image ? (
        <img
          src={prod.image}
          alt={prod.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-farm-cream/10 text-farm-brown/45 font-serif italic text-xs">
          Loading Image...
        </div>
      )}
    </div>
  );
};

export default function AllProductsPage() {
  const { addToCart } = useCart();

  // Dairy state
  const dairyProducts = PRODUCTS.filter(p => p.category === 'dairy');
  const [dairyQuantities, setDairyQuantities] = useState<Record<string, number>>(
    PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );

  // Eggs / Poultry state
  const eggsProducts = PRODUCTS.filter(p => p.category === 'eggs');
  const [eggsQuantities, setEggsQuantities] = useState<Record<string, number>>(
    PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );

  // Vegetables state
  const [vegQuantities, setVegQuantities] = useState<Record<string, number>>(
    GARDEN_INVENTORY.reduce((acc, v) => ({ ...acc, [v.id]: 1 }), {})
  );

  const incrementQuantity = (id: string, type: 'dairy' | 'eggs' | 'vegetables') => {
    if (type === 'dairy') {
      setDairyQuantities(v => ({ ...v, [id]: (v[id] || 1) + 1 }));
    } else if (type === 'eggs') {
      setEggsQuantities(v => ({ ...v, [id]: (v[id] || 1) + 1 }));
    } else {
      setVegQuantities(v => ({ ...v, [id]: (v[id] || 1) + 1 }));
    }
  };

  const decrementQuantity = (id: string, type: 'dairy' | 'eggs' | 'vegetables') => {
    if (type === 'dairy') {
      setDairyQuantities(v => ({ ...v, [id]: Math.max(1, (v[id] || 1) - 1) }));
    } else if (type === 'eggs') {
      setEggsQuantities(v => ({ ...v, [id]: Math.max(1, (v[id] || 1) - 1) }));
    } else {
      setVegQuantities(v => ({ ...v, [id]: Math.max(1, (v[id] || 1) - 1) }));
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-farm-green bg-farm-green/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
          Our Complete Offerings
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-farm-brown font-extrabold tracking-tight mb-4 leading-tight">
          Consolidated Marketplace
        </h1>
        <p className="text-base md:text-lg font-serif italic text-farm-brown/70">
          Browse everything we cultivate, raise, and harvest on our Tennessee pastures. All in one simple, comprehensive catalog view.
        </p>
      </div>

      <div className="space-y-20">
        {/* SECTION 1: DAIRY */}
        <section id="dairy-section" className="scroll-mt-12">
          <div className="flex items-center gap-3 border-b-2 border-farm-brown/15 pb-4 mb-8">
            <div className="p-2.5 bg-farm-green/10 text-farm-green rounded-lg">
              <Milk size={24} />
            </div>
            <h2 className="text-3xl font-serif text-farm-brown font-bold tracking-tight">
              Dairy
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dairyProducts.map((p, index) => {
              const qty = dairyQuantities[p.id] || 1;
              const unitTotal = (p.numericPrice * qty).toFixed(2);

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="relative p-6 rounded-xl border flex flex-col justify-between h-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.01)] border-farm-brown/10 hover:border-farm-brown/25 hover:shadow-md transition-all"
                >
                  <div>
                    <ProductImage item={p} isVegetable={false} />
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="text-xl font-serif text-farm-brown font-bold tracking-tight leading-tight">
                        {p.name}
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="text-lg font-serif font-extrabold text-farm-green block leading-none">
                          {p.price}
                        </span>
                        <span className="text-[8px] text-farm-brown/50 font-sans font-bold uppercase tracking-wider block mt-1">
                          per {p.unit}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs font-sans text-farm-brown/70 leading-relaxed mb-6">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-auto space-y-3 pt-4 border-t border-dotted border-farm-brown/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-farm-brown/60 uppercase tracking-wider text-[9px]">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrementQuantity(p.id, 'dairy')}
                          className="w-6 h-6 rounded bg-white hover:bg-farm-cream flex items-center justify-center font-bold text-farm-brown text-xs border border-farm-brown/10 active:scale-95 transition-all cursor-pointer"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="font-mono text-sm font-bold text-farm-brown w-5 text-center">{qty}</span>
                        <button
                          onClick={() => incrementQuantity(p.id, 'dairy')}
                          className="w-6 h-6 rounded bg-white hover:bg-farm-cream flex items-center justify-center font-bold text-farm-brown text-xs border border-farm-brown/10 active:scale-95 transition-all cursor-pointer"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-1 text-xs">
                      <span className="font-bold text-farm-brown/40 uppercase tracking-wider text-[9px]">Subtotal:</span>
                      <span className="text-sm font-serif font-bold text-farm-green">${unitTotal}</span>
                    </div>

                    <button
                      onClick={() => addToCart({
                        id: p.id,
                        name: p.name,
                        price: p.numericPrice,
                        unit: p.unit,
                        category: 'dairy',
                        image: p.image
                      }, qty)}
                      className="w-full bg-farm-green hover:bg-farm-green/90 text-white py-2.5 px-4 rounded-lg font-bold uppercase tracking-wider text-[9px] shadow-sm hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingCart size={11} />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: POULTRY */}
        <section id="poultry-section" className="scroll-mt-12">
          <div className="flex items-center gap-3 border-b-2 border-farm-brown/15 pb-4 mb-8">
            <div className="p-2.5 bg-farm-green/10 text-farm-green rounded-lg">
              <Egg size={24} />
            </div>
            <h2 className="text-3xl font-serif text-farm-brown font-bold tracking-tight">
              Poultry
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {eggsProducts.map((p, index) => {
              const qty = eggsQuantities[p.id] || 1;
              const unitTotal = (p.numericPrice * qty).toFixed(2);

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="relative p-6 rounded-xl border flex flex-col justify-between h-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.01)] border-farm-brown/10 hover:border-farm-brown/25 hover:shadow-md transition-all"
                >
                  <div>
                    <ProductImage item={p} isVegetable={false} />
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="text-xl font-serif text-farm-brown font-bold tracking-tight leading-tight">
                        {p.name}
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="text-lg font-serif font-extrabold text-farm-green block leading-none">
                          {p.price}
                        </span>
                        <span className="text-[8px] text-farm-brown/50 font-sans font-bold uppercase tracking-wider block mt-1">
                          per {p.unit}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs font-sans text-farm-brown/70 leading-relaxed mb-6">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-auto space-y-3 pt-4 border-t border-dotted border-farm-brown/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-farm-brown/60 uppercase tracking-wider text-[9px]">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrementQuantity(p.id, 'eggs')}
                          className="w-6 h-6 rounded bg-white hover:bg-farm-cream flex items-center justify-center font-bold text-farm-brown text-xs border border-farm-brown/10 active:scale-95 transition-all cursor-pointer"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="font-mono text-sm font-bold text-farm-brown w-5 text-center">{qty}</span>
                        <button
                          onClick={() => incrementQuantity(p.id, 'eggs')}
                          className="w-6 h-6 rounded bg-white hover:bg-farm-cream flex items-center justify-center font-bold text-farm-brown text-xs border border-farm-brown/10 active:scale-95 transition-all cursor-pointer"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-1 text-xs">
                      <span className="font-bold text-farm-brown/40 uppercase tracking-wider text-[9px]">Subtotal:</span>
                      <span className="text-sm font-serif font-bold text-farm-green">${unitTotal}</span>
                    </div>

                    <button
                      onClick={() => addToCart({
                        id: p.id,
                        name: p.name,
                        price: p.numericPrice,
                        unit: p.unit,
                        category: 'eggs',
                        image: p.image
                      }, qty)}
                      className="w-full bg-farm-green hover:bg-farm-green/90 text-white py-2.5 px-4 rounded-lg font-bold uppercase tracking-wider text-[9px] shadow-sm hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingCart size={11} />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: VEGETABLES */}
        <section id="vegetables-section" className="scroll-mt-12">
          <div className="flex items-center gap-3 border-b-2 border-farm-brown/15 pb-4 mb-8">
            <div className="p-2.5 bg-farm-green/10 text-farm-green rounded-lg">
              <Leaf size={24} />
            </div>
            <h2 className="text-3xl font-serif text-farm-brown font-bold tracking-tight">
              Vegetables
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {GARDEN_INVENTORY.map((v, index) => {
              const qty = vegQuantities[v.id] || 1;
              const isAvailable = v.status === "available";
              const isOrganic = v.isOrganic !== false;
              const decimalPrice = v.price ? parseFloat(v.price.replace('$', '')) : 0;
              const unitTotal = (decimalPrice * qty).toFixed(2);

              return (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative p-6 rounded-xl border flex flex-col justify-between h-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.01)] border-farm-brown/10 hover:border-farm-brown/25 hover:shadow-md transition-all ${isAvailable ? 'ring-2 ring-farm-green/10' : ''}`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-[7px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${isAvailable ? 'bg-farm-green/10 text-farm-green border-farm-green/20' : 'bg-farm-brown/10 text-farm-brown/60 border-farm-brown/10'}`}>
                        {isAvailable ? "In Season Now" : "Planted"}
                      </span>
                      {isOrganic && (
                        <span className="text-[7px] font-bold uppercase tracking-widest bg-farm-cream text-farm-brown border border-farm-brown/15 px-2 py-0.5 rounded-full">
                          Organic
                        </span>
                      )}
                    </div>

                    <ProductImage item={v} isVegetable={true} />

                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="text-xl font-serif text-farm-brown font-bold tracking-tight leading-tight">
                        {v.name}
                      </h3>
                      {v.price && (
                        <div className="text-right shrink-0">
                          <span className="text-lg font-serif font-extrabold text-farm-green block leading-none">
                            {v.price}
                          </span>
                          <span className="text-[8px] text-farm-brown/50 font-sans font-bold uppercase tracking-wider block mt-1">
                            per {v.unit || 'each'}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-sans text-farm-brown/70 leading-relaxed mb-6">
                      {v.description}
                    </p>
                  </div>

                  <div className="mt-auto space-y-3 pt-4 border-t border-dotted border-farm-brown/10">
                    {isAvailable ? (
                      <>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-farm-brown/60 uppercase tracking-wider text-[9px]">Quantity:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => decrementQuantity(v.id, 'vegetables')}
                              className="w-6 h-6 rounded bg-white hover:bg-farm-cream flex items-center justify-center font-bold text-farm-brown text-xs border border-farm-brown/10 active:scale-95 transition-all cursor-pointer"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="font-mono text-sm font-bold text-farm-brown w-5 text-center">{qty}</span>
                            <button
                              onClick={() => incrementQuantity(v.id, 'vegetables')}
                              className="w-6 h-6 rounded bg-white hover:bg-farm-cream flex items-center justify-center font-bold text-farm-brown text-xs border border-farm-brown/10 active:scale-95 transition-all cursor-pointer"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-1 text-xs">
                          <span className="font-bold text-farm-brown/40 uppercase tracking-wider text-[9px]">Subtotal:</span>
                          <span className="text-sm font-serif font-bold text-farm-green">${unitTotal}</span>
                        </div>

                        <button
                          onClick={() => {
                            const imageKey = v.imageNames && v.imageNames[0] 
                              ? v.imageNames[0].toLowerCase().replace(/\s+/g, '_') 
                              : '';
                            const itemImage = v.image || v.imageUrl || STATIC_IMAGES[imageKey];
                            addToCart({
                              id: v.id,
                              name: v.name,
                              price: decimalPrice,
                              unit: v.unit || 'each',
                              category: 'vegetables',
                              image: itemImage
                            }, qty);
                          }}
                          className="w-full bg-farm-green hover:bg-farm-green/90 text-white py-2.5 px-4 rounded-lg font-bold uppercase tracking-wider text-[9px] shadow-sm hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ShoppingCart size={11} />
                          Add to Cart
                        </button>
                      </>
                    ) : (
                      <div className="p-3 bg-farm-cream/10 rounded-lg border border-dashed border-farm-brown/15 text-center py-4">
                        <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-farm-brown/40 block">
                          Coming Soon
                        </span>
                        <span className="text-[10px] font-serif italic text-farm-brown/60 block mt-1">
                          Estimate: {v.season}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
