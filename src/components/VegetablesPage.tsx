import { motion } from "motion/react";
import { Sprout, Star, Clock, AlertCircle, Leaf } from "lucide-react";
import { useState } from "react";

export interface GardenItem {
  id: string;
  name: string;
  status: "available" | "coming_soon";
  price?: string;
  unit?: string;
  description: string;
  season: string;
  imageNames?: string[]; // Easily supports placeholders Spinach 1, Spinach 2, Lettuce
}

// Easily editable garden inventory list containing the requested live Spinach and Lettuce structures
const GARDEN_INVENTORY: GardenItem[] = [
  {
    id: "spinach-bag",
    name: "Fresh Spinach",
    status: "available",
    price: "$2.50",
    unit: "gallon bag",
    description: "Tender, high-nutrient garden spinach leaves, pesticide-free and handpicked daily at peak tenderness.",
    season: "Available Now",
    imageNames: ["Spinach 1", "Spinach 2"]
  },
  {
    id: "lettuce-bag",
    name: "Crisp Lettuce (Bag)",
    status: "available",
    price: "$2.00",
    unit: "gallon bag",
    description: "Freshly harvested romaine and butterhead lettuce leaves, washed, dried, and packed in gallon bags.",
    season: "Available Now",
    imageNames: ["Lettuce"]
  },
  {
    id: "lettuce-head",
    name: "Crisp Lettuce (Head)",
    status: "available",
    price: "$5.00",
    unit: "head",
    description: "Magnificent whole heads of crunchy, sweet garden lettuce picked fresh each morning.",
    season: "Available Now",
    imageNames: ["Lettuce"]
  },
  {
    id: "heirloom-tomatoes",
    name: "Heirloom Tomatoes",
    status: "coming_soon",
    description: "Juicy, sun-ripened vine varieties including Brandywine and Cherokee Purple.",
    season: "Coming Mid-Summer"
  },
  {
    id: "cucumbers",
    name: "Crispy Slicing Cucumbers",
    status: "coming_soon",
    description: "Sweet and crisp field-grown cucumbers, ideal for fresh summer salads.",
    season: "Coming Early Summer"
  },
  {
    id: "squash",
    name: "Summer Squash & Zucchini",
    status: "coming_soon",
    description: "Tender, thin-skinned yellow squash and zucchini harvested at perfect size.",
    season: "Coming Early Summer"
  },
  {
    id: "peppers",
    name: "Sweet Bell Peppers",
    status: "coming_soon",
    description: "Thick-walled, crunchy green, red, and yellow peppers grown in fertile soils.",
    season: "Coming Mid-Summer"
  },
  {
    id: "radishes",
    name: "Early Spring Radishes",
    status: "coming_soon",
    description: "Peppery, crisp red radishes ready for the first spring harvests.",
    season: "Coming Late Spring"
  }
];

