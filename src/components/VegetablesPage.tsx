import { motion } from "motion/react";
import { Sprout, Star, Clock, AlertCircle, Leaf, Mail, Building, Truck, Calendar, Plus, Minus } from "lucide-react";
import { useState } from "react";

// Statically import images to guarantee Vite production bundler hashing
import spinach1 from "../assets/images/spinach_1.png";
import spinach2 from "../assets/images/spinach_2.png";
import lettuceImg from "../assets/images/lettuce.png";

const STATIC_IMAGES: Record<string, string> = {
  spinach_1: spinach1,
  spinach_2: spinach2,
  lettuce: lettuceImg,
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
  const src = STATIC_IMAGES[urlSafeName] || `/src/assets/images/${urlSafeName}.png`;

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

const VegetableCard = ({ item, index }: { key?: string; item: GardenItem; index: number }) => {
  const [quantity, setQuantity] = useState(1);
  const isAvail = item.status === "available";

  const priceVal = item.price ? parseFloat(item.price.replace('$', '')) : 0;
  const total = (priceVal * quantity).toFixed(2);

  const handleVenmo = () => {
    // Route to Venmo. As instructed: "Venmo Option: Route payments to our profile URL: https://venmo.com"
    window.open("https://venmo.com", "_blank");
  };

  const handlePayPal = () => {
    // Route to PayPal with linked email, item name, quantity, amount.
    // PayPal: Info@beechgrovelivestock.com
    const itemLabel = `${quantity}x ${item.name}`;
    window.open(`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=Info@beechgrovelivestock.com&item_name=${encodeURIComponent(itemLabel)}&amount=${total}&currency_code=USD`, "_blank");
  };

  return (
    <motion.div
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

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleVenmo}
                className="bg-[#008CFF] text-white py-2.5 px-3 rounded-lg font-bold uppercase tracking-[0.05em] text-[10px] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1"
                title="Pay with Venmo"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current shrink-0">
                  <path d="M19.14 4.5h-11.4l-1.4 5.3h1.4l.7-2.7h8.4l-.7 2.7h1.4l1.4-5.3zm-3.4 8.7h-6.7l-.4 1.4h5l-.3 1.1h-5l-.4 1.4h5.3l1.1-4.2z" />
                </svg>
                Venmo
              </button>
              <button
                onClick={handlePayPal}
                className="bg-[#FFC439] text-[#003087] py-2.5 px-3 rounded-lg font-bold uppercase tracking-[0.05em] text-[10px] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1"
                title="Pay with PayPal"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current shrink-0">
                  <path d="M7 21h4c1.1 0 2-0.9 2-2V7c0-1.1-0.9-2-2-2H7v16zm8-18H5v18h2v-2h4c2.2 0 4-1.8 4-4V7c0-2.2-1.8-4-4-4L15 3z" />
                </svg>
                PayPal
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
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-farm-green flex items-center gap-1">
            <Star size={10} className="fill-farm-beige text-farm-beige" /> Certified Natural
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const VegetablesOrderInquiry = () => {
  const availableItems = GARDEN_INVENTORY.filter(item => item.status === "available");
  const [selectedItemId, setSelectedItemId] = useState(availableItems[0]?.id || "");
  const [quantity, setQuantity] = useState(1);
  const [logistics, setLogistics] = useState<'pickup' | 'delivery'>('pickup');
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const currentItem = availableItems.find(item => item.id === selectedItemId);
  const priceVal = currentItem?.price ? parseFloat(currentItem.price.replace('$', '')) : 0;
  const total = (priceVal * quantity).toFixed(2);

  const handleVenmo = () => {
    window.open("https://account.venmo.com/u/Theresia-Anderson-2", "_blank");
  };

  const handleEmailInquiry = () => {
    const subject = encodeURIComponent(`Garden Order Inquiry: ${currentItem?.name}`);
    const body = encodeURIComponent(
      `Hello Beechgrove Livestock,\n\nI would like to place an order inquiry for the following kitchen garden items:\n\n` +
      `- Item: ${currentItem?.name} (${currentItem?.price} per ${currentItem?.unit})\n` +
      `- Quantity: ${quantity}\n` +
      `- Logistics Preference: ${logistics === 'pickup' ? 'Farm Pickup' : 'Delivery'}\n` +
      `- Preferred Date: ${date || 'Not specified'}\n` +
      `- Special Instructions: ${notes || 'None'}\n\n` +
      `Estimated Subtotal: $${total}\n\n` +
      `Please let me know how to proceed with payment and fulfillment.\n\nThank you!`
    );
    window.open(`mailto:Info@beechgrovelivestock.com?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div id="vegetable-order-inquiry" className="mt-24 max-w-4xl mx-auto relative">
      {/* Wood Frame Overlay */}
      <div className="absolute inset-0 border-[10px] border-farm-brown/10 rounded-3xl -m-3 pointer-events-none wood-texture opacity-50" />
      
      <div className="bg-white paper-texture rounded-2xl border border-farm-brown/10 shadow-xl overflow-hidden relative p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Left panel: Info */}
          <div className="space-y-6">
            <div>
              <span className="text-farm-green text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">Direct Access</span>
              <h3 className="text-4xl font-bold font-serif text-farm-brown leading-tight">Order Inquiry</h3>
              <p className="font-script text-2xl text-farm-green mt-1">Kitchen Garden Harvest</p>
            </div>

            <p className="text-sm font-serif italic text-farm-brown/80 leading-relaxed">
              "Our vegetables are grown right here on our family farm utilizing certified natural organic practices. To secure your harvest bag or whole heads of lettuce, place an inquiry directly below. We will coordinate details with you immediately."
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
          <div className="p-6 md:p-8 bg-farm-cream/15 rounded-2xl border border-farm-brown/10 space-y-6 relative">
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
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleVenmo}
                  className="bg-[#008CFF] text-white py-3.5 rounded-xl font-bold uppercase tracking-[0.1em] text-[10px] shadow-md hover:shadow-lg hover:bg-[#007cd4] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  title="Pay with Venmo"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M19.14 4.5h-11.4l-1.4 5.3h1.4l.7-2.7h8.4l-.7 2.7h1.4l1.4-5.3zm-3.4 8.7h-6.7l-.4 1.4h5l-.3 1.1h-5l-.4 1.4h5.3l1.1-4.2z" />
                  </svg>
                  Pay Venmo
                </button>
                <button
                  type="button"
                  onClick={handleEmailInquiry}
                  className="bg-[#FFC439] text-[#003087] py-3.5 rounded-xl font-bold uppercase tracking-[0.1em] text-[10px] shadow-md hover:shadow-lg hover:bg-[#ebae25] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  title="Send Inquiry/PayPal"
                >
                  <Mail size={14} className="stroke-[3px]" />
                  Email Inquiry
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
