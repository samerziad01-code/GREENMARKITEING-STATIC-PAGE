// =====================================================================
// Green Marketing — site behaviour
// =====================================================================
const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

// ---------- English translations (Arabic is the default markup) ----------
const EN = {
  'nav.about': 'About', 'nav.services': 'Services', 'nav.web': 'Websites', 'nav.work': 'Work', 'nav.clients': 'Clients', 'nav.contact': 'Contact', 'nav.cta': 'Start a project',
  'th.light': 'Light', 'th.auto': 'Auto', 'th.dark': 'Dark',
  'hero.eyebrow': 'Creative marketing agency · Jordan',
  'hero.l1': 'We turn ideas into',
  'hero.lead': 'Green Marketing is a company specialized in marketing and advertising services, helping brands build a strong presence, reach their target audience, and achieve real results through integrated marketing and creative solutions.',
  'hero.cta1': 'Book a free consultation', 'hero.cta2': 'See our websites',
  'hero.f1': 'brands trust us', 'hero.f3': 'Websites for every business',
  'st.1': 'clients & brands', 'st.2': 'services under one roof', 'st.3': 'specialized departments', 'st.4': 'integrated marketing',
  'about.eyebrow': 'About us — Hello!',
  'about.statement': 'Green Marketing is a creative agency building brands that stand out, connect with their audiences, and drive meaningful growth.',
  'about.p2': 'From branding and social media management to content creation, graphic design, photography, video production, web development and digital marketing, we bring together creativity and strategy to create powerful, memorable brand experiences.',
  'about.skills': 'Technical skills',
  'svc.eyebrow': 'Our services', 'svc.title': 'Everything your brand needs — under one roof',
  'svc.tab1': 'Marketing', 'svc.tab2': 'Graphic Design', 'svc.tab4': 'IT Services',
  'mkt.lead': 'Digital and offline — from the first plan to the final result.',
  'mkt.d1t': 'SEO', 'mkt.d2t': 'Social media management', 'mkt.d3t': 'Branding & printing', 'mkt.d4t': 'Google Ads', 'mkt.o1t': 'Advertising boards', 'mkt.o2t': 'Marketing plans',
  'gfx.1': 'Brand design', 'gfx.2': 'Motion graphics', 'gfx.3': 'Logo design', 'gfx.4': 'Social media designs', 'gfx.5': 'Printing & packaging', 'gfx.6': 'Company profiles',
  'prd.1': 'Drone', 'prd.2': 'Photoshoots', 'prd.3': 'Videography', 'prd.4': 'Food photography studio', 'prd.5': 'Cinematography', 'prd.6': 'Storyboard',
  'it.1t': 'Custom web development', 'it.2t': 'iOS & Android apps', 'it.4t': 'Hosting & emails', 'it.5t': 'Systems & platforms', 'it.6t': 'Multi-vendor e-commerce', 'it.7t': 'UI/UX design', 'it.8t': 'Custom software & QR', 'it.more': 'See website examples',
  'web.eyebrow': 'Web design & development',
  'web.title': 'Websites for <em>every business</em>',
  'web.sub': 'Restaurant, clinic, real-estate company, online store or travel agency — we design and build your site from scratch, with an identity that feels like you: fast, responsive and ready to sell. Pick your business and see for yourself:',
  'web.note': '* Illustrative demos with fictional names to show our style.',
  'wf.1': 'Responsive on every screen', 'wf.2': 'Arabic & English', 'wf.3': 'Lightning-fast loading', 'wf.4': 'SEO-ready', 'wf.5': 'Easy admin dashboard', 'wf.6': 'Online payments & WhatsApp', 'wf.7': 'Online bookings & orders', 'wf.8': 'Hosting, domain & emails',
  'web.every': 'We build websites for…', 'web.cta': 'Get a website for your business',
  'pr.eyebrow': 'How we work', 'pr.title': 'From idea… to launch… to growth',
  'pr.1t': 'Discover', 'pr.1': 'We learn your brand, audience, competitors and goals.',
  'pr.2t': 'Plan', 'pr.2': 'A clear strategy for content, channels and budget.',
  'pr.3t': 'Create & build', 'pr.3': 'Design, photography, content, websites and campaigns.',
  'pr.4t': 'Launch & grow', 'pr.4': 'We measure results and keep improving.',
  'work.eyebrow': 'Our work — Portfolio', 'work.title': 'A selection of our creative work',
  'work.sub': 'Branding, social media, digital design, and print — combining creative ideas, thoughtful execution, and attention to detail.',
  'work.all': 'All', 'work.social': 'Social media', 'work.story': 'Instagram stories', 'work.logo': 'Logos & identity', 'work.print': 'Printing',
  'case.title': 'The stories behind the designs',
  'case.ftj': 'Represents the future, achieving goals, and moving forward toward success, by combining the letters F + T + J in a modern design that reflects ambition, direction, and progress.',
  'case.well': 'WELL represents food made with care, quality, and purpose. The hand and burger symbolize craftsmanship, while the bold orange adds energy and appetite.',
  'case.sens': "A printed packaging box for a 32-inch LED TV gift from Sensilis — soft pink palette, clean layout and modern aesthetic reflecting the brand's identity.",
  'cl.eyebrow': 'Our clients', 'cl.title': 'Meaningful partnerships that turn collaboration into lasting success',
  'cta.title': 'Ready to make your brand <em>the talk of the town?</em>', 'cta.wa': 'Free WhatsApp consultation', 'cs.title': 'Free consultation on WhatsApp', 'cs.sub': 'Answer 7 quick questions and we will get back to you with a plan that fits your project', 'cta.form': 'Send your project details',
  'ct.title': 'Welcome to Green!',
  'ct.p': "Where ideas grow, brands evolve, and new possibilities begin. At Green, we're passionate about creating meaningful solutions that help businesses move forward and achieve their goals.",
  'ct.form': 'Tell us about your project', 'ct.name': 'Name', 'ct.phone': 'Phone number', 'ct.service': 'Service needed', 'ct.optweb': 'Website', 'ct.msg': 'Your message',
  'ct.send': 'Send message', 'ct.hint': 'Your email app will open to send the message.', 'ct.agree': 'By sending your message you agree to our',
  'ft.tag': 'We turn ideas into impact.', 'ft.terms': 'Terms & Conditions', 'ft.privacy': 'Privacy Policy', 'ft.rights': 'All rights reserved.',
  'ft.note': 'All designs and works shown belong to their respective owners and are displayed with permission as part of the agency portfolio.',
  'cursor.view': 'View',
  'tm.full': 'Open as full page', 'tm.ok': 'Got it'
};
const ROTATE = {
  ar: ['أثرٍ حقيقي', 'مبيعات', 'علامات مميزة', 'مواقع خرافية'],
  en: ['real impact', 'real sales', 'iconic brands', 'killer websites']
};

