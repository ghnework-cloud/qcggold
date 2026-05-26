/* ═══════════════════════════════════════════════
   QCG GOLD — MAIN JAVASCRIPT
   Shared across all pages
═══════════════════════════════════════════════ */

// ── NAVIGATION ──
function toggleNav() {
  const mn = document.getElementById('mobileNav');
  if (mn) mn.classList.toggle('open');
}

// Close mobile nav on outside click
document.addEventListener('click', function(e) {
  const mn = document.getElementById('mobileNav');
  const hamburger = document.querySelector('.hamburger');
  if (mn && mn.classList.contains('open') && !mn.contains(e.target) && !hamburger.contains(e.target)) {
    mn.classList.remove('open');
  }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const n = document.getElementById('nav');
  if (n) n.style.padding = window.scrollY > 50 ? '11px 28px' : '15px 28px';
});

// ── RATE CARD TABS ──
function swTab(t, btn) {
  ['micro','standard','premium','gold','silver','coins'].forEach(id => {
    const el = document.getElementById('rtab-' + id);
    if (el) el.style.display = 'none';
  });
  const el = document.getElementById('rtab-' + t);
  if (el) el.style.display = 'block';
  document.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

// ── PRODUCT FILTER ──
function filterP(type, btn) {
  document.querySelectorAll('.fbtn').forEach(b => b.classList.remove('fg', 'fs'));
  if (type === 'silver') btn.classList.add('fs');
  else btn.classList.add('fg');
  document.querySelectorAll('.pcard').forEach(c => {
    c.style.display = (type === 'all' || c.dataset.type === type) ? 'block' : 'none';
  });
}

// ── MODAL ──
let mBuyPrice = 0, mQty = 1, mProdName = '', mProdId = '';

function openM(id, name, buyPrice) {
  mBuyPrice = buyPrice;
  mQty = 1;
  mProdName = name;
  mProdId = id;
  const el = document.getElementById('mProd');
  if (el) el.textContent = name;
  const mov = document.getElementById('mov');
  if (mov) mov.classList.add('open');
  updM();
}

function updM() {
  const perCoin = mBuyPrice + MARGIN + DELIVERY;
  const subtotal = (mBuyPrice + MARGIN) * mQty;
  const total = subtotal + DELIVERY;
  const profit = MARGIN * mQty;

  setEl('mQN', mQty);
  setEl('mBuyPrice', fmt(mBuyPrice * mQty));
  setEl('mPerCoin', fmt(perCoin) + ' each');
  setEl('mSub', fmt(subtotal));
  setEl('mT', fmt(total));
  setEl('mProfit', fmtNum(profit));

  const msg = encodeURIComponent(
    `Hi QCG Gold! I want to order:\n` +
    `• Product: ${mProdName}\n` +
    `• Quantity: ${mQty} coin(s)\n` +
    `• Buy Price: ${fmt(mBuyPrice * mQty)}\n` +
    `• Margin: ${fmt(MARGIN * mQty)}\n` +
    `• Delivery: ${fmt(DELIVERY)}\n` +
    `• Total: ${fmt(total)}\n` +
    `Please confirm and share UPI payment details!`
  );
  const mwa = document.getElementById('mWa');
  if (mwa) mwa.href = 'https://wa.me/919999999999?text=' + msg;
}

function chQ(d) {
  mQty = Math.max(1, mQty + d);
  updM();
}

function closeM() {
  const mov = document.getElementById('mov');
  if (mov) mov.classList.remove('open');
}

function closeMOv(e) {
  if (e.target === document.getElementById('mov')) closeM();
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── UTILITY ──
function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function copyRef() {
  navigator.clipboard.writeText('https://qcggold.in/?ref=QCG123').catch(() => {});
  showToast('🔗 Referral link copied!');
}

console.log('✅ QCG Gold main.js loaded');
