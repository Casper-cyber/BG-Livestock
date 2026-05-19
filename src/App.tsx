import { motion, AnimatePresence } from "motion/react";
import { 
  Milk, 
  Egg, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook, 
  Mail,
  ChevronRight,
  Menu,
  X,
  CreditCard,
  ShoppingCart,
  Calendar,
  Truck,
  Building,
  Plus,
  Minus,
  Quote,
  Star
} from "lucide-react";
import { useState, useEffect, MouseEvent } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { PRODUCTS, Product, VENMO_USER, PAYPAL_EMAIL } from "./constants";
import ProductDetailsPage from "./components/ProductDetailsPage";
import bgLogo from "./assets/images/bg-logo1.png";

const PurchaseModal = ({ product, isOpen, onClose }: { product: Product | null, isOpen: boolean, onClose: () => void }) => {
  const [quantity, setQuantity] = useState(1);
  const [logistics, setLogistics] = useState<'pickup' | 'delivery'>('pickup');
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  if (!product) return null;

  const total = product.numericPrice * quantity;

  const handleVenmo = () => {
    window.open(`https://venmo.com/${VENMO_USER.replace('@', '')}?txn=pay&amount=${total}&note=Order: ${quantity}x ${product.name}`, "_blank");
  };

  const handlePayPal = () => {
    window.open(`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${PAYPAL_EMAIL}&item_name=${quantity}x ${product.name}&amount=${total}&currency_code=USD`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-farm-brown/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-farm-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border-4 border-farm-brown"
          >
            <div className="paper-texture p-8 md:p-10">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-farm-brown/40 hover:text-farm-brown transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-farm-green mb-1 block">Order Inquiry</span>
                <h3 className="text-3xl font-bold font-serif">{product.baseName}</h3>
                {product.variation && (
                  <p className="font-script text-2xl text-farm-green -mt-1">{product.variation}</p>
                )}
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-y border-farm-brown/10">
                  <span className="font-bold uppercase text-xs tracking-widest opacity-60">Quantity ({product.unit}s)</span>
                  <div className="flex items-center gap-4 bg-white/50 rounded-full px-4 py-2 border border-farm-brown/10">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-farm-brown hover:text-farm-green transition-colors"><Minus size={18} /></button>
                    <span className="font-bold text-lg min-w-8 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-farm-brown hover:text-farm-green transition-colors"><Plus size={18} /></button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setLogistics('pickup')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${logistics === 'pickup' ? 'border-farm-green bg-farm-green/5' : 'border-farm-brown/10 hover:border-farm-brown/30'}`}
                  >
                    <Building size={20} className={logistics === 'pickup' ? 'text-farm-green' : 'opacity-40'} />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Farm Pickup</span>
                  </button>
                  <button 
                    onClick={() => setLogistics('delivery')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${logistics === 'delivery' ? 'border-farm-green bg-farm-green/5' : 'border-farm-brown/10 hover:border-farm-brown/30'}`}
                  >
                    <Truck size={20} className={logistics === 'delivery' ? 'text-farm-green' : 'opacity-40'} />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Delivery</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
                    <Calendar size={14} /> Preferred {logistics === 'pickup' ? 'Pickup' : 'Delivery'} Date
                  </label>
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/50 border border-farm-brown/10 rounded-lg p-3 outline-none focus:border-farm-green transition-colors font-serif text-sm" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Additional Notes</label>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white/50 border border-farm-brown/10 rounded-lg p-3 outline-none focus:border-farm-green transition-colors font-serif resize-none text-sm" 
                    rows={2}
                    placeholder="Any specific requests?"
                  />
                </div>

                <div className="pt-4 border-t border-farm-brown/10">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-sm font-serif italic text-farm-brown/60">Total Estimated Cost</span>
                    <span className="text-3xl font-bold font-serif text-farm-green">${total}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={handleVenmo}
                      className="bg-[#008CFF] text-white py-4 rounded-full font-bold uppercase tracking-[0.1em] text-[10px] shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M19.14 4.5h-11.4l-1.4 5.3h1.4l.7-2.7h8.4l-.7 2.7h1.4l1.4-5.3zm-3.4 8.7h-6.7l-.4 1.4h5l-.3 1.1h-5l-.4 1.4h5.3l1.1-4.2z" />
                      </svg>
                      Pay with Venmo
                    </button>
                    <button 
                      onClick={handlePayPal}
                      className="bg-[#FFC439] text-[#003087] py-4 rounded-full font-bold uppercase tracking-[0.1em] text-[10px] shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M7 21h4c1.1 0 2-0.9 2-2V7c0-1.1-0.9-2-2-2H7v16zm8-18H5v18h2v-2h4c2.2 0 4-1.8 4-4V7c0-2.2-1.8-4-4-4L15 3z" />
                      </svg>
                      Buy with PayPal
                    </button>
                  </div>
                  <p className="text-[10px] text-center mt-4 opacity-40 uppercase tracking-widest text-[#4A2E1F]">Payments handled securely via external apps</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navLinks = [
    { name: "Products", href: isHomePage ? "#products" : "/#products" },
    { name: "Herdshare", href: isHomePage ? "#herdshare" : "/#herdshare" },
    { name: "Delivery", href: isHomePage ? "#logistics" : "/#logistics" },
    { name: "Contact", href: isHomePage ? "#contact" : "/#contact", color: "text-farm-green" },
  ];

  return (
    <nav className="h-28 border-b border-farm-brown/20 flex items-center justify-between px-6 md:px-10 bg-farm-cream/30 sticky top-0 z-50 backdrop-blur-sm">
      <Link to="/" className="flex items-center gap-4 relative">
        <img 
          src={bgLogo} 
          alt="Beechgrove Livestock" 
          className="h-24 md:h-28 w-auto object-contain block z-50 drop-shadow-xl transition-transform hover:scale-105 duration-300" 
        />
        <div className="flex flex-col">
          <span className="text-xl md:text-4xl font-bold tracking-tight uppercase font-serif leading-tight">Beechgrove Livestock</span>
          <span className="text-sm uppercase tracking-[0.3em] text-farm-brown/70 font-sans hidden md:block mt-1">Farm • Fresh • Local</span>
        </div>
      </Link>
      
      <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`${link.color || 'text-farm-brown'} hover:text-farm-green transition-colors`}
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-farm-brown p-2">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-farm-white border-b border-farm-brown/20 flex flex-col p-6 gap-4 text-[10px] font-bold uppercase tracking-widest shadow-xl"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={link.color || 'text-farm-brown'}
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden flex items-center justify-center border-b border-farm-brown/20" id="home">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="https://www.pexels.com/download/video/34197936/" type="video/mp4" />
        </video>
        {/* Dark Overlay (35% opacity) */}
        <div className="absolute inset-0 bg-black/35 z-10" />
      </div>

      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 text-center px-6 max-w-4xl"
      >
        <div className="flex flex-col items-center gap-4 mb-2">
          <p className="text-farm-cream uppercase text-[12px] font-bold tracking-[0.4em] drop-shadow-lg">Jeff & Tacey Anderson</p>
          <div className="w-12 h-px bg-farm-cream/40" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold font-serif text-white mb-6 drop-shadow-2xl leading-tight">
          Beechgrove <br className="md:hidden" /> Livestock
        </h1>
        
        <p className="font-script text-3xl md:text-4xl text-farm-cream mb-8 drop-shadow-md">
          Farm • Fresh • Local
        </p>

        <p className="text-lg md:text-xl text-white/90 font-serif italic mb-10 max-w-2xl mx-auto drop-shadow-md">
          Premium Raw Jersey Milk, Farm Fresh Eggs, Butter & Dairy Products
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#products"
            className="w-full sm:w-auto px-10 py-5 bg-farm-cream text-farm-brown font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all transform hover:-translate-y-1 shadow-xl"
          >
            Order Now
          </a>
          <a 
            href="#herdshare"
            className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-white text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-farm-brown transition-all transform hover:-translate-y-1 backdrop-blur-sm"
          >
            Join Herdshare Program
          </a>
          <a 
            href="#contact"
            className="w-full sm:w-auto px-10 py-5 bg-transparent text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:underline underline-offset-8 transition-all"
          >
            Contact Us
          </a>
        </div>
      </motion.div>

      {/* Pet Milk Notice - Subtle Overlay */}
      <div className="absolute bottom-10 left-10 hidden lg:block z-20">
        <div className="p-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-sm max-w-[240px]">
          <p className="text-[9px] uppercase font-bold tracking-widest mb-1 text-farm-cream">Pet Milk Notice</p>
          <p className="text-[10px] text-white/80 leading-snug italic font-serif">
            Individually labeled as pet milk. Customers must bring clean glass jugs for each purchase.
          </p>
        </div>
      </div>
    </section>
  );
};

