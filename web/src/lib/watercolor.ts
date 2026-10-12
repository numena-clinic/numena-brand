// Interactive watercolor-kaleidoscope background for the hero.
//
// The pointer paints translucent pigment blooms as it moves across the hero.
// Each bloom is a small number of irregular, radially-arranged washes that
// spread, settle, hold, then slowly dissolve — so previous marks persist and
// overlap into a temporary watercolor trail.
//
// All tunable values live in DEFAULT_TUNABLES below. Adjust there, not in the
// rendering logic.

export interface WatercolorTunables {
  /** Smallest bloom radius in CSS px (before viewport scaling). */
  MIN_RADIUS: number;
  /** Largest bloom radius in CSS px (before viewport scaling). */
  MAX_RADIUS: number;
  /** Minimum pointer travel (px) before a new bloom is painted. */
  PAINT_DISTANCE: number;
  /** Minimum time (ms) between blooms. */
  PAINT_INTERVAL: number;
  /** Total bloom lifetime (ms) from birth to invisible. */
  MARK_LIFETIME: number;
  /** Portion of the lifetime (ms) spent dissolving. */
  DISSOLVE_DURATION: number;
  /** Time (ms) the bloom takes to spread out after birth. */
  SPREAD_DURATION: number;
  /** Upper bound on simultaneously live blooms. */
  MAX_MARKS: number;
  /** Base opacity of the pigment (0–1). Kept low so purple stays dominant. */
  OPACITY: number;
  /** Minimum radial segments per bloom. */
  SYMMETRY_MIN: number;
  /** Maximum radial segments per bloom. */
  SYMMETRY_MAX: number;
  /** Number of pre-rendered bloom shapes to reuse. */
  SPRITE_VARIANTS: number;
  /** Numena colors used as pigment. */
  COLORS: string[];
}

export const DEFAULT_TUNABLES: WatercolorTunables = {
  MIN_RADIUS: 100,
  MAX_RADIUS: 250,
  PAINT_DISTANCE: 30,
  PAINT_INTERVAL: 45,
  MARK_LIFETIME: 4500,
  DISSOLVE_DURATION: 2700,
  SPREAD_DURATION: 550,
  MAX_MARKS: 20,
  OPACITY: 0.42,
  SYMMETRY_MIN: 8,
  SYMMETRY_MAX: 14,
  SPRITE_VARIANTS: 8,
  COLORS: ["#8E36F4", "#25E4F8", "#EEE9F3", "#639CFF", "#F57A44"],
};

const TAU = Math.PI * 2;

interface Sprite {
  canvas: HTMLCanvasElement;
  radius: number;
}

interface Variant {
  outer: Sprite;
  core: Sprite;
}

interface Mark {
  x: number;
  y: number;
  r: number;
  rot: number;
  stretch: number;
  angle: number;
  alphaMul: number;
  born: number;
  variant: Variant;
}

function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

