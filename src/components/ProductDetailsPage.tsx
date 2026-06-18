import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  CheckCircle2, 
  Info, 
  ShieldCheck, 
  Leaf, 
  Heart,
  Droplets,
  ShoppingCart,
  Minus,
  Plus
} from 'lucide-react';
import { PRODUCTS, VENMO_USER, PAYPAL_EMAIL } from '../constants';
import { useCart } from '../context/CartContext';

const ProductDetailsPage = () => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === productId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">Product Not Found</h2>
        <p className="text-farm-brown/60 mb-8 font-serif italic">We couldn't find the product you're looking for.</p>
        <Link 
          to="/" 
          className="bg-farm-brown text-farm-cream px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-farm-green transition-all"
        >
          Return to Marketplace
        </Link>
      </div>
    );
  }

  // Virtual data for health benefits based on product type
  const healthBenefits = product.category === 'dairy' ? [
    { title: 'Naturally A2/A2 Beta-Casein', desc: 'Easier to digest for many people with dairy sensitivities compared to standard A1 milk.' },
    { title: 'Rich in Probiotics', desc: 'Raw milk contains beneficial bacteria that support a healthy gut microbiome and immune system.' },
    { title: 'Live Enzymes', desc: 'Maintains essential enzymes like lactase that help your body break down milk components naturally.' },
    { title: 'Bioavailable Vitamins', desc: 'High levels of Vitamins A, D, and K2 in their most absorbable forms from pasture-raised cows.' }
  ] : [
    { title: 'Omega-3 Fatty Acids', desc: 'Pasture-raised eggs have significantly higher levels of heart-healthy fats.' },
    { title: 'Vitamin D & E', desc: 'Sun-kissed hens produce eggs with up to 4x more Vitamin D than industrial eggs.' },
    { title: 'Lutein & Zeaxanthin', desc: 'Vibrant orange yolks signify higher levels of antioxidants for eye health.' },
    { title: 'No Antibiotics or Hormones', desc: 'Clean, natural eggs from hens roaming free on Tennessee limestone soil.' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-farm-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-farm-green font-bold uppercase tracking-widest text-[10px] mb-12 hover:translate-x-[-4px] transition-transform"
        >
          <ChevronLeft size={16} /> Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Product Image Section */}
          <div className="relative group">
            <div className="absolute inset-0 border-[12px] border-farm-brown/10 rounded-3xl -m-3 pointer-events-none wood-texture opacity-50" />
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-farm-brown/10 aspect-[4/5] md:aspect-square">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Overlay Badges */}
            <div className="absolute top-6 left-6 flex flex-col gap-3">
              <span className="bg-farm-green text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                Fresh from Beechgrove
              </span>
              <span className="bg-farm-brown text-farm-beige text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                Raw & Unprocessed
              </span>
            </div>
          </div>

          {/* Product Content Section */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-farm-green font-bold uppercase text-[10px] tracking-[0.3em]">{product.category}</span>
                <div className="w-8 h-px bg-farm-green/30" />
                <span className="text-farm-brown/40 text-[10px] uppercase font-bold tracking-widest">Beechgrove, TN</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-farm-brown mb-2">{product.baseName}</h1>
              {product.variation && (
                <p className="font-script text-4xl text-farm-green mb-6">{product.variation}</p>
              )}
              
              <div className="flex items-baseline gap-4 mt-6">
                <span className="text-4xl font-serif font-bold text-farm-brown">{product.price}</span>
                <span className="text-farm-brown/40 uppercase font-bold text-[10px] tracking-widest">per {product.unit}</span>
              </div>
            </div>

            <div className="p-6 bg-farm-cream/30 border border-farm-brown/5 rounded-2xl italic font-serif text-lg leading-relaxed text-farm-brown/80">
              "{product.description} Our cows graze on healthy Tennessee pastures, producing a level of quality you simply can't find in grocery stores."
            </div>

            <div className="space-y-6">
              <h3 className="text-xs uppercase font-bold tracking-[0.4em] text-farm-brown/50 border-b border-farm-brown/10 pb-2">Health Benefits & Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {healthBenefits.map((benefit, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 className="text-farm-green" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-farm-brown mb-1">{benefit.title}</h4>
                      <p className="text-xs text-farm-brown/60 font-serif leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-farm-brown/10">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Quantity selector */}
                <div className="flex items-center justify-between gap-4 bg-white rounded-xl px-4 py-3 border border-farm-brown/10 shrink-0">
                  <span className="font-bold text-[10px] uppercase tracking-wider text-farm-brown/60">Qty:</span>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                      className="text-farm-brown hover:text-farm-green transition-colors w-7 h-7 flex items-center justify-center bg-farm-cream/30 hover:bg-farm-cream/60 rounded-full"
                      title="Decrease"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-mono text-sm font-bold min-w-6 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)} 
                      className="text-farm-brown hover:text-farm-green transition-colors w-7 h-7 flex items-center justify-center bg-farm-cream/30 hover:bg-farm-cream/60 rounded-full"
                      title="Increase"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => addToCart({
                    id: product.id,
                    name: product.baseName + (product.variation ? ` (${product.variation})` : ''),
                    price: product.numericPrice,
                    unit: product.unit,
                    category: product.category,
                    image: product.image
                  }, quantity)}
                  className="flex-grow bg-farm-green text-white py-4.5 px-6 rounded-xl font-bold uppercase tracking-[0.15em] text-[10px] hover:bg-farm-green/95 active:scale-98 transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer"
                >
                  <ShoppingCart size={16} /> Add to Shopping Cart
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl border border-farm-brown/10 bg-white/50">
                  <Leaf className="mx-auto mb-2 text-farm-green" size={20} />
                  <p className="text-[8px] font-bold uppercase tracking-widest opacity-40">Antibiotic Free</p>
                </div>
                <div className="p-4 rounded-xl border border-farm-brown/10 bg-white/50">
                  <Droplets className="mx-auto mb-2 text-farm-green" size={20} />
                  <p className="text-[8px] font-bold uppercase tracking-widest opacity-40">Raw & Pure</p>
                </div>
                <div className="p-4 rounded-xl border border-farm-brown/10 bg-white/50">
                  <Heart className="mx-auto mb-2 text-farm-green" size={20} />
                  <p className="text-[8px] font-bold uppercase tracking-widest opacity-40">Cow Focused</p>
                </div>
              </div>
            </div>

            {/* Production Details */}
            <div className="bg-farm-brown text-farm-cream p-8 rounded-2xl space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-farm-beige flex items-center gap-2">
                <Info size={14} /> Production Integrity
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="font-serif italic text-sm">Milking Frequency</span>
                  <span className="font-bold text-xs uppercase tracking-widest">Daily (Sun-Up)</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="font-serif italic text-sm">Chilling Process</span>
                  <span className="font-bold text-xs uppercase tracking-widest">Instant Cooling</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="font-serif italic text-sm">Dietary Standard</span>
                  <span className="font-bold text-xs uppercase tracking-widest">Pasture + Non-GMO</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-serif italic text-sm">Compliance</span>
                  <span className="font-bold text-xs uppercase tracking-widest">TN Pet Milk Rule</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer-like section for the page */}
      <div className="bg-farm-cream/20 py-16 border-t border-farm-brown/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ShieldCheck className="mx-auto mb-6 text-farm-green" size={48} />
          <h2 className="text-3xl font-serif font-bold mb-4 text-farm-brown">The Beechgrove Guarantee</h2>
          <p className="font-serif italic text-lg text-farm-brown/70 leading-relaxed max-w-2xl mx-auto">
            "Everything we produce at Beechgrove Livestock is something we serve to our own children. We maintain the highest standards of cleanliness and animal husbandry because the health of our customers and our herd is our primary mission."
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailsPage;
