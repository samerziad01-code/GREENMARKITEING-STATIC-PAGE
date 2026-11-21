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
  'hero.lead': 'Social media, branding, production and websites — with real results.',
  'hero.cta1': 'Book a free consultation', 'hero.cta2': 'See our websites',
  'hero.f1': 'brands trust us', 'hero.f3': 'Websites for every business',
  'st.1': 'clients & brands', 'st.2': 'services under one roof', 'st.3': 'specialized departments', 'st.4': 'integrated marketing',
  'about.eyebrow': 'About us — Hello!',
  'about.statement': 'We build brands that stand out, reach their audience, and grow.',
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
  'web.sub': 'Restaurant, clinic, store or company — we design your site from scratch: fast, responsive and ready to sell.',
  'web.note': '* Illustrative demos with fictional names to show our style.',
  'wf.1': 'Responsive on every screen', 'wf.2': 'Arabic & English', 'wf.3': 'Lightning-fast loading', 'wf.4': 'SEO-ready', 'wf.5': 'Easy admin dashboard', 'wf.6': 'Online payments & WhatsApp', 'wf.7': 'Online bookings & orders', 'wf.8': 'Hosting, domain & emails',
  'web.every': 'We build websites for…', 'web.cta': 'Get a website for your business',
  'pr.eyebrow': 'How we work', 'pr.title': 'From idea… to launch… to growth',
  'pr.1t': 'Discover', 'pr.1': 'We learn your brand, audience, competitors and goals.',
  'pr.2t': 'Plan', 'pr.2': 'A clear strategy for content, channels and budget.',
  'pr.3t': 'Create & build', 'pr.3': 'Design, photography, content, websites and campaigns.',
  'pr.4t': 'Launch & grow', 'pr.4': 'We measure results and keep improving.',
  'work.eyebrow': 'Our work', 'work.title': 'Work that speaks for itself',
  'work.more': 'Show more work', 'work.brand': 'Branding',
  'work.all': 'All', 'work.social': 'Social media', 'work.story': 'Stories', 'work.print': 'Print',
  'case.title': 'The stories behind the designs',
  'case.ftj': 'Represents the future, achieving goals, and moving forward toward success, by combining the letters F + T + J in a modern design that reflects ambition, direction, and progress.',
  'case.well': 'WELL represents food made with care, quality, and purpose. The hand and burger symbolize craftsmanship, while the bold orange adds energy and appetite.',
  'case.sens': "A printed packaging box for a 32-inch LED TV gift from Sensilis — soft pink palette, clean layout and modern aesthetic reflecting the brand's identity.",
  'cl.eyebrow': 'Our clients', 'cl.title': '25+ brands trust us',
  'cta.title': 'Ready to make your brand <em>the talk of the town?</em>', 'cta.wa': 'Free WhatsApp consultation', 'cs.title': 'Free consultation on WhatsApp', 'cs.sub': 'Answer 7 quick questions and we will get back to you with a plan that fits your project', 'cta.form': 'Send your project details',
  'ct.title': 'Welcome to Green!',
  'ct.p': 'Tell us about your project and we will get back to you with a clear plan.',
  'ct.form': 'Tell us about your project', 'ct.name': 'Name', 'ct.phone': 'Phone number', 'ct.service': 'Service needed', 'ct.optweb': 'Website', 'ct.msg': 'Your message',
  'ct.send': 'Send message', 'ct.hint': 'Your email app will open to send the message.', 'ct.agree': 'By sending your message you agree to our',
  'ft.tag': 'We turn ideas into impact.', 'ft.terms': 'Terms & Conditions', 'ft.privacy': 'Privacy Policy', 'ft.rights': 'All rights reserved.',
  'ft.note': 'All designs and works shown belong to their respective owners and are displayed with permission as part of the agency portfolio.',
  'cursor.view': 'View',
  'tm.full': 'Open as full page', 'tm.ok': 'Got it',
  'rl.tap': 'Tap to play the video', 'rl.eyebrow': 'From Instagram', 'rl.title': 'Not all marketing… is marketing',
  'rl.sub': 'See our latest work from behind the scenes — follow us for shoots, designs and results as they happen.',
  'rl.followers': 'followers on Instagram', 'rl.follow': 'Follow us on Instagram', 'rl.note': 'Playing the video loads content from Instagram.',
  'ct.map': 'Wasfi Al-Tal St., Amman'
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
  syncLangUrl();
  root.classList.remove('i18n-pending');
}
// Each language has its own address (/ = English, /ar = Arabic) so shared links and Google open the right one.
const META = {
  en: { title: document.title, desc: document.querySelector('meta[name="description"]')?.content },
  ar: { title: 'جرين ماركيتنغ | وكالة تسويق إبداعية في الأردن — Green Marketing Agency', desc: 'جرين ماركيتنغ وكالة تسويق إبداعية في الأردن: إدارة سوشال ميديا، هوية بصرية وشعارات، تصوير وإنتاج، إعلانات Google و SEO، ومواقع وتطبيقات لكل المنشآت. استشارة مجانية على واتساب.' }
};
function syncLangUrl() {
  const m = META[root.lang === 'ar' ? 'ar' : 'en'];
  document.title = m.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', m.desc);
  if (!/^\/(ar\/?|en\/?|index\.html)?$/.test(location.pathname)) return; // only on the home page
  const want = root.lang === 'ar' ? '/ar' : '/';
  const canon = document.querySelector('link[rel="canonical"]');
  if (canon) canon.href = new URL(want, canon.href).href;
  if (location.pathname !== want) history.replaceState(history.state, '', want + location.search + location.hash);
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

// ---------- work: one card per client, laid out in our own design ----------
// Each card is a new composition: brand colour, logo, what we did, and a fanned collage of the pieces.
// pieces: [file, category, width, height]
const PROJECTS = [
  { name: 'Well', logo: 'well', c1: '#2a1f14', c2: '#f2a81d', ind: ['مطعم برجر', 'Burger restaurant'],
    pieces: [['brand-well-logo', 'brand', 892, 612], ['social-well-combo', 'social', 514, 664], ['print-well-menu-spread', 'print', 1000, 401], ['brand-well-identity', 'brand', 1000, 444], ['print-well-menu', 'print', 591, 361]] },
  { name: 'Sensilis', logo: 'sensilis', c1: '#5c2a3a', c2: '#e7a3b4', ind: ['عناية بالبشرة', 'Skincare'],
    pieces: [['story-sensilis-skin', 'story', 525, 936], ['social-sensilis-care', 'social', 640, 768], ['print-sensilis-box', 'print', 977, 689], ['social-sensilis-glow', 'social', 787, 1000], ['story-sensilis-glow', 'story', 524, 939], ['story-sensilis-routine', 'story', 524, 939]] },
  { name: 'Kaf Coffee Roasters', logo: 'kaf', c1: '#2b1a10', c2: '#b07a4a', ind: ['محمصة قهوة', 'Coffee roastery'],
    pieces: [['story-kaf-jordanian', 'story', 525, 937], ['social-kaf-beans', 'social', 668, 840], ['social-kaf-espresso', 'social', 641, 791], ['story-kaf-cafe', 'story', 524, 908], ['story-kaf-cup', 'story', 423, 939]] },
  { name: 'Future Targets jo', logo: '', c1: '#0d2a44', c2: '#3f8fd0', ind: ['هوية شركة', 'Company identity'],
    pieces: [['brand-ftj-logo', 'brand', 732, 832], ['brand-ftj-identity', 'brand', 1000, 861], ['brand-ftj-palette', 'brand', 989, 746]] },
  { name: 'Shahrazad', logo: 'shahrazad', c1: '#4a1410', c2: '#e0693c', ind: ['مطعم ومشروبات', 'Food & drinks'],
    pieces: [['social-shahrazad-summer', 'social', 703, 1000], ['social-shahrazad-taste', 'social', 898, 826], ['social-shahrazad-drinks', 'social', 688, 738]] },
  { name: '360 Automotive', logo: '360-automotive', c1: '#111a24', c2: '#5d7d9c', ind: ['خدمات سيارات', 'Car services'],
    pieces: [['social-360-automotive', 'social', 640, 761], ['story-360-automotive', 'story', 557, 1000]] },
  { name: 'Oishi', logo: 'oishi', c1: '#3d0d0d', c2: '#e04b3a', ind: ['مطعم آسيوي', 'Asian food'],
    pieces: [['social-oishi-bite', 'social', 720, 1000], ['social-oishi-noodles', 'social', 672, 862]] },
  { name: 'Holiday', logo: 'holiday', c1: '#08324a', c2: '#2aa1c9', ind: ['سياحة وسفر', 'Travel'],
    pieces: [['social-holiday-memories', 'social', 634, 790], ['social-holiday-sharm', 'social', 656, 821]] },
  { name: 'Rawaq Travel · First Line', logo: 'rawaq', c1: '#1d2b1a', c2: '#c9a24a', ind: ['حملات سفر', 'Travel campaigns'],
    pieces: [['social-rawaq-umrah', 'social', 647, 795], ['social-first-line-petra', 'social', 640, 796]] },
  { name: 'Ahwet Mazaya · Al Joud · Dukkan Lahm', logo: 'ahwet-mazaya', c1: '#173a1b', c2: '#41A223', ind: ['مطاعم ومقاهي', 'Restaurants & cafés'],
    pieces: [['social-ahwet-mazaya-kiwi', 'social', 785, 1000], ['social-al-joud-lunch', 'social', 664, 815], ['social-dukkan-lahm-box', 'social', 506, 647], ['social-bite-into-crunch', 'social', 647, 768], ['social-match-night', 'social', 646, 768]] },
  { name: 'Menus', logo: '', c1: '#2f2a22', c2: '#cdb48a', ind: ['منيوهات وطباعة', 'Menus & print'],
    pieces: [['print-menu-trifold', 'print', 591, 408], ['print-menu-cover', 'print', 349, 815]] }
];
const CAT = {
  social: { ar: 'سوشال ميديا', en: 'Social media' }, story: { ar: 'ستوري', en: 'Stories' },
  brand: { ar: 'هوية بصرية', en: 'Brand identity' }, print: { ar: 'طباعة وتغليف', en: 'Print & packaging' }
};
const FIRST = 6; // cards shown before "show more" (desktop)
const gallery = document.getElementById('gallery'), moreBtn = document.getElementById('workMore');
let activeFilter = 'all', expanded = false;
const isEn = () => root.lang === 'en';
const catLabel = c => CAT[c][isEn() ? 'en' : 'ar'];
const cats = p => [...new Set(p.pieces.map(x => x[1]))];
// the collage: up to 3 pieces, the strongest in front; each sits in a box with its own ratio (never stretched)
function collage(p) {
  const pick = p.pieces.slice(0, 3);
  const order = pick.length === 3 ? [1, 0, 2] : pick.length === 2 ? [1, 0] : [0]; // [left, front, right]
  const slots = pick.length === 3 ? ['l', 'f', 'r'] : pick.length === 2 ? ['l', 'f'] : ['f'];
  return order.map((k, n) => {
    const [f, cat, w, h] = pick[k], r = w / h, shape = cat === 'story' ? 'story' : r > 1.25 ? 'wide' : 'tall';
    return `<span class="shot shot--${slots[n]} shot--${shape}" style="--r:${(w / h).toFixed(3)}"><img src="assets/portfolio/${f}.webp" alt="" width="${w}" height="${h}" loading="lazy" decoding="async"></span>`;
  }).join('');
}
function renderWork() {
  gallery.innerHTML = PROJECTS.map((p, i) => `
    <article class="proj" data-i="${i}" data-cats="${cats(p).join(' ')}" style="--c1:${p.c1};--c2:${p.c2}">
      <button type="button" class="proj__btn" data-cursor="view" aria-label="${p.name} — ${isEn() ? 'view work' : 'شوف الشغل'}">
        <span class="proj__stage">${collage(p)}</span>
        <span class="proj__info">
          <span class="proj__head">
            ${p.logo ? `<img class="proj__logo" src="assets/clients/${p.logo}.webp" alt="" loading="lazy" decoding="async">` : `<span class="proj__logo proj__logo--txt" aria-hidden="true">${p.name[0]}</span>`}
            <span class="proj__title"><bdi>${p.name}</bdi><small>${p.ind[isEn() ? 1 : 0]}</small></span>
          </span>
          <span class="proj__foot">
            <span class="proj__tags">${cats(p).map(c => `<span>${catLabel(c)}</span>`).join('')}</span>
            <span class="proj__count">${p.pieces.length} <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
          </span>
        </span>
      </button>
    </article>`).join('');
  applyWorkFilter();
}
function applyWorkFilter() {
  let shown = 0;
  gallery.querySelectorAll('.proj').forEach(el => {
    const match = activeFilter === 'all' || el.dataset.cats.split(' ').includes(activeFilter);
    const visible = match && (expanded || activeFilter !== 'all' || shown < FIRST);
    if (match && visible) shown++;
    el.classList.toggle('is-hidden', !match);       // filtered out everywhere
    el.classList.toggle('is-more', match && !visible); // hidden on desktop until "show more" (phones swipe through all)
  });
  gallery.scrollLeft = 0;
  moreBtn.hidden = expanded || activeFilter !== 'all' || PROJECTS.length <= FIRST;
}
document.querySelectorAll('.filter').forEach(f => f.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(x => x.classList.toggle('is-active', x === f));
  activeFilter = f.dataset.f; applyWorkFilter();
}));
moreBtn?.addEventListener('click', () => { expanded = true; applyWorkFilter(); });
renderWork();
document.addEventListener('langchange', renderWork);