const CropImageContainer = ({ item }: { item: GardenItem }) => {
  const [imageError, setImageError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!item.imageNames || item.imageNames.length === 0) {
    return null;
  }

  const currentImageName = item.imageNames[activeImageIndex];
  const urlSafeName = currentImageName.toLowerCase().replace(/\s+/g, '_');
  const src = `/src/assets/images/${urlSafeName}.png`;

  return (
    <div className="relative aspect-[16/10] bg-farm-cream/30 rounded-lg overflow-hidden border border-farm-brown/10 mb-5 group">
      {!imageError ? (
        <img
          src={src}
          alt={item.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-farm-cream/60 to-farm-beige/20 text-farm-brown/60">
          <div className="p-3 bg-white/85 rounded-full shadow-sm mb-2 border border-farm-brown/5 text-farm-green">
            <Leaf size={20} className="animate-pulse" />
          </div>
          <p className="text-xs font-serif font-semibold text-farm-brown">{item.name}</p>
          <span className="text-[8px] uppercase tracking-widest text-farm-brown/40 mt-1 bg-farm-cream px-2 py-0.5 rounded-full border border-farm-brown/5">
            Photograph Placeholder
          </span>
          <p className="text-[8px] text-farm-green/70 font-sans mt-2 max-w-[85%] leading-normal">
            To display: Upload <code className="bg-white/95 px-1.5 py-0.5 rounded text-farm-brown font-mono font-bold">{urlSafeName}.png</code> into <code className="bg-white/95 px-1.5 py-0.5 rounded text-farm-brown font-mono font-bold">/src/assets/images/</code>
          </p>
        </div>
      )}

      {/* Slide dots if there are multiple images */}
      {item.imageNames.length > 1 && (
        <div className="absolute bottom-2 right-2 flex gap-1 z-10 bg-farm-brown/60 px-2 py-1 rounded-full backdrop-blur-[2px]">
          {item.imageNames.map((_, idx) => (
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
              title={`View ${item.imageNames?.[idx]}`}
            />
          ))}
        </div>
      )}
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
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header Block */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-farm-green uppercase text-[10px] font-bold tracking-[0.4em] mb-3">Fresh Harvest</p>
          <h1 className="text-5xl md:text-6xl font-serif text-farm-brown tracking-tight mb-4">
            Our Kitchen Garden
          </h1>
          <div className="w-16 h-1 bg-farm-green mx-auto mb-8" />
          
          <div className="bg-farm-cream/40 border border-farm-brown/10 p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-24 h-24 bg-farm-green/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <p className="font-serif text-lg md:text-xl italic text-farm-brown/90 leading-relaxed">
              "Our garden is waking up! Right now we have crisp lettuce and fresh spinach available, with a wide variety of fresh seasonal vegetables arriving in the coming weeks."
            </p>
          </div>
        </div>

        {/* Dairy Glass Jar Policy Notice (Highly visible Alert Box) */}
        <div className="mb-16 max-w-4xl mx-auto bg-[#FFF] border-2 border-dashed border-farm-green/30 p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-farm-green/10 rounded-full flex items-center justify-center rotate-12">
            <Sprout size={32} className="text-farm-green opacity-20" />
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-3 bg-farm-green/10 rounded-full text-farm-green shrink-0 mt-1">
              <AlertCircle size={22} />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-[0.25em] text-farm-green mb-1.5 flex items-center gap-2">
                Dairy Jar Exchange Policy
              </p>
              <p className="text-base font-serif text-farm-brown underline decoration-farm-beige/50 underline-offset-4 decoration-wavy font-semibold leading-relaxed">
                "To help us keep things sustainable, please bring a clean glass jar to swap when picking up your dairy, or you can purchase a reusable jar from us for $5."
              </p>
              <p className="text-xs text-farm-brown/60 mt-2 font-sans">
                This simple cycle helps us reduce single-use container waste and supports clean, green local agriculture.
              </p>
            </div>
          </div>
        </div>

        {/* Inventory Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-farm-brown/10">
          <h2 className="text-3xl font-serif text-farm-brown">Garden Status & Inventory</h2>
          <div className="text-[9px] font-bold uppercase tracking-widest text-farm-brown/60 flex items-center gap-1.5">
            <Clock size={12} className="text-farm-green" /> Updated Weekly
          </div>
        </div>

        {/* Grid of Crops */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GARDEN_INVENTORY.map((item, index) => {
            const isAvail = item.status === "available";
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`relative p-8 rounded-xl border flex flex-col justify-between h-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-farm-brown/10 hover:border-farm-brown/25 transition-all ${isAvail ? 'ring-2 ring-farm-green/20' : ''}`}
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

                <div className="pt-4 border-t border-dotted border-farm-brown/10 mt-auto flex justify-between items-center">
                  <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-farm-brown/50">Grow Method</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-farm-green flex items-center gap-1">
                    <Star size={10} className="fill-farm-beige text-farm-beige" /> Certified Natural
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </motion.div>
  );
}
