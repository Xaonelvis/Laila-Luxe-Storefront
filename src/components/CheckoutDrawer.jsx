/**
 * LAILA QUALITY SHOP
 * FILE: CheckoutDrawer.jsx
 * PLACEMENT: src/components/CheckoutDrawer.jsx
 *
 * Zero-API, client-side luxury checkout engine with an automated invoice printer.
 */

import { useState } from 'react';
import { useCart } from '../context/CartContext'; // Use the custom hook instead of Context
import { colors, spacing, shadows } from '../design';
import { parsePrice, formatUGX } from '../utils/constants'; // Add this line

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    zIndex: 2000,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    maxWidth: '450px',
    height: '100%',
    background: colors.bg,
    boxShadow: shadows.lg,
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    padding: spacing.lg,
    overflowY: 'auto',
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '28px',
    fontWeight: 300,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: spacing.lg,
    borderBottom: `1px solid ${colors.border}`,
    paddingBottom: spacing.md,
  },
  formGroup: {
    marginBottom: spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: colors.textSecondary,
    fontWeight: 600,
  },
  input: {
    padding: spacing.md,
    border: `1px solid ${colors.border}`,
    background: 'transparent',
    fontFamily: 'inherit',
    fontSize: '14px',
    color: colors.textPrimary,
    outline: 'none',
    transition: 'border-color 150ms ease',
  },
  select: {
    padding: spacing.md,
    border: `1px solid ${colors.border}`,
    background: colors.bg,
    fontFamily: 'inherit',
    fontSize: '14px',
    color: colors.textPrimary,
    outline: 'none',
  },
  summaryBox: {
    background: 'rgba(0, 0, 0, 0.02)',
    border: `1px solid ${colors.border}`,
    padding: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    padding: '6px 0',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '15px',
    fontWeight: 600,
    paddingTop: spacing.md,
    borderTop: `1px solid ${colors.border}`,
    marginTop: '6px',
  },
  submitButton: {
    background: colors.textPrimary,
    color: colors.bg,
    border: 'none',
    padding: spacing.md,
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    cursor: 'pointer',
    transition: 'opacity 150ms ease, background-color 150ms ease',
    width: '100%',
    marginBottom: spacing.sm,
  },
  secondaryButton: {
    background: 'transparent',
    color: colors.textPrimary,
    border: `1px solid ${colors.textPrimary}`,
    padding: spacing.md,
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    width: '100%',
  },
  successContainer: {
    textAlign: 'center',
    margin: 'auto 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.md,
  },
};

