/* Green Marketing — free WhatsApp consultation wizard.
   A few quick questions -> a neat, pre-written WhatsApp message to the agency.
   Nothing is sent automatically: the visitor reviews the message and taps "send" inside WhatsApp. */
(function () {
  const PHONE = '962796600022';
  const root = document.documentElement;
  const L = () => (root.lang === 'en' ? 'en' : 'ar');
  const T = o => o[L()];

  const UI = {
    title: { ar: 'استشارة مجانية على واتساب', en: 'Free WhatsApp consultation' },
    kicker: { ar: 'جاوب على أسئلة سريعة — أقل من دقيقة', en: 'A few quick questions — under a minute' },
    step: { ar: 'سؤال', en: 'Question' }, of: { ar: 'من', en: 'of' },
    multi: { ar: 'تقدر تختار أكثر من خيار', en: 'You can pick more than one' },
    optional: { ar: 'اختياري', en: 'Optional' },
    next: { ar: 'التالي', en: 'Next' }, back: { ar: 'رجوع', en: 'Back' }, skip: { ar: 'تخطي', en: 'Skip' },
    review: { ar: 'مراجعة الرسالة', en: 'Review message' },
    send: { ar: 'ابعث على واتساب', en: 'Send on WhatsApp' },
    direct: { ar: 'أو احكي معنا مباشرة بدون أسئلة', en: 'Or just chat with us directly' },
    detailsTitle: { ar: 'آخر خطوة: عرّفنا عليك', en: 'Last step: tell us who you are' },
    name: { ar: 'اسمك', en: 'Your name' }, biz: { ar: 'اسم المنشأة', en: 'Business name' },
    notes: { ar: 'شي حابب تضيفه؟ (فكرة، رابط صفحتك، منافس بتحب أسلوبه…)', en: 'Anything to add? (idea, your page link, a competitor you like…)' },
    time: { ar: 'أفضل وقت نتواصل فيه', en: 'Best time to reach you' },
    preview: { ar: 'هيك رح توصلنا رسالتك:', en: "Here's the message we'll receive:" },
    note: { ar: 'رح ينفتح واتساب والرسالة جاهزة — بتقدر تعدّلها قبل الإرسال.', en: 'WhatsApp will open with the message ready — you can edit it before sending.' },
    needName: { ar: 'اكتب اسمك لو سمحت', en: 'Please enter your name' },
    // no emoji in the WhatsApp text: 4-byte emoji turn into "?" when WhatsApp Desktop opens a wa.me link
    hello: { ar: 'مرحبا Green Marketing،\nبدي استشارة مجانية لمشروعي:', en: 'Hi Green Marketing,\nI would like a free consultation for my project:' },
    lName: { ar: 'الاسم', en: 'Name' }, lBiz: { ar: 'المنشأة', en: 'Business' }, lNotes: { ar: 'ملاحظات', en: 'Notes' }, lTime: { ar: 'أفضل وقت للتواصل', en: 'Best time to reach me' },
    thanks: { ar: 'شكرًا!', en: 'Thank you!' }
  };

  // The questions. type: one | multi ; optional questions can be skipped.
  const Q = [
    { id: 'type', type: 'one', label: { ar: 'نوع المنشأة', en: 'Business type' },
      q: { ar: 'شو نوع منشأتك؟', en: 'What kind of business do you have?' },
      opts: [
        ['🍽️', 'مطعم أو كافيه', 'Restaurant / café'], ['🩺', 'عيادة أو مركز طبي', 'Clinic / medical'], ['🏢', 'عقارات أو إنشاءات', 'Real estate / construction'],
        ['💄', 'تجميل أو صالون', 'Beauty / salon'], ['✈️', 'سفر وسياحة', 'Travel & tourism'], ['🛍️', 'متجر أو تجارة', 'Store / retail'],
        ['🚗', 'سيارات', 'Automotive'], ['🎓', 'تعليم وتدريب', 'Education & training'], ['💼', 'شركة خدمات', 'Services company'], ['✨', 'غير ذلك', 'Other']
      ] },
    { id: 'services', type: 'multi', label: { ar: 'الخدمات المطلوبة', en: 'Services needed' },
      q: { ar: 'شو الخدمات اللي بتحتاجها؟', en: 'Which services do you need?' },
      opts: [
        ['🌐', 'موقع إلكتروني', 'Website'], ['📱', 'تطبيق موبايل', 'Mobile app'], ['📣', 'إدارة سوشال ميديا', 'Social media management'],
        ['🎨', 'شعار وهوية بصرية', 'Logo & brand identity'], ['🎬', 'تصوير وفيديو', 'Photo & video'], ['🎯', 'إعلانات ممولة', 'Paid ads'],
        ['🔎', 'تحسين ظهور بجوجل SEO', 'Google ranking (SEO)'], ['🖨️', 'طباعة وتغليف', 'Printing & packaging'], ['🧭', 'خطة تسويقية', 'Marketing plan'], ['🤔', 'مش متأكد — بدي نصيحتكم', "Not sure — I'd like your advice"]
      ] },
    { id: 'goal', type: 'one', label: { ar: 'الهدف الأساسي', en: 'Main goal' },
      q: { ar: 'شو أهم هدف بدك توصله؟', en: "What's your main goal?" },
      opts: [
        ['📈', 'زيادة المبيعات', 'More sales'], ['🤝', 'عملاء جدد', 'New customers'], ['⭐', 'علامة تجارية أقوى وأشهر', 'A stronger, better-known brand'],
        ['🚀', 'إطلاق مشروع جديد', 'Launching a new business'], ['💻', 'حضور أونلاين احترافي', 'A professional online presence']
      ] },
    { id: 'current', type: 'multi', label: { ar: 'الموجود حاليًا', en: 'Already have' },
      q: { ar: 'شو عندك حاليًا؟', en: 'What do you already have?' },
      opts: [
        ['🌐', 'موقع إلكتروني', 'A website'], ['📲', 'صفحات سوشال ميديا', 'Social media pages'], ['🎨', 'شعار وهوية', 'Logo & identity'],
        ['📸', 'صور وفيديوهات لمنتجاتي', 'Product photos & videos'], ['🌱', 'ولا شي — ببلّش من الصفر', 'Nothing yet — starting from scratch']
      ] },
    { id: 'when', type: 'one', label: { ar: 'موعد البدء', en: 'Start date' },
      q: { ar: 'إيمتى حابب تبلّش؟', en: 'When would you like to start?' },
      opts: [
        ['⚡', 'فورًا', 'Right away'], ['📅', 'خلال شهر', 'Within a month'], ['🗓️', 'خلال 3 شهور', 'Within 3 months'], ['👀', 'لسا بستكشف', 'Just exploring']
      ] },
    { id: 'budget', type: 'one', optional: true, label: { ar: 'الميزانية التقريبية', en: 'Approx. budget' },
      q: { ar: 'كم الميزانية التقريبية؟', en: "What's your approximate budget?" },
      hint: { ar: 'بتساعدنا نقترح الحل الأنسب — ومش ملزم', en: 'Helps us suggest the best fit — not binding' },
      opts: [
        ['💵', 'أقل من 300 د.أ', 'Under JOD 300'], ['💵', '300 – 1,000 د.أ', 'JOD 300 – 1,000'], ['💰', '1,000 – 3,000 د.أ', 'JOD 1,000 – 3,000'],
        ['💎', 'أكثر من 3,000 د.أ', 'Over JOD 3,000'], ['🤷', 'مش متأكد', 'Not sure yet']
      ] }
  ];
  const TIMES = [['صباحًا', 'Morning'], ['بعد الظهر', 'Afternoon'], ['مساءً', 'Evening'], ['أي وقت', 'Any time']];

  /* ---------- state ---------- */
  const st = { step: 0, a: {}, name: '', biz: '', notes: '', time: 3 };
  const total = Q.length + 1; // + details step

  /* ---------- dialog ---------- */
  const dlg = document.createElement('dialog');
  dlg.className = 'wiz'; dlg.id = 'consultModal'; dlg.setAttribute('aria-labelledby', 'wizTitle');
  document.body.appendChild(dlg);

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const optText = (qi, oi) => Q[qi].opts[oi][L() === 'en' ? 2 : 1];

  function message() {
    const lines = [T(UI.hello), ''];
    if (st.name.trim()) lines.push(`• ${T(UI.lName)}: ${st.name.trim()}`);
    const typeTxt = st.a.type != null ? optText(0, st.a.type) : '';
    if (st.biz.trim() || typeTxt) lines.push(`• ${T(UI.lBiz)}: ${[st.biz.trim(), typeTxt && `(${typeTxt})`].filter(Boolean).join(' ')}`);
    Q.forEach((q, qi) => {
      if (qi === 0) return;
      const v = st.a[q.id];
      if (v == null || (Array.isArray(v) && !v.length)) return;
      const txt = Array.isArray(v) ? v.map(oi => optText(qi, oi)).join(L() === 'en' ? ', ' : '، ') : optText(qi, v);
      lines.push(`• ${T(q.label)}: ${txt}`);
    });
    lines.push(`• ${T(UI.lTime)}: ${TIMES[st.time][L() === 'en' ? 1 : 0]}`);
    if (st.notes.trim()) lines.push(`• ${T(UI.lNotes)}: ${st.notes.trim()}`);
    // the site link on its own line makes WhatsApp show the Green Marketing preview card (logo + image)
    lines.push('', T(UI.thanks), '', L() === 'en' ? 'https://greenmarketingjo.com' : 'https://greenmarketingjo.com/?lang=ar');
    // drop any 4-byte emoji a visitor typed (name/notes) so WhatsApp never shows "?"
    return lines.join('\n').replace(/[\u{10000}-\u{10FFFF}]️?/gu, '').replace(/[ \t]+\n/g, '\n');
  }
  const waUrl = text => `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

  function answered(i) {
    if (i >= Q.length) return !!st.name.trim();
    const v = st.a[Q[i].id];
    return Q[i].optional || (Array.isArray(v) ? v.length > 0 : v != null);
  }

  function render(focusFirst) {
    const i = st.step, isDetails = i >= Q.length;
    const pct = Math.round(((i + (answered(i) ? 1 : 0)) / total) * 100);
    let body;
    if (!isDetails) {
      const q = Q[i], v = st.a[q.id];
      const sel = oi => (q.type === 'multi' ? (v || []).includes(oi) : v === oi);
      body = `
        <p class="wiz__count">${T(UI.step)} ${i + 1} ${T(UI.of)} ${total}${q.optional ? ` · <em>${T(UI.optional)}</em>` : ''}</p>
        <h3 class="wiz__q" id="wizQ">${T(q.q)}</h3>
        ${q.type === 'multi' ? `<p class="wiz__hint">${T(UI.multi)}</p>` : q.hint ? `<p class="wiz__hint">${T(q.hint)}</p>` : ''}
        <div class="wiz__opts wiz__opts--${q.type}" role="${q.type === 'multi' ? 'group' : 'radiogroup'}" aria-labelledby="wizQ">
          ${q.opts.map((o, oi) => `<button type="button" class="wiz__opt${sel(oi) ? ' is-on' : ''}" data-oi="${oi}" role="${q.type === 'multi' ? 'checkbox' : 'radio'}" aria-checked="${sel(oi)}"><span class="wiz__emoji" aria-hidden="true">${o[0]}</span><span>${L() === 'en' ? o[2] : o[1]}</span></button>`).join('')}
        </div>`;
    } else {
      body = `
        <p class="wiz__count">${T(UI.step)} ${total} ${T(UI.of)} ${total}</p>
        <h3 class="wiz__q">${T(UI.detailsTitle)}</h3>
        <div class="wiz__fields">
          <label><span>${T(UI.name)} *</span><input id="wizName" autocomplete="name" value="${esc(st.name)}" required></label>
          <label><span>${T(UI.biz)} <em>(${T(UI.optional)})</em></span><input id="wizBiz" autocomplete="organization" value="${esc(st.biz)}"></label>
          <div class="wiz__times"><span>${T(UI.time)}</span><div role="radiogroup">${TIMES.map((t, k) => `<button type="button" class="wiz__time${st.time === k ? ' is-on' : ''}" data-time="${k}" role="radio" aria-checked="${st.time === k}">${L() === 'en' ? t[1] : t[0]}</button>`).join('')}</div></div>
          <label><span>${T(UI.notes)}</span><textarea id="wizNotes" rows="2">${esc(st.notes)}</textarea></label>
        </div>
        <p class="wiz__previewTitle">${T(UI.preview)}</p>
        <pre class="wiz__preview" id="wizPreview" dir="auto">${esc(message())}</pre>
        <p class="wiz__hint">${T(UI.note)}</p>`;
    }
    const q = Q[i];
    const nextLabel = isDetails ? T(UI.send) : (i === Q.length - 1 ? T(UI.review) : T(UI.next));
    dlg.innerHTML = `
      <div class="wiz__head">
        <span class="wiz__badge" aria-hidden="true"><svg viewBox="0 0 32 32"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm5.9 15.7c-.3-.2-1.9-1-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-4.4-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6 0-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 2.1 1 3 1 4 .8.7 0 1.9-.8 2.2-1.6.3-.8.3-1.4.2-1.6l-.6-.3Z"/></svg></span>
        <div class="wiz__headtxt"><h2 id="wizTitle">${T(UI.title)}</h2><p>${T(UI.kicker)}</p></div>
        <button type="button" class="wiz__close" data-wiz="close" aria-label="Close">×</button>
      </div>
      <div class="wiz__bar" aria-hidden="true"><i style="width:${pct}%"></i></div>
      <div class="wiz__body">${body}</div>
      <div class="wiz__foot">
        ${i > 0 ? `<button type="button" class="btn btn--ghost btn--sm" data-wiz="back">${T(UI.back)}</button>` : `<a class="wiz__direct" href="${window.gmWaLink ? window.gmWaLink() : `https://wa.me/${PHONE}`}" target="_blank" rel="noopener">${T(UI.direct)}</a>`}
        <span class="wiz__spacer"></span>
        ${!isDetails && q.optional ? `<button type="button" class="btn btn--ghost btn--sm" data-wiz="skip">${T(UI.skip)}</button>` : ''}
        <button type="button" class="btn btn--solid btn--sm wiz__next${isDetails ? ' wiz__send' : ''}" data-wiz="next" ${answered(i) ? '' : 'disabled'}>${nextLabel}</button>
      </div>`;
    if (focusFirst) (dlg.querySelector('.wiz__opt, #wizName') || dlg.querySelector('[data-wiz=next]'))?.focus({ preventScroll: true });
  }

  function refreshDetails() {
    const pv = dlg.querySelector('#wizPreview'); if (pv) pv.textContent = message();
    const nx = dlg.querySelector('[data-wiz=next]'); if (nx) nx.disabled = !answered(st.step);
    const bar = dlg.querySelector('.wiz__bar i'); if (bar) bar.style.width = Math.round(((st.step + (answered(st.step) ? 1 : 0)) / total) * 100) + '%';
  }

  dlg.addEventListener('click', e => {
    if (e.target === dlg) return close();
    const opt = e.target.closest('.wiz__opt');
    if (opt) {
      const q = Q[st.step], oi = +opt.dataset.oi;
      if (q.type === 'multi') {
        const arr = st.a[q.id] || [];
        st.a[q.id] = arr.includes(oi) ? arr.filter(x => x !== oi) : [...arr, oi];
        render();
        dlg.querySelector(`.wiz__opt[data-oi="${oi}"]`)?.focus({ preventScroll: true });
      } else {
        st.a[q.id] = oi; render();
        setTimeout(() => { if (st.step < Q.length && Q[st.step] === q) go(1); }, 260); // single choice: auto-advance
      }
      return;
    }
    const tm = e.target.closest('.wiz__time');
    if (tm) { st.time = +tm.dataset.time; dlg.querySelectorAll('.wiz__time').forEach(b => { const on = b === tm; b.classList.toggle('is-on', on); b.setAttribute('aria-checked', on); }); refreshDetails(); return; }
    const act = e.target.closest('[data-wiz]')?.dataset.wiz;
    if (act === 'close') close();
    if (act === 'back') go(-1);
    if (act === 'skip') { delete st.a[Q[st.step].id]; go(1); }
    if (act === 'next') {
      if (st.step >= Q.length) {
        if (!st.name.trim()) { dlg.querySelector('#wizName')?.focus(); return; }
        window.open(waUrl(message()), '_blank', 'noopener');
        return;
      }
      if (answered(st.step)) go(1);
    }
  });
  dlg.addEventListener('input', e => {
    if (e.target.id === 'wizName') st.name = e.target.value;
    if (e.target.id === 'wizBiz') st.biz = e.target.value;
    if (e.target.id === 'wizNotes') st.notes = e.target.value;
    refreshDetails();
  });
  dlg.addEventListener('close', () => root.classList.remove('lb-open'));

  function go(d) { st.step = Math.max(0, Math.min(Q.length, st.step + d)); render(true); dlg.querySelector('.wiz__body').scrollTop = 0; }
  function open() {
    if (typeof dlg.showModal !== 'function') return false;
    render(true); dlg.showModal(); root.classList.add('lb-open'); return true;
  }
  function close() { dlg.close(); }

  document.querySelectorAll('[data-consult]').forEach(el => el.addEventListener('click', e => {
    if (open()) e.preventDefault(); // without <dialog> support the link simply opens WhatsApp
  }));
  document.addEventListener('langchange', () => { if (dlg.open) render(); });
  window.GMConsult = { open, close, state: st, message, Q };
})();
