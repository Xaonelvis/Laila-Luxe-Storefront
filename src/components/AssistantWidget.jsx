/**
 * LAILA QUALITY SHOP
 * FILE: AssistantWidget.jsx
 * PLACEMENT: src/components/AssistantWidget.jsx (REPLACE existing)
 *
 * POLISH UPDATES:
 * - Added full-screen blurred backdrop when active.
 * - Clicking outside the widget minimizes it.
 * - Upgraded Framer Motion animations to fluid spring physics.
 * - Refined shadow depths, border radii, and chat bubble styling.
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, spacing, typography } from '../design';

// ── Icons ──────────────────────────────────────────────────────────────────
const ConciergeSvg = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
    />
  </svg>
);

const SendSvg = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 19V5m0 0l-7 7m7-7l7 7"
    />
  </svg>
);

const CloseSvg = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// ── Basic Content Matching Engine ───────────────────────────────────────────
import { conciergeRegistry } from '../data/conciergeRegistry';

const getAutoResponse = (query) => {
  const q = query.toLowerCase();

  // 1. Check for specific product tag matching
  let bestMatch = null;
  let highestScore = 0;

  conciergeRegistry.products.forEach((product) => {
    let score = 0;
    product.tags.forEach((tag) => {
      if (q.includes(tag)) score++;
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = product;
    }
  });

  // If we matched at least two descriptive terms (e.g., 'black' + 'flask'), return product copy
  if (bestMatch && highestScore >= 2) {
    return bestMatch.response;
  }

  console.log(
    `Matching Query: "${q}" | Top Score: ${highestScore} | Best Match: ${bestMatch?.name}`,
  );

  // 2. Fallback to Brand/Service standard queries
  if (q.includes('shipping') || q.includes('delivery')) {
    return conciergeRegistry.brand.shipping;
  }
  if (q.includes('return') || q.includes('refund') || q.includes('exchange')) {
    return conciergeRegistry.brand.returns;
  }
  if (
    q.includes('contact') ||
    q.includes('whatsapp') ||
    q.includes('human') ||
    q.includes('help')
  ) {
    return conciergeRegistry.brand.contact;
  }
  if (q.includes('story') || q.includes('origin') || q.includes('quality')) {
    return conciergeRegistry.brand.story;
  }
  // Sentiment-aware escalation
  const frustrationKeywords = [
    'cant find',
    'still',
    'where',
    'lost',
    'broken',
    'help',
  ];
  if (frustrationKeywords.some((keyword) => q.includes(keyword))) {
    return conciergeRegistry.fallbacks.confusion;
  }

  // 3. Absolute catch-all
  return 'I am the Laila Digital Concierge. I can assist you with styling details, delivery timelines, or specific specifications of our accessories. What piece are you currently evaluating?';
};

// ── Main Component ──────────────────────────────────────────────────────────
export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: 'Welcome to Laila Luxe. How may I assist you today?',
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: inputValue.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getAutoResponse(userMsg.text);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'assistant', text: responseText },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  // Fluid spring animation config for the widget
  const springConfig = { type: 'spring', stiffness: 350, damping: 30 };

  return (
    <>
      {/* ── Background Blur Overlay (Click to dismiss) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close concierge widget"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(247, 241, 227, 0.15)', // Very subtle tint
              backdropFilter: 'blur(6px)', // Satisfying background blur
              WebkitBackdropFilter: 'blur(6px)',
              zIndex: 9998, // Just beneath the widget
              cursor: 'pointer',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Widget Container ── */}
      <div
        style={{
          position: 'fixed',
          bottom: spacing.lg,
          right: spacing.lg,
          zIndex: 9999,
        }}
      >
        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.95,
                transition: { duration: 0.2 },
              }}
              transition={springConfig}
              style={{
                position: 'absolute',
                bottom: '72px',
                right: 0,
                width: '340px',
                height: '520px',
                backgroundColor: colors.bg,
                border: `1px solid rgba(0, 0, 0, 0.08)`,
                borderRadius: '16px',
                boxShadow:
                  '0 24px 48px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.04)', // Deep, luxurious shadow
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                zIndex: 1,
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: spacing.md,
                  borderBottom: `1px solid rgba(0,0,0,0.06)`,
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: colors.textPrimary,
                  }}
                >
                  Digital Concierge
                </span>
              </div>

              {/* Message Area */}
              <div
                style={{
                  flex: 1,
                  padding: spacing.lg,
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: spacing.md,
                }}
              >
                {messages.map((msg) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id}
                    style={{
                      alignSelf:
                        msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '88%',
                      backgroundColor:
                        msg.sender === 'user'
                          ? colors.textPrimary
                          : 'transparent',
                      color:
                        msg.sender === 'user' ? colors.bg : colors.textPrimary,
                      border:
                        msg.sender === 'user'
                          ? 'none'
                          : `1px solid rgba(0, 0, 0, 0.08)`,
                      boxShadow:
                        msg.sender === 'assistant'
                          ? '0 2px 8px rgba(0,0,0,0.02)'
                          : 'none',
                      padding: `${spacing.sm} ${spacing.md}`,
                      borderRadius:
                        msg.sender === 'user'
                          ? '14px 14px 4px 14px'
                          : '14px 14px 14px 4px', // Tailored corners
                      fontSize: typography.small.fontSize,
                      lineHeight: 1.6,
                    }}
                  >
                    {msg.text}
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      alignSelf: 'flex-start',
                      padding: `${spacing.xs} ${spacing.sm}`,
                      color: colors.textMuted,
                      fontSize: '11px',
                      fontStyle: 'italic',
                    }}
                  >
                    Concierge is typing...
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form
                onSubmit={handleSend}
                style={{
                  padding: spacing.md,
                  borderTop: `1px solid rgba(0,0,0,0.06)`,
                  display: 'flex',
                  gap: spacing.sm,
                  backgroundColor: colors.bg,
                }}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about our collection..."
                  style={{
                    flex: 1,
                    border: 'none',
                    backgroundColor: 'transparent',
                    outline: 'none',
                    fontSize: typography.small.fontSize,
                    color: colors.textPrimary,
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: inputValue.trim()
                      ? colors.textPrimary
                      : colors.textMuted,
                    cursor: inputValue.trim() ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    padding: spacing.xs,
                    transition: 'color 200ms ease, transform 200ms ease',
                    transform: inputValue.trim() ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  <SendSvg />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: colors.textPrimary,
            color: colors.bg,
            border: 'none',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: 2,
          }}
          aria-label={isOpen ? 'Close Concierge' : 'Open Concierge'}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? 'close' : 'open'}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <CloseSvg /> : <ConciergeSvg />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