export default function CheckoutDrawer({ isOpen, onClose }) {
  const { cartItems, clearCart, cartTotal } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  // Storage fields to persist text architecture after local context clear loops execute
  const [orderSnapshot, setOrderSnapshot] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    paymentMethod: 'Mobile Money',
  });

  if (!isOpen) return null;

  const subtotal = cartTotal;
  const shipping = 0;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();

    const generatedRef = `LL-${Math.floor(100000 + Math.random() * 900000)}`;
    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Capture frozen state records before flushing main cart allocation states
    const snapshotData = {
      ref: generatedRef,
      date: formattedDate,
      items: [...cartItems],
      subtotal,
      total,
      ...formData,
    };
    setOrderSnapshot(snapshotData);

    // Inside handleCheckoutSubmit:
    const itemManifest = cartItems
      .map((item) => {
        const unit = parsePrice(item.price);
        const lineTotal =
          unit > 0 ? formatUGX(unit * item.quantity) : item.price;
        return `• ${item.name} (x${item.quantity}) — ${lineTotal}`;
      })
      .join('\n');

    const orderMessage =
      `✨ NEW PRIVATE CONCIERGE ORDER ✨\n\n` +
      `Reference: ${generatedRef}\n` +
      `Client Name: ${formData.name}\n` +
      `Contact: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Delivery Location: ${formData.location}\n` +
      `Preferred Payment: ${formData.paymentMethod}\n\n` +
      `🛒 ORDER MANIFEST:\n${itemManifest}\n\n` +
      `Subtotal: ${formatUGX(subtotal)}\n` +
      `Shipping: Complimentary\n` +
      `TOTAL PAYABLE: ${formatUGX(total)}\n\n` +
      `Please review specification parameters to process fulfillment.`;

    const conciergeNumber = '256726623698';
    const encodedMessage = encodeURIComponent(orderMessage);
    const whatsappUrl = `https://wa.me/${conciergeNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    setIsSuccess(true);
    if (clearCart) clearCart();
  };

  // Automated Hidden Document Layout Printing Engine
  const handlePrintInvoice = () => {
    if (!orderSnapshot) return;

    // Construct sandboxed hidden print iframe container
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.bottom = '0';
    iframe.style.right = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;

    // Map out structured HTML list rows from order snapshot variables
    // Inside handlePrintInvoice:
    const itemsHtml = orderSnapshot.items
      .map((item) => {
        const unit = parsePrice(item.price);
        const lineStr = unit > 0 ? formatUGX(unit * item.quantity) : item.price;

        return `
    <tr>
      <td style="padding: 18px 0; border-bottom: 1px solid #eee; font-size: 16px; color: #111;">
        <div style="font-weight: 600;">${item.name}</div>
      </td>
      <td style="padding: 18px 0; border-bottom: 1px solid #eee; font-size: 16px; color: #111; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 18px 0; border-bottom: 1px solid #eee; font-size: 16px; color: #111; text-align: right; font-weight: 600;">
        ${lineStr}
      </td>
    </tr>
  `;
      })
      .join('');

    doc.write(`
      <html>
        <head>
          <title>Invoice - ${orderSnapshot.ref}</title>
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet">
          <style>
            body { padding: 50px; background: #fff; color: #111; font-family: 'Montserrat', sans-serif; -webkit-print-color-adjust: exact; }
            .header { text-align: center; margin-bottom: 60px; border-bottom: 1px solid #111; padding-bottom: 40px; }
            .brand { font-family: 'Cormorant Garamond', serif; font-size: 42px; letter-spacing: 14px; text-transform: uppercase; margin-bottom: 6px; }
            .sub-brand { font-size: 11px; font-weight: 700; letter-spacing: 7px; text-transform: uppercase; color: #555; }
            .meta-layout { display: flex; justify-content: space-between; margin-bottom: 50px; font-size: 12px; line-height: 1.8; }
            .section-title { text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 10px 0; color: #888; font-size: 10px; font-weight: 700; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 50px; }
            th { border-bottom: 1px solid #111; padding-bottom: 12px; text-transform: uppercase; font-size: 11px; letter-spacing: 1.5px; color: #555; font-weight: 600; }
            .totals-container { float: right; width: 280px; font-size: 13px; margin-top: 10px; }
            .row { display: flex; justify-content: space-between; padding: 8px 0; }
            .grand-total { font-weight: 700; font-size: 16px; border-top: 1px solid #111; padding-top: 14px; margin-top: 8px; color: #000; }
            @media print { body { padding: 0; } .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="brand">LAILA</div>
            <div class="sub-brand">Quality Shop</div>
          </div>
          
          <div class="meta-layout">
            <div>
              <h4 class="section-title">Order Architecture</h4>
              <strong>Reference:</strong> ${orderSnapshot.ref}<br />
              <strong>Date Issued:</strong> ${orderSnapshot.date}<br />
              <strong>Settlement:</strong> ${orderSnapshot.paymentMethod}
            </div>
            <div style="text-align: right;">
              <h4 class="section-title">Client File</h4>
              <strong>${orderSnapshot.name}</strong><br />
              ${orderSnapshot.phone}<br />
              ${orderSnapshot.email}<br />
              ${orderSnapshot.location}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="text-align: left;">Selected Piece</th>
                <th style="text-align: center; width: 60px;">Qty</th>
                <th style="text-align: right; width: 100px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <!-- Inside the iframe doc.write template -->
<div class="totals-container">
  <div class="row">
    <span style="color: #666;">Curation Subtotal</span>
    <span>${formatUGX(orderSnapshot.subtotal)}</span>
  </div>
  <div class="row">
    <span style="color: #666;">Courier Logistics</span>
    <span style="text-transform: uppercase; font-size: 11px; font-weight: 700; color: #b8956a;">Complimentary</span>
  </div>
  <div class="row grand-total">
    <span>Total Capital</span>
    <span>${formatUGX(orderSnapshot.total)}</span>
  </div>
</div>
        </body>
      </html>
    `);

    doc.close();

    // Fire background render execution
    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    }, 600);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.container} onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: 'flex',
            justifycontent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.md,
          }}
        >
          <h2 style={styles.title}>Checkout</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              marginTop: '-20px',
            }}
          >
            ✕
          </button>
        </div>

        {isSuccess ? (
          <div style={styles.successContainer}>
            <span style={{ fontSize: '48px', color: colors.gold || '#b8956a' }}>
              ✧
            </span>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '24px',
                fontWeight: 300,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Manifest Dispatched
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: colors.textSecondary,
                lineHeight: '1.6',
                marginBottom: spacing.lg,
              }}
            >
              Your order manifest has been securely generated under reference{' '}
              <strong>{orderSnapshot?.ref}</strong> and passed to a private
              style advisor.
            </p>

            <button style={styles.submitButton} onClick={handlePrintInvoice}>
              Print Luxury Invoice
            </button>
            <button style={styles.secondaryButton} onClick={onClose}>
              Return to Gallery
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              margin: 'auto 0',
              color: colors.textSecondary,
              fontSize: '14px',
            }}
          >
            Your curation drawer is currently empty.
          </p>
        ) : (
          <form
            onSubmit={handleCheckoutSubmit}
            style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
          >
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="E.g., Xaone Elvis"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number</label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="E.g., +256..."
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="client@domain.com"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Delivery Destination</label>
              <input
                required
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="City, Region, Street Details"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Settlement Option</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                style={styles.select}
              >
                <option value="Mobile Money (MTN / Airtel)">
                  Mobile Money (MTN / Airtel)
                </option>
                <option value="Bank Wire Transfer">Bank Wire Transfer</option>
                <option value="Cash / Card on Delivery">
                  Cash / Card on Delivery
                </option>
              </select>
            </div>

            {/* Inside the return statement's summaryBox */}
            <div style={styles.summaryBox}>
              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{formatUGX(subtotal)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Courier Logistics</span>
                <span
                  style={{
                    color: colors.gold || '#b8956a',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  Complimentary
                </span>
              </div>
              <div style={styles.totalRow}>
                <span>Total Payable</span>
                <span>{formatUGX(total)}</span>
              </div>
            </div>

            <button type="submit" style={styles.submitButton}>
              Complete Order via Concierge
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