function smootherstep(x: number): number {
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function makeCanvas(size: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  return canvas;
}

// Build one reusable bloom shape: a soft outer wash plus a denser core. Both
// are watercolour kaleidoscopes — a small motif of irregular radial blobs is
// repeated around the centre with alternating mirrored segments, so the bloom
// reads as translucent pigment symmetry rather than clean vector geometry.
function buildVariant(cfg: WatercolorTunables, index: number): Variant {
  const R = cfg.MAX_RADIUS;
  const size = Math.ceil(R * 2);
  const center = size / 2;

  const segments =
    cfg.SYMMETRY_MIN +
    Math.floor(Math.random() * (cfg.SYMMETRY_MAX - cfg.SYMMETRY_MIN + 1));
  const segment = TAU / segments;
  const half = segment / 2;
  const rot = Math.random() * TAU;

  const count = 2 + (Math.random() < 0.5 ? 1 : 0);
  const pool: string[] = [];
  for (let i = 0; i < count; i++) {
    pool.push(cfg.COLORS[(index + i * 2) % cfg.COLORS.length]);
  }

  // One wedge of the kaleidoscope. Blobs are placed at polar coordinates and
  // then repeated (and mirrored) around the centre.
  interface Blob {
    angle: number;
    radius: number;
    lobe: number;
    color: string;
    alpha: number;
  }

  const motif: Blob[] = [];
  const blobCount = 5 + Math.floor(Math.random() * 3);
  for (let i = 0; i < blobCount; i++) {
    motif.push({
      angle: (Math.random() * 2 - 1) * half * 0.92,
      radius: 0.14 + Math.random() * 0.6,
      lobe: 0.12 + Math.random() * 0.22,
      color: pool[i % pool.length],
      alpha: 0.18 + Math.random() * 0.16,
    });
  }
  // A couple of blobs seated on the seam so the mirrored halves stay joined.
  motif.push({
    angle: 0,
    radius: 0.28 + Math.random() * 0.3,
    lobe: 0.16 + Math.random() * 0.2,
    color: pool[0],
    alpha: 0.2 + Math.random() * 0.12,
  });

  const draw = (
    canvas: HTMLCanvasElement,
    options: { blur: number; scale: number; alphaMul: number; speckles: number },
  ) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, size, size);
    ctx.filter = `blur(${options.blur}px)`;

    for (let i = 0; i < segments; i++) {
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(i * segment + rot + (Math.random() * 2 - 1) * segment * 0.015);
      if (i % 2 === 1) ctx.scale(-1, 1); // mirror alternate wedges

      for (const blob of motif) {
        const radius = blob.radius * R * options.scale;
        const lobe = blob.lobe * R * options.scale;
        const gx = Math.cos(blob.angle) * radius;
        const gy = Math.sin(blob.angle) * radius;
        const alpha = blob.alpha * options.alphaMul;

        const gradient = ctx.createRadialGradient(gx, gy, 0, gx, gy, lobe);
        gradient.addColorStop(0, rgba(blob.color, alpha));
        gradient.addColorStop(0.55, rgba(blob.color, alpha * 0.45));
        gradient.addColorStop(1, rgba(blob.color, 0));
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(gx, gy, lobe, 0, TAU);
        ctx.fill();
      }

      ctx.restore();
    }

    // A soft central wash ties the wedges together.
    const central = ctx.createRadialGradient(
      center,
      center,
      0,
      center,
      center,
      R * 0.42 * options.scale,
    );
    central.addColorStop(0, rgba(pool[0], 0.22 * options.alphaMul));
    central.addColorStop(0.6, rgba(pool[0], 0.08 * options.alphaMul));
    central.addColorStop(1, rgba(pool[0], 0));
    ctx.fillStyle = central;
    ctx.beginPath();
    ctx.arc(center, center, R * 0.42 * options.scale, 0, TAU);
    ctx.fill();

    // Faint speckles give an uneven, pigmented density.
    ctx.filter = "blur(1.5px)";
    for (let s = 0; s < options.speckles; s++) {
      const angle = Math.random() * TAU;
      const distance = Math.sqrt(Math.random()) * R * 0.8;
      const sx = center + Math.cos(angle) * distance;
      const sy = center + Math.sin(angle) * distance;
      ctx.fillStyle = rgba(pool[s % pool.length], 0.05 + Math.random() * 0.07);
      ctx.beginPath();
      ctx.arc(sx, sy, 1 + Math.random() * 2.5, 0, TAU);
      ctx.fill();
    }

    ctx.filter = "none";
  };

  const outer = makeCanvas(size);
  draw(outer, { blur: 15, scale: 1, alphaMul: 1, speckles: 14 });

  const core = makeCanvas(size);
  draw(core, { blur: 6, scale: 0.58, alphaMul: 1.5, speckles: 7 });

  return { outer: { canvas: outer, radius: R }, core: { canvas: core, radius: R } };
}

function buildVariants(cfg: WatercolorTunables): Variant[] {
  return Array.from({ length: cfg.SPRITE_VARIANTS }, (_, i) =>
    buildVariant(cfg, i),
  );
}