// ---------- client logos: two rows drifting in opposite directions ----------
const CLIENTS = [
  ['holiday', 'Holiday'], ['kaf', 'Kaf Coffee Roasters'], ['sensilis', 'Sensilis'], ['well', 'Well'], ['oishi', 'Oishi'],
  ['shahrazad', 'Shahrazad'], ['rawaq', 'Rawaq Travel'], ['360-automotive', '360 Automotive'], ['first-line', 'First Line'],
  ['ropes', 'Ropes Restaurant & Cafe'], ['afaq-royal', 'Afaq Royal'], ['network', 'network'], ['dinar-city', 'Dinar City'],
  ['engine', 'Engine Car Rental'], ['gloria', 'Gloria Nail Lounge'], ['ahwet-mazaya', 'Ahwet Mazaya'], ['aya-sushi', 'Aya Sushi'],
  ['palestine', 'Palestine Drinks'], ['stay-and-play', 'Stay & Play'], ['sawani', 'Sawani'], ['al-joud', 'Al Joud'],
  ['qeshta', 'Qeshta Factory'], ['farouj-al-sham', 'Farouj Al Sham'], ['dukkan-lahm', 'Dukkan Lahm'], ['jar-nar', 'Jar Nar']
];
(function renderLogos() {
  const host = document.getElementById('logos'); if (!host) return;
  const tile = ([f, n]) => `<li class="logo"><img src="assets/clients/${f}.webp" alt="${n}" loading="lazy" decoding="async"></li>`;
  const half = Math.ceil(CLIENTS.length / 2);
  const row = (items, rev) => `<div class="logos__row${rev ? ' logos__row--rev' : ''}"><ul class="logos__track">${items.map(tile).join('')}</ul><ul class="logos__track" aria-hidden="true">${items.map(tile).join('')}</ul></div>`;
  host.innerHTML = row(CLIENTS.slice(0, half)) + row(CLIENTS.slice(half), true);
})();