// ---------- i18n ----------
const AR = { 'cursor.view': 'عرض' };
document.querySelectorAll('[data-i18n]').forEach(el => AR[el.dataset.i18n] ??= el.textContent);
document.querySelectorAll('[data-i18n-html]').forEach(el => AR[el.dataset.i18nHtml] = el.innerHTML);
const t = key => (root.lang === 'en' ? EN : AR)[key];
const langBtn = document.getElementById('langBtn');

function applyLang() {
  const dict = root.lang === 'en' ? EN : AR;
  document.querySelectorAll('[data-i18n]').forEach(el => { const v = dict[el.dataset.i18n]; if (v != null) el.textContent = v; });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { const v = dict[el.dataset.i18nHtml]; if (v != null) el.innerHTML = v; });
  langBtn.textContent = root.lang === 'en' ? 'ع' : 'EN';
  buildRotator(); splitStatement();
}
function setLang(lang) {
  root.lang = lang; root.dir = lang === 'en' ? 'ltr' : 'rtl';
  try { localStorage.setItem('gm-lang', lang); } catch (e) {}
  applyLang();
  document.dispatchEvent(new Event('langchange'));
}
langBtn.addEventListener('click', () => setLang(root.lang === 'en' ? 'ar' : 'en'));

// ---------- theme: light / dark / auto ----------
const mq = matchMedia('(prefers-color-scheme: dark)');
const metaTheme = document.querySelector('meta[name="theme-color"]');
function applyTheme() {
  const mode = root.dataset.mode || 'auto';
  const dark = mode === 'dark' || (mode === 'auto' && mq.matches);
  root.dataset.theme = dark ? 'dark' : 'light';
  metaTheme && metaTheme.setAttribute('content', dark ? '#070f09' : '#EBE1D2');
  document.querySelectorAll('[data-theme-set]').forEach(b => b.setAttribute('aria-pressed', b.dataset.themeSet === mode));
  document.dispatchEvent(new Event('themechange'));
}
document.querySelectorAll('[data-theme-set]').forEach(b => b.addEventListener('click', () => {
  root.dataset.mode = b.dataset.themeSet;
  try { localStorage.setItem('gm-theme', b.dataset.themeSet); } catch (e) {}
  applyTheme();
}));
mq.addEventListener ? mq.addEventListener('change', applyTheme) : mq.addListener(applyTheme);
applyTheme();

