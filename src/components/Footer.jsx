import styles from './Footer.module.css';

// 1. Zero-dependency premium inline SVGs for socials
const SocialIcons = {
  Instagram: (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x="17.5" y="6.5" x1="17.51" y1="6.5"></line>
    </svg>
  ),
  LinkedIn: (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  ),
  Twitter: (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
  ),
  Facebook: (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  ),
  TikTok: (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
    </svg>
  ),
};

// 2. Upgraded data structure to handle mixed media types
const footerData = {
  discover: ['Our Story', 'Collections', 'Journal', 'Sustainability'],
  care: ['FAQ', 'Shipping & Returns', 'Size Guide', 'Contact Us'],
  legal: ['Privacy Policy', 'Terms of Service', 'Accessibility'],
  social: ['Instagram', 'LinkedIn', 'Twitter', 'Facebook', 'TikTok'],
  payment: [
    {
      id: 'airtel',
      type: 'image',
      src: '/assets/payment/airtel.svg',
      alt: 'Airtel Money',
    },
    {
      id: 'mtn',
      type: 'image',
      src: '/assets/payment/mtn.svg',
      alt: 'MTN Mobile Money',
    },
    {
      id: 'google',
      type: 'image',
      src: '/assets/payment/google-pay.svg',
      alt: 'Google Pay',
    },
    { id: 'visa', type: 'image', src: '/assets/payment/visa.svg', alt: 'VISA' },
    {
      id: 'mastercard',
      type: 'image',
      src: '/assets/payment/mastercard.svg',
      alt: 'MASTER CARD',
    },
    {
      id: 'paypal',
      type: 'image',
      src: '/assets/payment/paypal.svg',
      alt: 'PAYPAL',
    },
    {
      id: 'apple',
      type: 'image',
      src: '/assets/payment/apple-pay.svg',
      alt: 'APPLE PAY',
    },
    { id: 'cash', type: 'text', label: 'Cash on Delivery' },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1: Discover */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Discover</h3>
            {footerData.discover.map((item, idx) => (
              <p key={idx} className={styles.link}>
                {item}
              </p>
            ))}
          </div>

          {/* Column 2: Customer Care */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Customer Care</h3>
            {footerData.care.map((item, idx) => (
              <p key={idx} className={styles.link}>
                {item}
              </p>
            ))}
          </div>

          {/* Column 3: Legal & Policy */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Legal & Policy</h3>
            {footerData.legal.map((item, idx) => (
              <p key={idx} className={styles.link}>
                {item}
              </p>
            ))}
          </div>

          {/* Column 4: Connect */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Connect</h3>
            <div className={styles.newsletterWrapper}>
              <div className={styles.inputGroup}>
                <select className={styles.countrySelect} defaultValue="+256">
                  <option value="+256">+256</option>
                  <option value="+254">+254</option>
                  <option value="+255">+255</option>
                </select>
                <input
                  type="tel"
                  placeholder="WhatsApp number"
                  className={styles.newsletterInput}
                />
              </div>
              <p className={styles.link} style={{ fontSize: '14px' }}>
                We'll update you on our latest collections & exclusive offers
                via WhatsApp.
              </p>
            </div>

            <div className={styles.socialIcons}>
              {footerData.social.map((platform, idx) => {
                const Icon = SocialIcons[platform];
                return (
                  <div key={idx} className={styles.socialIcon} title={platform}>
                    {Icon ? <Icon width="20" height="20" /> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div style={{ marginBottom: '32px' }}>
          <p className={styles.columnTitle} style={{ borderBottom: 'none' }}>
            Payment Methods
          </p>
          <div className={styles.paymentIcons}>
            {footerData.payment.map((method) => (
              <div key={method.id} className={styles.paymentIcon}>
                {method.type === 'image' ? (
                  <img
                    src={method.src}
                    alt={method.alt}
                    /* Removed the inline 100% width/height here */
                  />
                ) : (
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: '700',
                      letterSpacing: '0.07em',
                      color: '#555',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      opacity: 0.85,
                    }}
                  >
                    {method.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.link}>© 2026 LAILA LUXE. All rights reserved.</p>
          <p className={styles.link} style={{ fontStyle: 'italic' }}>
            Redefining Everyday Luxury
          </p>
        </div>
      </div>
    </footer>
  );
}
