import { motion } from "motion/react";
import { Sprout, Star, Clock, AlertCircle } from "lucide-react";

export interface GardenItem {
  name: string;
  status: "available" | "coming_soon";
  description: string;
  season: string;
}

// Easily editable garden inventory list
const GARDEN_INVENTORY: GardenItem[] = [
  {
    name: "Crisp Garden Lettuce",
    status: "available",
    description: "Freshly harvested, pesticide-free mixed field greens, handpicked daily at peak tenderness.",
    season: "Available Now"
  },
  {
    name: "Heirloom Tomatoes",
    status: "coming_soon",
    description: "Juicy, sun-ripened vine varieties including Brandywine and Cherokee Purple.",
    season: "Coming Mid-Summer"
  },
  {
    name: "Crispy Slicing Cucumbers",
    status: "coming_soon",
    description: "Sweet and crisp field-grown cucumbers, ideal for fresh summer salads.",
    season: "Coming Early Summer"
  },
  {
    name: "Summer Squash & Zucchini",
    status: "coming_soon",
    description: "Tender, thin-skinned yellow squash and zucchini harvested at perfect size.",
    season: "Coming Early Summer"
  },
  {
    name: "Sweet Bell Peppers",
    status: "coming_soon",
    description: "Thick-walled, crunchy green, red, and yellow peppers grown in fertile soils.",
    season: "Coming Mid-Summer"
  },
  {
    name: "Early Spring Radishes",
    status: "coming_soon",
    description: "Peppery, crisp red radishes ready for the first spring harvests.",
    season: "Coming Late Spring"
  }
];

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
              "Our garden is waking up! Right now we have crisp lettuce available, with a wide variety of fresh seasonal vegetables arriving in the coming weeks."
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
                key={item.name}
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

                  <h3 className="text-2xl font-serif text-farm-brown font-semibold tracking-tight mb-2">
                    {item.name}
                  </h3>
                  
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
