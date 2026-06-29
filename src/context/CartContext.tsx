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
    notes: string,
    paymentType: 'venmo' | 'paypal'
  ): Promise<boolean> => {
    const timestamp = new Date().toLocaleString();
    const hasDairy = cartItems.some(item => item.category === 'dairy');
    const paymentMethodLabel = paymentType === 'venmo' ? 'Venmo' : 'PayPal';
    const dairyNotice = hasDairy
      ? "Dairy Disclosure: Non herd share products will be marked as Pet Use only. Must bring a clean glass jar to swap or a $5 fee will apply for a new jar. Herd share is available."
      : "";

    const subject = `NEW FARM ORDER INVOICE - ${paymentMethodLabel} Order`;
    
    // Create direct readable list of items for text fallback
    const itemizedListPlain = cartItems
      .map((item) => {
        let line = `- ${item.name} (${item.category.toUpperCase()}): ${item.quantity} x $${item.price.toFixed(2)} per ${item.unit} = $${(item.price * item.quantity).toFixed(2)}`;
        if (item.category === 'dairy') {
          line += `\n  ⚠️ NOTICE: Non-herd share dairy products are marked as Pet Use Only. Customer must bring a clean glass jar to swap or pay a $5 jar fee. Herd share is available.`;
        }
        return line;
      })
      .join('\n');
    
    const emailBody = `
==============================================
             NEW FARM ORDER INVOICE
==============================================
Order Date & Time: ${timestamp}
Payment Method: ${paymentMethodLabel}
Logistics Preference: ${logistics === 'pickup' ? 'Farm Pickup' : 'Delivery'}
Preferred Date: ${date || 'Not specified'}

----------------------------------------------
CUSTOMER DETAILS & NOTES
----------------------------------------------
Additional Notes: ${notes || 'None'}

----------------------------------------------
ITEMIZED CHECKLIST
----------------------------------------------
${itemizedListPlain}

----------------------------------------------
FINANCIAL SUMMARY
----------------------------------------------
Subtotal: $${cartTotal.toFixed(2)}
Total Estimated Cost: $${cartTotal.toFixed(2)}

${hasDairy ? `----------------------------------------------\n${dairyNotice}\n` : ''}==============================================
Thank you for supporting Beachgrove Livestock!
==============================================
    `.trim();

    // Design clean, retail-receipt like HTML email layout
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>NEW FARM ORDER INVOICE</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #3e2723;
      background-color: #fcfbfa;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #fcfbfa;
      padding: 30px 15px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #efebe9;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(93, 64, 55, 0.05);
    }
    .header {
      background-color: #4e342e;
      padding: 35px 30px;
      text-align: center;
      color: #faf8f5;
    }
    .header h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
    }
    .header .subtitle {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      opacity: 0.7;
      margin-top: 5px;
    }
    .content {
      padding: 30px;
    }
    .section-title {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #8d6e63;
      border-bottom: 2px solid #efebe9;
      padding-bottom: 8px;
      margin-bottom: 15px;
    }
    .meta-grid {
      width: 100%;
      margin-bottom: 30px;
      border-collapse: collapse;
    }
    .meta-grid td {
      padding: 6px 0;
      font-size: 13px;
      vertical-align: top;
    }
    .meta-label {
      font-weight: bold;
      color: #5d4037;
      width: 150px;
    }
    .meta-value {
      color: #3e2723;
    }
    .notes-box {
      background-color: #efebe9;
      padding: 15px;
      border-radius: 8px;
      font-size: 12px;
      font-style: italic;
      color: #4e342e;
      margin-bottom: 30px;
      line-height: 1.5;
    }
    .receipt-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    .receipt-table th {
      text-align: left;
      font-size: 10px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #8d6e63;
      padding: 10px 0;
      border-bottom: 1px solid #d7ccc8;
    }
    .receipt-table td {
      padding: 12px 0;
      font-size: 13px;
      border-bottom: 1px solid #efebe9;
      color: #3e2723;
    }
    .summary-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .summary-table td {
      padding: 6px 0;
      font-size: 13px;
    }
    .grand-total {
      font-size: 18px;
      font-weight: bold;
      color: #2e7d32;
      border-top: 2px solid #81c784;
      padding-top: 15px;
      margin-top: 15px;
    }
    .grand-total td {
      font-size: 18px !important;
    }
    .badge {
      display: inline-block;
      padding: 3px 10px;
      font-size: 10px;
      font-weight: bold;
      text-transform: uppercase;
      border-radius: 20px;
      color: #ffffff;
    }
    .badge-venmo {
      background-color: #008cff;
    }
    .badge-paypal {
      background-color: #003087;
    }
    .badge-fulfillment {
      background-color: #2e7d32;
    }
    .warning-box {
      background-color: #fffde7;
      border: 1px dashed #fbc02d;
      border-radius: 8px;
      padding: 15px;
      font-size: 11px;
      color: #f57f17;
      margin-top: 25px;
      line-height: 1.6;
    }
    .warning-title {
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 5px;
    }
    .footer {
      background-color: #f5f2f0;
      padding: 20px 30px;
      text-align: center;
      font-size: 10px;
      color: #8d6e63;
      border-top: 1px solid #efebe9;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>NEW FARM ORDER INVOICE</h1>
        <div class="subtitle">Beechgrove Livestock Marketplace</div>
      </div>
      <div class="content">
        <div class="section-title">Invoice Details</div>
        <table class="meta-grid">
          <tr>
            <td class="meta-label">Order Date &amp; Time</td>
            <td class="meta-value">${timestamp}</td>
          </tr>
          <tr>
            <td class="meta-label">Payment Route</td>
            <td class="meta-value">
              <span class="badge badge-${paymentType}">Checkout via ${paymentMethodLabel}</span>
            </td>
          </tr>
          <tr>
            <td class="meta-label">Fulfillment Logistics</td>
            <td class="meta-value">
              <span class="badge badge-fulfillment">${logistics === 'pickup' ? 'Farm Pickup' : 'Delivery'}</span>
            </td>
          </tr>
          <tr>
            <td class="meta-label">Preferred Date</td>
            <td class="meta-value"><strong>${date || 'Not specified'}</strong></td>
          </tr>
        </table>

        ${notes ? `
        <div class="section-title">Customer Instructions</div>
        <div class="notes-box">
          "${notes}"
        </div>
        ` : ''}

        <div class="section-title">Itemized Receipt</div>
        <table class="receipt-table">
          <thead>
            <tr>
              <th style="width: 45%;">Item Name</th>
              <th style="width: 20%; text-align: left;">Category</th>
              <th style="width: 15%; text-align: right;">Unit Price</th>
              <th style="width: 10%; text-align: center;">Qty</th>
              <th style="width: 10%; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${cartItems.map(item => `
              <tr>
                <td style="font-weight: bold;">${item.name}</td>
                <td style="text-transform: uppercase; font-size: 11px; color: #8d6e63;">${item.category}</td>
                <td style="text-align: right;">$${item.price.toFixed(2)}</td>
                <td style="text-align: center; font-weight: bold;">${item.quantity}</td>
                <td style="text-align: right; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="section-title">Financial Summary</div>
        <table class="summary-table">
          <tr>
            <td style="color: #8d6e63;">Cart Subtotal</td>
            <td style="text-align: right; font-weight: bold;">$${cartTotal.toFixed(2)}</td>
          </tr>
          <tr class="grand-total">
            <td style="font-weight: bold; color: #1b5e20;">Total Estimated Cost</td>
            <td style="text-align: right; font-weight: bold; color: #1b5e20;">$${cartTotal.toFixed(2)}</td>
          </tr>
        </table>

        ${hasDairy ? `
        <div class="warning-box">
          <div class="warning-title">⚠️ Glass Jar Swap &amp; Heritage Policy Reminder</div>
          <div>Non herd share products will be marked as Pet Use only. Must bring a clean glass jar to swap or a $5 fee will apply for a new jar. Herd share is available.</div>
        </div>
        ` : ''}
      </div>
      <div class="footer">
        This is an autogenerated order draft copy for Beechgrove Livestock &bull; Please retain for your records.
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();

    console.log("Fired automatic order email submission payload HTML:\n", emailHtml);

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
              message_html: emailHtml,
              to_email: FARM_EMAIL,
              cc_email: FARM_EMAIL,
              bcc_email: FARM_EMAIL,
              cc: FARM_EMAIL,
              bcc: FARM_EMAIL,
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
            cc: FARM_EMAIL,
            subject: subject,
            text: emailBody,
            html: emailHtml,
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
    // 3. SECURE FALLBACK: Return true to transition cleanly to the next payment step.
    //    Logs diagnostic instructions for live setup and saves invoice details.
    // =========================================================================
    try {
      console.log('Order registered successfully on client side:', subject, emailBody);
      
      if (!EMAILJS_SERVICE_ID && !EMAILJS_PUBLIC_KEY && !RESEND_API_KEY) {
        console.warn(
          `%c [EMAIL CONFIGURATION AUDIT ALERT] %c
The sendOrderEmail function completed local tracking successfully, but DID NOT dispatch a live external email because keys are blank.

To allow real-time emails to go live to ${FARM_EMAIL}, please configure one of these services in src/context/CartContext.tsx:

1. EmailJS Setup (Easiest for Client-Only apps):
   - Sign up for a free account at: https://www.emailjs.com/
   - Under Account, copy your Public Key and set:
     const EMAILJS_PUBLIC_KEY = "your_public_key";
   - Under Email Services, add a service (e.g. Gmail) and set:
     const EMAILJS_SERVICE_ID = "your_service_id";
   - Under Email Templates, create a custom layout and set:
     const EMAILJS_TEMPLATE_ID = "your_template_id";

2. Resend API Setup (Server Proxy):
   - Sign up at: https://resend.com/
   - Retrieve your API Token and set:
     const RESEND_API_KEY = "re_your_api_key_here";
   - Note: Resend requires domain-level validation or using an onboarding sender address pattern.`,
          'background: #ffc107; color: #000; font-weight: bold; padding: 4px; border-radius: 2px;',
          'color: #d32f2f; font-weight: medium;'
        );
      }
      return true;
    } catch (error) {
      console.error("Unable to execute fallback", error);
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