// ---------- lightbox ----------
const lb = document.getElementById('lightbox'), lbImg = document.getElementById('lbImg'), lbCap = document.getElementById('lbCap');
let list = [], idx = 0;
const show = () => { const it = list[idx]; lbImg.src = it.src; lbImg.alt = it.cap; lbCap.textContent = it.cap; };
function openLb(i, items) { list = items; idx = Math.max(0, i); show(); lb.hidden = false; root.classList.add('lb-open'); }
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
  const card = e.target.closest('.proj'); if (!card || !e.target.closest('.proj__btn')) return;
  const p = PROJECTS[+card.dataset.i];
  // the selected filter narrows the pieces too (e.g. only Sensilis stories)
  const pieces = p.pieces.filter(x => activeFilter === 'all' || x[1] === activeFilter);
  openLb(0, pieces.map(([f, cat], n) => ({ src: `assets/portfolio/${f}.webp`, cap: `${p.name} · ${catLabel(cat)} · ${n + 1}/${pieces.length}` })));
});
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

// ---------- Instagram reel: load the official embed only when the visitor presses play ----------
const reelBtn = document.getElementById('reelPlay');
reelBtn?.addEventListener('click', () => {
  const id = reelBtn.dataset.reel;
  const f = document.createElement('iframe');
  f.className = 'reel__frame';
  f.src = `https://www.instagram.com/reel/${encodeURIComponent(id)}/embed/`;
  f.title = 'Green Marketing Agency — Instagram reel';
  f.allow = 'autoplay; encrypted-media; picture-in-picture; clipboard-write';
  f.setAttribute('allowfullscreen', '');
  f.loading = 'eager';
  reelBtn.replaceWith(f);
});

// ---------- contact form -> email ----------
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const body = `Name: ${d.get('name')}\nPhone: ${d.get('phone')}\nService: ${d.get('service')}\n\n${d.get('msg')}`;
  location.href = 'mailto:info@greenmarketingjo.com?subject=' + encodeURIComponent('New project — ' + d.get('service')) + '&body=' + encodeURIComponent(body);
});

// ---------- 3D tilt + glare (mouse / trackpad only) ----------
const canTilt = finePointer && !reduceMotion;
document.querySelectorAll('.about__photo, .step').forEach(el => { if (!el.dataset.tilt) el.dataset.tilt = '7'; });
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
