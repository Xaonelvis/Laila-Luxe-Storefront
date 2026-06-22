/**
 * LAILA QUALITY SHOP
 * FILE: conciergeRegistry.js
 * PLACEMENT: src/data/conciergeRegistry.js
 *
 * Local knowledge graph for zero-backend luxury matching.
 */

export const conciergeRegistry = {
  brand: {
    story:
      'Laila Quality Shop curation focuses on high-end, tailored silhouettes, structural optimization, and pristine craftsmanship.',
    shipping:
      'We offer complimentary global courier shipping. Delivery to your doorstep takes 2–4 business days.',
    returns:
      'Returns are graciously accepted within 14 days of delivery. Items must rest in pristine, unworn condition with all tags intact.',
    contact:
      'You can reach our private style advisors directly via WhatsApp or email at support@laila-luxe.com.',
  },

  // Add to your conciergeRegistry object
  fallbacks: {
    confusion:
      'I apologize if our interface is not guiding you effectively. Would you like me to share a direct link to the accessory, or should I have a style advisor reach out to assist you personally?',
  },
  // Structured catalog items for the matcher to crawl
  products: [
    {
      id: 'flask-01',
      name: 'Stealth Vacuum Flask',
      tags: [
        'flask',
        'bottle',
        'vacuum',
        'matte',
        'black',
        'rubber',
        'handle',
        'lid',
        '2-litre',
        '2l',
        'drinkware',
      ],
      response:
        'Yes, we have our signature Stealth Vacuum Flask in stock. It features a 2-litre capacity, a premium matte black rubberized finish on the structural handle and lid, and exceptional thermal retention. You can find it listed under our modern accessories section.',
    },
    {
      id: 'watch-roll',
      name: 'Chronos Watch Roll Cylinder',
      tags: [
        'watch',
        'roll',
        'cylinder',
        'case',
        'storage',
        'leather',
        'box',
        'accessories',
      ],
      response:
        'Our Chronos Watch Roll Cylinder is available. It features an ultra-soft protective lining and structured geometric mechanical security for your exceptional timepieces.',
    },
    {
      id: 'card-sleeve',
      name: 'Stealth Carbon Card Sleeve',
      tags: [
        'card',
        'sleeve',
        'wallet',
        'carbon',
        'aerospace',
        'minimalist',
        'holder',
      ],
      response:
        'The Stealth Carbon Card Sleeve is currently featured in our catalog—crafted from rigid, aerospace-grade carbon fiber for an ultra-slim modern profile.',
    },
  ],
};