// ---------- hero word rotator ----------
const rot = document.getElementById('rotator');
let rotIdx = 0, rotTimer;
function buildRotator() {
  if (!rot) return;
  const words = ROTATE[root.lang === 'en' ? 'en' : 'ar'];
  rot.innerHTML = words.map((w, i) => `<span class="rotator__word${i === 0 ? ' is-in' : ''}"${i ? ' aria-hidden="true"' : ''}>${w}</span>`).join('');
  rotIdx = 0; clearInterval(rotTimer);
  if (!reduceMotion) rotTimer = setInterval(() => {
    const els = rot.children; const prev = els[rotIdx];
    rotIdx = (rotIdx + 1) % els.length;
    prev.classList.remove('is-in'); prev.classList.add('is-out');
    setTimeout(() => prev.classList.remove('is-out'), 650);
    els[rotIdx].classList.add('is-in');
  }, 2600);
}

// ---------- statement: words light up as you scroll ----------
const statement = document.getElementById('statement');
function splitStatement() {
  if (!statement) return;
  statement.innerHTML = statement.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
  litStatement();
}
function litStatement() {
  if (!statement) return;
  const r = statement.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35)));
  const words = statement.children, n = Math.round(p * words.length);
  for (let i = 0; i < words.length; i++) words[i].classList.toggle('is-lit', reduceMotion || i < n);
}

applyLang();

// ---------- nav, progress ----------
const nav = document.getElementById('nav'), burger = document.getElementById('burger'), links = document.getElementById('navLinks');
const progress = document.getElementById('progress');
function onScroll() {
  nav.classList.toggle('is-scrolled', scrollY > 10);
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0);
  litStatement();
}
addEventListener('scroll', onScroll, { passive: true }); onScroll();
burger.addEventListener('click', () => { const open = links.classList.toggle('is-open'); burger.setAttribute('aria-expanded', open); });
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { links.classList.remove('is-open'); burger.setAttribute('aria-expanded', false); }));

// ---------- counters ----------
const counters = document.querySelectorAll('[data-count]');
const countIO = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return; countIO.unobserve(en.target);
  const el = en.target, end = +el.dataset.count;
  if (reduceMotion) { el.textContent = end; return; }
  el.textContent = '0'; // markup holds the real number (no-JS / paused safe); animate up from 0 only when seen
  const t0 = performance.now(), dur = 1600;
  const step = now => { const k = Math.min(1, (now - t0) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
  setTimeout(() => { el.textContent = end; }, dur + 150); // guarantees the final number even if frames are paused (background tab)
}), { threshold: .4 });
counters.forEach(c => countIO.observe(c));

// ---------- bento spotlight ----------
document.querySelectorAll('[data-spot]').forEach(c => c.addEventListener('pointermove', e => {
  const r = c.getBoundingClientRect();
  c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
}));

// ---------- portfolio gallery ----------
const WORK = [
  [12, 'social'], [13, 'social'], [14, 'social'], [15, 'social'], [16, 'social'], [17, 'social'],
  [18, 'social'], [19, 'social'], [20, 'social'], [21, 'social'],
  [22, 'story'], [23, 'story'],
  [25, 'logo'], [26, 'logo'], [27, 'logo'], [28, 'logo'],
  [30, 'print'], [31, 'print']
];
const gallery = document.getElementById('gallery');
gallery.innerHTML = WORK.map(([n, cat]) =>
  `<button data-cat="${cat}" data-src="assets/work/work-${n}.jpg" data-cursor="view"><img src="assets/work/work-${n}.jpg" alt="Green Marketing portfolio — ${cat}" loading="lazy" width="1600" height="900"></button>`).join('');
