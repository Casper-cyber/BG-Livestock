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
  Star,
  Tractor
} from "lucide-react";
import { useState, useEffect, MouseEvent } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { PRODUCTS, Product, VENMO_USER, VENMO_PROFILE_URL, PAYPAL_EMAIL } from "./constants";
import ProductDetailsPage from "./components/ProductDetailsPage";
import AboutUsPage from "./components/AboutUsPage";
import VegetablesPage from "./components/VegetablesPage";
import bgLogo from "./assets/images/bg-logo1.png";

const PurchaseModal = ({ product, isOpen, onClose }: { product: Product | null, isOpen: boolean, onClose: () => void }) => {
  const [quantity, setQuantity] = useState(1);
  const [logistics, setLogistics] = useState<'pickup' | 'delivery'>('pickup');
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  if (!product) return null;

  const total = product.numericPrice * quantity;

  const handleVenmo = () => {
    window.open(VENMO_PROFILE_URL, "_blank");
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

const LottiePlayer = "dotlottie-wc" as any;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  interface NavLink {
    name: string;
    href: string;
    isRoute: boolean;
    color?: string;
  }

  const navLinks: NavLink[] = [
    { name: "Products", href: isHomePage ? "#products" : "/#products", isRoute: false },
    { name: "Herdshare", href: isHomePage ? "#herdshare" : "/#herdshare", isRoute: false },
    { name: "Delivery", href: isHomePage ? "#logistics" : "/#logistics", isRoute: false },
    { name: "About Us", href: "/about", isRoute: true },
    { name: "Contact", href: isHomePage ? "#contact" : "/#contact", isRoute: false },
  ];

  return (
    <>
      {/* Standalone frozen top Lottie animation strip - SOLID opaque white background in separate minimal bar */}
      <div 
        className="fixed top-0 left-0 w-full z-[9999] h-[85px] bg-white border-b border-farm-brown/10 shadow-sm flex items-center justify-center overflow-visible select-none pointer-events-none"
        style={{ backgroundColor: "#ffffff", paddingBottom: "8px" }}
      >
        <div className="w-full max-w-[1400px] h-full flex items-center justify-center px-4">
          <LottiePlayer
            src="https://lottie.host/32fecbb2-b9dc-4848-9ef3-4b380d454395/IjOIgMjTTg.lottie"
            style={{ 
              height: "65px", 
              width: "650px", 
              maxWidth: "90%",
              objectFit: "contain", 
              display: "block" 
            }}
            autoplay
            loop
          ></LottiePlayer>
        </div>
      </div>

      {/* Integrated Branding & Navigation Row - Floating transparently under the white animation strip */}
      <div 
        className={`w-full z-45 transition-all duration-300 ${
          isHomePage 
            ? "absolute left-0 w-full top-[85px] border-none shadow-none" 
            : "relative bg-farm-white border-b border-farm-brown/10 mt-[85px]"
        }`}
        style={isHomePage ? { background: "transparent" } : undefined}
      >
        <div className={`max-w-7xl mx-auto px-4 md:px-10 flex flex-row items-center justify-between py-3 md:py-3 relative h-auto ${
          isHomePage ? "bg-transparent" : "bg-farm-white"
        }`}>
          
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Company Logo and Title block */}
            <Link to="/" className="flex items-center gap-3 md:gap-4 relative z-50">
              <img 
                src={bgLogo} 
                alt="Beechgrove Livestock" 
                className="h-20 max-[480px]:h-16 md:h-28 w-auto object-contain block drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 duration-300" 
              />
              <div className="flex flex-col">
                <span 
                  className={`text-base max-[480px]:text-[13px] md:text-3xl font-bold tracking-tight uppercase font-serif leading-none md:leading-tight ${
                    isHomePage ? "text-white" : "text-farm-brown"
                  }`}
                  style={isHomePage ? { textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8), 0px 2px 5px rgba(0, 0, 0, 0.4)" } : undefined}
                >
                  Beechgrove Livestock
                </span>
                <span 
                  className={`text-[9px] uppercase tracking-[0.3em] font-sans hidden md:block mt-2 ${
                    isHomePage ? "text-farm-cream font-semibold" : "text-farm-brown/70"
                  }`}
                  style={isHomePage ? { textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8), 0px 2px 4px rgba(0, 0, 0, 0.3)" } : undefined}
                >
                  Farm • Fresh • Local
                </span>
                <span 
                  className={`text-[8px] uppercase tracking-[0.15em] font-sans md:hidden mt-0.5 font-bold ${
                    isHomePage ? "text-farm-cream" : "text-farm-brown/60"
                  }`}
                  style={isHomePage ? { textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8), 0px 2px 4px rgba(0, 0, 0, 0.3)" } : undefined}
                >
                  Farm Fresh Local
                </span>
              </div>
            </Link>
 
            {/* Mobile menu navigation toggles - inline in the flex flow to prevent absolute overlaps */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`p-2 rounded-full transition-colors ${
                  isHomePage ? 'text-white hover:bg-white/10' : 'text-farm-brown hover:bg-farm-brown/5'
                }`}
                style={isHomePage ? { filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.8))" } : undefined}
                aria-label="Toggle Navigation"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
 
          {/* Desktop Navigation Link assembly */}
          <div className="hidden md:flex gap-8 items-center text-[10px] font-bold uppercase tracking-[0.2em] relative z-50">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`${
                    isHomePage 
                      ? link.color || 'text-white hover:text-farm-cream' 
                      : link.color || 'text-farm-brown hover:text-farm-green'
                  } transition-colors whitespace-nowrap ${
                    location.pathname === link.href ? 'border-b-2 border-farm-green pb-1 font-extrabold' : ''
                  }`}
                  style={isHomePage ? { textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8), 0px 1px 4px rgba(0, 0, 0, 0.4)" } : undefined}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`${
                    isHomePage 
                      ? link.color || 'text-white hover:text-farm-cream' 
                      : link.color || 'text-farm-brown hover:text-farm-green'
                  } transition-colors whitespace-nowrap`}
                  style={isHomePage ? { textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8), 0px 1px 4px rgba(0, 0, 0, 0.4)" } : undefined}
                >
                  {link.name}
                </a>
              )
            ))}
          </div>
 
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 w-full bg-farm-white border-b border-farm-brown/20 flex flex-col p-6 gap-4 text-[10px] font-bold uppercase tracking-widest shadow-xl z-50"
            >
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`${link.color || 'text-farm-brown'} ${location.pathname === link.href ? 'text-farm-green font-extrabold' : ''}`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={link.color || 'text-farm-brown'}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full h-[68vh] md:h-[62vh] min-h-[520px] max-[480px]:min-h-[440px] max-h-[640px] overflow-hidden flex flex-col items-center justify-start border-b border-farm-brown/20" id="home">
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

      {/* Hero Content Area - Shifted downwards to perfectly utilize lower canvas space and clear transparent header row */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 text-center px-4 md:px-6 max-w-4xl flex flex-col items-center pt-[190px] min-[480px]:pt-[210px] md:pt-[245px] pb-6 w-full"
      >
        <div className="flex flex-col items-center gap-1.5 md:gap-2 mb-1.5 select-none w-full">
          <p className="text-farm-cream uppercase text-[9px] md:text-[11px] font-bold tracking-[0.4em] drop-shadow-lg">Jeff & Tacey Anderson</p>
          <div className="w-10 h-px bg-farm-cream/40" />
        </div>
        
        <h1 className="text-3xl min-[380px]:text-4xl xs:text-5xl md:text-5xl lg:text-6xl font-bold font-serif text-white mb-2 md:mb-3 drop-shadow-2xl leading-[1.1] tracking-tight">
          Beechgrove <br className="md:hidden" /> Livestock
        </h1>
        
        <p className="font-script text-xl min-[380px]:text-2xl md:text-3xl text-farm-cream mb-2 md:mb-3.5 drop-shadow-md">
          Farm • Fresh • Local
        </p>
 
        <p className="text-xs sm:text-xs md:text-sm lg:text-base text-white/95 font-serif italic mb-4 md:mb-5 max-w-xl mx-auto drop-shadow-md px-2 leading-relaxed">
          Premium Raw Jersey Milk, Farm Fresh Eggs, Butter & Dairy Products
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-sm sm:max-w-none px-4 sm:px-0">
          <a 
            href="#products"
            className="w-full sm:w-auto px-5 py-3 md:px-8 md:py-4 bg-farm-cream text-farm-brown font-bold uppercase tracking-[0.2em] text-[8px] md:text-[9.5px] hover:bg-white transition-all transform hover:-translate-y-0.5 shadow-lg text-center"
          >
            Order Now
          </a>
          <a 
            href="#herdshare"
            className="w-full sm:w-auto px-5 py-3 md:px-8 md:py-4 bg-transparent border-2 border-white text-white font-bold uppercase tracking-[0.2em] text-[8px] md:text-[9.5px] hover:bg-white hover:text-farm-brown transition-all transform hover:-translate-y-0.5 backdrop-blur-sm text-center"
          >
            Join Herdshare Program
          </a>
          <a 
            href="#contact"
            className="w-full sm:w-auto px-5 py-3 md:px-8 md:py-4 bg-transparent text-white font-bold uppercase tracking-[0.2em] text-[8px] md:text-[9.5px] hover:underline underline-offset-4 transition-all text-center"
          >
            Contact Us
          </a>
        </div>
      </motion.div>

      {/* Pet Milk Notice - Subtle Overlay */}
      <div className="absolute bottom-6 left-6 hidden lg:block z-20">
        <div className="p-3 bg-black/20 backdrop-blur-md border border-white/10 rounded-sm max-w-[220px]">
          <p className="text-[8px] uppercase font-bold tracking-widest mb-0.5 text-farm-cream">Pet Milk Notice</p>
          <p className="text-[9px] text-white/80 leading-snug italic font-serif">
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

const ProductsSection = ({ 
  onOrder,
  activeTab,
  setActiveTab
}: { 
  onOrder: (p: Product) => void;
  activeTab: 'dairy' | 'poultry' | 'vegetables';
  setActiveTab: (tab: 'dairy' | 'poultry' | 'vegetables') => void;
}) => {
  return (
    <section className="py-12 md:py-24 border-b border-farm-brown/20 bg-farm-white" id="products">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Marketplace Headers */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4 md:gap-6">
          <div className="max-w-2xl">
            <p className="text-farm-green uppercase text-[10px] font-bold tracking-[0.3em] mb-2 md:mb-3 underline decoration-farm-green/30 underline-offset-8">Marketplace</p>
            <h2 className="text-2xl xs:text-3xl md:text-5xl font-bold font-serif mb-3 md:mb-4">
              {activeTab === 'dairy' && "Dairy Herdshare & Public Sales"}
              {activeTab === 'poultry' && "Pasture-Raised Poultry"}
              {activeTab === 'vegetables' && "Our Kitchen Garden"}
            </h2>
            <p className="text-sm md:text-base text-farm-brown/60 font-serif italic">
              {activeTab === 'dairy' && "Premium raw milk, heavy cream, and artisanal butter from our happy Jersey dairy herd."}
              {activeTab === 'poultry' && "Farm-fresh eggs collected daily from our happy, pasture-raised chickens."}
              {activeTab === 'vegetables' && "Crisp seasonal greens and kitchen-garden harvests grown in healthy, fertile soil."}
            </p>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-farm-green px-4 py-2.5 md:px-6 md:py-3 border border-farm-green/20 rounded-full bg-farm-green/5 flex items-center justify-center gap-3 w-full sm:w-auto shrink-0">
            <Clock size={14} /> Daily Farm Replenishments
          </div>
        </div>

        {/* Marketplace Sub-Navigation Tab Menu - Vegetable tab placed directly after Poultry */}
        <div className="flex border-b border-farm-brown/10 mb-8 md:mb-12 gap-4 sm:gap-8 justify-start overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('dairy')}
            id="tab-dairy"
            className={`pb-4 text-xs font-bold uppercase tracking-[0.22em] relative transition-all duration-300 shrink-0 ${
              activeTab === 'dairy' ? 'text-farm-green font-extrabold scale-105' : 'text-farm-brown/50 hover:text-farm-brown'
            }`}
          >
            Dairy
            {activeTab === 'dairy' && (
              <motion.div layoutId="activeCategoryBorder" className="absolute bottom-0 left-0 right-0 h-1 bg-farm-green" />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('poultry')}
            id="tab-poultry"
            className={`pb-4 text-xs font-bold uppercase tracking-[0.22em] relative transition-all duration-300 shrink-0 ${
              activeTab === 'poultry' ? 'text-farm-green font-extrabold scale-105' : 'text-farm-brown/50 hover:text-farm-brown'
            }`}
          >
            Poultry
            {activeTab === 'poultry' && (
              <motion.div layoutId="activeCategoryBorder" className="absolute bottom-0 left-0 right-0 h-1 bg-farm-green" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('vegetables')}
            id="tab-vegetables"
            className={`pb-4 text-xs font-bold uppercase tracking-[0.22em] relative transition-all duration-300 shrink-0 ${
              activeTab === 'vegetables' ? 'text-farm-green font-extrabold scale-105' : 'text-farm-brown/50 hover:text-farm-brown'
            }`}
          >
            Vegetables
            {activeTab === 'vegetables' && (
              <motion.div layoutId="activeCategoryBorder" className="absolute bottom-0 left-0 right-0 h-1 bg-farm-green" />
            )}
          </button>
        </div>

        {/* Dynamic Section Contents */}
        {activeTab === 'dairy' && (
          <>
            {/* Notice of container policy */}
            <div className="mb-8 md:mb-16 bg-farm-cream/30 border border-farm-brown/10 p-5 md:p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-farm-green/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="space-y-1">
                <p className="text-[9px] uppercase font-bold tracking-[0.25em] text-farm-green">Container Policy Notice</p>
                <p className="text-sm md:text-base font-serif text-farm-brown/90 italic leading-relaxed">
                  "To help us keep things sustainable, please bring a clean glass jar to swap when picking up your dairy, or you can purchase a reusable jar from us for $5."
                </p>
              </div>
              <div className="text-[8px] font-bold uppercase tracking-widest bg-farm-green text-white px-3 py-1.5 rounded-full shrink-0">
                Eco-Friendly swap
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-10 md:gap-y-16">
              {PRODUCTS.filter(product => product.category === 'dairy').map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} onOrder={onOrder} />
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'poultry' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-10 md:gap-y-16">
            {PRODUCTS.filter(product => product.category === 'eggs').map((product) => (
              <div key={product.id}>
                <ProductCard product={product} onOrder={onOrder} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'vegetables' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-farm-brown/10 overflow-hidden"
          >
            <VegetablesPage />
          </motion.div>
        )}

      </div>
    </section>
  );
};

const Herdshare = () => {
  return (
    <section className="flex flex-col lg:flex-row border-b border-farm-brown/20" id="herdshare">
      <div className="w-full lg:w-1/2 px-5 py-8 md:px-16 md:py-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-farm-brown/20">
        <p className="text-farm-green uppercase text-[10px] font-bold tracking-[0.3em] mb-2">Sustainability First</p>
        <h2 className="text-2xl min-[380px]:text-3xl md:text-5xl font-bold font-serif mb-4 leading-tight">Join Our Herdshare Program</h2>
        <ul className="space-y-3 mb-6 overflow-hidden">
          {[
            "Set amount of milk each week",
            "To help us keep things sustainable, please bring a clean glass jar to swap when picking up your dairy, or you can purchase a reusable jar from us for $5.",
            "Simple and sustainable process",
            "Guaranteed weekly fresh supply",
            "Legal access to unpasteurized milk as a partial owner of the herd"
          ].map((item, i) => (
            <motion.li 
              key={i} 
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 text-xs min-[380px]:text-sm md:text-base font-serif"
            >
              <span className="text-farm-green font-bold shrink-0">✔</span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
        <div className="pt-2">
          <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-farm-green underline underline-offset-8 decoration-farm-green/30 hover:decoration-farm-green transition-all">
            Learn More about Membership
          </button>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-farm-brown px-5 py-8 md:px-16 md:py-12 text-farm-cream flex flex-col justify-center gap-6" id="logistics">
        <h2 className="text-2xl min-[380px]:text-3xl md:text-4xl font-bold font-serif mb-2">Pickup & Delivery</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-farm-beige">Farm Address</p>
            <p className="text-sm md:text-base font-serif leading-relaxed text-farm-cream/90">
              1605 McBrides Branch Road<br />
              Beechgrove, TN
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-farm-beige">Farm Pickup Hours</p>
            <p className="text-sm md:text-base font-serif leading-relaxed text-farm-cream/90">
              Monday – Friday<br />
              7:00 AM – 3:30 PM
            </p>
          </div>
          <div className="sm:col-span-2 space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-farm-beige">Weekly Deliveries To:</p>
            <p className="text-sm md:text-base font-serif text-farm-cream/70 leading-relaxed max-w-md">
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
    <section className="py-12 md:py-20 bg-farm-brown text-farm-cream overflow-hidden relative">
      <div className="absolute inset-0 wood-texture opacity-10 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-5 md:px-6 text-center relative z-10">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-farm-cream/10 flex items-center justify-center border border-farm-cream/20">
            <Milk size={32} className="text-farm-beige" />
          </div>
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold font-serif">Legal Notice & Disclosure</h2>
          <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
            <p className="text-base md:text-xl font-serif italic text-farm-beige leading-relaxed">
              "Milk is not pasteurized. In accordance with local regulations, unless you are an active member of our herdshare program, all raw milk products are sold strictly as pet milk."
            </p>
            <div className="pt-4 md:pt-6 border-t border-white/10">
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-60">Transparency & Safety</p>
              <p className="text-xs md:text-sm mt-2 text-farm-cream/80">
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
    <section className="py-12 md:py-24 bg-farm-white" id="logistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 md:p-10 rounded-2xl md:rounded-3xl bg-farm-cream/30 border border-farm-brown/5"
          >
            <MapPin className="text-farm-green mb-4 md:mb-6" size={32} />
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Farm Address</h3>
            <p className="text-base md:text-lg text-farm-brown/80 font-serif">
              1605 McBrides Branch Road<br />
              Beechgrove, TN
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 md:p-10 rounded-2xl md:rounded-3xl bg-farm-cream/30 border border-farm-brown/5"
          >
            <Clock className="text-farm-green mb-4 md:mb-6" size={32} />
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Farm Pickup Hours</h3>
            <p className="text-base md:text-lg text-farm-brown/80 font-serif leading-relaxed">
              <span className="font-bold flex flex-col sm:flex-row justify-between sm:items-center">Monday – Friday: <span className="text-sm sm:text-base opacity-90">7:00 AM – 3:30 PM</span></span>
              <span className="text-xs opacity-60 italic mt-2 block">Weekend pickup by appointment.</span>
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 md:p-10 rounded-2xl md:rounded-3xl bg-farm-cream/30 border border-farm-brown/5"
          >
            <Milk className="text-farm-green mb-4 md:mb-6" size={32} />
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Weekly Delivery</h3>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {["Wartrace", "Murfreesboro", "Shelbyville", "Manchester"].map(city => (
                <div key={city} className="flex items-center gap-2 text-sm md:text-base text-farm-brown/80 font-serif">
                  <div className="w-1.5 h-1.5 rounded-full bg-farm-green shrink-0" />
                  <span>{city}</span>
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

            <div className="mt-16 pt-8 border-t border-farm-cream/10 flex gap-4 items-center">
              <span className="text-farm-cream/40 cursor-not-allowed flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider" title="Coming Soon!">
                <Instagram size={24} className="text-farm-cream/40" /> (Coming Soon!)
              </span>
              <a href="https://www.facebook.com/BeechgroveLivestock/" target="_blank" rel="noopener noreferrer" className="hover:text-farm-cream transition-colors" title="Visit us on Facebook">
                <Facebook size={24} />
              </a>
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
        <div className="flex gap-4 items-center">
          <a href="https://www.facebook.com/BeechgroveLivestock/" target="_blank" rel="noopener noreferrer" className="hover:text-farm-green transition-all">Facebook</a>
          <span className="text-farm-brown/40 cursor-not-allowed select-none" title="Coming Soon!">Instagram (Coming Soon!)</span>
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
  const [activeTab, setActiveTab] = useState<'dairy' | 'poultry' | 'vegetables'>('dairy');

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.substring(1);
      
      if (hash === 'products' || hash === 'vegetables') {
        const productsElement = document.getElementById('products');
        if (productsElement) {
          productsElement.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveTab(hash === 'vegetables' ? 'vegetables' : 'dairy');
      } else {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
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

      <ProductsSection onOrder={onOrder} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Testimonials />
      <Herdshare />
      <PetMilk />
      {/* Contact section integrated into the Natural Tones grid */}
      <section className="flex flex-col lg:flex-row border-b border-farm-brown/20" id="contact">
        <div className="w-full lg:w-[420px] lg:border-r border-farm-brown/20 p-5 md:p-12 bg-farm-cream/10 border-b lg:border-b-0">
          <p className="text-farm-green uppercase text-[10px] font-bold tracking-[0.3em] mb-4">Direct Inquiry</p>
          <h2 className="text-2xl xs:text-3xl lg:text-4xl font-bold font-serif mb-6 md:mb-8">Reach Out Today</h2>
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
        <div className="flex-1 p-5 md:p-12 flex flex-col justify-end items-end italic bg-farm-white wood-texture opacity-80 relative min-h-[320px] md:min-h-[400px]">
          {/* Logo integration in the contact panel */}
          <div className="absolute inset-0 flex items-start justify-start pt-2 pl-6 md:pl-8 pointer-events-none">
            <img 
              src={bgLogo} 
              alt="Beechgrove Livestock Logo" 
              className="w-32 md:w-44 h-auto object-contain drop-shadow-md" 
            />
          </div>

          <div className="max-w-md text-right relative z-10">
            <p className="text-base md:text-lg leading-relaxed font-serif text-farm-brown/70 mb-6 md:mb-8">
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
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/vegetables" element={<VegetablesPage />} />
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
