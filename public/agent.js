/* Green Marketing — AI assistant chat widget.
   • With the AI service deployed (Render web service, see AI-AGENT-SETUP.md), answers come from Claude, streamed live.
   • Without it (no API key yet, local preview, service asleep/unreachable), a built-in assistant answers
     common questions from the site's own content, so the chat never breaks. */
(function () {
  // AI service base URL comes from <meta name="gm-ai-api">; falls back to a same-origin /api/chat.
  const API_BASE = (document.querySelector('meta[name="gm-ai-api"]')?.content || '').replace(/\/$/, '');
  const ENDPOINT = API_BASE + '/api/chat';
  const FIRST_BYTE_TIMEOUT = 20000; // a sleeping free-plan service can take ~50s to wake; don't make visitors wait
  const STORE = 'gm-chat-v1';
  const root = document.documentElement;
  const pageLang = () => (root.lang === 'en' ? 'en' : 'ar');
  const T = o => o[pageLang()];
  const hasArabic = s => /[؀-ۿ]/.test(s);

  const UI = {
    name: { ar: 'مساعد Green الذكي', en: 'Green AI assistant' },
    status: { ar: 'متصل · بيرد فورًا', en: 'Online · replies instantly' },
    open: { ar: 'اسألني أي شي 👋', en: 'Ask me anything 👋' },
    ph: { ar: 'اكتب سؤالك هون…', en: 'Type your question…' },
    send: { ar: 'إرسال', en: 'Send' }, reset: { ar: 'محادثة جديدة', en: 'New chat' }, close: { ar: 'إغلاق', en: 'Close' },
    hello: {
      ar: 'أهلًا وسهلًا! 👋 أنا **Green**، المساعد الذكي لـ Green Marketing.\nبقدر أساعدك تعرف شو بتحتاج علامتك، شو خدماتنا، وكيف نبلّش. شو حابب تعرف؟',
      en: "Hi there! 👋 I'm **Green**, Green Marketing's AI assistant.\nI can help you figure out what your brand needs, explain our services, and get you started. What would you like to know?"
    },
    chips: {
      ar: ['شو خدماتكم؟', 'بدي موقع لمطعمي', 'كم بتكلف الخدمات؟', 'كيف بتشتغلوا؟', 'مين عملاؤكم؟', 'كيف أتواصل معكم؟'],
      en: ['What services do you offer?', 'I need a website for my restaurant', 'How much does it cost?', 'How do you work?', 'Who are your clients?', 'How can I contact you?']
    },
    err: { ar: 'صار خطأ بسيط، جرّب كمان مرة.', en: 'Something went wrong — please try again.' },
    disclaimer: { ar: 'مساعد ذكي — للتأكيد النهائي تواصل مع الفريق.', en: 'AI assistant — confirm details with our team.' },
    act: {
      CONSULT: { ar: '💬 ابدأ الاستشارة المجانية', en: '💬 Start free consultation' },
      WHATSAPP: { ar: '🟢 احكي معنا واتساب', en: '🟢 Chat on WhatsApp' },
      WEBSITES: { ar: '🌐 شوف أمثلة المواقع', en: '🌐 See website examples' },
      WORK: { ar: '🎨 شوف أعمالنا', en: '🎨 See our work' },
      CONTACT: { ar: '📞 معلومات التواصل', en: '📞 Contact details' },
      MAP: { ar: '📍 موقعنا على الخريطة', en: '📍 Open in Google Maps' }
    }
  };

  /* ---------- built-in assistant (used when the AI server isn't available) ---------- */
  const norm = s => s.toLowerCase().replace(/[ً-ْـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
  const BIZ = [
    { k: ['مطعم', 'كافي', 'كوفي', 'قهو', 'مقه', 'مشاوي', 'حلويات', 'restaurant', 'cafe', 'coffee', 'food', 'bakery'], ar: 'مطعم/كافيه', en: 'restaurant/café', f: { ar: 'طلب أونلاين وتوصيل، حجز طاولات، ومنيو رقمي QR', en: 'online ordering & delivery, table booking and a QR digital menu' } },
    { k: ['عياد', 'طبي', 'طبيه', 'دكتور', 'اسنان', 'مستشف', 'صيدلي', 'clinic', 'dental', 'doctor', 'medical', 'pharmacy', 'hospital'], ar: 'عيادة', en: 'clinic', f: { ar: 'حجز مواعيد أونلاين، تذكير واتساب، وصفحات للأطباء', en: 'online appointments, WhatsApp reminders and doctor profiles' } },
    { k: ['عقار', 'شقق', 'اسكان', 'انشاءات', 'مقاول', 'real estate', 'property', 'construction'], ar: 'عقارات', en: 'real estate', f: { ar: 'بحث وفلترة ذكية، خرائط وجولات 360°، وطلبات زيارة', en: 'smart search, maps & 360° tours and viewing requests' } },
    { k: ['تجميل', 'صالون', 'بيوتي', 'مكياج', 'beauty', 'salon', 'skin'], ar: 'تجميل/صالون', en: 'beauty/salon', f: { ar: 'متجر منتجات، حجز مواعيد صالون، واختبار تفاعلي', en: 'a product store, salon booking and an interactive quiz' } },
    { k: ['سفر', 'سياح', 'رحلات', 'عمره', 'طيران', 'travel', 'tour', 'trip'], ar: 'سفر وسياحة', en: 'travel', f: { ar: 'محرك حجز رحلات، دفع وأقساط، وإدارة باقات', en: 'a trip booking engine, payments & installments and package management' } },
    { k: ['متجر', 'بيع', 'منتجات', 'اونلاين شوب', 'store', 'shop', 'ecommerce', 'e-commerce'], ar: 'متجر إلكتروني', en: 'online store', f: { ar: 'متجر متعدد البائعين، دفع إلكتروني وعند الاستلام، وتتبع الطلبات', en: 'a multi-vendor marketplace, card & cash payments and order tracking' } },
    { k: ['سيار', 'تاجير', 'معرض سيارات', ' car', 'rental', 'automotive'], ar: 'سيارات/تأجير', en: 'cars/rental', f: { ar: 'حجز بالتاريخ والفرع، دفع وتأمين أونلاين، وإدارة الأسطول', en: 'booking by date & branch, online payment & insurance and fleet management' } },
    { k: ['مدرس', 'جامعه', 'جامعت', 'اكاديمي', 'تدريب', 'تعليم', 'روضه', 'school', 'academy', 'education', 'training'], ar: 'تعليم', en: 'education', f: { ar: 'صفحات للبرامج، تسجيل أونلاين، ولوحة تحكم سهلة', en: 'program pages, online registration and an easy dashboard' } },
    { k: ['فندق', 'منتجع', 'شاليه', 'hotel', 'resort'], ar: 'فندق/منتجع', en: 'hotel', f: { ar: 'حجوزات أونلاين، معرض صور، ودفع إلكتروني', en: 'online bookings, a photo gallery and online payments' } }
  ];
  const INTENTS = [
    { id: 'hello', k: ['مرحبا', 'اهلا', 'هلا', 'السلام', 'هاي', 'صباح', 'مساء', 'hello', 'hi ', 'hey', 'good morning'],
      a: { ar: 'أهلين فيك! 😊 كيف بقدر أساعدك اليوم؟ بتقدر تسألني عن خدماتنا، المواقع، أو كيف نبلّش مشروعك.', en: 'Hey, welcome! 😊 How can I help today? Ask me about our services, websites, or how to start your project.' } },
    { id: 'thanks', k: ['شكرا', 'يسلمو', 'مشكور', 'thanks', 'thank you', 'thx'],
      a: { ar: 'العفو! 🌿 إذا حابب نبلّش، الاستشارة المجانية بتاخد أقل من دقيقة.\n[[CONSULT]]', en: "You're welcome! 🌿 If you'd like to get started, the free consultation takes under a minute.\n[[CONSULT]]" } },
    { id: 'price', k: ['سعر', 'اسعار', 'تكلفه', 'بتكلف', 'كلفه', 'كم بياخد', 'كم السعر', 'ميزانيه', 'غالي', 'price', 'cost', 'how much', 'budget', 'quote'],
      a: { ar: 'السعر بيعتمد على حجم المشروع والخدمات اللي بتحتاجها، فما بنحب نعطي رقم عشوائي. 🙂\nجاوب على أسئلة الاستشارة المجانية (أقل من دقيقة) والفريق بيرجعلك بعرض سعر دقيق يناسب ميزانيتك.\n[[CONSULT]]', en: "Pricing depends on the project's scope and the services you need, so we don't like to throw out a random number. 🙂\nAnswer the free consultation questions (under a minute) and the team will send you an accurate quote that fits your budget.\n[[CONSULT]]" } },
    { id: 'web', k: ['موقع', 'ويب', 'website', 'web site', 'site', 'landing', 'صفحه هبوط'],
      a: null }, // handled specially (business-aware)
    { id: 'app', k: ['تطبيق', 'ابلكيشن', 'اندرويد', 'ايفون', 'ios', 'android', 'app'],
      a: { ar: 'أكيد! بنطوّر **تطبيقات موبايل لـ iOS و Android**، وكمان أنظمة ومنصات ومتاجر متعددة البائعين وتصميم UI/UX. 📱\nشو فكرة التطبيق؟', en: 'Absolutely! We build **mobile apps for iOS & Android**, plus systems, platforms, multi-vendor stores and UI/UX design. 📱\nWhat is your app idea?' } },
    { id: 'social', k: ['سوشال', 'سوشيال', 'انستغرام', 'انستا', 'فيسبوك', 'تيك توك', 'محتوي', 'social', 'instagram', 'facebook', 'tiktok', 'content'],
      a: { ar: 'بنقدّم **إدارة سوشال ميديا** كاملة: خطة محتوى، تصاميم بوستات وستوريز، موشن جرافيك، تصوير، وإعلانات ممولة — لنرفع التفاعل ونبني علاقة قوية مع جمهورك. 📣\n[[WORK]]\n[[CONSULT]]', en: 'We offer full **social media management**: content plans, post & story designs, motion graphics, photography and paid ads — to boost engagement and build a strong bond with your audience. 📣\n[[WORK]]\n[[CONSULT]]' } },
    { id: 'brand', k: ['شعار', 'لوغو', 'لوجو', 'هويه', 'براند', 'logo', 'brand', 'identity'],
      a: { ar: 'بنصمم **شعارات وهويات بصرية** بتعكس شخصية علامتك ورؤيتها — من الفكرة للألوان والخطوط والتطبيقات (كروت، تغليف، يونيفورم…). 🎨\nمثال: هوية Future Targets jo وهوية Well.\n[[WORK]]', en: 'We design **logos and brand identities** that capture your brand\'s personality — from concept to colors, fonts and applications (cards, packaging, uniforms…). 🎨\nExamples: Future Targets jo and Well.\n[[WORK]]' } },
    { id: 'production', k: ['تصوير', 'فيديو', 'درون', 'سينما', 'photo', 'video', 'drone', 'shoot'],
      a: { ar: 'قسم **Green Production** عنا بيقدّم: تصوير درون، جلسات تصوير، فيديو، استوديو تصوير أطعمة، سينماتوغرافي، وستوري بورد. 🎬', en: 'Our **Green Production** team offers drone filming, photoshoots, videography, a food photography studio, cinematography and storyboards. 🎬' } },
    { id: 'ads', k: ['اعلان', 'اعلانات', 'جوجل', 'قوقل', 'seo', 'سيو', 'google', 'ads', 'ranking'],
      a: { ar: 'بنشتغل **إعلانات Google** لأفضل عائد على الاستثمار، و**SEO** لتحسين ظهورك بنتائج البحث، وكمان إعلانات السوشال واللوحات الإعلانية. 🎯', en: 'We run **Google Ads** for the best return on investment, **SEO** to improve your search ranking, plus social ads and billboards. 🎯' } },
    { id: 'services', k: ['خدمات', 'خدماتكم', 'شو بتعملو', 'شو بتشتغلو', 'services', 'what do you do', 'offer'],
      a: { ar: 'عنا **4 أقسام** تحت سقف واحد:\n- **التسويق:** SEO، سوشال ميديا، إعلانات Google، لوحات إعلانية، وخطط تسويقية\n- **التصميم الجرافيكي:** شعارات وهويات، موشن، تصاميم سوشال، طباعة وتغليف\n- **Green Production:** تصوير، فيديو، درون، وسينماتوغرافي\n- **تقنية المعلومات:** مواقع، تطبيقات، متاجر، استضافة وإيميلات\nشو اللي بيهمك أكثر؟', en: 'We have **4 departments** under one roof:\n- **Marketing:** SEO, social media, Google Ads, billboards and marketing plans\n- **Graphic design:** logos & identities, motion, social designs, print & packaging\n- **Green Production:** photo, video, drone and cinematography\n- **IT:** websites, apps, online stores, hosting & emails\nWhich one interests you most?' } },
    { id: 'process', k: ['كيف بتشتغلو', 'خطوات', 'مراحل', 'كيف نبلش', 'كيف ابلش', 'process', 'how do you work', 'steps', 'start'],
      a: { ar: 'شغلنا بيمشي بـ 4 خطوات:\n- **نكتشف:** نفهم علامتك وجمهورك ومنافسينك\n- **نخطط:** استراتيجية واضحة للمحتوى والقنوات والميزانية\n- **نبدع وننفذ:** تصميم، تصوير، محتوى، مواقع وحملات\n- **نطلق ونكبّر:** نقيس النتائج ونحسّن باستمرار\nأول خطوة؟ الاستشارة المجانية 👇\n[[CONSULT]]', en: 'We work in 4 steps:\n- **Discover:** understand your brand, audience and competitors\n- **Plan:** a clear strategy for content, channels and budget\n- **Create & build:** design, photography, content, websites and campaigns\n- **Launch & grow:** measure results and keep improving\nStep one? The free consultation 👇\n[[CONSULT]]' } },
    { id: 'clients', k: ['عملاء', 'عملائكم', 'اعمالكم', 'شغلكم', 'بورتفوليو', 'clients', 'portfolio', 'work', 'projects'],
      a: { ar: 'اشتغلنا مع **+25 علامة تجارية**، منهم: Holiday، Ropes، Kaf Coffee Roasters، Oishi، Sensilis، Engine Car Rental، Well، Shahrazad، First Line، Dinar City وغيرهم. 🤝', en: "We've worked with **25+ brands**, including Holiday, Ropes, Kaf Coffee Roasters, Oishi, Sensilis, Engine Car Rental, Well, Shahrazad, First Line and Dinar City. 🤝" }, after: '[[WORK]]' },
    { id: 'contact', k: ['انستغرامكم', 'انستاكم', 'حسابكم', 'صفحتكم', 'فيسبوككم', 'لينكدان', 'لينكد ان', 'linkedin', 'your facebook', 'your instagram', 'instagram account', 'تواصل', 'رقم', 'هاتف', 'تلفون', 'ايميل', 'بريد', 'واتس', 'contact', 'phone', 'email', 'whatsapp', 'call'],
      a: { ar: 'بتقدر تتواصل معنا على:\n- **واتساب / هاتف:** 0796 600 022\n- **إيميل:** info@greenmarketingjo.com\n- **إنستغرام:** @greenmarketing.jo\n- **فيسبوك:** facebook.com/greenagency.jo\n- **لينكد إن:** Green Marketing Agency\nأو جرّب الاستشارة المجانية وبترجعلك رسالة جاهزة بتفاصيل مشروعك.\n[[WHATSAPP]]\n[[CONSULT]]', en: 'You can reach us on:\n- **WhatsApp / phone:** 0796 600 022\n- **Email:** info@greenmarketingjo.com\n- **Instagram:** @greenmarketing.jo\n- **Facebook:** facebook.com/greenagency.jo\n- **LinkedIn:** Green Marketing Agency\nOr try the free consultation for a ready-made message with your project details.\n[[WHATSAPP]]\n[[CONSULT]]' } },
    { id: 'where', k: ['وين', 'موقعكم', 'عنوان', 'مكتب', 'ساعات', 'دوام', 'where', 'address', 'office', 'hours', 'open'],
      a: { ar: 'مكتبنا بـ **شارع وصفي التل، عمّان** 📍\nأوقات الدوام: **الأحد – الخميس، 9 الصبح – 5 المسا** (الجمعة والسبت عطلة).\n[[MAP]]\n[[WHATSAPP]]', en: "Our office is on **Wasfi Al-Tal St., Amman** 📍\nWorking hours: **Sunday – Thursday, 9 AM – 5 PM** (closed Friday and Saturday).\n[[MAP]]\n[[WHATSAPP]]" } },
    { id: 'time', k: ['قديش بياخد', 'قديش بدو', 'كم يوم', 'كم بياخد وقت', 'مده', 'وقت التسليم', 'متي بخلص', 'متي بيجهز', 'how long', 'timeline', 'deadline', 'delivery time'],
      a: { ar: 'المدة بتعتمد على حجم المشروع. بعد الاستشارة المجانية الفريق بيعطيك جدول زمني واضح. ⏱️\n[[CONSULT]]', en: 'Timing depends on the project size. After the free consultation, the team gives you a clear timeline. ⏱️\n[[CONSULT]]' } },
    { id: 'terms', k: ['شروط', 'سياسه', 'خصوصيه', 'دفعه', 'تعديلات', 'ملكيه', 'terms', 'policy', 'privacy', 'revision', 'payment'],
      a: { ar: 'باختصار: عرض السعر صالح 14 يوم، الشغل بيبلّش بعد الدفعة المقدّمة، كل مشروع إله جولات تعديل محددة، والملكية بتنتقلك بعد السداد الكامل. التفاصيل كاملة بزر **"الشروط والأحكام"** تحت بالموقع.', en: 'In short: quotes are valid 14 days, work starts after the down payment, each project includes set revision rounds, and ownership transfers to you after full payment. Full details under the **"Terms & Conditions"** button in the footer.' } }
  ];

  function localAnswer(q) {
    const lang = hasArabic(q) ? 'ar' : (/[a-z]/i.test(q) ? 'en' : pageLang());
    const n = ' ' + norm(q) + ' ';
    const biz = BIZ.find(b => b.k.some(k => n.includes(k)));
    const hit = id => INTENTS.find(i => i.id === id).k.some(k => n.includes(k));
    if (hit('price')) return pick('price', lang);
    if (hit('time')) return pick('time', lang);
    if (hit('web') || (biz && !hit('social') && !hit('brand') && !hit('app'))) {
      if (biz) return lang === 'en'
        ? `Great choice! 🙌 For a **${biz.en}** we usually build a fast, bilingual website with ${biz.f.en}, plus an easy admin dashboard.\nYou can see a live example in our websites section.\n[[WEBSITES]]\n[[CONSULT]]`
        : `اختيار ممتاز! 🙌 لـ **${biz.ar}** عادةً بنعمل موقع سريع بالعربي والإنجليزي فيه ${biz.f.ar}، مع لوحة تحكم سهلة.\nبتقدر تشوف مثال حي بقسم المواقع.\n[[WEBSITES]]\n[[CONSULT]]`;
      return lang === 'en'
        ? 'We build websites **for every kind of business** — restaurants, clinics, real estate, stores, travel, schools and more: responsive, Arabic & English, SEO-ready, with online payments, bookings and an easy dashboard. 🌐\nWhat kind of business is it for?\n[[WEBSITES]]'
        : 'بنعمل **مواقع لكل أنواع المنشآت** — مطاعم، عيادات، عقارات، متاجر، سفر، مدارس وغيرهم: متجاوبة، عربي وإنجليزي، مهيأة لجوجل، مع دفع إلكتروني وحجوزات ولوحة تحكم سهلة. 🌐\nلأي نوع منشأة بدك الموقع؟\n[[WEBSITES]]';
    }
    for (const id of ['thanks', 'time', 'terms', 'contact', 'where', 'app', 'social', 'brand', 'production', 'ads', 'process', 'clients', 'services', 'hello']) {
      if (hit(id)) return pick(id, lang);
    }
    return lang === 'en'
      ? "Good question! I don't want to give you a wrong answer, so our team is the best to help with that. 🌿\nYou can also ask me about our services, websites, pricing or how we work.\n[[WHATSAPP]]"
      : 'سؤال حلو! ما بدي أعطيك معلومة غلط، فالأفضل الفريق يجاوبك عليه مباشرة. 🌿\nوبتقدر تسألني عن خدماتنا، المواقع، الأسعار، أو كيف بنشتغل.\n[[WHATSAPP]]';
  }
  function pick(id, lang) { const i = INTENTS.find(x => x.id === id); return i.a[lang] + (i.after ? '\n' + i.after : ''); }

  /* ---------- rendering ---------- */
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function parse(text) {
    const actions = [];
    const clean = text.replace(/\[\[(CONSULT|WHATSAPP|WEBSITES|WORK|CONTACT|MAP)\]\]/g, (_, a) => { if (!actions.includes(a)) actions.push(a); return ''; })
      .replace(/\[\[[A-Z]*$/, '') // hide a half-streamed tag
      .trim();
    const lines = esc(clean).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').split('\n');
    let html = '', inList = false;
    for (const l of lines) {
      const m = l.match(/^\s*[-•]\s+(.*)/);
      if (m) { if (!inList) { html += '<ul>'; inList = true; } html += `<li>${m[1]}</li>`; }
      else { if (inList) { html += '</ul>'; inList = false; } if (l.trim()) html += `<p>${l}</p>`; }
    }
    if (inList) html += '</ul>';
    return { html, actions };
  }

  /* ---------- widget ---------- */
  const wrap = document.createElement('div');
  wrap.className = 'gai';
  wrap.innerHTML = `
    <button class="gai__fab" type="button" aria-expanded="false" aria-controls="gaiPanel">
      <img src="assets/mascot-200.webp" alt="" width="64" height="64"><span class="gai__fabBadge">AI</span><span class="gai__fabDot" aria-hidden="true"></span>
    </button>
    <div class="gai__tip" hidden></div>
    <section class="gai__panel" id="gaiPanel" role="dialog" aria-modal="false" aria-labelledby="gaiName" hidden>
      <header class="gai__head">
        <span class="gai__avatar"><img src="assets/mascot-200.webp" alt="" width="44" height="44"></span>
        <div class="gai__who"><b id="gaiName"></b><span class="gai__status"><i></i><span></span></span></div>
        <button type="button" class="gai__icon" data-gai="reset"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/></svg></button>
        <button type="button" class="gai__icon" data-gai="close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </header>
      <div class="gai__log" role="log" aria-live="polite"></div>
      <div class="gai__chips"></div>
      <form class="gai__form">
        <textarea rows="1" maxlength="1500" required></textarea>
        <button type="submit" class="gai__send"><svg viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></svg></button>
      </form>
      <p class="gai__foot"></p>
    </section>`;
  document.body.appendChild(wrap);

  const fab = wrap.querySelector('.gai__fab'), panel = wrap.querySelector('.gai__panel'), log = wrap.querySelector('.gai__log');
  const chipsEl = wrap.querySelector('.gai__chips'), form = wrap.querySelector('.gai__form'), input = form.querySelector('textarea');
  const tip = wrap.querySelector('.gai__tip');

  let history = [];
  try { history = JSON.parse(sessionStorage.getItem(STORE) || '[]'); } catch (e) {}
  const save = () => { try { sessionStorage.setItem(STORE, JSON.stringify(history.slice(-30))); } catch (e) {} };
  let aiAvailable = null; // null = not tried yet; false = use the built-in assistant
  let busy = false;

  function texts() {
    wrap.querySelector('#gaiName').textContent = T(UI.name);
    wrap.querySelector('.gai__status span').textContent = T(UI.status);
    input.placeholder = T(UI.ph);
    form.querySelector('.gai__send').setAttribute('aria-label', T(UI.send));
    wrap.querySelector('[data-gai=reset]').setAttribute('aria-label', T(UI.reset));
    wrap.querySelector('[data-gai=reset]').title = T(UI.reset);
    wrap.querySelector('[data-gai=close]').setAttribute('aria-label', T(UI.close));
    fab.setAttribute('aria-label', T(UI.name));
    wrap.querySelector('.gai__foot').textContent = T(UI.disclaimer);
    tip.textContent = T(UI.open);
  }

  function bubble(role, text) {
    const el = document.createElement('div');
    el.className = 'gai__msg gai__msg--' + (role === 'user' ? 'me' : 'bot');
    el.dir = 'auto';
    if (role === 'user') el.textContent = text; else fill(el, text);
    log.appendChild(el); log.scrollTop = log.scrollHeight;
    return el;
  }
  function fill(el, text, done = true) {
    const { html, actions } = parse(text);
    el.innerHTML = `<div class="gai__txt">${html}</div>`;
    if (done && actions.length) {
      const lang = hasArabic(text) ? 'ar' : (/[a-z]/i.test(text) ? 'en' : pageLang()); // buttons follow the reply's language
      el.insertAdjacentHTML('beforeend', `<div class="gai__acts">${actions.map(a => `<button type="button" class="gai__act" data-act="${a}">${UI.act[a][lang]}</button>`).join('')}</div>`);
    }
  }
  function renderAll() {
    log.innerHTML = '';
    bubble('assistant', T(UI.hello));
    history.forEach(m => bubble(m.role, m.content));
    chipsEl.innerHTML = history.length ? '' : T(UI.chips).map(c => `<button type="button" class="gai__chip">${esc(c)}</button>`).join('');
  }

  async function ask(q) {
    if (busy || !q.trim()) return;
    busy = true; form.classList.add('is-busy');
    chipsEl.innerHTML = '';
    history.push({ role: 'user', content: q.trim() }); save();
    bubble('user', q.trim());
    const el = bubble('assistant', '');
    el.classList.add('is-typing'); el.innerHTML = '<span class="gai__dots"><i></i><i></i><i></i></span>';
    let answer = '';
    try {
      if (aiAvailable !== false) answer = await askAI(el);
    } catch (e) { aiAvailable = false; answer = ''; }
    if (!answer) { // built-in assistant
      await new Promise(r => setTimeout(r, 450));
      answer = localAnswer(q);
    }
    el.classList.remove('is-typing'); fill(el, answer);
    history.push({ role: 'assistant', content: answer }); save();
    log.scrollTop = log.scrollHeight;
    busy = false; form.classList.remove('is-busy');
  }

  let retryTimer = null;
  const retryLater = ms => { aiAvailable = false; clearTimeout(retryTimer); retryTimer = setTimeout(() => { aiAvailable = null; }, ms); };
  async function askAI(el) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), FIRST_BYTE_TIMEOUT);
    let res;
    try {
      res = await fetch(ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ctrl.signal,
        body: JSON.stringify({ messages: history.slice(-16), lang: pageLang() })
      });
    } catch (e) { // asleep / offline / timed out -> built-in answer now, try the AI again in a bit
      clearTimeout(t); retryLater(45000); return '';
    }
    clearTimeout(t);
    if (res.status === 429) { retryLater(60000); return ''; }
    if (!res.ok || !res.body || !/text\/plain/.test(res.headers.get('content-type') || '')) { aiAvailable = false; return ''; } // e.g. 503 = no API key yet
    aiAvailable = true;
    const reader = res.body.getReader(), dec = new TextDecoder();
    let text = '';
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      text += dec.decode(value, { stream: true });
      el.classList.remove('is-typing'); fill(el, text, false);
      log.scrollTop = log.scrollHeight;
    }
    return text.trim() || T(UI.err);
  }

  /* ---------- events ---------- */
  let warmed = false;
  function warmUp() { // wake the AI service while the visitor is still reading/typing
    if (warmed || !API_BASE) return; warmed = true;
    fetch(API_BASE + '/healthz', { mode: 'cors', cache: 'no-store' }).catch(() => {});
  }
  function openPanel() {
    warmUp();
    panel.hidden = false; fab.setAttribute('aria-expanded', 'true'); wrap.classList.add('is-open'); tip.hidden = true;
    try { sessionStorage.setItem('gm-chat-seen', '1'); } catch (e) {}
    setTimeout(() => input.focus({ preventScroll: true }), 50);
    log.scrollTop = log.scrollHeight;
  }
  function closePanel() { panel.hidden = true; fab.setAttribute('aria-expanded', 'false'); wrap.classList.remove('is-open'); fab.focus({ preventScroll: true }); }
  fab.addEventListener('click', () => (panel.hidden ? openPanel() : closePanel()));
  tip.addEventListener('click', openPanel);
  wrap.addEventListener('click', e => {
    const g = e.target.closest('[data-gai]')?.dataset.gai;
    if (g === 'close') closePanel();
    if (g === 'reset') { history = []; save(); renderAll(); input.focus(); }
    const chip = e.target.closest('.gai__chip'); if (chip) ask(chip.textContent);
    const act = e.target.closest('.gai__act')?.dataset.act;
    if (act === 'CONSULT') { if (window.GMConsult) { closePanel(); window.GMConsult.open(); } else (window.gmOpenWa || (u => window.open(u, '_blank', 'noopener')))(window.gmWaLink ? window.gmWaLink() : 'https://wa.me/962796600022'); }
    if (act === 'WHATSAPP') (window.gmOpenWa || (u => window.open(u, '_blank', 'noopener')))(window.gmWaLink ? window.gmWaLink() : 'https://wa.me/962796600022');
    if (act === 'MAP') window.open('https://maps.app.goo.gl/KFzNALZsbk7PUZEL9', '_blank', 'noopener');
    const target = { WEBSITES: '#websites', WORK: '#work', CONTACT: '#contact' }[act];
    if (target) { if (innerWidth < 640) closePanel(); document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' }); }
  });
  form.addEventListener('submit', e => { e.preventDefault(); const q = input.value; input.value = ''; input.style.height = ''; ask(q); });
  input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); form.requestSubmit(); } });
  input.addEventListener('input', () => { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 120) + 'px'; });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden && !document.querySelector('dialog[open]')) closePanel(); });
  document.addEventListener('langchange', () => { texts(); renderAll(); });

  texts(); renderAll();
  // a small "ask me" bubble once per visit
  let seen = false; try { seen = !!sessionStorage.getItem('gm-chat-seen'); } catch (e) {}
  if (!seen) setTimeout(() => { if (panel.hidden) tip.hidden = false; }, 6000);
  window.GMAgent = { open: openPanel, close: closePanel, ask, localAnswer, get mode() { return aiAvailable; } };
})();
