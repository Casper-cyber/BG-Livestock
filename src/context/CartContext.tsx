import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number; // numeric price
  unit: string;
  quantity: number;
  image?: string;
  category: 'dairy' | 'eggs' | 'vegetables';
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  sendOrderEmail: (logistics: 'pickup' | 'delivery', date: string, notes: string, paymentType: 'venmo' | 'paypal') => Promise<boolean>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('beechgrove_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse saved cart', e);
      }
    }
  }, []);

  // Save cart to localStorage when changed
  useEffect(() => {
    localStorage.setItem('beechgrove_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prevItems, { ...item, quantity }];
    });
    // Automatically open the cart layout to show updated state
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  /**
   * Sends the itemized cart receipt copy directly to the farm.
   * Can be configured with Resend, EmailJS, or native email draft fallback.
   */
  const sendOrderEmail = async (
    logistics: 'pickup' | 'delivery',
    date: string,
    notes: string
  ): Promise<boolean> => {
    const subject = `New Farm Order Request from Beechgrove Website`;
    
    // Create direct readable list of items
    const itemizedList = cartItems
      .map((item) => `- ${item.name}: ${item.quantity} x $${item.price.toFixed(2)} per ${item.unit} ($${(item.price * item.quantity).toFixed(2)})`)
      .join('\n');
    
    const emailBody = `
=== BEECHGROVE LIVESTOCK ORDER ===
Order Specifications:
Logistics Preference: ${logistics === 'pickup' ? 'Farm Pickup' : 'Delivery'}
Preferred Date: ${date || 'Not specified'}
Additional Notes/Instructions: ${notes || 'None'}

Itemized Checklist:
${itemizedList}

=================================
Total Estimated Cost: $${cartTotal.toFixed(2)}
    `.trim();

    console.log("Fired automatic order email submission payload:\n", emailBody);

    // =========================================================================
    // CONFIGURATION GUIDE: HOW TO WIRE UP EMAIL SERVICE
    // =========================================================================
    // 1. FOR EMAILJS (Client-Side, Free Tier friendly):
    //    Replace the placeholders below with your EmailJS credentials.
    // =========================================================================
    const EMAILJS_SERVICE_ID = ""; // e.g., 'service_abc123'
    const EMAILJS_TEMPLATE_ID = ""; // e.g., 'template_xyz456'
    const EMAILJS_PUBLIC_KEY = ""; // e.g., 'user_def789'
    const FARM_EMAIL = "Info@beechgrovelivestock.com";

    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: {
              subject: subject,
              message: emailBody,
              to_email: FARM_EMAIL,
              logistics_preference: logistics === 'pickup' ? 'Farm Pickup' : 'Delivery',
              pickup_date: date || 'Not specified',
              notes: notes || 'None',
              total_cost: `$${cartTotal.toFixed(2)}`,
            },
          }),
        });

        if (response.ok) {
          console.log('Order successfully emailed directly using EmailJS!');
          return true;
        } else {
          console.error('EmailJS request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error occurred while sending email via EmailJS:', error);
      }
    }

    // =========================================================================
    // 2. FOR RESEND (Client or Server Proxy):
    //    Optionally replace the placeholders below to integrate with Resend API.
    // =========================================================================
    const RESEND_API_KEY = ""; // Keep this blank if on frontend client only

    if (RESEND_API_KEY) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'onboarding@resend.dev',
            to: FARM_EMAIL,
            subject: subject,
            text: emailBody,
          }),
        });

        if (response.ok) {
          console.log('Order successfully sent via Resend API!');
          return true;
        }
      } catch (error) {
        console.error('Error occurred while sending email via Resend:', error);
      }
    }

    // =========================================================================
    // 3. SECURE FALLBACK: Open mailto link so the user drafts the complete matching email
    //    directly even if EmailJS/Resend keys aren't provisioned yet.
    // =========================================================================
    try {
      const mailtoUrl = `mailto:${FARM_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoUrl, '_blank');
      return true;
    } catch (e) {
      console.error("Unable to execute mailto fallback", e);
    }

    return false;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        sendOrderEmail,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
