/* Green Marketing — "Websites for every business" showcase.
   8 live demo sites (pure HTML/CSS/SVG, fictional brand names), rendered inside a laptop + phone.
   The same markup adapts to both screens through CSS container queries. */
(function () {
  const T = (o) => o[document.documentElement.lang === 'en' ? 'en' : 'ar'];

  /* ---------- illustrations (inline SVG, colors from the demo's CSS variables) ---------- */
  const ART = {
    plate: `<svg viewBox="0 0 400 400" class="ms-svg"><circle cx="200" cy="200" r="185" style="fill:var(--a2);opacity:.16"/><circle cx="200" cy="200" r="150" style="fill:var(--fg);opacity:.95"/><circle cx="200" cy="200" r="118" style="fill:var(--bg)"/><circle cx="200" cy="200" r="104" style="fill:var(--a)"/><g class="ms-spin"><circle cx="160" cy="170" r="28" style="fill:var(--a2)"/><circle cx="235" cy="160" r="22" style="fill:var(--a2);opacity:.8"/><circle cx="225" cy="235" r="30" style="fill:var(--a2);opacity:.9"/><circle cx="165" cy="240" r="16" style="fill:var(--fg)"/><path d="M190 200c10-30 40-30 46-12-18 2-32 8-46 12z" style="fill:#5fae3c"/><path d="M150 205c-6-24 14-38 30-28-14 8-22 16-30 28z" style="fill:#5fae3c"/></g><rect x="300" y="60" width="12" height="230" rx="6" transform="rotate(18 306 175)" style="fill:var(--a2)"/><rect x="322" y="64" width="12" height="230" rx="6" transform="rotate(18 328 179)" style="fill:var(--a2);opacity:.75"/></svg>`,
    cup: `<svg viewBox="0 0 400 400" class="ms-svg"><circle cx="200" cy="210" r="170" style="fill:var(--a2);opacity:.18"/><path class="ms-steam" d="M170 120c-18-22 18-34 0-58M205 118c-18-22 18-34 0-58M240 120c-18-22 18-34 0-58" style="stroke:var(--a);fill:none;stroke-width:8;stroke-linecap:round;opacity:.6"/><ellipse cx="200" cy="318" rx="140" ry="26" style="fill:var(--fg);opacity:.9"/><path d="M110 150h180l-18 150a30 30 0 0 1-30 26h-84a30 30 0 0 1-30-26z" style="fill:var(--a)"/><path d="M290 180h18a36 36 0 0 1 0 72h-26" style="stroke:var(--a);stroke-width:18;fill:none"/><ellipse cx="200" cy="152" rx="90" ry="16" style="fill:var(--fg);opacity:.55"/><path d="M175 230c14-24 40-24 50 0-10 26-36 26-50 0z" style="fill:var(--bg);opacity:.9"/></svg>`,
    clinic: `<svg viewBox="0 0 400 400" class="ms-svg"><circle cx="200" cy="200" r="175" style="fill:var(--a2);opacity:.25"/><rect x="95" y="95" width="210" height="210" rx="56" style="fill:var(--a)"/><path d="M200 140v120M140 200h120" style="stroke:var(--bg);stroke-width:34;stroke-linecap:round"/><polyline class="ms-pulse" points="20,330 120,330 145,290 170,360 195,305 215,330 380,330" style="fill:none;stroke:var(--a);stroke-width:8;stroke-linejoin:round;stroke-linecap:round"/></svg>`,
    skyline: `<svg viewBox="0 0 400 400" class="ms-svg"><circle cx="300" cy="100" r="46" style="fill:var(--a)"/><g style="fill:var(--a2)"><rect x="30" y="200" width="60" height="170" rx="4"/><rect x="100" y="130" width="70" height="240" rx="4"/><rect x="180" y="170" width="56" height="200" rx="4"/><rect x="246" y="95" width="62" height="275" rx="4"/><rect x="318" y="220" width="54" height="150" rx="4"/></g><g class="ms-win" style="fill:var(--a)"><rect x="112" y="150" width="12" height="14"/><rect x="140" y="150" width="12" height="14"/><rect x="112" y="186" width="12" height="14"/><rect x="140" y="222" width="12" height="14"/><rect x="258" y="120" width="12" height="14"/><rect x="284" y="156" width="12" height="14"/><rect x="258" y="192" width="12" height="14"/><rect x="284" y="264" width="12" height="14"/><rect x="194" y="196" width="10" height="12"/><rect x="214" y="232" width="10" height="12"/><rect x="44" y="226" width="10" height="12"/><rect x="66" y="262" width="10" height="12"/></g><rect x="0" y="368" width="400" height="6" style="fill:var(--a)"/></svg>`,
    bottles: `<svg viewBox="0 0 400 400" class="ms-svg"><circle cx="200" cy="210" r="170" style="fill:var(--a2);opacity:.45"/><rect x="92" y="170" width="74" height="170" rx="22" style="fill:var(--a)"/><rect x="110" y="140" width="38" height="36" rx="8" style="fill:var(--fg)"/><rect x="180" y="110" width="88" height="230" rx="30" style="fill:var(--fg);opacity:.92"/><rect x="204" y="70" width="40" height="46" rx="10" style="fill:var(--a)"/><circle cx="224" cy="60" r="16" style="fill:var(--a)"/><rect x="196" y="200" width="56" height="70" rx="10" style="fill:var(--bg);opacity:.85"/><rect x="282" y="230" width="60" height="110" rx="18" style="fill:var(--a);opacity:.7"/><circle class="ms-pop" cx="320" cy="150" r="10" style="fill:var(--a)"/><circle class="ms-pop" cx="80" cy="120" r="7" style="fill:var(--fg)"/></svg>`,
    travel: `<svg viewBox="0 0 400 400" class="ms-svg"><circle cx="200" cy="210" r="140" style="fill:var(--a2);opacity:.9"/><g style="fill:none;stroke:var(--bg);stroke-width:3;opacity:.45"><ellipse cx="200" cy="210" rx="60" ry="140"/><ellipse cx="200" cy="210" rx="140" ry="50"/><path d="M60 210h280"/></g><path id="msRoute" d="M40 300C90 120 280 60 360 120" style="fill:none;stroke:var(--a);stroke-width:5;stroke-dasharray:10 12"/><g><path d="M-22 0 18-8l8 8-8 8z M-6-4l-6-14h8l12 12z M-6 4l-6 14h8l12-12z" style="fill:var(--a)"/><animateMotion dur="6s" repeatCount="indefinite" rotate="auto" path="M40 300C90 120 280 60 360 120"/></g><circle cx="320" cy="80" r="30" style="fill:var(--a)"/></svg>`,
    bag: `<svg viewBox="0 0 400 400" class="ms-svg"><circle cx="200" cy="210" r="168" style="fill:var(--a2);opacity:.5"/><path d="M150 140v-20a50 50 0 0 1 100 0v20" style="fill:none;stroke:var(--fg);stroke-width:14;stroke-linecap:round"/><path d="M95 140h210l-16 200a20 20 0 0 1-20 18H131a20 20 0 0 1-20-18z" style="fill:var(--a)"/><circle cx="200" cy="240" r="40" style="fill:var(--bg);opacity:.9"/><path d="M185 240l10 10 22-22" style="fill:none;stroke:var(--a);stroke-width:9;stroke-linecap:round;stroke-linejoin:round"/><g class="ms-pop"><rect x="300" y="70" width="64" height="44" rx="12" style="fill:var(--fg)"/><text x="332" y="99" text-anchor="middle" style="fill:var(--bg);font:700 18px sans-serif">-30%</text></g></svg>`,
    car: `<svg viewBox="0 0 400 400" class="ms-svg"><circle cx="200" cy="200" r="170" style="fill:var(--a2);opacity:.22"/><g class="ms-road" style="stroke:var(--a);stroke-width:6;stroke-dasharray:30 24;opacity:.7"><path d="M0 330h400"/></g><path d="M40 270c0-24 14-34 40-38l52-48c12-10 24-14 40-14h86c18 0 30 6 42 18l34 40c34 4 66 14 66 42v22H40z" style="fill:var(--a)"/><path d="M148 196l30-28h58v42h-110zM252 168h20c10 0 18 4 24 12l24 30h-68z" style="fill:var(--bg);opacity:.85"/><g class="ms-wheel"><circle cx="112" cy="296" r="32" style="fill:var(--fg)"/><circle cx="112" cy="296" r="12" style="fill:var(--a2)"/><path d="M112 268v56M84 296h56" style="stroke:var(--a2);stroke-width:4"/></g><g class="ms-wheel"><circle cx="298" cy="296" r="32" style="fill:var(--fg)"/><circle cx="298" cy="296" r="12" style="fill:var(--a2)"/><path d="M298 268v56M270 296h56" style="stroke:var(--a2);stroke-width:4"/></g></svg>`
  };

  /* ---------- the 8 demos (fictional brands) ---------- */
  const DEMOS = [
    { id: 'restaurant', icon: 'food', art: 'plate', logo: 'EMBER', layout: 'split', font: 'serif',
      c: { bg: '#140d0a', fg: '#f6e9dc', a: '#ff6b2c', a2: '#ffb347' },
      name: { ar: 'مطاعم', en: 'Restaurants' }, kicker: { ar: 'موقع مطعم', en: 'Restaurant website' },
      nav: { ar: ['المنيو', 'الحجز', 'الفروع', 'من نحن'], en: ['Menu', 'Book', 'Branches', 'About'] },
      tag: { ar: 'مشاوي على الفحم · منذ 2010', en: 'Charcoal grill · since 2010' },
      title: { ar: 'نكهات على نار هادئة', en: 'Flavors slow-cooked over fire' },
      sub: { ar: 'احجز طاولتك أو اطلب أونلاين خلال دقيقة — توصيل لباب البيت.', en: 'Book a table or order online in a minute — delivered to your door.' },
      b1: { ar: 'اطلب الآن', en: 'Order now' }, b2: { ar: 'المنيو', en: 'View menu' },
      stats: { ar: [['4.9★', 'تقييم'], ['25 د', 'توصيل'], ['+120', 'طبق']], en: [['4.9★', 'rating'], ['25 min', 'delivery'], ['120+', 'dishes']] },
      items: { ar: [['مشاوي مشكلة', '9.5 د.أ'], ['منسف على أصوله', '12 د.أ'], ['كنافة نابلسية', '3.5 د.أ']], en: [['Mixed grill', '9.5 JOD'], ['Traditional mansaf', '12 JOD'], ['Nabulsi kunafa', '3.5 JOD']] },
      feats: { ar: ['طلب أونلاين وتوصيل', 'حجز طاولات', 'منيو رقمي QR', 'ربط واتساب'], en: ['Online ordering & delivery', 'Table booking', 'QR digital menu', 'WhatsApp orders'] } },

    { id: 'cafe', icon: 'coffee', art: 'cup', logo: 'Bloom Roastery', layout: 'center', font: 'serif',
      c: { bg: '#f3ebe0', fg: '#2b1d14', a: '#7a4b2a', a2: '#c98a4b' },
      name: { ar: 'كافيهات ومحامص', en: 'Cafés & roasters' }, kicker: { ar: 'موقع كافيه ومتجر قهوة', en: 'Café & coffee shop' },
      nav: { ar: ['القهوة', 'المتجر', 'الاشتراك', 'زورونا'], en: ['Coffee', 'Shop', 'Subscribe', 'Visit'] },
      tag: { ar: 'محمصة مختصة', en: 'Specialty roastery' },
      title: { ar: 'قهوة مختصة تُحمَّص كل صباح', en: 'Specialty coffee, roasted every morning' },
      sub: { ar: 'اشتراك شهري يوصلك حبوب طازجة لباب بيتك.', en: 'A monthly subscription of fresh beans, right to your door.' },
      b1: { ar: 'تسوّق القهوة', en: 'Shop coffee' }, b2: { ar: 'اشترك', en: 'Subscribe' },
      stats: { ar: [['12', 'محصول'], ['48 س', 'من التحميص'], ['مجاني', 'توصيل']], en: [['12', 'origins'], ['48h', 'from roast'], ['Free', 'delivery']] },
      items: { ar: [['إثيوبيا يرغاتشيف', '12 د.أ'], ['كولومبيا هويلا', '11 د.أ'], ['اسبريسو بلند', '9 د.أ']], en: [['Ethiopia Yirgacheffe', '12 JOD'], ['Colombia Huila', '11 JOD'], ['Espresso blend', '9 JOD']] },
      feats: { ar: ['متجر إلكتروني', 'اشتراكات شهرية', 'دفع إلكتروني', 'برنامج ولاء'], en: ['Online store', 'Monthly subscriptions', 'Online payments', 'Loyalty program'] } },

    { id: 'clinic', icon: 'health', art: 'clinic', logo: 'NOVA Dental', layout: 'split', font: 'sans',
      c: { bg: '#f2f8fb', fg: '#0d2a3a', a: '#14b8a6', a2: '#7dd3fc' },
      name: { ar: 'عيادات ومراكز طبية', en: 'Clinics & medical' }, kicker: { ar: 'موقع عيادة', en: 'Clinic website' },
      nav: { ar: ['الخدمات', 'الأطباء', 'الأسعار', 'تواصل'], en: ['Services', 'Doctors', 'Pricing', 'Contact'] },
      tag: { ar: 'عيادة أسنان متكاملة', en: 'Complete dental care' },
      title: { ar: 'ابتسامتك بأيدٍ أمينة', en: 'Your smile, in expert hands' },
      sub: { ar: 'احجز موعدك أونلاين واستلم تذكير تلقائي على واتساب.', en: 'Book online and get automatic WhatsApp reminders.' },
      b1: { ar: 'احجز موعد', en: 'Book appointment' }, b2: { ar: 'خدماتنا', en: 'Our services' },
      stats: { ar: [['+8,000', 'مريض'], ['15', 'سنة خبرة'], ['24/7', 'حجز']], en: [['8,000+', 'patients'], ['15', 'years'], ['24/7', 'booking']] },
      items: { ar: [['تبييض الأسنان', 'جلسة واحدة'], ['تقويم شفاف', 'بدون أسلاك'], ['زراعة الأسنان', 'ضمان سنين']], en: [['Teeth whitening', 'One session'], ['Clear aligners', 'No wires'], ['Dental implants', 'Long warranty']] },
      feats: { ar: ['حجز مواعيد أونلاين', 'ملفات المرضى', 'تذكير واتساب', 'صفحات الأطباء'], en: ['Online appointments', 'Patient records', 'WhatsApp reminders', 'Doctor profiles'] } },

    { id: 'realestate', icon: 'building', art: 'skyline', logo: 'SKYLINE', layout: 'split', font: 'serif',
      c: { bg: '#0b1220', fg: '#eef2f7', a: '#d4af37', a2: '#33435f' },
      name: { ar: 'عقارات', en: 'Real estate' }, kicker: { ar: 'موقع شركة عقارات', en: 'Real-estate website' },
      nav: { ar: ['شراء', 'إيجار', 'مشاريع', 'تواصل'], en: ['Buy', 'Rent', 'Projects', 'Contact'] },
      tag: { ar: 'عقارات فاخرة', en: 'Premium properties' },
      title: { ar: 'بيتك القادم يبدأ من هنا', en: 'Your next home starts here' },
      sub: { ar: 'ابحث حسب المنطقة والسعر وعدد الغرف، واحجز زيارة مباشرة.', en: 'Search by area, price and rooms — book a viewing instantly.' },
      b1: { ar: 'ابحث عن عقار', en: 'Find a property' }, b2: { ar: 'اعرض عقارك', en: 'List yours' },
      stats: { ar: [['+340', 'عقار'], ['18', 'منطقة'], ['360°', 'جولات افتراضية']], en: [['340+', 'listings'], ['18', 'areas'], ['360°', 'virtual tours']] },
      items: { ar: [['شقة 3 غرف — عبدون', '145,000 د.أ'], ['فيلا مستقلة — دابوق', '480,000 د.أ'], ['مكتب — الشميساني', '900 د.أ/شهر']], en: [['3-bed flat — Abdoun', 'JOD 145,000'], ['Villa — Dabouq', 'JOD 480,000'], ['Office — Shmeisani', 'JOD 900/mo']] },
      feats: { ar: ['بحث وفلترة ذكية', 'خرائط وجولات 360°', 'طلبات زيارة', 'لوحة للوكلاء'], en: ['Smart search & filters', 'Maps & 360° tours', 'Viewing requests', 'Agent dashboard'] } },

    { id: 'beauty', icon: 'sparkle', art: 'bottles', logo: 'LUMÉ', layout: 'center', font: 'serif',
      c: { bg: '#fbeef0', fg: '#3b1f2b', a: '#e0607e', a2: '#f7c6d3' },
      name: { ar: 'تجميل وعناية', en: 'Beauty & salons' }, kicker: { ar: 'متجر منتجات عناية', en: 'Skincare store' },
      nav: { ar: ['البشرة', 'الشعر', 'العروض', 'المدونة'], en: ['Skin', 'Hair', 'Offers', 'Journal'] },
      tag: { ar: 'عناية طبيعية', en: 'Clean skincare' },
      title: { ar: 'جمالك يبدأ من عناية حقيقية', en: 'Beauty that starts with real care' },
      sub: { ar: 'اختبار بشرة تفاعلي يقترح لك الروتين المناسب.', en: 'An interactive skin quiz that builds your routine.' },
      b1: { ar: 'تسوّقي الآن', en: 'Shop now' }, b2: { ar: 'اختبار البشرة', en: 'Skin quiz' },
      stats: { ar: [['+60', 'منتج'], ['4.8★', 'تقييم'], ['يومين', 'توصيل']], en: [['60+', 'products'], ['4.8★', 'rating'], ['2-day', 'delivery']] },
      items: { ar: [['سيروم فيتامين C', '18 د.أ'], ['مرطب يومي', '14 د.أ'], ['واقي شمس SPF50', '16 د.أ']], en: [['Vitamin C serum', '18 JOD'], ['Daily moisturizer', '14 JOD'], ['Sunscreen SPF50', '16 JOD']] },
      feats: { ar: ['متجر وسلة شراء', 'حجز مواعيد صالون', 'اختبار تفاعلي', 'كوبونات وعروض'], en: ['Store & cart', 'Salon booking', 'Interactive quiz', 'Coupons & offers'] } },

    { id: 'travel', icon: 'plane', art: 'travel', logo: 'HORIZON', layout: 'split', font: 'sans',
      c: { bg: '#052b3a', fg: '#ffffff', a: '#ffb703', a2: '#2ec4b6' },
      name: { ar: 'سفر وسياحة', en: 'Travel & tourism' }, kicker: { ar: 'موقع مكتب سفر', en: 'Travel agency' },
      nav: { ar: ['رحلات', 'عمرة', 'فنادق', 'تأشيرات'], en: ['Trips', 'Umrah', 'Hotels', 'Visas'] },
      tag: { ar: 'باقات شاملة', en: 'All-inclusive packages' },
      title: { ar: 'رحلتك الجاية… جاهزة', en: 'Your next trip, ready to go' },
      sub: { ar: 'طيران + فندق + جولات بحجز واحد ودفع آمن.', en: 'Flights + hotel + tours in one secure booking.' },
      b1: { ar: 'احجز رحلتك', en: 'Book a trip' }, b2: { ar: 'العروض', en: 'Deals' },
      stats: { ar: [['+40', 'وجهة'], ['24/7', 'دعم'], ['أقساط', 'مريحة']], en: [['40+', 'destinations'], ['24/7', 'support'], ['Easy', 'installments']] },
      items: { ar: [['إسطنبول 5 أيام', 'من 365 د.أ'], ['شرم الشيخ 4 أيام', 'من 290 د.أ'], ['القاهرة 3 أيام', 'من 210 د.أ']], en: [['Istanbul · 5 days', 'from JOD 365'], ['Sharm · 4 days', 'from JOD 290'], ['Cairo · 3 days', 'from JOD 210']] },
      feats: { ar: ['محرك حجز رحلات', 'دفع وأقساط', 'إدارة باقات', 'شات واتساب'], en: ['Trip booking engine', 'Payments & installments', 'Package manager', 'WhatsApp chat'] } },

    { id: 'store', icon: 'bag', art: 'bag', logo: 'MARKET+', layout: 'split', font: 'sans',
      c: { bg: '#f6f6f3', fg: '#111111', a: '#ff4d2e', a2: '#ffd166' },
      name: { ar: 'متاجر إلكترونية', en: 'Online stores' }, kicker: { ar: 'متجر متعدد البائعين', en: 'Multi-vendor store' },
      nav: { ar: ['إلكترونيات', 'أزياء', 'البيت', 'العروض'], en: ['Electronics', 'Fashion', 'Home', 'Deals'] },
      tag: { ar: 'عروض نهاية الأسبوع', en: 'Weekend deals' },
      title: { ar: 'كل اللي بتحتاجه بضغطة', en: 'Everything you need, one tap away' },
      sub: { ar: 'آلاف المنتجات من بائعين موثوقين، دفع عند الاستلام أو بالبطاقة.', en: 'Thousands of products from trusted sellers — card or cash on delivery.' },
      b1: { ar: 'ابدأ التسوق', en: 'Start shopping' }, b2: { ar: 'بيع معنا', en: 'Sell with us' },
      stats: { ar: [['+5,000', 'منتج'], ['+90', 'بائع'], ['24 س', 'توصيل']], en: [['5,000+', 'products'], ['90+', 'sellers'], ['24h', 'delivery']] },
      items: { ar: [['سماعات لاسلكية', '39 د.أ'], ['ساعة ذكية', '59 د.أ'], ['حقيبة ظهر', '25 د.أ']], en: [['Wireless earbuds', '39 JOD'], ['Smart watch', '59 JOD'], ['Backpack', '25 JOD']] },
      feats: { ar: ['متجر متعدد البائعين', 'دفع إلكتروني وعند الاستلام', 'تتبع الطلبات', 'تطبيق موبايل'], en: ['Multi-vendor marketplace', 'Card & cash on delivery', 'Order tracking', 'Mobile app'] } },

    { id: 'cars', icon: 'car', art: 'car', logo: 'DRIVE', layout: 'split', font: 'sans',
      c: { bg: '#0e0f12', fg: '#f2f2f2', a: '#00e0a4', a2: '#2b2f38' },
      name: { ar: 'تأجير سيارات', en: 'Car rental' }, kicker: { ar: 'موقع تأجير سيارات', en: 'Car-rental website' },
      nav: { ar: ['الأسطول', 'الأسعار', 'الفروع', 'الشروط'], en: ['Fleet', 'Pricing', 'Branches', 'Terms'] },
      tag: { ar: 'استلام من المطار', en: 'Airport pickup' },
      title: { ar: 'استأجر سيارتك بضغطة زر', en: 'Rent your car in one tap' },
      sub: { ar: 'اختار السيارة والتاريخ وادفع أونلاين — السيارة بتستناك.', en: 'Pick the car and dates, pay online — it will be waiting.' },
      b1: { ar: 'احجز سيارة', en: 'Book a car' }, b2: { ar: 'الأسطول', en: 'See fleet' },
      stats: { ar: [['+60', 'سيارة'], ['3', 'فروع'], ['تأمين', 'شامل']], en: [['60+', 'cars'], ['3', 'branches'], ['Full', 'insurance']] },
      items: { ar: [['كيا سيراتو 2025', '25 د.أ/يوم'], ['هيونداي توسان', '40 د.أ/يوم'], ['مرسيدس C200', '85 د.أ/يوم']], en: [['Kia Cerato 2025', 'JOD 25/day'], ['Hyundai Tucson', 'JOD 40/day'], ['Mercedes C200', 'JOD 85/day']] },
      feats: { ar: ['حجز بالتاريخ والفرع', 'دفع وتأمين أونلاين', 'إدارة الأسطول', 'عقود إلكترونية'], en: ['Date & branch booking', 'Online payment & insurance', 'Fleet management', 'e-Contracts'] } }
  ];

  /* ---------- line icons ---------- */
  const ICON = {
    food: '<path d="M7 3v8a3 3 0 0 0 3 3v7M7 3v5M10 3v5M4 3v5a3 3 0 0 0 3 3M17 3c-2 2-3 5-3 8h3v10"/>',
    coffee: '<path d="M4 9h13v5a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6zM17 11h2a2.5 2.5 0 0 1 0 5h-2M8 2c-1 1.5 1 2.5 0 4M12 2c-1 1.5 1 2.5 0 4"/>',
    health: '<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 6-8 11-8 11zM12 9v6M9 12h6"/>',
    building: '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1M14 9h1M9 13h1M14 13h1M10 21v-4h4v4"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    plane: '<path d="M2 16l20-8-4 12-6-4-3 4v-5l9-7-11 6z"/>',
    bag: '<path d="M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2"/>',
    car: '<path d="M3 16v-4l2-5h14l2 5v4M3 16h18M6 19a2 2 0 1 0 0-.1M18 19a2 2 0 1 0 0-.1M5 12h14"/>',
    school: '<path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6"/>',
    hotel: '<path d="M3 20V6M3 14h18v6M21 14v-3a3 3 0 0 0-3-3h-7v6M7 11a1.5 1.5 0 1 0 0-.1"/>',
    law: '<path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
    gym: '<path d="M6 7v10M18 7v10M3 9v6M21 9v6M6 12h12"/>',
    factory: '<path d="M3 21V10l6 4V10l6 4V6h6v15zM7 17h2M12 17h2M17 17h2"/>',
    heart: '<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 6-8 11-8 11z"/>',
    briefcase: '<path d="M3 8h18v12H3zM8 8V5h8v3M3 13h18"/>'
  };
  const svgIcon = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;

  const EVERY = [
    ['food', { ar: 'مطاعم وكافيهات', en: 'Restaurants & cafés' }],
    ['health', { ar: 'عيادات ومستشفيات', en: 'Clinics & hospitals' }],
    ['building', { ar: 'عقارات وإنشاءات', en: 'Real estate & construction' }],
    ['sparkle', { ar: 'صالونات وتجميل', en: 'Salons & beauty' }],
    ['plane', { ar: 'سفر وسياحة', en: 'Travel & tourism' }],
    ['bag', { ar: 'متاجر إلكترونية', en: 'E-commerce' }],
    ['car', { ar: 'سيارات وتأجير', en: 'Cars & rentals' }],
    ['school', { ar: 'مدارس وجامعات ومراكز', en: 'Schools & academies' }],
    ['hotel', { ar: 'فنادق ومنتجعات', en: 'Hotels & resorts' }],
    ['law', { ar: 'محاماة واستشارات', en: 'Law & consulting' }],
    ['gym', { ar: 'نوادي رياضية', en: 'Gyms & fitness' }],
    ['factory', { ar: 'مصانع وشركات', en: 'Factories & companies' }],
    ['heart', { ar: 'جمعيات خيرية', en: 'Charities & NGOs' }],
    ['briefcase', { ar: 'شركات ناشئة', en: 'Startups' }]
  ];

  /* ---------- template ---------- */
  function site(d) {
    const st = T(d.stats).map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join('');
    const items = T(d.items).map(([n, p], i) => `<div class="ms-card"><div class="ms-card__img ms-card__img--${i}"></div><b>${n}</b><span>${p}</span><i class="ms-add">+</i></div>`).join('');
    return `<div class="ms ms--${d.layout} ms--${d.font}" dir="${document.documentElement.dir}" style="--bg:${d.c.bg};--fg:${d.c.fg};--a:${d.c.a};--a2:${d.c.a2}">
      <header class="ms-nav"><b class="ms-logo" dir="ltr">${d.logo}</b><nav>${T(d.nav).map(n => `<span>${n}</span>`).join('')}</nav><span class="ms-burger"><i></i><i></i></span><span class="ms-navbtn">${T(d.b1)}</span></header>
      <section class="ms-hero">
        <div class="ms-copy"><small class="ms-tag">${T(d.tag)}</small><h4>${T(d.title)}</h4><p>${T(d.sub)}</p>
          <div class="ms-btns"><span class="ms-btn">${T(d.b1)}</span><span class="ms-btn ms-btn--ghost">${T(d.b2)}</span></div>
          <div class="ms-stats">${st}</div></div>
        <div class="ms-art">${ART[d.art]}</div>
      </section>
      <section class="ms-list">${items}</section>
      <footer class="ms-foot"><b class="ms-logo" dir="ltr">${d.logo}</b><span>© 2026</span></footer>
    </div>`;
  }

  /* ---------- controller ---------- */
  const chipsEl = document.getElementById('industries');
  const desk = document.getElementById('deskView'), phone = document.getElementById('phoneView');
  if (!chipsEl || !desk || !phone) return;
  let current = 0, timer = null, paused = false;
  const DURATION = 7000;

  function renderChips() {
    chipsEl.innerHTML = DEMOS.map((d, i) => `<button type="button" role="tab" class="ind${i === current ? ' is-active' : ''}" data-i="${i}" aria-selected="${i === current}">
      ${svgIcon(d.icon)}<span>${T(d.name)}</span><i class="ind__bar"></i></button>`).join('');
    document.getElementById('everyGrid').innerHTML = EVERY.map(([k, n]) => `<li>${svgIcon(k)}<span>${T(n)}</span></li>`).join('');
  }

  function fit(view, designW) {
    const inner = view.firstElementChild; if (!inner) return;
    const s = view.clientWidth / designW;
    inner.style.transform = `scale(${s})`;
    // auto-scroll distance (design px) so the whole demo page glides by
    const travel = Math.max(0, inner.scrollHeight - view.clientHeight / s);
    inner.style.setProperty('--travel', `-${travel}px`);
  }
  function layoutAll() { fit(desk, 1200); fit(phone, 390); }

  function show(i, user) {
    current = (i + DEMOS.length) % DEMOS.length;
    const d = DEMOS[current];
    [desk, phone].forEach(v => {
      v.classList.add('is-switching');
      setTimeout(() => {
        v.innerHTML = `<div class="ms-scale">${site(d)}</div>`;
        v.classList.remove('is-switching');
        layoutAll();
      }, 220);
    });
    document.getElementById('demoUrl').textContent = 'demo.greenagency/' + d.id;
    document.getElementById('demoKicker').textContent = T(d.kicker);
    document.getElementById('demoName').textContent = d.logo;
    document.getElementById('demoFeats').innerHTML = T(d.feats).map(f => `<li>${f}</li>`).join('');
    chipsEl.querySelectorAll('.ind').forEach((b, k) => { b.classList.toggle('is-active', k === current); b.setAttribute('aria-selected', k === current); });
    if (user) { paused = true; clearTimeout(timer); timer = setTimeout(() => { paused = false; loop(); }, 15000); }
  }
  function loop() {
    clearTimeout(timer);
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setTimeout(() => { show(current + 1); loop(); }, DURATION);
  }

  chipsEl.addEventListener('click', e => { const b = e.target.closest('.ind'); if (b) show(+b.dataset.i, true); });
  chipsEl.addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    const dir = (e.key === 'ArrowRight') === (document.documentElement.dir === 'rtl') ? -1 : 1;
    show(current + dir, true); chipsEl.querySelectorAll('.ind')[current].focus();
  });
  new ResizeObserver(layoutAll).observe(desk);
  new ResizeObserver(layoutAll).observe(phone);

  // only cycle while the section is on screen
  const sec = document.getElementById('websites');
  new IntersectionObserver(([en]) => { chipsEl.classList.toggle('is-running', en.isIntersecting && !paused); if (en.isIntersecting) loop(); else clearTimeout(timer); }, { threshold: 0.2 }).observe(sec);

  document.addEventListener('langchange', () => { renderChips(); show(current); });
  renderChips(); show(0);
  window.GMWebsites = { DEMOS, show, get current() { return current; } };
})();
