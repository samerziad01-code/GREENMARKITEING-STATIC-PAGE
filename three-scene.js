/* Green Marketing — 3D hero scene (Three.js r128, loaded lazily after page load).
   Glossy floating shapes in the brand palette, reacting to pointer + scroll.
   Pauses when the hero is off-screen or the tab is hidden; static frame for reduced motion. */
(function () {
  const canvas = document.getElementById('hero3d');
  if (!canvas || !window.THREE) return;
  const THREE = window.THREE;
  const hero = canvas.parentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = () => innerWidth < 760;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !small(), powerPreference: 'low-power' });
  } catch (e) { return; } // no WebGL -> page stays as designed without 3D
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 16);

  const C = hex => new THREE.Color(hex).convertSRGBToLinear();
  const BRAND = { dark: C('#386338'), green: C('#41A223'), cream: C('#EBE1D2'), white: C('#FFFFFF') };

  /* --- soft studio environment for glossy reflections (built in-code, no HDR download) --- */
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  const envBox = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), new THREE.MeshBasicMaterial({ side: THREE.BackSide, vertexColors: true }));
  const pos = envBox.geometry.attributes.position, cols = [];
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) / 10; // -1..1 : green floor -> cream sky
    const c = BRAND.dark.clone().lerp(BRAND.cream, (y + 1) / 2);
    cols.push(c.r, c.g, c.b);
  }
  envBox.geometry.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  envScene.add(envBox);
  const panel = (w, h, x, y, z, k) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(k, k, k) })); m.position.set(x, y, z); m.lookAt(0, 0, 0); envScene.add(m); };
  panel(8, 4, 5, 6, 4, 3);   // key softbox
  panel(4, 8, -7, 1, 3, 1.4); // fill strip
  scene.environment = pmrem.fromScene(envScene, 0.04).texture;

  scene.add(new THREE.HemisphereLight(0xfff6e8, 0x24452a, 0.55));
  const key = new THREE.DirectionalLight(0xfff3df, 1.4); key.position.set(5, 8, 7); scene.add(key);
  const rim = new THREE.DirectionalLight(0x7be05a, 0.7); rim.position.set(-6, -3, -4); scene.add(rim);

  /* --- materials --- */
  const glossy = (color, o = {}) => new THREE.MeshPhysicalMaterial(Object.assign({ color, roughness: 0.22, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.12, envMapIntensity: 1.1 }, o));
  const M = {
    green: glossy(BRAND.green),
    dark: glossy(BRAND.dark, { roughness: 0.3 }),
    cream: glossy(BRAND.cream, { roughness: 0.35, clearcoat: 0.6 }),
    gem: glossy(BRAND.green, { flatShading: true, metalness: 0.25, roughness: 0.15 }),
    white: glossy(BRAND.white, { roughness: 0.4 })
  };

  /* --- geometries --- */
  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, -1.15);
  leafShape.bezierCurveTo(1.15, -0.45, 0.95, 0.85, 0, 1.35);
  leafShape.bezierCurveTo(-0.95, 0.85, -1.15, -0.45, 0, -1.15);
  const leafGeo = new THREE.ExtrudeGeometry(leafShape, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1, bevelSegments: 5, curveSegments: 28 });
  leafGeo.center();
  const G = {
    leaf: leafGeo,
    torus: new THREE.TorusGeometry(0.9, 0.34, 32, 72),
    ring: new THREE.TorusGeometry(0.8, 0.08, 16, 64),
    sphere: new THREE.SphereGeometry(1, 48, 32),
    gem: new THREE.IcosahedronGeometry(1, 0),
    pill: new THREE.CylinderGeometry(0.42, 0.42, 1.4, 32, 1)
  };
  // pill = cylinder + two caps
  const makePill = mat => { const g = new THREE.Group(); g.add(new THREE.Mesh(G.pill, mat)); [0.7, -0.7].forEach(y => { const s = new THREE.Mesh(G.sphere, mat); s.scale.setScalar(0.42); s.position.y = y; g.add(s); }); return g; };

  /* nx: + = towards the picture side (left in Arabic / right in English); ny: + = up. Values are fractions of the visible half-width/height. */
  const DESKTOP = [
    { geo: 'torus', mat: 'green', nx: 0.97, ny: 0.62, z: -1, s: 1.05, rot: [0.6, 0.3, 0] },
    { geo: 'leaf', mat: 'green', nx: 0.74, ny: -0.66, z: 1.2, s: 1.15, rot: [0.4, -0.5, 0.6] },
    { geo: 'sphere', mat: 'dark', nx: 0.12, ny: -0.72, z: -2.5, s: 0.85 },
    { geo: 'pill', mat: 'cream', nx: 1.02, ny: -0.12, z: -3, s: 0.9, rot: [0.3, 0, 0.9] },
    { geo: 'gem', mat: 'gem', nx: -0.9, ny: 0.78, z: -3, s: 0.55 },
    { geo: 'ring', mat: 'dark', nx: -0.96, ny: -0.52, z: -2, s: 0.9, rot: [1.1, 0.2, 0] },
    { geo: 'sphere', mat: 'green', nx: -0.42, ny: -0.9, z: 0, s: 0.24 },
    { geo: 'sphere', mat: 'cream', nx: 0.42, ny: 0.88, z: -1, s: 0.3 }
  ];
  const MOBILE = [ // hero stacks: text on top (ny > 0), picture card below (ny ≈ 0 … -0.7) -> shapes sit in the empty
                   // top corner beside the short first title line, and peek out from behind the card
    { geo: 'torus', mat: 'green', nx: 1.08, ny: 0.97, z: -1, s: 0.5, rot: [0.6, 0.3, 0] },
    { geo: 'leaf', mat: 'green', nx: -0.95, ny: -0.12, z: 1, s: 0.72, rot: [0.4, -0.5, 0.6] },
    { geo: 'sphere', mat: 'dark', nx: 0.97, ny: -0.42, z: -2, s: 0.5 },
    { geo: 'ring', mat: 'dark', nx: -0.9, ny: -0.66, z: -1, s: 0.55, rot: [1.1, 0.2, 0] },
    { geo: 'gem', mat: 'gem', nx: 0.62, ny: -0.8, z: 0, s: 0.36 },
    { geo: 'sphere', mat: 'cream', nx: -0.45, ny: -0.84, z: 0, s: 0.22 }
  ];

  const root = new THREE.Group(); scene.add(root);
  let items = [];
  function build() {
    items.forEach(it => root.remove(it.obj)); items = [];
    (small() ? MOBILE : DESKTOP).forEach((d, i) => {
      const obj = d.geo === 'pill' ? makePill(M[d.mat]) : new THREE.Mesh(G[d.geo], M[d.mat]);
      if (d.rot) obj.rotation.set(...d.rot);
      root.add(obj);
      items.push({ obj, d, phase: i * 1.7, spin: (i % 2 ? 1 : -1) * (0.12 + (i % 3) * 0.06), hover: 0, boost: 0 });
    });
    layout();
  }

  let halfW = 1, halfH = 1;
  function layout() {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, small() ? 1.5 : 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    halfW = halfH * camera.aspect;
    const side = document.documentElement.dir === 'rtl' ? -1 : 1;
    const unit = Math.min(1.25, Math.max(0.75, halfW / 6.5));
    // side margin next to the text column (px); when it is narrow, shapes on the text side hug the screen edge
    const margin = (w - Math.min(1200, w - 32)) / 2;
    const tight = !small() && margin < 240;
    items.forEach(it => {
      const k = (camera.position.z - it.d.z) / camera.position.z; // deeper shapes need a wider spread to stay at the same screen spot
      const onTextSide = it.d.nx < 0;
      const nx = tight && onTextSide ? -1.04 : it.d.nx;
      it.base = new THREE.Vector3(nx * halfW * side * k, it.d.ny * halfH * k, it.d.z);
      it.scale = it.d.s * unit * (tight && onTextSide ? 0.8 : 1);
      it.obj.position.copy(it.base);
    });
  }

  /* --- interaction --- */
  const pointer = { x: 0, y: 0, tx: 0, ty: 0, ndc: new THREE.Vector2(-9, -9) };
  addEventListener('pointermove', e => {
    pointer.tx = e.clientX / innerWidth * 2 - 1; pointer.ty = e.clientY / innerHeight * 2 - 1;
    const r = canvas.getBoundingClientRect();
    pointer.ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  }, { passive: true });
  // tap / click a shape -> it spins (works on phones too, canvas itself ignores pointer events)
  const ray = new THREE.Raycaster();
  addEventListener('pointerdown', e => {
    const r = canvas.getBoundingClientRect();
    if (e.clientY < r.top || e.clientY > r.bottom) return;
    ray.setFromCamera(new THREE.Vector2((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), camera);
    const hit = ray.intersectObjects(items.map(i => i.obj), true)[0];
    if (hit) { const it = items.find(i => i.obj === hit.object || i.obj.children.includes(hit.object)); if (it) it.boost = 1; }
  }, { passive: true });

  /* --- loop --- */
  let visible = true, running = false, t0 = performance.now(), last = t0;
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; kick(); }, { threshold: 0 });
  io.observe(hero);
  document.addEventListener('visibilitychange', kick);
  function kick() { if (!running && visible && !document.hidden && !reduced) { running = true; last = performance.now(); requestAnimationFrame(frame); } }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const t = (now - t0) / 1000;
    pointer.x += (pointer.tx - pointer.x) * 0.05; pointer.y += (pointer.ty - pointer.y) * 0.05;
    root.rotation.y = pointer.x * 0.22; root.rotation.x = pointer.y * 0.12;
    // gentle parallax: shapes drift up ~20% faster than the page while scrolling past the hero
    root.position.y = Math.min(scrollY, hero.clientHeight) * (halfH / (hero.clientHeight / 2)) * 0.2;

    ray.setFromCamera(pointer.ndc, camera);
    const hovered = ray.intersectObjects(items.map(i => i.obj), true)[0];
    items.forEach((it, i) => {
      const isHover = hovered && (hovered.object === it.obj || it.obj.children.includes(hovered.object));
      it.hover += ((isHover ? 1 : 0) - it.hover) * 0.12;
      it.boost *= 0.97;
      const intro = Math.min(1, Math.max(0, (t - i * 0.08) / 1.1)); const ease = 1 - Math.pow(1 - intro, 3);
      it.obj.scale.setScalar(it.scale * ease * (1 + it.hover * 0.12));
      it.obj.position.y = it.base.y + Math.sin(t * 0.8 + it.phase) * 0.22;
      it.obj.position.x = it.base.x + Math.cos(t * 0.5 + it.phase) * 0.12;
      it.obj.rotation.y += dt * (it.spin + it.hover * 1.2 + it.boost * 8);
      it.obj.rotation.x += dt * it.spin * 0.4;
    });
    canvas.style.cursor = hovered ? 'pointer' : '';
    renderer.render(scene, camera);
    if (visible && !document.hidden) requestAnimationFrame(frame); else running = false;
  }

  build();
  if (reduced) { items.forEach(it => it.obj.scale.setScalar(it.scale)); renderer.render(scene, camera); }
  else kick();
  canvas.classList.add('is-ready');

  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { const wasSmall = items.length === MOBILE.length; (small() !== wasSmall) ? build() : layout(); if (reduced) renderer.render(scene, camera); }, 150); });
  document.addEventListener('langchange', () => { layout(); if (reduced) renderer.render(scene, camera); });
  // brighter, glowier shapes on the dark theme
  const syncTheme = () => { const dark = document.documentElement.dataset.theme === 'dark'; renderer.toneMappingExposure = dark ? 1.3 : 1.05; rim.intensity = dark ? 1.4 : 0.7; if (reduced) renderer.render(scene, camera); };
  document.addEventListener('themechange', syncTheme); syncTheme();
})();