// Removed unused About component to reduce bundle size and confusion.

interface ProductCardProps {
  product: Product;
  onOrder: (p: Product) => void;
}

const ProductCard = ({ product, onOrder }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/marketplace/${product.id}`);
  };

  const handleOrder = (e: MouseEvent) => {
    e.stopPropagation();
    onOrder(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative flex flex-col group h-full cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Wood Frame Overlay */}
      <div className="absolute inset-0 border-[8px] border-farm-brown/10 rounded-2xl -m-2 pointer-events-none group-hover:border-farm-brown/20 transition-colors wood-texture bg-blend-multiply" />
      
      <div className="bg-white paper-texture rounded-xl border border-farm-brown/10 shadow-sm hover:shadow-md transition-all flex-1 flex flex-col overflow-hidden relative">
        <div className="h-52 bg-farm-brown/5 rounded-t-lg overflow-hidden relative mb-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3">
             <span className="bg-white/90 backdrop-blur-sm text-farm-brown text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-farm-brown/10">
              {product.category}
            </span>
          </div>
          {product.variation && (
            <div className="absolute top-4 right-4 bg-[#2B1B12] px-4 py-1.5 rounded-full shadow-xl border border-white/10 z-20 overflow-hidden">
              <div className="absolute inset-0 wood-texture opacity-20 pointer-events-none" />
              <span className="relative font-script text-white text-xl leading-none block whitespace-nowrap px-1">
                {product.variation}
              </span>
            </div>
          )}
          {/* Subtle vignette on image */}
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.1)] pointer-events-none" />
        </div>

        <div className="flex-1 px-5 pb-6 flex flex-col bg-white/40">
          <div className="mb-4">
            <h3 className="font-bold text-xl font-serif text-farm-brown tracking-tight mb-2">{product.baseName}</h3>
          </div>

          <div className="flex-1 mb-6">
            <p className="text-sm leading-relaxed text-farm-brown/70 font-serif italic border-l-2 border-farm-green/30 pl-4">
              {product.description}
            </p>
          </div>

          <div className="mt-auto space-y-4 pt-4 border-t border-dotted border-farm-brown/20">
            <div className="flex justify-between items-end">
              <div className="space-y-0.5">
                <p className="text-[9px] uppercase font-bold tracking-[0.2em] opacity-40">Price per {product.unit}</p>
                <p className="font-bold text-2xl text-farm-green">
                  {product.price}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleOrder}
                  className="bg-[#008CFF] text-white px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-[#0074D4] transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                  title="Pay with Venmo"
                >
                  <span className="text-[10px] transform -skew-x-12">V</span> Venmo
                </button>
                <button 
                  onClick={handleOrder}
                  className="bg-[#FFC439] text-[#003087] px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-[#e6b033] transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                  title="Pay with PayPal"
                >
                  <span className="italic font-black">P</span> PayPal
                </button>
              </div>
            </div>
            <button 
              onClick={handleOrder}
              className="w-full py-2.5 bg-farm-brown/5 text-[9px] font-bold uppercase tracking-[0.2em] text-farm-brown hover:bg-farm-brown hover:text-white transition-all rounded-lg flex items-center justify-center gap-2 border border-farm-brown/10"
            >
              Order Details & Options <ChevronRight size={12} />
            </button>
          </div>
        </div>
        
        {/* Vintage Tag Detail: "Punch hole" */}
        <div className="absolute top-1/2 -right-1 w-3 h-6 bg-farm-white border border-farm-brown/10 rounded-l-full shadow-[inset_2px_0_4px_rgba(0,0,0,0.05)]" />
      </div>
    </motion.div>
  );
};

const ProductsSection = ({ onOrder }: { onOrder: (p: Product) => void }) => {
  return (
    <section className="py-24 border-b border-farm-brown/20 bg-farm-white" id="products">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <p className="text-farm-green uppercase text-[10px] font-bold tracking-[0.3em] mb-3 underline decoration-farm-green/30 underline-offset-8">Marketplace</p>
            <h2 className="text-5xl font-bold font-serif mb-4">Dairy & Poultry</h2>
            <p className="text-farm-brown/60 font-serif italic italic">Premium raw milk, artisanal butter and farm fresh eggs from our happy herd.</p>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-farm-green px-6 py-3 border border-farm-green/20 rounded-full bg-farm-green/5 flex items-center gap-3">
            <Clock size={14} /> Daily Farm Replenishments
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {PRODUCTS.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} onOrder={onOrder} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Herdshare = () => {
  return (
    <section className="flex flex-col lg:flex-row border-b border-farm-brown/20" id="herdshare">
      <div className="w-full lg:w-1/2 px-8 py-10 md:px-16 md:py-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-farm-brown/20">
        <p className="text-farm-green uppercase text-[10px] font-bold tracking-[0.3em] mb-2">Sustainability First</p>
        <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4 leading-tight">Join Our Herdshare Program</h2>
        <ul className="space-y-2 mb-6 overflow-hidden">
          {[
            "Set amount of milk each week",
            "Bring clean glass jars to swap at pickup",
            "Simple and sustainable process",
            "Guaranteed weekly fresh supply",
            "Legal access to unpasteurized milk as a partial owner of the herd"
          ].map((item, i) => (
            <motion.li 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 text-sm md:text-base font-serif"
            >
              <span className="text-farm-green font-bold">✔</span>
              {item}
            </motion.li>
          ))}
        </ul>
        <div className="pt-2">
          <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-farm-green underline underline-offset-8 decoration-farm-green/30 hover:decoration-farm-green transition-all">
            Learn More about Membership
          </button>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-farm-brown px-8 py-10 md:px-16 md:py-12 text-farm-cream flex flex-col justify-center gap-6" id="logistics">
        <h2 className="text-4xl font-bold font-serif mb-2">Pickup & Delivery</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-farm-beige">Farm Address</p>
            <p className="text-base font-serif leading-relaxed">
              1605 McBrides Branch Road<br />
              Beechgrove, TN
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-farm-beige">Farm Pickup Hours</p>
            <p className="text-base font-serif leading-relaxed">
              Monday – Friday<br />
              7:00 AM – 3:30 PM
            </p>
          </div>
          <div className="sm:col-span-2 space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-farm-beige">Weekly Deliveries To:</p>
            <p className="text-base font-serif text-farm-cream/70 leading-relaxed max-w-md">
              Murfreesboro, Shelbyville, Manchester, and Wartrace.
            </p>
          </div>
        </div>
        <div className="pt-2 border-t border-white/10">
          <p className="text-sm font-hand text-farm-beige text-xl">"Trustworthy, Fresh, Local"</p>
        </div>
      </div>
    </section>
  );
};

const PetMilk = () => {
  return (
    <section className="py-20 bg-farm-brown text-farm-cream overflow-hidden relative">
      <div className="absolute inset-0 wood-texture opacity-10 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-farm-cream/10 flex items-center justify-center border border-farm-cream/20">
            <Milk size={32} className="text-farm-beige" />
          </div>
          <h2 className="text-4xl font-bold font-serif">Legal Notice & Disclosure</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xl font-serif italic text-farm-beige">
              "Milk is not pasteurized. In accordance with local regulations, unless you are an active member of our herdshare program, all raw milk products are sold strictly as pet milk."
            </p>
            <div className="pt-6 border-t border-white/10">
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-60">Transparency & Safety</p>
              <p className="text-sm mt-2 text-farm-cream/80">
                We maintain the highest standards of cleanliness and herd health, but we must adhere to specific labeling requirements for non-members.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Logistics = () => {
  return (
    <section className="py-24 bg-farm-white" id="logistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-10 rounded-3xl bg-farm-cream/30 border border-farm-brown/5"
          >
            <MapPin className="text-farm-green mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">Farm Address</h3>
            <p className="text-lg text-farm-brown/80 font-serif">
              1605 McBrides Branch Road<br />
              Beechgrove, TN
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-10 rounded-3xl bg-farm-cream/30 border border-farm-brown/5"
          >
            <Clock className="text-farm-green mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">Farm Pickup Hours</h3>
            <p className="text-lg text-farm-brown/80 font-serif leading-relaxed">
              <span className="font-bold flex justify-between">Monday – Friday: <span>7:00 AM – 3:30 PM</span></span>
              <span className="text-sm opacity-60 italic mt-2 block">Weekend pickup by appointment.</span>
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-10 rounded-3xl bg-farm-cream/30 border border-farm-brown/5"
          >
            <Milk className="text-farm-green mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">Weekly Delivery</h3>
            <div className="grid grid-cols-2 gap-4">
              {["Wartrace", "Murfreesboro", "Shelbyville", "Manchester"].map(city => (
                <div key={city} className="flex items-center gap-2 text-farm-brown/80 font-serif">
                  <div className="w-1.5 h-1.5 rounded-full bg-farm-green" />
                  {city}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section className="py-24 bg-farm-cream/20" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-farm-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-farm-brown p-12 text-farm-white">
            <h2 className="text-4xl mb-8 text-farm-cream">Get In Touch</h2>
            <p className="text-farm-cream/70 mb-10 font-serif">
              We'd love to hear from you. Whether you're interested in our products or the herdshare program, reach out today.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-farm-cream/10 flex items-center justify-center">
                  <Phone size={20} className="text-farm-cream" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-farm-cream/60">Phone</p>
                  <p className="text-xl">931-212-0287</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-farm-cream/10 flex items-center justify-center">
                  <Mail size={20} className="text-farm-cream" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-farm-cream/60">Email</p>
                  <p className="text-xl">info@beechgrovelivestock.com</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-farm-cream/10 flex gap-4">
              <a href="#" className="hover:text-farm-cream transition-colors"><Instagram size={24} /></a>
              <a href="#" className="hover:text-farm-cream transition-colors"><Facebook size={24} /></a>
            </div>
          </div>

          <div className="md:w-2/3 p-12">
            <form className="space-y-6" id="contact-form">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold mb-2 opacity-60">Full Name</label>
                  <input type="text" className="w-full bg-farm-cream/10 border-b border-farm-brown/10 p-3 outline-none focus:border-farm-green transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold mb-2 opacity-60">Email Address</label>
                  <input type="email" className="w-full bg-farm-cream/10 border-b border-farm-brown/10 p-3 outline-none focus:border-farm-green transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-2 opacity-60">Phone Number</label>
                <input type="tel" className="w-full bg-farm-cream/10 border-b border-farm-brown/10 p-3 outline-none focus:border-farm-green transition-colors" placeholder="(555) 000-0000" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-2 opacity-60">Product Interest</label>
                <select className="w-full bg-farm-cream/10 border-b border-farm-brown/10 p-3 outline-none focus:border-farm-green transition-colors appearance-none">
                  <option>Dairy Products</option>
                  <option>Farm Fresh Eggs</option>
                  <option>Herdshare Program</option>
                  <option>Pet Milk</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-2 opacity-60">Your Message</label>
                <textarea rows={4} className="w-full bg-farm-cream/10 border-b border-farm-brown/10 p-3 outline-none focus:border-farm-green transition-colors resize-none" placeholder="Tell us how we can help..." />
              </div>
              <button 
                type="submit"
                className="bg-farm-brown text-farm-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-farm-brown/90 transition-all transform hover:scale-[1.02] active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-farm-cream border-t border-farm-brown/20 h-16 flex items-center justify-between px-6 md:px-10 text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 overflow-hidden">
      <div>© {new Date().getFullYear()} Beechgrove Livestock</div>
      <div className="hidden sm:flex gap-10">
        <span>931-212-0287</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-farm-green transition-all">Facebook</a>
          <a href="#" className="hover:text-farm-green transition-all">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: "Aya Nakamura",
      text: "The milk is incredibly fresh, and their beef box tasted like real farm food—our kids noticed the difference at the first dinner.",
      role: "Local Parent"
    },
    {
      name: "Mateo García",
      text: "We love knowing exactly where our food comes from, and Beechgrove’s vegetables stay crisp and flavorful for days longer than the grocery store.",
      role: "Farm Neighbor"
    }
  ];

  return (
    <section className="py-24 bg-farm-cream/30 border-y border-farm-brown/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-farm-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-farm-brown/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-farm-brown/60 mb-2">Kind Words</p>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-farm-brown">From Our Community</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-farm-white p-10 md:p-14 rounded-2xl shadow-sm border border-farm-brown/5 relative group"
            >
              <div className="absolute top-6 left-6 text-farm-green opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={64} />
              </div>
              
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-farm-beige text-farm-beige" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl font-serif italic text-farm-brown/80 mb-8 leading-relaxed">
                  "{review.text}"
                </p>
                
                <div className="flex items-center gap-4 border-t border-farm-brown/10 pt-6">
                  <div className="w-10 h-10 rounded-full bg-farm-cream flex items-center justify-center font-bold text-farm-brown border border-farm-brown/10 uppercase">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-[10px]">{review.name}</h4>
                    <p className="text-[9px] text-farm-brown/50 uppercase tracking-[0.2em]">{review.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = ({ onOrder }: { onOrder: (p: Product) => void }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Hero />
      
      <div className="bg-farm-cream/20 py-4 px-6 text-center border-b border-farm-brown/10">
        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-farm-brown/70">
          <span className="text-farm-green mr-2">NOTICE:</span> All raw milk products are sold as pet milk unless part of our Herdshare program.
        </p>
      </div>

      <ProductsSection onOrder={onOrder} />
      <Testimonials />
      <Herdshare />
      <PetMilk />
      {/* Contact section integrated into the Natural Tones grid */}
      <section className="flex flex-col lg:flex-row border-b border-farm-brown/20" id="contact">
        <div className="w-full lg:w-[420px] border-r border-farm-brown/20 p-8 md:p-12 bg-farm-cream/10">
          <p className="text-farm-green uppercase text-[10px] font-bold tracking-[0.3em] mb-4">Direct Inquiry</p>
          <h2 className="text-4xl font-bold font-serif mb-8">Reach Out Today</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 opacity-50">Name</label>
              <input type="text" className="w-full bg-transparent border-b border-farm-brown/20 py-2 outline-none focus:border-farm-green font-serif" placeholder="Your name..." />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 opacity-50">Email</label>
              <input type="email" className="w-full bg-transparent border-b border-farm-brown/20 py-2 outline-none focus:border-farm-green font-serif" placeholder="Your email..." />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 opacity-50">Product</label>
              <select className="w-full bg-transparent border-b border-farm-brown/20 py-2 outline-none focus:border-farm-green font-serif appearance-none">
                <option>Dairy Products</option>
                <option>Farm Fresh Eggs</option>
                <option>Herdshare Program</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-farm-brown text-farm-cream py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-farm-green transition-all mt-4">
              Send Inquiry
            </button>
          </form>
        </div>
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-end items-end italic bg-farm-white wood-texture opacity-80 relative min-h-[400px]">
          {/* Logo integration in the contact panel */}
          <div className="absolute inset-0 flex items-start justify-start pt-2 pl-6 md:pl-8 pointer-events-none">
            <img 
              src={bgLogo} 
              alt="Beechgrove Livestock Logo" 
              className="w-32 md:w-44 h-auto object-contain drop-shadow-md" 
            />
          </div>

          <div className="max-w-md text-right relative z-10">
            <p className="text-lg leading-relaxed font-serif text-farm-brown/70 mb-8">
              "We don't just sell milk; we share the fruits of our labor, the health of our heritage, and the taste of Tennessee's finest pastures." 
            </p>
            <div className="flex items-center justify-end gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Direct Phone</p>
                <p className="text-xl font-bold tracking-tight">931-212-0287</p>
              </div>
              <div className="w-px h-12 bg-farm-green" />
            </div>
          </div>
          <h3 className="absolute bottom-6 right-8 text-[8px] font-bold uppercase tracking-[0.4em] opacity-30 pointer-events-none select-none">Traditional Values. Modern Care.</h3>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex flex-col md:border-[12px] border-farm-brown selection:bg-farm-cream selection:text-farm-brown overflow-x-hidden">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOrder={(p) => setSelectedProduct(p)} />} />
            <Route path="/marketplace/:productId" element={<ProductDetailsPage />} />
          </Routes>
        </main>

        <PurchaseModal 
          product={selectedProduct} 
          isOpen={selectedProduct !== null} 
          onClose={() => setSelectedProduct(null)} 
        />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
