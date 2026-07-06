import { motion } from "motion/react";
import { useState } from "react";
import { ShoppingCart, Leaf, Egg, Milk, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

// Component for rendering product images with optional placeholders or external URLs
const ProductImage = ({ item }: { item: any }) => {
  const [imageError, setImageError] = useState(false);
  const src = item.image || item.imageUrl;

  const overlay = item.isSoldOut ? (
    <div className="absolute inset-0 flex items-center justify-center bg-black/15 backdrop-blur-[1px] z-10 pointer-events-none">
      <div className="bg-amber-400 border border-amber-500 shadow-md transform -rotate-3 px-5 py-2.5 rounded-sm flex flex-col items-center justify-center max-w-[80%]">
        <span className="font-serif font-extrabold text-sm md:text-base tracking-wider text-[#4A2E1F] leading-none select-none">
          SOLD OUT!
        </span>
        <span className="font-sans font-bold text-[8px] uppercase tracking-widest text-[#4A2E1F]/60 mt-1 select-none">
          Out of Season
        </span>
      </div>
    </div>
  ) : null;

  if (src && !imageError) {
    return (
      <div className="relative aspect-[16/10] bg-farm-cream/30 rounded-lg overflow-hidden border border-farm-brown/10 mb-4 group">
        <img
          src={src}
          alt={item.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {overlay}
      </div>
    );
  }

  // Assign high-quality fallback icon based on category
  const cat = (item.category || '').toLowerCase();
  let FallbackIcon = Leaf;
  if (cat === 'dairy') {
    FallbackIcon = Milk;
  } else if (cat === 'poultry' || cat === 'eggs') {
    FallbackIcon = Egg;
  }

  return (
    <div className="relative aspect-[16/10] bg-farm-cream/30 rounded-lg overflow-hidden border border-farm-brown/10 mb-4 flex flex-col items-center justify-center p-4 text-center text-farm-brown/60">
      <div className="p-3 bg-white/85 rounded-full shadow-xs mb-2 border border-farm-brown/5 text-farm-green">
        <FallbackIcon size={20} className="animate-pulse" />
      </div>
      <p className="text-xs font-serif font-semibold text-farm-brown">{item.name}</p>
      <span className="text-[8px] uppercase tracking-widest text-farm-brown/40 mt-1 bg-farm-cream px-2 py-0.5 rounded-full">
        Photograph Placeholder
      </span>
      {overlay}
    </div>
  );
};

export default function AllProductsPage() {
  const { products, addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQuantity = (id: string) => quantities[id] || 1;

  const incrementQuantity = (id: string) => {
    setQuantities(q => ({ ...q, [id]: (q[id] || 1) + 1 }));
  };

  const decrementQuantity = (id: string) => {
    setQuantities(q => ({ ...q, [id]: Math.max(1, (q[id] || 1) - 1) }));
  };

  // Filter products by category
  const dairyProducts = products.filter(p => p.category === 'Dairy' || p.category === 'dairy');
  const eggsProducts = products.filter(p => p.category === 'Poultry' || p.category === 'eggs' || p.category === 'poultry' || p.category === 'Eggs');
  const vegetablesProducts = products.filter(p => p.category === 'Vegetables' || p.category === 'vegetables');

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
              const qty = getQuantity(p.id);
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
                    <ProductImage item={p} />
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
                      {p.notes || "Fresh and nutrient-rich grass-fed dairy from our herd share."}
                    </p>
                  </div>

                  <div className="mt-auto space-y-3 pt-4 border-t border-dotted border-farm-brown/10">
                    {p.isSoldOut ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs opacity-0 pointer-events-none select-none">
                          <span className="font-bold text-[9px]">Quantity:</span>
                          <span className="font-mono text-sm">1</span>
                        </div>
                        <div className="flex justify-between items-center pt-1 text-xs opacity-0 pointer-events-none select-none">
                          <span className="font-bold text-[9px]">Subtotal:</span>
                          <span className="text-sm font-serif font-bold">$0.00</span>
                        </div>
                        <div className="w-full bg-red-50 text-red-600 border border-red-200/60 py-2.5 rounded-lg font-bold uppercase tracking-wider text-[9px] text-center select-none font-sans">
                          SOLD OUT
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-farm-brown/60 uppercase tracking-wider text-[9px]">Quantity:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => decrementQuantity(p.id)}
                              className="w-6 h-6 rounded bg-white hover:bg-farm-cream flex items-center justify-center font-bold text-farm-brown text-xs border border-farm-brown/10 active:scale-95 transition-all cursor-pointer"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="font-mono text-sm font-bold text-farm-brown w-5 text-center">{qty}</span>
                            <button
                              onClick={() => incrementQuantity(p.id)}
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
                      </>
                    )}
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
              const qty = getQuantity(p.id);
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
                    <ProductImage item={p} />
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
                      {p.notes || "Pasture-raised farm eggs and poultry offerings."}
                    </p>
                  </div>

                  <div className="mt-auto space-y-3 pt-4 border-t border-dotted border-farm-brown/10">
                    {p.isSoldOut ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs opacity-0 pointer-events-none select-none">
                          <span className="font-bold text-[9px]">Quantity:</span>
                          <span className="font-mono text-sm">1</span>
                        </div>
                        <div className="flex justify-between items-center pt-1 text-xs opacity-0 pointer-events-none select-none">
                          <span className="font-bold text-[9px]">Subtotal:</span>
                          <span className="text-sm font-serif font-bold">$0.00</span>
                        </div>
                        <div className="w-full bg-red-50 text-red-600 border border-red-200/60 py-2.5 rounded-lg font-bold uppercase tracking-wider text-[9px] text-center select-none font-sans">
                          SOLD OUT
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-farm-brown/60 uppercase tracking-wider text-[9px]">Quantity:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => decrementQuantity(p.id)}
                              className="w-6 h-6 rounded bg-white hover:bg-farm-cream flex items-center justify-center font-bold text-farm-brown text-xs border border-farm-brown/10 active:scale-95 transition-all cursor-pointer"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="font-mono text-sm font-bold text-farm-brown w-5 text-center">{qty}</span>
                            <button
                              onClick={() => incrementQuantity(p.id)}
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
                      </>
                    )}
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
            {vegetablesProducts.map((v, index) => {
              const qty = getQuantity(v.id);
              const isAvailable = true; // dynamic spreadsheet items are in-season / available
              const isOrganic = true;
              const unitTotal = (v.numericPrice * qty).toFixed(2);

              return (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative p-6 rounded-xl border flex flex-col justify-between h-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.01)] border-farm-brown/10 hover:border-farm-brown/25 hover:shadow-md transition-all ring-2 ring-farm-green/10`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      {v.isSoldOut ? (
                        <span className="text-[7px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border bg-red-50 text-red-600 border-red-200/50">
                          Sold Out
                        </span>
                      ) : (
                        <span className={`text-[7px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border bg-farm-green/10 text-farm-green border-farm-green/20`}>
                          In Season Now
                        </span>
                      )}
                      {isOrganic && (
                        <span className="text-[7px] font-bold uppercase tracking-widest bg-farm-cream text-farm-brown border border-farm-brown/15 px-2 py-0.5 rounded-full">
                          Organic
                        </span>
                      )}
                    </div>

                    <ProductImage item={v} />

                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="text-xl font-serif text-farm-brown font-bold tracking-tight leading-tight">
                        {v.name}
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="text-lg font-serif font-extrabold text-farm-green block leading-none">
                          {v.price}
                        </span>
                        <span className="text-[8px] text-farm-brown/50 font-sans font-bold uppercase tracking-wider block mt-1">
                          per {v.unit || 'each'}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs font-sans text-farm-brown/70 leading-relaxed mb-6">
                      {v.notes || "Freshly harvested from our kitchen garden."}
                    </p>
                  </div>

                  <div className="mt-auto space-y-3 pt-4 border-t border-dotted border-farm-brown/10">
                    {v.isSoldOut ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs opacity-0 pointer-events-none select-none">
                          <span className="font-bold text-[9px]">Quantity:</span>
                          <span className="font-mono text-sm">1</span>
                        </div>
                        <div className="flex justify-between items-center pt-1 text-xs opacity-0 pointer-events-none select-none">
                          <span className="font-bold text-[9px]">Subtotal:</span>
                          <span className="text-sm font-serif font-bold">$0.00</span>
                        </div>
                        <div className="w-full bg-red-50 text-red-600 border border-red-200/60 py-2.5 rounded-lg font-bold uppercase tracking-wider text-[9px] text-center select-none font-sans">
                          SOLD OUT
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-farm-brown/60 uppercase tracking-wider text-[9px]">Quantity:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => decrementQuantity(v.id)}
                              className="w-6 h-6 rounded bg-white hover:bg-farm-cream flex items-center justify-center font-bold text-farm-brown text-xs border border-farm-brown/10 active:scale-95 transition-all cursor-pointer"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="font-mono text-sm font-bold text-farm-brown w-5 text-center">{qty}</span>
                            <button
                              onClick={() => incrementQuantity(v.id)}
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
                            id: v.id,
                            name: v.name,
                            price: v.numericPrice,
                            unit: v.unit || 'each',
                            category: 'vegetables',
                            image: v.image
                          }, qty)}
                          className="w-full bg-farm-green hover:bg-farm-green/90 text-white py-2.5 px-4 rounded-lg font-bold uppercase tracking-wider text-[9px] shadow-sm hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ShoppingCart size={11} />
                          Add to Cart
                        </button>
                      </>
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
