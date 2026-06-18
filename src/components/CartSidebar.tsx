import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart, CartItem } from '../context/CartContext';
import { 
  X, 
  Trash2, 
  Minus, 
  Plus, 
  Calendar, 
  Truck, 
  Building, 
  ShoppingBag,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { VENMO_PROFILE_URL, PAYPAL_EMAIL } from '../constants';

export default function CartSidebar() {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal,
    cartCount,
    sendOrderEmail,
    clearCart
  } = useCart();

  const [logistics, setLogistics] = useState<'pickup' | 'delivery'>('pickup');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = async (paymentType: 'venmo' | 'paypal') => {
    setIsSending(true);
    
    // 1. Send the email receipt copy in the background
    const success = await sendOrderEmail(logistics, date, notes, paymentType);
    
    setIsSending(false);
    if (success) {
      setIsSuccess(true);
      
      // Delay opening the payment link slightly so they can see the success state
      setTimeout(() => {
        setIsSuccess(false);
        setIsCartOpen(false);
        
        // 2. Clear the cart since the order is drafted and forwarded
        clearCart();
        
        // 3. Smooth external handoff to the payment system
        if (paymentType === 'venmo') {
          window.open(VENMO_PROFILE_URL, '_blank');
        } else {
          const itemDescription = cartItems.map(i => `${i.quantity}x ${i.name}`).join(', ');
          const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(PAYPAL_EMAIL)}&item_name=${encodeURIComponent(itemDescription)}&amount=${cartTotal.toFixed(2)}&currency_code=USD`;
          window.open(paypalUrl, '_blank');
        }
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex justify-end">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-farm-brown/50 backdrop-blur-sm"
        />

        {/* Slide-over panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative bg-farm-white w-full max-w-md h-full flex flex-col shadow-2xl border-l-[6px] border-farm-brown overflow-hidden"
        >
          {/* Header */}
          <div className="paper-texture border-b border-farm-brown/10 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-farm-green/10 text-farm-green rounded-full">
                <ShoppingBag size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-farm-brown">Your Cart</h3>
                <p className="text-[10px] uppercase font-bold tracking-widest text-farm-green">
                  {cartCount} {cartCount === 1 ? 'Item' : 'Items'} selected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-farm-brown/40 hover:text-farm-brown hover:bg-farm-brown/5 rounded-full transition-colors"
              aria-label="Close Cart"
            >
              <X size={22} />
            </button>
          </div>

          {/* Success Overlay state */}
          {isSuccess && (
            <div className="absolute inset-0 z-50 bg-farm-white/95 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
              <CheckCircle2 size={64} className="text-farm-green mb-4 animate-bounce" />
              <h3 className="text-2xl font-serif font-bold text-farm-brown mb-2">Order Receipt Copies Sent!</h3>
              <p className="text-sm font-serif italic text-farm-brown/60 max-w-xs">
                An automatic copy has been registered and dispatched. Redirecting to payment screen...
              </p>
            </div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="p-4 bg-farm-brown/5 text-farm-brown/40 rounded-full mb-4">
                  <ShoppingBag size={36} />
                </div>
                <h4 className="text-lg font-bold font-serif text-farm-brown">Your cart is empty</h4>
                <p className="text-xs font-serif italic text-farm-brown/50 mt-1 max-w-[240px]">
                  Browse our marketplace to add premium Jersey dairy, pasture-raised eggs, and fresh kitchen garden vegetables to your order!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 bg-farm-brown text-farm-cream px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-farm-green transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Itemized List */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-farm-brown/50 border-b border-farm-brown/10 pb-1">Products Checklist</h4>
                  <div className="divide-y divide-farm-brown/10">
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-4 flex gap-4 first:pt-0">
                        {item.image ? (
                          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-farm-brown/10">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-farm-cream/40 border border-farm-brown/10 shrink-0 flex items-center justify-center text-farm-green">
                            <ShoppingBag size={20} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <span className="text-[8px] font-bold uppercase tracking-wider text-farm-green">{item.category}</span>
                          <h5 className="font-serif text-sm font-bold text-farm-brown truncate">{item.name}</h5>
                          <p className="text-[10px] text-farm-brown/50 italic font-serif">
                            ${item.price.toFixed(2)} / {item.unit}
                          </p>
                          
                          {/* Item Actions */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2.5 bg-white/60 rounded-lg px-2 py-1 border border-farm-brown/10">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-farm-brown hover:text-farm-green transition-colors"
                                title="Decrease quantity"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="font-mono text-xs font-bold text-farm-brown min-w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-farm-brown hover:text-farm-green transition-colors"
                                title="Increase quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                              title="Delete item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logistics */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-farm-brown/50 border-b border-farm-brown/10 pb-1">Fulfillment Details</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setLogistics('pickup')}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                        logistics === 'pickup'
                          ? 'border-farm-green bg-farm-green/5 text-farm-green font-bold'
                          : 'border-farm-brown/10 text-farm-brown/50 hover:border-farm-brown/20'
                      }`}
                    >
                      <Building size={16} />
                      <span className="text-[9px] uppercase font-bold tracking-widest">Farm Pickup</span>
                    </button>
                    <button
                      onClick={() => setLogistics('delivery')}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                        logistics === 'delivery'
                          ? 'border-farm-green bg-farm-green/5 text-farm-green font-bold'
                          : 'border-farm-brown/10 text-farm-brown/50 hover:border-farm-brown/20'
                      }`}
                    >
                      <Truck size={16} />
                      <span className="text-[9px] uppercase font-bold tracking-widest">Delivery</span>
                    </button>
                  </div>
                </div>

                {/* Logistics Input Form fields */}
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-farm-brown/60 flex items-center gap-1.5">
                      <Calendar size={12} /> Preferred {logistics === 'pickup' ? 'Pickup' : 'Delivery'} Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white border border-farm-brown/10 rounded-lg p-2.5 outline-none focus:border-farm-green transition-colors font-serif text-xs text-farm-brown"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-farm-brown/60 block">
                      Additional Order Notes / Special Instructions
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-white border border-farm-brown/10 rounded-lg p-2.5 outline-none focus:border-farm-green transition-colors font-serif text-xs text-farm-brown resize-none"
                      rows={2.5}
                      placeholder="e.g. Bring extra clean glass jugs, specific drop-off details..."
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer controls */}
          {cartItems.length > 0 && (
            <div className="paper-texture border-t border-farm-brown/10 p-6 bg-farm-cream/20 space-y-4">
              <div className="flex justify-between items-end border-b border-dotted border-farm-brown/20 pb-3">
                <span className="text-xs font-serif italic text-farm-brown/60">Cart Subtotal</span>
                <span className="text-2xl font-bold font-serif text-farm-green">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <button
                  disabled={isSending}
                  onClick={() => handleCheckout('venmo')}
                  className="w-full bg-[#008CFF] text-white py-3.5 rounded-full font-bold uppercase tracking-widest text-[9px] shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSending ? (
                     <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <svg viewBox="0 0 516 516" className="w-3.5 h-3.5 fill-current shrink-0">
                      <path d="M385.16 105c11.1 18.3 16.08 37.17 16.08 61 0 76-64.87 174.7-117.52 244H163.5l-48.2-288.35 105.3-10 25.6 205.17c23.8-139 53.23-200 53.23-241.56 0-22.77-3.9-38.25-10-51z" />
                    </svg>
                  )}
                  Checkout with Venmo
                </button>

                <button
                  disabled={isSending}
                  onClick={() => handleCheckout('paypal')}
                  className="w-full bg-[#FFC439] text-[#003087] py-3.5 rounded-full font-bold uppercase tracking-widest text-[9px] shadow-sm hover:shadow-md hover:bg-[#F2b82e] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSending ? (
                     <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current shrink-0">
                      <path d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.007a.35.35 0 0 1 .348-.297h.38c1.266 0 2.425-.256 3.345-.91q.57-.403.993-1.005a4.94 4.94 0 0 0 .88-2.195c.242-1.246.13-2.356-.57-3.154a2.7 2.7 0 0 0-.76-.59l-.094-.061ZM6.543 8.82a.7.7 0 0 1 .321-.079H8.3c2.82 0 5.027-1.144 5.672-4.456l.003-.016q.326.186.548.438c.546.623.679 1.535.45 2.71-.272 1.397-.866 2.307-1.663 2.874-.802.57-1.842.815-3.043.815h-.38a.87.87 0 0 0-.863.734l-.03.164-.48 3.043-.024.13-.001.004a.35.35 0 0 1-.348.296H5.595a.106.106 0 0 1-.105-.123l.208-1.32z" />
                    </svg>
                  )}
                  Checkout with PayPal
                </button>
              </div>

              <p className="text-[8px] text-center opacity-40 uppercase tracking-widest text-[#4A2E1F] mt-2">
                Order dispatch & secure external handoff
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