document.querySelectorAll('.filter').forEach(f => f.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(x => x.classList.toggle('is-active', x === f));
  gallery.querySelectorAll('button').forEach(b => b.classList.toggle('is-hidden', f.dataset.f !== 'all' && b.dataset.cat !== f.dataset.f));
}));

// ---------- lightbox ----------
const lb = document.getElementById('lightbox'), lbImg = document.getElementById('lbImg');
let list = [], idx = 0;
const show = () => { lbImg.src = list[idx]; };
function openLb(src, srcs) { list = srcs; idx = Math.max(0, srcs.indexOf(src)); show(); lb.hidden = false; root.classList.add('lb-open'); }
function closeLb() { lb.hidden = true; root.classList.remove('lb-open'); }
let tx = null, ty = null;
lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
lb.addEventListener('touchend', e => {
  if (tx === null || e.touches.length) return;
  const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty; tx = null;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) document.getElementById(dx < 0 ? 'lbNext' : 'lbPrev').click();
  else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) closeLb();
}, { passive: true });
gallery.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  openLb(b.dataset.src, [...gallery.querySelectorAll('button:not(.is-hidden)')].map(x => x.dataset.src));
});
document.querySelectorAll('[data-open]').forEach(c => { c.dataset.cursor = 'view'; c.addEventListener('click', () => { const s = 'assets/work/' + c.dataset.open; openLb(s, [s]); }); });
document.getElementById('lbClose').onclick = closeLb;
document.getElementById('lbPrev').onclick = () => { idx = (idx - 1 + list.length) % list.length; show(); };
document.getElementById('lbNext').onclick = () => { idx = (idx + 1) % list.length; show(); };
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowRight') document.getElementById('lbNext').click();
  if (e.key === 'ArrowLeft') document.getElementById('lbPrev').click();
});

// ---------- Terms & Conditions popup (content loaded once from terms.html) ----------
const tModal = document.getElementById('termsModal'), tBody = document.getElementById('termsBody');
let termsLoaded = null;
function loadTerms() {
  termsLoaded ??= fetch('terms.html').then(r => { if (!r.ok) throw 0; return r.text(); }).then(html => {
    const body = new DOMParser().parseFromString(html, 'text/html').querySelector('.legal__body');
    body.querySelectorAll('h1, .eyebrow').forEach(n => n.remove()); // the popup has its own title
    tBody.innerHTML = body.innerHTML;
  });
  return termsLoaded;
}
function jumpTerms(where) {
  const id = where === 'privacy' ? (root.lang === 'en' ? 'privacy-en' : 'privacy') : null;
  const target = id && tBody.querySelector('#' + id);
  tBody.scrollTo({ top: target ? target.offsetTop - 8 : 0, behavior: 'auto' });
  tModal.querySelectorAll('[data-jump]').forEach(b => b.classList.toggle('is-active', b.dataset.jump === (where === 'privacy' ? 'privacy' : 'top')));
}
async function openTerms(where) {
  if (!tModal || typeof tModal.showModal !== 'function') return false;
  try { await loadTerms(); } catch (e) { termsLoaded = null; return false; } // e.g. opened from file:// -> fall back to the page
  tModal.showModal(); root.classList.add('lb-open');
  requestAnimationFrame(() => jumpTerms(where));
  return true;
}
function closeTerms() { tModal.close(); }
tModal?.addEventListener('close', () => root.classList.remove('lb-open'));
tModal?.addEventListener('click', e => { if (e.target === tModal) closeTerms(); }); // tap on the dimmed backdrop
tModal?.querySelectorAll('[data-close-terms]').forEach(b => b.addEventListener('click', closeTerms));
tModal?.querySelectorAll('[data-jump]').forEach(b => b.addEventListener('click', () => jumpTerms(b.dataset.jump)));
document.querySelectorAll('[data-terms]').forEach(a => a.addEventListener('click', async e => {
  e.preventDefault();
  if (!(await openTerms(a.dataset.terms))) location.href = a.getAttribute('href');
}));
tBody?.addEventListener('scroll', () => {
  const p = tBody.querySelector(root.lang === 'en' ? '#privacy-en' : '#privacy');
  if (p) tModal.querySelectorAll('[data-jump]').forEach(b => b.classList.toggle('is-active', (b.dataset.jump === 'privacy') === (tBody.scrollTop + 60 >= p.offsetTop)));
}, { passive: true });
// prefetch quietly so the popup opens instantly
addEventListener('load', () => setTimeout(() => loadTerms().catch(() => { termsLoaded = null; }), 2500));

