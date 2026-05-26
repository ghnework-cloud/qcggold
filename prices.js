/* ═══════════════════════════════════════════════
   QCG GOLD — PRICE DATA FILE
   ⚠️  UPDATE THIS FILE WEEKLY WHEN ELITE GOLD RATES CHANGE
   Formula: Buy Price + ₹250 Margin + ₹150 Delivery = Sell Price
═══════════════════════════════════════════════ */

const MARGIN = 250;       // Your profit per coin (fixed)
const DELIVERY = 150;     // Delivery charge (fixed)
const TOTAL_ADD = MARGIN + DELIVERY; // = ₹400

// ══════════════════════════════════════
// ELITE GOLD BUY PRICES (UPDATE WEEKLY)
// Last updated: May 2026
// ══════════════════════════════════════
const ELITE_GOLD_PRICES = [
  // MICRO COINS
  { id: '50mg',    buy: 964,    label: '50mg Micro Gold Coin',  size: '50mg', type: 'micro',   purity: '999', hot: false, badge: 'MICRO' },
  { id: '100mg',   buy: 1774,   label: '100mg Micro Gold Coin', size: '100mg',type: 'micro',   purity: '999', hot: true,  badge: 'HOT'   },
  { id: '200mg',   buy: 3368,   label: '200mg Micro Gold Coin', size: '200mg',type: 'micro',   purity: '999', hot: false, badge: 'NEW'   },

  // STANDARD GOLD COINS
  { id: '05g',     buy: 7934,   label: '0.5g Gold Coin',        size: '0.5g', type: 'gold',    purity: '999', hot: false, badge: null    },
  { id: '1g',      buy: 15765,  label: '1g Gold Coin',          size: '1g',   type: 'gold',    purity: '999', hot: true,  badge: 'HOT'   },
  { id: '2g',      buy: 32671,  label: '2g Gold Coin',          size: '2g',   type: 'gold',    purity: '999', hot: false, badge: null    },
  { id: '4g',      buy: 65271,  label: '4g Gold Coin',          size: '4g',   type: 'gold',    purity: '999', hot: false, badge: null    },
  { id: '5g',      buy: 81519,  label: '5g Gold Coin',          size: '5g',   type: 'gold',    purity: '999', hot: false, badge: null    },
  { id: '8g',      buy: 130407, label: '8g Gold Coin',          size: '8g',   type: 'gold',    purity: '999', hot: false, badge: null    },
  { id: '10g',     buy: 162966, label: '10g Gold Coin',         size: '10g',  type: 'gold',    purity: '999', hot: false, badge: null    },
  { id: '20g',     buy: 325735, label: '20g Gold Coin',         size: '20g',  type: 'gold',    purity: '999', hot: false, badge: null    },
  { id: '50g',     buy: 813963, label: '50g Gold Coin',         size: '50g',  type: 'gold',    purity: '999', hot: false, badge: 'MAX'   },

  // PREMIUM COINS
  { id: '05gp',    buy: 8155,   label: '0.5g Premium Coin',     size: '0.5g', type: 'premium', purity: '999', hot: false, badge: 'MICRO', design: 'Laxmi-Rose-KV' },
  { id: '1gp',     buy: 16017,  label: '1g Premium Coin',       size: '1g',   type: 'premium', purity: '999', hot: true,  badge: 'BEST',  design: 'Rose-Laxmi-Kalp' },

  // SILVER COINS (approximate - update from your silver supplier)
  { id: 's5g',     buy: 430,    label: '5g Silver Coin',        size: '5g',   type: 'silver',  purity: '999', hot: false, badge: null    },
  { id: 's10g',    buy: 880,    label: '10g Silver Coin',       size: '10g',  type: 'silver',  purity: '999', hot: true,  badge: 'HOT'   },
  { id: 's20g',    buy: 1750,   label: '20g Silver Coin',       size: '20g',  type: 'silver',  purity: '999', hot: false, badge: null    },
  { id: 's50g',    buy: 4350,   label: '50g Silver Coin',       size: '50g',  type: 'silver',  purity: '999', hot: false, badge: null    },
  { id: 's100g',   buy: 8700,   label: '100g Silver Coin',      size: '100g', type: 'silver',  purity: '999', hot: false, badge: null    },
];

// ══════════════════════════════════════
// HELPER FUNCTIONS
// ══════════════════════════════════════

// Get sell price for a product
function getSellPrice(id) {
  const p = ELITE_GOLD_PRICES.find(x => x.id === id);
  return p ? p.buy + TOTAL_ADD : 0;
}

// Get product by ID
function getProduct(id) {
  return ELITE_GOLD_PRICES.find(x => x.id === id);
}

// Format price as ₹1,23,456
function fmt(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

// Format with just number
function fmtNum(n) {
  return Math.round(n).toLocaleString('en-IN');
}

// Get all products by type
function getByType(type) {
  return ELITE_GOLD_PRICES.filter(p => p.type === type);
}

// Calculate total for order
function calcOrderTotal(id, qty, packExtra = 0, engrave = 0) {
  const p = getProduct(id);
  if (!p) return { buy: 0, margin: 0, delivery: DELIVERY, extras: 0, total: 0, profit: 0 };
  const buyTotal = p.buy * qty;
  const marginTotal = MARGIN * qty;
  const extrasTotal = (packExtra + engrave) * qty;
  const total = buyTotal + marginTotal + DELIVERY + extrasTotal;
  return {
    buy: buyTotal,
    margin: marginTotal,
    delivery: DELIVERY,
    extras: extrasTotal,
    total: total,
    profit: marginTotal,
    sellPerCoin: p.buy + MARGIN + DELIVERY,
  };
}

// SIP / Gold Save milestones (based on your sell prices)
const SIP_MILESTONES = [
  { price: 1364,  label: '50mg',  icon: '🌱' },
  { price: 2174,  label: '100mg', icon: '⭐' },
  { price: 3768,  label: '200mg', icon: '🌟' },
  { price: 8334,  label: '0.5g',  icon: '🏆' },
  { price: 16165, label: '1g',    icon: '💎' },
  { price: 33071, label: '2g',    icon: '👑' },
  { price: 65671, label: '4g',    icon: '🔥' },
];

console.log('✅ QCG Gold prices loaded — ' + ELITE_GOLD_PRICES.length + ' products');
console.log('💰 Formula: Buy + ₹' + MARGIN + ' margin + ₹' + DELIVERY + ' delivery');
