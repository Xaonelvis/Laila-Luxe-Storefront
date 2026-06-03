import styles from './Footer.module.css';

const footerData = {
  discover: ['Our Story', 'Collections', 'Journal', 'Sustainability'],
  care: ['FAQ', 'Shipping & Returns', 'Size Guide', 'Contact Us'],
  legal: ['Privacy Policy', 'Terms of Service', 'Accessibility'],
  social: ['Instagram', 'LinkedIn', 'Twitter', 'Facebook', 'TikTok'],
  payment: ['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Airtel Money', 'MTN'],
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
              {footerData.social.map((platform, idx) => (
                <div key={idx} className={styles.socialIcon} title={platform}>
                  ◌
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div style={{ marginBottom: '32px' }}>
          <p className={styles.columnTitle} style={{ borderBottom: 'none' }}>
            Payment Methods
          </p>
          <div className={styles.paymentIcons}>
            {footerData.payment.map((method, idx) => (
              <div key={idx} className={styles.paymentIcon}>
                {method.substring(0, 3).toUpperCase()}
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