// ---------- contact form -> email ----------
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const body = `Name: ${d.get('name')}\nPhone: ${d.get('phone')}\nService: ${d.get('service')}\n\n${d.get('msg')}`;
  location.href = 'mailto:info@greenmarketingjo.com?subject=' + encodeURIComponent('New project — ' + d.get('service')) + '&body=' + encodeURIComponent(body);
});

// ---------- 3D tilt + glare (mouse / trackpad only) ----------
const canTilt = finePointer && !reduceMotion;
document.querySelectorAll('.case, .about__photo, #gallery button, .step').forEach(el => { if (!el.dataset.tilt) el.dataset.tilt = '7'; });
document.querySelectorAll('[data-tilt]').forEach(el => {
  if (!el.querySelector(':scope > .glare')) el.insertAdjacentHTML('beforeend', '<span class="glare" aria-hidden="true"></span>');
  if (!canTilt) return;
  const max = +el.dataset.tilt; let raf = 0;
  el.addEventListener('pointermove', e => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--rx', (-py * max).toFixed(2) + 'deg'); el.style.setProperty('--ry', (px * max).toFixed(2) + 'deg');
      el.style.setProperty('--gx', ((px + 0.5) * 100).toFixed(1) + '%'); el.style.setProperty('--gy', ((py + 0.5) * 100).toFixed(1) + '%');
      el.classList.add('is-tilting');
    });
  });
  el.addEventListener('pointerleave', () => { cancelAnimationFrame(raf); el.classList.remove('is-tilting'); el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
});

// ---------- magnetic buttons + custom cursor (desktop only) ----------
if (canTilt) {
  document.querySelectorAll('.magnetic').forEach(b => {
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.22}px ${(e.clientY - r.top - r.height / 2) * 0.3}px`; });
    b.addEventListener('pointerleave', () => { b.style.translate = ''; });
  });
  const cur = document.getElementById('cursor'), label = document.getElementById('cursorLabel');
  let cx = innerWidth / 2, cy = innerHeight / 2, x = cx, y = cy;
  addEventListener('pointermove', e => { cx = e.clientX; cy = e.clientY; cur.classList.add('is-on'); }, { passive: true });
  document.addEventListener('pointerleave', () => cur.classList.remove('is-on'));
  document.addEventListener('pointerover', e => {
    const v = e.target.closest('[data-cursor="view"]'), h = e.target.closest('a, button, [data-tilt], input, select, textarea');
    cur.classList.toggle('is-label', !!v); cur.classList.toggle('is-hover', !v && !!h);
    label.textContent = v ? t('cursor.view') : '';
  });
  (function follow() { x += (cx - x) * 0.2; y += (cy - y) * 0.2; cur.style.transform = `translate(${x}px, ${y}px)`; requestAnimationFrame(follow); })();
}

// ---------- reveal on scroll ----------
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- loader ----------
function hideLoader() { document.getElementById('loader')?.classList.add('is-done'); }
if (document.readyState === 'complete') hideLoader(); else addEventListener('load', hideLoader);
setTimeout(hideLoader, 2500);

// ---------- 3D hero scene: load Three.js only after the page is ready ----------
function load3D() {
  if (!document.getElementById('hero3d')) return;
  const s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  s.onload = () => { const m = document.createElement('script'); m.src = 'three-scene.js'; document.body.appendChild(m); };
  document.body.appendChild(s);
}
if (document.readyState === 'complete') setTimeout(load3D, 200);
else addEventListener('load', () => ('requestIdleCallback' in window ? requestIdleCallback(load3D, { timeout: 1500 }) : setTimeout(load3D, 300)));