export function initWatercolor(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  overrides: Partial<WatercolorTunables> = {},
): () => void {
  const cfg: WatercolorTunables = { ...DEFAULT_TUNABLES, ...overrides };
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;

  const variants = buildVariants(cfg);
  const marks: Mark[] = [];
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let width = 0;
  let height = 0;
  let running = false;
  let frame = 0;
  let hasLast = false;
  let lastX = 0;
  let lastY = 0;
  let lastTime = 0;
  const animated = !reduceMotion && finePointer;

  function viewportScale(): number {
    return clamp(width / 1440, 0.65, 1.1);
  }

  function resize(): void {
    const rect = host.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!animated) paintStatic();
  }

  function addMark(
    x: number,
    y: number,
    options: { speed: number; angle: number },
  ): void {
    const variant = variants[Math.floor(Math.random() * variants.length)];
    const scale = viewportScale();
    const r =
      (cfg.MIN_RADIUS + Math.random() * (cfg.MAX_RADIUS - cfg.MIN_RADIUS)) *
      scale;

    marks.push({
      x,
      y,
      r,
      rot: Math.random() * TAU,
      stretch: clamp(1 + options.speed * 0.2, 1, 1.6),
      angle: options.speed > 0.25 ? options.angle : 0,
      alphaMul: clamp(1 - options.speed * 0.12, 0.65, 1),
      born: performance.now(),
      variant,
    });

    if (marks.length > cfg.MAX_MARKS) {
      marks.splice(0, marks.length - cfg.MAX_MARKS);
    }
  }

  function drawMark(mark: Mark, now: number): void {
    const t = now - mark.born;
    const spreadP = clamp(t / cfg.SPREAD_DURATION, 0, 1);
    const grow =
      1 +
      0.22 *
        smootherstep(clamp((t - cfg.SPREAD_DURATION) / (cfg.MARK_LIFETIME - cfg.SPREAD_DURATION), 0, 1));
    const scale = (0.62 + 0.38 * easeOutCubic(spreadP)) * grow;
    const birth = t < cfg.SPREAD_DURATION ? spreadP : 1;

    const dissolveStart = cfg.MARK_LIFETIME - cfg.DISSOLVE_DURATION;
    const fade = clamp((t - dissolveStart) / cfg.DISSOLVE_DURATION, 0, 1);
    const outerFade = smootherstep(clamp(fade / 0.7, 0, 1));
    const coreFade = smootherstep(clamp((fade - 0.28) / 0.72, 0, 1));

    const base = cfg.OPACITY * mark.alphaMul * birth;
    const r = mark.r * scale;

    ctx!.save();
    ctx!.translate(mark.x, mark.y);
    if (mark.angle) {
      ctx!.rotate(mark.angle);
      ctx!.scale(mark.stretch, 1);
    }

    ctx!.globalAlpha = base * (1 - outerFade);
    ctx!.drawImage(mark.variant.outer.canvas, -r, -r, r * 2, r * 2);

    ctx!.globalAlpha = base * (1 - coreFade);
    ctx!.drawImage(mark.variant.core.canvas, -r, -r, r * 2, r * 2);

    ctx!.restore();
  }

  function render(now: number): void {
    ctx!.clearRect(0, 0, width, height);

    for (let i = marks.length - 1; i >= 0; i--) {
      const mark = marks[i];
      if (now - mark.born >= cfg.MARK_LIFETIME) {
        marks.splice(i, 1);
        continue;
      }
      drawMark(mark, now);
    }

    if (marks.length > 0) {
      frame = requestAnimationFrame(render);
    } else {
      running = false;
      ctx!.clearRect(0, 0, width, height);
    }
  }

  function start(): void {
    if (running) return;
    running = true;
    frame = requestAnimationFrame(render);
  }

  // A single, still frame of pigment for touch devices and reduced motion.
  function paintStatic(): void {
    ctx!.clearRect(0, 0, width, height);
    const positions: [number, number][] = [
      [0.22, 0.34],
      [0.68, 0.26],
      [0.8, 0.72],
    ];
    const scale = viewportScale() * 0.8;
    for (const [fx, fy] of positions) {
      const variant = variants[Math.floor(Math.random() * variants.length)];
      const r =
        (cfg.MIN_RADIUS + Math.random() * (cfg.MAX_RADIUS - cfg.MIN_RADIUS)) *
        scale;
      const x = fx * width;
      const y = fy * height;
      ctx!.globalAlpha = cfg.OPACITY * 0.5;
      ctx!.drawImage(variant.outer.canvas, x - r, y - r, r * 2, r * 2);
      ctx!.globalAlpha = cfg.OPACITY * 0.36;
      ctx!.drawImage(variant.core.canvas, x - r, y - r, r * 2, r * 2);
    }
    ctx!.globalAlpha = 1;
  }

  function onPointerMove(event: PointerEvent): void {
    const rect = host.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const now = performance.now();

    if (!hasLast) {
      hasLast = true;
      lastX = x;
      lastY = y;
      lastTime = now;
      addMark(x, y, { speed: 0, angle: 0 });
      start();
      return;
    }

    const dx = x - lastX;
    const dy = y - lastY;
    const distance = Math.hypot(dx, dy);
    const elapsed = now - lastTime;

    if (distance >= cfg.PAINT_DISTANCE && elapsed >= cfg.PAINT_INTERVAL) {
      const speed = clamp(distance / Math.max(elapsed, 1), 0, 3);
      addMark(x, y, { speed, angle: Math.atan2(dy, dx) });
      lastX = x;
      lastY = y;
      lastTime = now;
      start();
    }
  }

  function onPointerLeave(): void {
    hasLast = false;
  }

  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();

  if (animated) {
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave, { passive: true });
  }

  return () => {
    observer.disconnect();
    cancelAnimationFrame(frame);
    host.removeEventListener("pointermove", onPointerMove);
    host.removeEventListener("pointerleave", onPointerLeave);
  };
}
