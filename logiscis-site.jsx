import { useEffect, useRef, useState } from "react";
import {
  Truck, ArrowRight, ArrowDown, Gavel, TrendingDown, DoorOpen, TrendingUp,
  Skull, Handshake, Package, Factory, Search, Plane, Ship, Building2, BadgeCheck,
  Store, Shield, MapPin, MessageCircle, FileText, PieChart as PieIcon,
  Bot, Phone, Clock, ShieldAlert, Route, BarChart3,
  Smartphone, Cpu, Satellite, Sprout, Rocket, Crown,
  Network, Database, Target, Users,
  AlertTriangle, Scale, Globe2, Briefcase, Banknote, Stamp, FileCheck2, Linkedin,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, Cell,
} from "recharts";

// ──────────────────────────────────────────────────────────────
// Design tokens (Claude × LogisCIS)
// ──────────────────────────────────────────────────────────────
const CLAUDE = {
  warm: "#D97757",
  warmDeep: "#BD5D3A",
  warmLight: "#F0A573",
  cream: "#F7F2EB",
  ink: "#1B1B1F",
};

// ──────────────────────────────────────────────────────────────
// Custom CSS injected once
// ──────────────────────────────────────────────────────────────
const SiteStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');
    :root {
      --c-warm: #D97757;
      --c-warm-deep: #BD5D3A;
      --c-warm-light: #F0A573;
      --c-cream: #F7F2EB;
      --c-ink: #1B1B1F;
      --c-cyan: #06B6D4;
    }
    * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    html { scroll-behavior: smooth; }
    body { background: var(--c-cream); }
    .font-display { font-family: 'Bricolage Grotesque', system-ui, sans-serif; letter-spacing: -0.018em; }
    .font-serif { font-family: 'Instrument Serif', 'Bricolage Grotesque', serif; letter-spacing: -0.01em; }
    .font-body { font-family: 'Inter', system-ui, sans-serif; }

    @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slowSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes pulseRing { 0%, 100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.15); opacity: 0.1; } }
    @keyframes float { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-12px) translateX(4px); } }
    @keyframes floatSlow { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-22px) translateX(-8px); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes meshShift {
      0%, 100% { transform: translate3d(0,0,0) scale(1); }
      33% { transform: translate3d(2%,3%,0) scale(1.05); }
      66% { transform: translate3d(-3%,-2%,0) scale(0.96); }
    }
    @keyframes meshShiftAlt {
      0%, 100% { transform: translate3d(0,0,0) scale(1.05); }
      40% { transform: translate3d(-4%,2%,0) scale(0.95); }
      70% { transform: translate3d(3%,-3%,0) scale(1.08); }
    }
    @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes glowPulse { 0%, 100% { opacity: 0.55; filter: blur(40px); } 50% { opacity: 0.9; filter: blur(60px); } }
    @keyframes blurInUp {
      from { opacity: 0; filter: blur(14px); transform: translateY(24px); letter-spacing: 0.05em; }
      to { opacity: 1; filter: blur(0); transform: translateY(0); letter-spacing: -0.018em; }
    }
    @keyframes drawIn { from { stroke-dashoffset: 200; opacity: 0; } to { stroke-dashoffset: 0; opacity: 1; } }
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .animate-fadeUp { animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
    .animate-pulseRing { animation: pulseRing 2.5s ease-in-out infinite; }
    .animate-slowSpin { animation: slowSpin 20s linear infinite; }
    .animate-float { animation: float 7s ease-in-out infinite; }
    .animate-floatSlow { animation: floatSlow 11s ease-in-out infinite; }
    .animate-glowPulse { animation: glowPulse 5s ease-in-out infinite; }

    .grid-bg {
      background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
      background-size: 80px 80px;
    }
    .grid-bg-light {
      background-image: linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
      background-size: 80px 80px;
    }

    /* SVG grain overlay — Claude signature */
    .grain {
      position: absolute; inset: 0; pointer-events: none; opacity: 0.35; mix-blend-mode: overlay;
      background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
    }
    .grain-light { opacity: 0.18; }

    /* Mesh gradient blobs */
    .mesh-blob { position: absolute; border-radius: 9999px; filter: blur(70px); will-change: transform; }
    .mesh-warm { background: radial-gradient(circle, rgba(217,119,87,0.55) 0%, rgba(217,119,87,0) 65%); }
    .mesh-cyan { background: radial-gradient(circle, rgba(34,211,238,0.45) 0%, rgba(34,211,238,0) 65%); }
    .mesh-violet { background: radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0) 65%); }
    .mesh-emerald { background: radial-gradient(circle, rgba(16,185,129,0.30) 0%, rgba(16,185,129,0) 65%); }

    /* Custom cursor */
    .cursor-blob {
      position: fixed; top: 0; left: 0; width: 36px; height: 36px;
      border-radius: 9999px; pointer-events: none; z-index: 9999;
      mix-blend-mode: difference; background: rgba(240,165,115,0.9);
      transform: translate3d(-100px,-100px,0);
      transition: width 0.25s ease, height 0.25s ease, background 0.25s ease;
      will-change: transform;
    }
    .cursor-blob.is-link { width: 64px; height: 64px; background: rgba(217,119,87,0.85); }
    @media (hover: hover) and (pointer: fine) {
      html, body, * { cursor: none !important; }
      input, textarea, select, [contenteditable="true"] { cursor: text !important; }
    }
    @media (hover: none), (pointer: coarse) { .cursor-blob { display: none; } }

    /* Marquee */
    .marquee-track { display: flex; gap: 3rem; animation: ticker 40s linear infinite; will-change: transform; }
    .marquee-track:hover { animation-play-state: paused; }

    /* Tilt + spotlight cards */
    .tilt-card { transform-style: preserve-3d; transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1); will-change: transform; }
    .tilt-content { transform: translateZ(20px); }
    .spotlight-card {
      position: relative; overflow: hidden;
    }
    .spotlight-card::before {
      content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity 0.35s ease;
      background: radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(217,119,87,0.18), transparent 60%);
    }
    .spotlight-card:hover::before { opacity: 1; }

    /* Magnetic */
    .magnetic { transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1); will-change: transform; }

    /* Section spotlight (dark) */
    .section-spotlight::before {
      content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0.7;
      background: radial-gradient(600px circle at var(--mx,50%) var(--my,30%), rgba(217,119,87,0.18), transparent 55%);
      transition: opacity 0.4s ease;
    }

    /* Gradient text shimmer */
    .text-gradient {
      background: linear-gradient(110deg, var(--c-warm) 0%, var(--c-warm-light) 35%, var(--c-cyan) 70%, var(--c-warm) 100%);
      background-size: 220% 100%;
      -webkit-background-clip: text; background-clip: text; color: transparent;
      animation: gradientShift 9s ease-in-out infinite;
    }

    /* Letter reveal */
    .reveal-letter {
      display: inline-block; opacity: 0; filter: blur(10px); transform: translateY(0.3em);
      transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.7s, transform 0.7s;
    }
    .reveal-letter.shown { opacity: 1; filter: blur(0); transform: translateY(0); }

    /* Underline on hover (links) */
    .ul-anim { background-image: linear-gradient(currentColor, currentColor); background-size: 0% 1px;
      background-repeat: no-repeat; background-position: 0 100%;
      transition: background-size 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
    .ul-anim:hover { background-size: 100% 1px; }

    /* Marquee fade edges */
    .marquee-fade {
      mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
      -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
    }

    /* Subtle border glow on dark cards */
    .glow-border {
      position: relative;
    }
    .glow-border::after {
      content: ''; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
      background: linear-gradient(135deg, rgba(217,119,87,0.6), rgba(34,211,238,0.4), transparent 60%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor; mask-composite: exclude;
      opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
    }
    .glow-border:hover::after { opacity: 1; }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
    }
  `}</style>
);

// ──────────────────────────────────────────────────────────────
// Reveal hook — IntersectionObserver
// ──────────────────────────────────────────────────────────────
const useReveal = () => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setSeen(true); },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, seen];
};

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, seen] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ──────────────────────────────────────────────────────────────
// Animation primitives
// ──────────────────────────────────────────────────────────────

// Custom cursor blob — follows mouse, expands on links
const CustomCursor = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = -100, y = -100, tx = -100, ty = -100;
    let raf = 0;
    const move = (e) => { tx = e.clientX; ty = e.clientY; };
    const enter = () => el.classList.add("is-link");
    const leave = () => el.classList.remove("is-link");
    const loop = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x - 18}px, ${y - 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move, { passive: true });
    document.querySelectorAll("a, button, .magnetic, .tilt-card").forEach((n) => {
      n.addEventListener("mouseenter", enter);
      n.addEventListener("mouseleave", leave);
    });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="cursor-blob" aria-hidden />;
};

// Animated count-up on view
const AnimatedNumber = ({ value, prefix = "", suffix = "", duration = 1600, decimals = 0, className = "" }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const fired = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !fired.current) {
        fired.current = true;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(value * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);
  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString("en-US");
  return <span ref={ref} className={className}>{prefix}{formatted}{suffix}</span>;
};

// Marquee strip
const Marquee = ({ items, className = "" }) => (
  <div className={`marquee-fade overflow-hidden ${className}`}>
    <div className="marquee-track">
      {[...items, ...items].map((it, i) => (
        <div key={i} className="flex items-center gap-3 text-sm font-display font-semibold whitespace-nowrap">
          {it.icon && <it.icon className="w-4 h-4 opacity-60" strokeWidth={1.8} />}
          <span>{it.label}</span>
          <span className="w-1 h-1 rounded-full bg-current opacity-40" />
        </div>
      ))}
    </div>
  </div>
);

// 3D tilt wrapper
const Tilt = ({ children, max = 8, className = "" }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -2 * max;
    const ry = (px - 0.5) * 2 * max;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset}
      className={`tilt-card spotlight-card ${className}`}>
      <div className="tilt-content">{children}</div>
    </div>
  );
};

// Magnetic — follows cursor when nearby
const Magnetic = ({ children, strength = 0.35, className = "" }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0,0,0)";
  };
  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={`inline-block magnetic ${className}`}>
      {children}
    </span>
  );
};

// Section spotlight — radial follow on dark sections
const SectionSpotlight = ({ children, className = "" }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove} className={`section-spotlight ${className}`}>{children}</div>
  );
};

// Letter-by-letter reveal
const LetterReveal = ({ text, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) setShown(true);
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const chars = text.split("");
  return (
    <span ref={ref} className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <span key={i}
          className={`reveal-letter ${shown ? "shown" : ""}`}
          style={{ transitionDelay: shown ? `${delay + i * 28}ms` : "0ms" }}
        >{ch === " " ? " " : ch}</span>
      ))}
    </span>
  );
};

// Animated mesh background — multiple drifting blobs
const MeshBackground = ({ variant = "dark" }) => {
  const blobs = variant === "dark"
    ? [
        { c: "mesh-warm", size: "70vh", x: "-10%", y: "-15%", anim: "meshShift", dur: "18s" },
        { c: "mesh-cyan", size: "55vh", x: "70%", y: "20%", anim: "meshShiftAlt", dur: "22s" },
        { c: "mesh-violet", size: "50vh", x: "30%", y: "70%", anim: "meshShift", dur: "26s" },
      ]
    : [
        { c: "mesh-warm", size: "60vh", x: "-15%", y: "10%", anim: "meshShift", dur: "20s", op: 0.6 },
        { c: "mesh-cyan", size: "50vh", x: "75%", y: "60%", anim: "meshShiftAlt", dur: "24s", op: 0.5 },
      ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {blobs.map((b, i) => (
        <div
          key={i}
          className={`mesh-blob ${b.c}`}
          style={{
            width: b.size, height: b.size, left: b.x, top: b.y,
            animation: `${b.anim} ${b.dur} ease-in-out infinite`,
            opacity: b.op ?? 1,
          }}
        />
      ))}
    </div>
  );
};

// ──────────────────────────────────────────────────────────────
// Scroll progress + Nav
// ──────────────────────────────────────────────────────────────
const Nav = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[var(--c-cream)]/85 border-b border-neutral-200/80">
      <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#D97757] via-[#F0A573] to-cyan-500 transition-all duration-100" style={{ width: `${progress * 100}%` }} />
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-neutral-900 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D97757] via-transparent to-cyan-500/40 opacity-60" />
            <Truck className="w-4 h-4 text-[#F0A573] relative" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-neutral-900">LogisCIS</span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-500 mt-0.5">by Mervey Ltd</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-neutral-600 uppercase tracking-wider">
          <a href="#market" className="hover:text-neutral-900 transition">Market</a>
          <a href="#competition" className="hover:text-neutral-900 transition">Competition</a>
          <a href="#solution" className="hover:text-neutral-900 transition">Solution</a>
          <a href="#traction" className="hover:text-neutral-900 transition">Traction</a>
          <a href="#economics" className="hover:text-neutral-900 transition">Economics</a>
          <a href="#team" className="hover:text-neutral-900 transition">Team</a>
          <a href="#invest" className="hover:text-neutral-900 transition">Invest</a>
        </div>
        <Magnetic strength={0.4} className="hidden md:inline-block">
          <a href="#invest" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-full bg-neutral-900 text-white hover:bg-[#D97757] transition-colors duration-300">
            $2.5M Seed <ArrowRight className="w-3 h-3" />
          </a>
        </Magnetic>
      </div>
    </nav>
  );
};

const Eyebrow = ({ children, color = "text-cyan-600" }) => (
  <div className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] ${color}`}>
    <span className="w-6 h-px bg-current opacity-50" />
    {children}
  </div>
);

// ──────────────────────────────────────────────────────────────
// 1. HERO
// ──────────────────────────────────────────────────────────────
const Hero = () => {
  const tickerItems = [
    { icon: Truck, label: "Бишкек → Алматы" },
    { icon: Truck, label: "Алматы → Москва" },
    { icon: Truck, label: "Москва → Ташкент" },
    { icon: Truck, label: "Ташкент → Бишкек" },
    { icon: MapPin, label: "Real-time GPS" },
    { icon: Shield, label: "Escrow-платежи" },
    { icon: Bot, label: "AI-диспетчер" },
    { icon: FileText, label: "e-ТТН ready" },
  ];
  return (
  <section className="relative min-h-screen bg-[#0A0E1A] text-white overflow-hidden flex flex-col pt-14">
    <SectionSpotlight className="flex-1 flex items-center relative">
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <MeshBackground variant="dark" />
      <div className="grain pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 w-full grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-8">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#F0A573] mb-8 animate-fadeUp">
            <span className="w-12 h-px bg-[#F0A573]" />
            Mervey Ltd · Investor Deck · April 2026
          </div>
          <h1 className="font-display font-extrabold leading-[0.85] tracking-tight mb-6 text-[20vw] md:text-[10rem] animate-fadeUp" style={{ animationDelay: "100ms" }}>
            <span className="text-gradient">Logis</span>
            <span className="font-serif italic">CIS</span>
          </h1>
          <div className="max-w-2xl animate-fadeUp" style={{ animationDelay: "300ms" }}>
            <p className="font-display text-2xl md:text-3xl text-[#F0A573] leading-tight mb-3">
              Operating system for <span className="font-serif italic">CIS freight logistics</span>
            </p>
            <p className="text-base text-neutral-400 leading-relaxed">
              Marketplace · Real-time tracking · Escrow · AI dispatcher · e-Documents.<br/>
              Один продукт для <span className="text-white font-semibold">$163B</span> рынка с sub-5% цифрового проникновения.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 animate-fadeUp" style={{ animationDelay: "500ms" }}>
            {[
              { label: "Seed · $2.5M", color: "border-emerald-400/60 text-emerald-300" },
              { label: "B2B SaaS + Marketplace", color: "border-cyan-400/60 text-cyan-300" },
              { label: "Mervey Ltd · KG → KZ → RU → UZ", color: "border-[#F0A573]/60 text-[#F0A573]" },
            ].map((p, i) => (
              <span key={i} className={`px-4 py-2 rounded-full border ${p.color} text-xs font-bold uppercase tracking-[0.15em] backdrop-blur-md bg-white/[0.04]`}>
                {p.label}
              </span>
            ))}
          </div>
          <div className="mt-14 flex items-center gap-6 animate-fadeUp" style={{ animationDelay: "700ms" }}>
            <Magnetic strength={0.4}>
              <a href="#vision" className="inline-flex items-center gap-3 text-sm text-neutral-300 hover:text-white transition group">
                <span className="w-12 h-12 rounded-full border border-neutral-700 group-hover:border-[#F0A573] group-hover:bg-white/5 flex items-center justify-center transition">
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition" />
                </span>
                <span className="ul-anim">Scroll to read</span>
              </a>
            </Magnetic>
          </div>
        </div>
        <div className="md:col-span-4 hidden md:block animate-fadeUp" style={{ animationDelay: "400ms" }}>
          <div className="relative aspect-square">
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#D97757]/40 to-transparent blur-3xl animate-glowPulse" />
            <div className="absolute inset-12 rounded-full bg-gradient-to-tr from-cyan-500/30 to-transparent blur-2xl animate-glowPulse" style={{ animationDelay: "1.5s" }} />
            <div className="relative h-full flex items-center justify-center">
              <div className="relative animate-floatSlow">
                <Truck className="w-32 h-32 text-[#F0A573]" strokeWidth={1.1} />
                <div className="absolute -inset-12 rounded-full border border-[#D97757]/30 animate-slowSpin" style={{ borderTopColor: "transparent", borderRightColor: "transparent" }} />
                <div className="absolute -inset-20 rounded-full border border-cyan-400/15 animate-slowSpin" style={{ animationDirection: "reverse", animationDuration: "32s", borderBottomColor: "transparent", borderLeftColor: "transparent" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionSpotlight>
    <div className="relative border-t border-white/10 py-5 text-neutral-400">
      <Marquee items={tickerItems} />
    </div>
  </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 2. VISION
// ──────────────────────────────────────────────────────────────
const Vision = () => {
  const stats = [
    { node: <AnimatedNumber value={163} prefix="$" suffix="B" duration={1800} />, l: "Total addressable market", s: "+8% YoY", c: "cyan-600", b: "border-cyan-200", dot: "bg-cyan-600" },
    { node: <span>Sub-<AnimatedNumber value={5} suffix="%" duration={1400} /></span>, l: "Digital penetration today", s: "TAM premium 2–3×", c: "[#D97757]", b: "border-[#D97757]/30", dot: "bg-[#D97757]" },
    { node: <span><AnimatedNumber value={5} duration={1200} /> мес</span>, l: "До обязательного e-ТТН", s: "Forced onboarding", c: "rose-600", b: "border-rose-200", dot: "bg-rose-600" },
    { node: "$0", l: "Берёт АТИ.СУ с транзакций", s: "Money on the table", c: "emerald-600", b: "border-emerald-200", dot: "bg-emerald-600" },
  ];
  return (
    <section id="vision" className="relative bg-[var(--c-cream)] py-32 overflow-hidden">
      <div className="absolute inset-0 grain grain-light pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <Reveal><Eyebrow>Vision · The Thesis</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-8 text-5xl md:text-7xl leading-[0.95] text-neutral-900 max-w-5xl">
            Логистика СНГ переживает свой
            <span className="font-serif italic text-[#D97757]"> «китайский момент»</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-10 text-xl md:text-2xl text-neutral-600 max-w-3xl leading-relaxed">
            Sub-5% цифровое проникновение. Регуляторный триггер через 5 месяцев. Главный конкурент в дефолте. Аналог Китая 2015 года — но без глобальных игроков.
          </p>
        </Reveal>
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <Reveal key={i} delay={300 + i * 100}>
              <Tilt max={6}>
                <div className={`bg-white border ${s.b} rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 glow-border`}>
                  <div className={`w-2 h-2 rounded-full ${s.dot} mb-5`} />
                  <div className="font-display font-bold text-5xl md:text-6xl text-neutral-900 leading-none">{s.node}</div>
                  <div className="mt-3 text-sm text-neutral-600">{s.l}</div>
                  <div className={`mt-2 text-xs font-bold uppercase tracking-wider text-${s.c}`}>{s.s}</div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <Reveal delay={700}>
          <div className="mt-16 max-w-3xl border-l-2 border-cyan-500 pl-6 py-2">
            <p className="font-display text-lg italic text-neutral-700">
              «Каждый сравнимый рынок прошёл свой FTA-момент. CIS остался последним.»
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 3. CATALYSTS
// ──────────────────────────────────────────────────────────────
const Catalysts = () => {
  const items = [
    { num: "01", date: "1 сентября 2026", subtitle: "Регуляторный триггер", icon: Gavel, c: "cyan",
      body: "ФЗ-140 от 07.06.2025: ЭТрН + электронные заказ-заявки + экспедиторские документы становятся обязательными. Реестр экспедиторов ГосЛог открывается 1 марта 2026.",
      kicker: "Штраф до ₽300K за бумагу" },
    { num: "02", date: "Декабрь 2025", subtitle: "Дефолт Монополии", icon: TrendingDown, c: "rose",
      body: "Цифровая платформа №2 РФ (выручка ₽60B, оценка ₽28B, готовилась к IPO) объявила дефолт по облигациям ₽260M. Чистый убыток ₽49.8M в 9М2025.",
      kicker: "Лидер №2 в зоне риска" },
    { num: "03", date: "Глобальный фон", subtitle: "Без западных игроков", icon: DoorOpen, c: "amber",
      body: "Uber Freight, Convoy, project44 никогда не входили в СНГ. Convoy в США сгорел: $930M поднято → продан Flexport за $16M (98% потери). Глобальный капитал и технологии в регион не пришли — и после 2022 не придут.",
      kicker: "Чистое поле для локальной платформы" },
    { num: "04", date: "Full Truck Alliance", subtitle: "Валидация модели", icon: TrendingUp, c: "emerald",
      body: "FY2025: $1.78B выручка, $637M чистая прибыль (+42.8%), 236M заказов. NYSE: YMM, market cap $9B. China 2015 = CIS 2025.",
      kicker: "Точная аналогия" },
  ];
  const palette = {
    cyan: { text: "text-cyan-600", border: "border-cyan-500" },
    rose: { text: "text-rose-600", border: "border-rose-500" },
    amber: { text: "text-amber-600", border: "border-amber-500" },
    emerald: { text: "text-emerald-600", border: "border-emerald-500" },
  };
  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><Eyebrow color="text-amber-600">Catalysts · Why Now</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight text-neutral-900 max-w-4xl">
            Четыре события совпали впервые за 10 лет
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            Каждое из них принудительно сдвигает рынок к цифровым платформам — синхронно, в течение 18 месяцев.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {items.map((item, i) => {
            const c = palette[item.c];
            const Icon = item.icon;
            return (
              <Reveal key={i} delay={300 + i * 80}>
                <div className={`group h-full bg-neutral-50 border-l-4 ${c.border} rounded-r-2xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-500`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className={`font-display font-bold text-6xl ${c.text} leading-none`}>{item.num}</div>
                    <Icon className={`w-7 h-7 ${c.text} opacity-60 group-hover:opacity-100 group-hover:scale-110 transition`} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-neutral-900 mb-1.5">{item.date}</h3>
                  <div className={`text-[11px] font-bold uppercase tracking-[0.2em] ${c.text} mb-4`}>{item.subtitle}</div>
                  <p className="text-[15px] text-neutral-700 leading-relaxed mb-6">{item.body}</p>
                  <div className={`text-sm font-bold ${c.text} flex items-center gap-2`}>
                    <ArrowRight className="w-4 h-4" /> {item.kicker}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 4. MARKET
// ──────────────────────────────────────────────────────────────
const Market = () => {
  const data = [
    { name: "Россия (авто)", value: 22.9, fill: "#06B6D4" },
    { name: "Казахстан", value: 29.3, fill: "#0E7490" },
    { name: "Трансгран. СНГ", value: 11.35, fill: "#10B981" },
    { name: "УЗ + КГ", value: 4.2, fill: "#F59E0B" },
  ];
  const funnel = [
    { l: "TAM", v: "$163B", d: "Вся логистика СНГ + транзит", bg: "bg-neutral-700", w: "100%" },
    { l: "SAM", v: "$34B", d: "Авто-фрейт + цифровые услуги", bg: "bg-cyan-700", w: "85%" },
    { l: "SOM 36 мес", v: "$850M", d: "Полная платформа KG → KZ → RU → UZ", bg: "bg-cyan-500", w: "60%" },
    { l: "Y3 capture target", v: "$200M", d: "Реалистичный план GMV", bg: "bg-emerald-500", w: "40%" },
  ];
  const stats = [
    { v: "$110.4B", l: "Логистика РФ (IMARC)", c: "bg-cyan-500" },
    { v: "₽11.7T", l: "Транспортно-лог. услуги РФ 2024", c: "bg-cyan-700" },
    { v: "$29.3B", l: "Логистика Казахстана", c: "bg-emerald-500" },
    { v: "$11.35B", l: "Трансграничный СНГ", c: "bg-amber-500" },
  ];
  return (
    <section id="market" className="bg-[var(--c-cream)] py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><Eyebrow>Market Sizing</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-[0.95] text-neutral-900 max-w-5xl">
            $163B+ TAM. Россия одна — <span className="text-cyan-600">$110B</span>.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            Один из крупнейших нетронутых логистических рынков планеты — фрагментированный, cash-heavy, pre-digital.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <Reveal key={i} delay={300 + i * 80}>
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition">
                <div className={`w-2 h-2 rounded-full ${s.c} mb-4`} />
                <div className="font-display font-bold text-4xl md:text-5xl text-neutral-900 leading-none">{s.v}</div>
                <div className="mt-3 text-sm text-neutral-600">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 grid md:grid-cols-2 gap-10">
          <Reveal delay={400}>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">Объём по странам ($B, 2025)</div>
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis dataKey="name" stroke="#737373" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#737373" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#0A0E1A", border: "none", borderRadius: 8, color: "white", fontSize: 12 }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {data.map((_, i) => <Cell key={i} fill={data[i].fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>
          <Reveal delay={500}>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">Наша воронка захвата</div>
              <div className="space-y-3">
                {funnel.map((f, i) => (
                  <div key={i} className={`${f.bg} rounded-xl p-4 text-white flex items-center justify-between hover:translate-x-1 transition-transform`} style={{ width: f.w }}>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">{f.l}</div>
                      <div className="font-display font-bold text-2xl leading-none mt-1">{f.v}</div>
                    </div>
                    <div className="text-xs opacity-90 text-right max-w-[180px]">{f.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="mt-10 text-xs text-neutral-500 italic">
          Источники: IMARC Group · Mordor Intelligence · CIS Statistical Committee · TAdviser 2024–2025
        </div>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 5. CRISIS (DARK)
// ──────────────────────────────────────────────────────────────
const Crisis = () => {
  const events = [
    { company: "Монополия", date: "5 декабря 2025", event: "Дефолт по облигациям", icon: Skull, color: "rose",
      kvs: [["Объём дефолта", "₽260M"], ["Выручка 2024", "₽60.2B"], ["Оценка 2025", "₽28B"], ["Чистый убыток 9M25", "₽49.8M"]],
      verdict: "Готовились к IPO MOEX, привлекли HNWI через ЗПИФ. Лидер №2 РФ под давлением — окно для платформы с положительной unit econ открывается." },
    { company: "Fura (Газманов)", date: "Итоги 2024", event: "Выручка падает", icon: TrendingDown, color: "amber",
      kvs: [["Выручка 2024", "₽3.25B"], ["Динамика YoY", "−9.8%"], ["Чистая прибыль", "₽957K"], ["Налог. долг", "₽21M"]],
      verdict: "Прибыль практически зеро при выручке $35M. 122 сотрудника, покупка НТК не помогла." },
    { company: "Грузовичкоф", date: "Март 2025", event: "Продан Wildberries", icon: Handshake, color: "amber",
      kvs: [["Сумма сделки", "₽3-8B"], ["Выручка цели 2024", "₽8B (план)"], ["В пакете", "Sitimobil + Taxovich"], ["Покупатель", "Wildberries"]],
      verdict: "Поглощены ритейлером. Не вытянули independence — вышли из самостоятельной игры." },
  ];
  const stress = [
    { v: "−8.2%", l: "Падение ставок ATI 2024", c: "text-rose-400" },
    { v: "−15-17%", l: "Выручки крупных компаний", c: "text-rose-400" },
    { v: "7,000", l: "Банкротств в РФ за 2025", c: "text-amber-400" },
    { v: "+27%", l: "Cargo theft globally (BSI)", c: "text-rose-400" },
    { v: "₽1.5B", l: "Потерь от мошенничества РФ", c: "text-amber-400" },
    { v: "29%", l: "Пустых пробегов", c: "text-amber-400" },
  ];
  const palette = {
    rose: { border: "border-rose-500/40", text: "text-rose-400" },
    amber: { border: "border-amber-500/40", text: "text-amber-400" },
  };
  return (
    <section className="relative bg-[#0A0E1A] text-white py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-25" />
      <MeshBackground variant="dark" />
      <div className="grain pointer-events-none" />
      <SectionSpotlight className="relative max-w-7xl mx-auto px-6 py-2">
        <Reveal><Eyebrow color="text-rose-400">Russian Platform Crisis · Real-time</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight max-w-5xl">
            Российские «цифровые» платформы коллапсируют. <span className="italic text-rose-300">Synchronously.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-400 max-w-3xl">
            Конкуренция плавится в реальном времени. Окно для платформы с правильной экономикой никогда не было таким широким.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {events.map((e, i) => {
            const Icon = e.icon;
            const c = palette[e.color];
            return (
              <Reveal key={i} delay={300 + i * 100}>
                <div className={`h-full bg-white/[0.02] border ${c.border} rounded-2xl p-7 hover:bg-white/[0.05] transition`}>
                  <div className="flex items-start justify-between mb-6">
                    <Icon className={`w-8 h-8 ${c.text}`} strokeWidth={1.6} />
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">{e.date}</div>
                  </div>
                  <h3 className="font-display font-bold text-3xl mb-1.5">{e.company}</h3>
                  <div className={`text-[11px] font-bold uppercase tracking-[0.2em] ${c.text} mb-5`}>{e.event}</div>
                  <div className="space-y-2 mb-5">
                    {e.kvs.map(([k, v], j) => (
                      <div key={j} className="flex items-center justify-between text-sm border-b border-white/5 py-1.5">
                        <span className="text-neutral-400">{k}</span>
                        <span className="font-display font-bold text-cyan-300">{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs italic text-neutral-300 leading-relaxed border-l-2 border-white/10 pl-3">{e.verdict}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={700}>
          <div className="mt-20">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-6">Структурный стресс рынка</div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/10 rounded-2xl overflow-hidden">
              {stress.map((s, i) => (
                <div key={i} className="bg-[#0A0E1A] p-6 hover:bg-white/[0.03] transition">
                  <div className={`font-display font-bold text-3xl ${s.c} leading-none`}>{s.v}</div>
                  <div className="mt-2 text-xs text-neutral-400 leading-tight">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={800}>
          <div className="mt-12 max-w-3xl border-l-2 border-[#D97757] pl-6 py-2">
            <p className="font-serif text-xl italic text-neutral-200">
              Кризис вычищает рынок. Выживают платформы с unit economics, не subsidy growth. Это идеальный момент входа — не на пике, а в долине.
            </p>
          </div>
        </Reveal>
      </SectionSpotlight>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 6. PROBLEM
// ──────────────────────────────────────────────────────────────
const Problem = () => {
  const groups = [
    { icon: Package, color: "rose", tag: "Критично", title: "Грузоотправители", sub: "Компании и ИП — отправляют груз",
      items: ["Груз «где-то едет» — статус узнают звонком", "Аванс выплачен — перевозчик исчез", "Бумажные документы теряются на границах", "Нет сравнения цен — личные связи"],
      cost: "$80K заморожено у среднего шиппера" },
    { icon: Truck, color: "amber", tag: "Высоко", title: "Перевозчики", sub: "Транспортные компании с парком",
      items: ["Задержки оплаты до 60 дней", "Двойное бронирование = $15K+ потерь", "Нет инструмента управления водителями", "Поиск грузов = обзвон знакомых"],
      cost: "$15-50K теряют в год" },
    { icon: Factory, color: "neutral", tag: "Системно", title: "Рынок в целом", sub: "Структурные потери",
      items: ["$35B/год — глобальный ущерб от мошенн.", "₽1.5B потерь только в РФ за 2023", "29% пустых пробегов", "Sub-5% цифровое проникновение"],
      cost: "$2.5B+ потерянного value/год" },
  ];
  const colors = {
    rose: { bg: "bg-rose-500", text: "text-rose-600", border: "border-rose-500", tagBg: "bg-rose-100" },
    amber: { bg: "bg-amber-500", text: "text-amber-600", border: "border-amber-500", tagBg: "bg-amber-100" },
    neutral: { bg: "bg-neutral-700", text: "text-neutral-700", border: "border-neutral-700", tagBg: "bg-neutral-100" },
  };
  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><Eyebrow color="text-amber-600">The Problem</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight text-neutral-900 max-w-4xl">
            Логистика СНГ оперирует на стеке 2005 года
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            WhatsApp как ОС. Бумажные ТТН. Аванс — и перевозчик исчез. Три типа боли, миллиарды потерь.
          </p>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-px bg-neutral-200 rounded-2xl overflow-hidden border border-neutral-200">
          {[
            { v: "70%+", l: "Перевозчиков координируют через WhatsApp" },
            { v: "71%", l: "Малых перевозчиков ведут учёт на бумаге" },
            { v: "10–30%", l: "Комиссия брокеров — без контроля платежа" },
          ].map((s, i) => (
            <Reveal key={i} delay={300 + i * 80}>
              <div className="bg-white p-7 hover:bg-neutral-50 transition h-full">
                <div className="font-display font-bold text-4xl md:text-5xl text-neutral-900 leading-none">{s.v}</div>
                <div className="mt-3 text-sm text-neutral-600">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {groups.map((g, i) => {
            const c = colors[g.color];
            const Icon = g.icon;
            return (
              <Reveal key={i} delay={500 + i * 100}>
                <div className={`bg-white border-t-4 ${c.border} rounded-b-2xl shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col`}>
                  <div className="p-7 flex-1">
                    <div className="flex items-start justify-between mb-5">
                      <Icon className={`w-7 h-7 ${c.text}`} strokeWidth={1.5} />
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${c.tagBg} ${c.text} px-2.5 py-1 rounded-full`}>{g.tag}</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-neutral-900 mb-1">{g.title}</h3>
                    <p className="text-xs text-neutral-500 mb-5">{g.sub}</p>
                    <ul className="space-y-2">
                      {g.items.map((it, j) => (
                        <li key={j} className="text-sm text-neutral-700 flex items-start gap-2">
                          <span className={`block w-1 h-1 rounded-full ${c.bg} mt-2 flex-shrink-0`} />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`px-7 py-4 border-t border-neutral-100 ${c.text} font-bold text-sm`}>{g.cost}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 7. COMPETITION (matrix + tabs)
// ──────────────────────────────────────────────────────────────
const Competition = () => {
  const headers = ["Маркетплейс", "Real-time трекинг", "Эскроу", "Чат-замена WA", "e-Doc", "Mobile (driver)", "Multi-CIS"];
  const rows = [
    ["LogisCIS (план MVP/V2)", [1, 1, 1, 1, 1, 1, 1], true],
    ["АТИ.СУ (10M MAU)", [1, 0.5, 0, 0, 1, 1, 1], false],
    ["Yandex Магистрали", [1, 1, 0, 0.5, 0.5, 1, 0.5], false],
    ["Монополия (default)", [1, 0.5, 0, 0.5, 0.5, 0.5, 0], false],
    ["Fura (Газманов)", [0.5, 0, 0, 0, 0, 0, 0], false],
    ["Roolz / Грузовичкоф", [0.5, 0.5, 0, 0, 0, 0.5, 0], false],
    ["Datatruck (ушёл в US)", [0.5, 0, 0, 0, 0, 0.5, 0], false],
    ["Navlungo (TR в CIS)", [0.5, 0, 0, 0, 0, 0, 0.5], false],
    ["Timocom (EU)", [1, 0, 0, 0, 0.5, 0.5, 0], false],
    ["Uber Freight (US)", [1, 1, 0, 0.5, 0, 1, 0], false],
  ];
  const mark = (v) => {
    if (v === 1) return <span className="text-emerald-500 text-lg font-bold">✓</span>;
    if (v === 0.5) return <span className="text-amber-500 text-lg font-bold">≈</span>;
    return <span className="text-neutral-300">—</span>;
  };

  const [tab, setTab] = useState("ati");
  const tabs = [
    { id: "ati", label: "АТИ.СУ" },
    { id: "ru", label: "Россия" },
    { id: "ca", label: "Центр. Азия" },
    { id: "global", label: "Глобально" },
  ];

  return (
    <section id="competition" className="bg-[var(--c-cream)] py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><Eyebrow color="text-violet-600">Competitive Landscape</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight text-neutral-900 max-w-5xl">
            Никто не закрывает весь стек логистических операций
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            Российские игроки — фрагментированно, западных нет, локальный CIS — пустой. Полная матрица 10 платформ × 7 функций.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-14 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-neutral-900 text-white">
                    <th className="text-left py-4 px-5 font-bold uppercase tracking-wider text-[10px]">Платформа</th>
                    {headers.map((h) => (
                      <th key={h} className="py-4 px-3 font-bold uppercase tracking-wider text-[10px] text-center">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([name, vals, isUs], i) => (
                    <tr key={i} className={`border-t border-neutral-100 ${isUs ? "bg-cyan-50" : "even:bg-neutral-50/50"} hover:bg-cyan-50/40 transition`}>
                      <td className={`py-3.5 px-5 font-display font-bold ${isUs ? "text-cyan-700" : "text-neutral-900"}`}>{name}</td>
                      {vals.map((v, j) => <td key={j} className="py-3.5 px-3 text-center">{mark(v)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 text-xs text-neutral-500 italic border-t border-neutral-100 bg-neutral-50">
              ✓ Полностью   ≈ Частично   — Нет
            </div>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-20">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-5">Deep dives</div>
            <div className="flex flex-wrap gap-2 mb-8 border-b border-neutral-200">
              {tabs.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`px-5 py-3 font-display font-bold text-sm transition relative ${tab === t.id ? "text-cyan-600" : "text-neutral-500 hover:text-neutral-900"}`}>
                  {t.label}
                  {tab === t.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500" />}
                </button>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 md:p-10">
              {tab === "ati" && <ATIDeep />}
              {tab === "ru" && <RUDeep />}
              {tab === "ca" && <CADeep />}
              {tab === "global" && <GlobalDeep />}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const ATIDeep = () => {
  const kvs = [
    ["Уникальных пользователей/мес", "10,000,000+"],
    ["Зарегистрированных компаний", "587,355"],
    ["Стран присутствия", "63"],
    ["Выручка 2024", "₽1.6B (~$17M)"],
    ["Динамика", "+51% YoY"],
    ["Команда", "34 человека"],
    ["Бизнес-модель", "Подписки, $0 транзакций"],
  ];
  const wins = ["АТИ-Доки: формализованные счета", "Mobile ID верификация", "ЭЦП для KZ", "KaspiPay для KZ, MBank для KG", "Антифрод: блок номиналов"];
  const gaps = ["Real-time GPS трекинг", "Эскроу-платежи", "Чат-замена WhatsApp", "AI-матчинг и комиссия"];
  return (
    <div>
      <h3 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-3">10M MAU, но это не моат, это рента</h3>
      <p className="text-base text-neutral-600 mb-10 max-w-3xl">Биржа 1993 года эволюционирует медленно. Не берёт ничего с транзакций.</p>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-600 mb-4">Операционные показатели</div>
          {kvs.map(([k, v], i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-neutral-100 text-sm">
              <span className="text-neutral-600">{k}</span>
              <span className="font-display font-bold text-neutral-900">{v}</span>
            </div>
          ))}
        </div>
        <div className="space-y-7">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4">Что добавили в 2025</div>
            <ul className="space-y-2">
              {wins.map((w, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-700">
                  <span className="block w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />{w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-600 mb-4">Чего нет и не будет</div>
            <ul className="space-y-2">
              {gaps.map((g, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-700">
                  <span className="block w-3 h-0.5 bg-rose-500 mt-2.5 flex-shrink-0" />{g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10 bg-neutral-900 text-white p-6 rounded-xl">
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300 mb-2">Thesis</div>
        <p className="font-display text-base italic text-neutral-200 leading-relaxed">
          $17M выручки с 587K компаний на подписке. Мы берём 10% с GMV — при том же объёме это $170M+. Та же база, на порядок больший выхлоп.
        </p>
      </div>
    </div>
  );
};

const RUDeep = () => {
  const table = [
    ["Yandex Магистрали", "Часть Yandex (₽1.44T 2025), таргет ₽500B/год", "Активны, но 1 из 100 направлений", "Не приоритет, нет CIS", "amber"],
    ["Монополия", "₽60.2B 2024 (+15%), оценка ₽28B", "ДЕФОЛТ ₽260M (дек. 2025)", "Перегрев scale-at-all-costs", "rose"],
    ["Fura", "₽3.25B 2024 (−9.8%), 122 чел.", "Стагнация, налог. долг ₽21M", "Не масштабируются", "amber"],
    ["Грузовичкоф", "Цель ₽8B 2024, B2C +8.8%", "Куплены Wildberries (₽3-8B)", "Городские перевозки", "amber"],
    ["АТИ.СУ", "₽1.6B 2024 (+51%), 10M MAU", "Лидер по объёму, $0 транзакций", "Биржа, не платформа", "cyan"],
    ["Roolz", "TMS-сервис, ниша FTL", "Стабильно растут на нише", "Нет marketplace, только tools", "cyan"],
  ];
  const colorMap = { rose: "text-rose-600", amber: "text-amber-600", cyan: "text-cyan-600" };
  return (
    <div>
      <h3 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-3">Российские «цифровые» — финансовая правда</h3>
      <p className="text-base text-neutral-600 mb-10 max-w-3xl">Все игроки масштаба под давлением. Yandex единственный с ресурсом, но не приоритет.</p>
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-900 text-white text-left">
              <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px]">Игрок</th>
              <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px]">Метрики</th>
              <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px]">Статус 2025–26</th>
              <th className="py-3 px-4 font-bold uppercase tracking-wider text-[10px]">Слабость</th>
            </tr>
          </thead>
          <tbody>
            {table.map((r, i) => (
              <tr key={i} className="border-t border-neutral-100 even:bg-neutral-50/50 hover:bg-neutral-50">
                <td className="py-4 px-4 font-display font-bold text-neutral-900">{r[0]}</td>
                <td className="py-4 px-4 text-neutral-700">{r[1]}</td>
                <td className={`py-4 px-4 font-bold ${colorMap[r[4]]}`}>{r[2]}</td>
                <td className="py-4 px-4 text-neutral-700">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CADeep = () => {
  const cards = [
    { flag: "🇺🇿", name: "Datatruck", meta: "Узбекские корни → США", icon: Plane, color: "amber",
      kvs: [["Series A", "$12M (Jan 2026)"], ["Lead", "Avenue Growth"], ["Pre-A bridge", "$300K"], ["Команда", "50+ в 6 стран."], ["Фокус", "AI-TMS US"]],
      verdict: "ПЕРЕКЛЮЧИЛИСЬ НА США. CIS они ушли — наш TAM освободился." },
    { flag: "🇹🇷", name: "Navlungo", meta: "Турция, экспансия в CA", icon: Ship, color: "violet",
      kvs: [["Базовый рынок", "Турция"], ["Investor", "MOST Ventures"], ["Other inv.", "idacapital (TR)"], ["Целевые рынки", "USA + CA"], ["Конкурент?", "Не глубокий TMS"]],
      verdict: "ЭКСПАНДЕР. Турецкая основа, не локальная." },
    { flag: "🇰🇬🇰🇿", name: "Локальные TMS", meta: "Пустота — наш шанс", icon: Search, color: "emerald",
      kvs: [["CIS FTL стартапов", "≈0"], ["AI-фокус региона", "Нет"], ["Эскроу-платежи", "Никто"], ["Венчур после 2022", "Слабый"], ["Барьер входа", "Низкий"]],
      verdict: "Greenfield. Никто не покрывает регион технологично." },
  ];
  const cmap = {
    amber: { text: "text-amber-600", border: "border-amber-500" },
    violet: { text: "text-violet-600", border: "border-violet-500" },
    emerald: { text: "text-emerald-600", border: "border-emerald-500" },
  };
  return (
    <div>
      <h3 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-3">Центральная Азия — пустой рынок</h3>
      <p className="text-base text-neutral-600 mb-10 max-w-3xl">Datatruck, единственный CIS-лог стартап с серьёзным венчуром, переключился на США.</p>
      <div className="grid md:grid-cols-3 gap-5">
        {cards.map((c, i) => {
          const Icon = c.icon;
          const cp = cmap[c.color];
          return (
            <div key={i} className={`bg-neutral-50 border-t-4 ${cp.border} rounded-b-xl p-6 hover:bg-white hover:shadow-xl transition`}>
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-6 h-6 ${cp.text}`} strokeWidth={1.5} />
                <span className="text-2xl">{c.flag}</span>
              </div>
              <h4 className="font-display font-bold text-2xl text-neutral-900">{c.name}</h4>
              <p className={`text-[11px] font-bold uppercase tracking-[0.2em] ${cp.text} mb-4`}>{c.meta}</p>
              <div className="space-y-1.5 mb-5">
                {c.kvs.map(([k, v], j) => (
                  <div key={j} className="flex items-center justify-between text-xs border-b border-neutral-100 py-1.5">
                    <span className="text-neutral-600">{k}</span>
                    <span className={`font-bold ${cp.text}`}>{v}</span>
                  </div>
                ))}
              </div>
              <p className={`text-xs italic ${cp.text} font-medium leading-relaxed border-l-2 ${cp.border} pl-3`}>{c.verdict}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GlobalDeep = () => {
  const cards = [
    { name: "Full Truck Alliance", meta: "NYSE: YMM · CHINA", v1: "$1.78B", l1: "Revenue 2025", v2: "$637M", l2: "Net income (+42.8%)", v3: "236M", l3: "Fulfilled orders", verdict: "Прямой аналог. Прибыльны.", color: "emerald" },
    { name: "Augment.ai", meta: "USA · AI Logistics", v1: "$85M", l1: "Series A (Sept 2025)", v2: "Redpoint", l2: "Lead, +8VC", v3: "$25M", l3: "Seed (5 мес ранее)", verdict: "Оценка ≥$500M на Series A.", color: "violet" },
    { name: "Pallet", meta: "USA · Workflow AI", v1: "$27M", l1: "Series A (May 2025)", v2: "General Catalyst", l2: "Lead", v3: "10×", l3: "Faster", verdict: "AI workflow для брокеров.", color: "amber" },
    { name: "FleetWorks", meta: "USA · Y Combinator '23", v1: "$17M", l1: "Series A (Oct 2025)", v2: "First Round", l2: "Lead (Trenchard)", v3: "10K+", l3: "Carriers in 6 months", verdict: "AI-нативный матчинг.", color: "cyan" },
  ];
  const cmap = {
    emerald: { text: "text-emerald-600", border: "border-emerald-500" },
    violet: { text: "text-violet-600", border: "border-violet-500" },
    amber: { text: "text-amber-600", border: "border-amber-500" },
    cyan: { text: "text-cyan-600", border: "border-cyan-500" },
  };
  const multiples = [
    { label: "Digital Broker", value: 1.5 },
    { label: "SaaS Logistics", value: 8 },
    { label: "Marketplace", value: 12 },
    { label: "AI-first Platform", value: 20 },
  ];
  return (
    <div>
      <h3 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-3">Глобальные бенчмарки</h3>
      <p className="text-base text-neutral-600 mb-10 max-w-3xl">$6B+ привлечено в logistics tech в 2025. AI-first платформы — премиум-мультипликаторы.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c, i) => {
          const cp = cmap[c.color];
          return (
            <div key={i} className={`bg-neutral-50 border-t-4 ${cp.border} rounded-b-xl p-5 hover:bg-white hover:shadow-xl transition`}>
              <h4 className="font-display font-bold text-xl text-neutral-900">{c.name}</h4>
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${cp.text} mb-4`}>{c.meta}</p>
              {[[c.v1, c.l1], [c.v2, c.l2], [c.v3, c.l3]].map(([v, l], j) => (
                <div key={j} className="mb-3">
                  <div className="font-display font-bold text-xl text-neutral-900">{v}</div>
                  <div className="text-[11px] text-neutral-500">{l}</div>
                </div>
              ))}
              <div className={`text-xs italic ${cp.text} pt-3 border-t border-neutral-200`}>{c.verdict}</div>
            </div>
          );
        })}
      </div>
      <div className="grid md:grid-cols-3 gap-5 items-center">
        <div className="md:col-span-2">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">Revenue мультипликаторы по типу модели</div>
          <div className="space-y-2.5">
            {multiples.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-32 text-sm text-neutral-700">{m.label}</div>
                <div className="flex-1 bg-neutral-100 rounded-full h-7 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full flex items-center justify-end px-3 text-xs font-bold text-white" style={{ width: `${(m.value / 20) * 100}%` }}>
                    {m.value}×
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-neutral-900 text-white p-6 rounded-xl">
          <div className="font-display font-bold text-4xl text-cyan-300">$6B+</div>
          <div className="mt-2 text-sm text-neutral-300">привлечено в logistics tech globally в 2025.</div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────
// 8. POSITIONING
// ──────────────────────────────────────────────────────────────
const Positioning = () => {
  const dots = [
    { x: 22, y: 50, label: "АТИ.СУ", size: 16, c: "bg-neutral-500" },
    { x: 30, y: 75, label: "Yandex", size: 14, c: "bg-neutral-500" },
    { x: 40, y: 65, label: "Монополия", size: 14, c: "bg-amber-500" },
    { x: 18, y: 90, label: "Fura", size: 12, c: "bg-neutral-400" },
    { x: 25, y: 95, label: "Roolz", size: 12, c: "bg-neutral-400" },
    { x: 70, y: 80, label: "Datatruck", size: 12, c: "bg-neutral-400" },
    { x: 80, y: 90, label: "FleetWorks", size: 12, c: "bg-neutral-400" },
    { x: 75, y: 85, label: "Augment", size: 12, c: "bg-neutral-400" },
  ];
  const insights = [
    { t: "Россия", b: "Все игроки в нижне-левом квадранте — listing boards и legacy stack без AI." },
    { t: "США / EU", b: "AI-first решения есть (Augment, FleetWorks), но без full stack и без CIS присутствия." },
    { t: "Центральная Азия", b: "Datatruck ушёл в США. Локальных AI+full stack нет. Greenfield." },
    { t: "Гэп LogisCIS", b: "Единственная позиция: AI-first × Multi-CIS × Full stack с эскроу." },
  ];
  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><Eyebrow>Strategic Positioning</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight text-neutral-900">
            Гэп, который мы занимаем
          </h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-12 gap-12 items-center">
          <Reveal delay={300} className="md:col-span-7">
            <div className="relative aspect-square bg-neutral-50 rounded-2xl border border-neutral-200 p-6">
              <div className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Big stack · Legacy</div>
              <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-cyan-600">AI + Full Stack</div>
              <div className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Listing boards</div>
              <div className="absolute bottom-4 right-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">AI point tools</div>
              <div className="absolute top-1/2 left-6 right-6 h-px bg-neutral-300" />
              <div className="absolute left-1/2 top-6 bottom-6 w-px bg-neutral-300" />
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-neutral-600 font-medium">AI-first / автоматизация →</div>
              {dots.map((d, i) => (
                <div key={i} className="absolute" style={{ left: `${d.x}%`, top: `${d.y}%`, transform: "translate(-50%, -50%)" }}>
                  <div className={`${d.c} rounded-full ring-2 ring-white shadow-md`} style={{ width: d.size, height: d.size }} />
                  <div className="absolute left-5 top-0 text-[11px] font-bold text-neutral-700 whitespace-nowrap">{d.label}</div>
                </div>
              ))}
              <div className="absolute" style={{ left: "75%", top: "22%", transform: "translate(-50%, -50%)" }}>
                <div className="absolute -inset-6 bg-cyan-500/20 rounded-full animate-pulseRing" />
                <div className="relative w-7 h-7 bg-cyan-500 rounded-full ring-4 ring-cyan-100 shadow-xl" />
                <div className="absolute left-9 top-1.5 font-display text-sm font-bold text-cyan-700 whitespace-nowrap">LogisCIS</div>
              </div>
            </div>
          </Reveal>
          <div className="md:col-span-5 space-y-6">
            {insights.map((ins, i) => (
              <Reveal key={i} delay={400 + i * 100}>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-cyan-500 flex-shrink-0" />
                  <div>
                    <div className="font-display font-bold text-base text-neutral-900">{ins.t}</div>
                    <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{ins.b}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 9. SOLUTION
// ──────────────────────────────────────────────────────────────
const Solution = () => {
  const mods = [
    { ic: Store, t: "Маркетплейс грузов", tag: "Ядро", c: "cyan", d: "AI-матчинг за секунды. Тендеры. KYC компаний и водителей." },
    { ic: Shield, t: "Эскроу-платежи", tag: "Уникально", c: "emerald", d: "Деньги в блокировке при отгрузке. Автовыплата при доставке." },
    { ic: MapPin, t: "GPS-трекинг real-time", tag: "Ядро", c: "cyan", d: "Live как Uber. ETA с границами и таможней. Геофенсинг и алерты." },
    { ic: MessageCircle, t: "Чат — замена WhatsApp", tag: "Ядро", c: "amber", d: "Внутри платформы. Голосовой AI-ассистент. Группы по заказу." },
    { ic: FileText, t: "Электронные документы", tag: "MVP→V2", c: "cyan", d: "ЭТрН (РФ обяз. с 09/2026), CMR, подпись. Интеграция с ГИС ЭПД." },
    { ic: PieIcon, t: "Аналитика и BI", tag: "B2B", c: "violet", d: "Дашборд: заказы, маршруты, расходы. KPI перевозчиков. API." },
  ];
  const cMap = {
    cyan: { bg: "bg-cyan-500", text: "text-cyan-600", tagBg: "bg-cyan-100" },
    emerald: { bg: "bg-emerald-500", text: "text-emerald-600", tagBg: "bg-emerald-100" },
    amber: { bg: "bg-amber-500", text: "text-amber-600", tagBg: "bg-amber-100" },
    violet: { bg: "bg-violet-500", text: "text-violet-600", tagBg: "bg-violet-100" },
  };
  return (
    <section id="solution" className="bg-[var(--c-cream)] py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><Eyebrow color="text-emerald-600">The Solution</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight text-neutral-900 max-w-4xl">
            Полная операционная система для CIS-логистики
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            6 модулей. 3 типа пользователей. 1 платформа. Ничего из этого нет ни у одного игрока в регионе.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mods.map((m, i) => {
            const c = cMap[m.c];
            const Ic = m.ic;
            return (
              <Reveal key={i} delay={300 + i * 80}>
                <div className="group bg-white border border-neutral-200 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 ${c.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition`}>
                      <Ic className="w-7 h-7 text-white" strokeWidth={1.8} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${c.tagBg} ${c.text} px-2.5 py-1 rounded-full`}>{m.tag}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-neutral-900 mb-2">{m.t}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{m.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 10. USERS
// ──────────────────────────────────────────────────────────────
const UserTypes = () => {
  const users = [
    { ic: Building2, color: "cyan", role: "Грузоотправитель", sub: "Компании и ИП — отправляют груз",
      actions: ["Публикует заказ с маршрутом и ценой", "Выбирает перевозчика по AI-рейтингу", "Отслеживает груз live на карте", "Подтверждает доставку → деньги уходят"],
      kpi: "−29% расходов на логистику" },
    { ic: Truck, color: "emerald", role: "Перевозчик", sub: "Транспортные компании с парком",
      actions: ["Берёт заказы с биржи без обзвона", "Управляет водителями в одном UI", "Получает оплату в день доставки", "Pro-подписка = топ в ладдере"],
      kpi: "+23% утилизации парка" },
    { ic: BadgeCheck, color: "amber", role: "Водитель", sub: "Дальнобойщики и наёмные",
      actions: ["Mobile app: навигация + заказы", "Чат с диспетчером, не звонки", "ЭТрН и CMR на телефоне", "Прозрачные оплаты в день рейса"],
      kpi: "+18% средний доход" },
  ];
  const cMap = {
    cyan: { bg: "bg-cyan-500", text: "text-cyan-600", border: "border-cyan-500", textLight: "text-cyan-100" },
    emerald: { bg: "bg-emerald-500", text: "text-emerald-600", border: "border-emerald-500", textLight: "text-emerald-100" },
    amber: { bg: "bg-amber-500", text: "text-amber-600", border: "border-amber-500", textLight: "text-amber-100" },
  };
  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><Eyebrow>Three User Types</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight text-neutral-900">
            Один продукт, три value props
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            Сетевой эффект: больше перевозчиков → лучше цены → больше шипперов → больше водителей.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {users.map((u, i) => {
            const c = cMap[u.color];
            const Ic = u.ic;
            return (
              <Reveal key={i} delay={300 + i * 100}>
                <div className={`bg-white border-2 ${c.border} rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 h-full flex flex-col`}>
                  <div className={`${c.bg} p-7 relative`}>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                    <Ic className="w-10 h-10 text-white mb-3" strokeWidth={1.5} />
                    <h3 className="font-display font-bold text-2xl text-white">{u.role}</h3>
                    <p className={`text-sm ${c.textLight} mt-1`}>{u.sub}</p>
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <ul className="space-y-3 flex-1">
                      {u.actions.map((a, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-neutral-700">
                          <ArrowRight className={`w-4 h-4 mt-0.5 ${c.text} flex-shrink-0`} strokeWidth={2.5} />
                          {a}
                        </li>
                      ))}
                    </ul>
                    <div className={`mt-6 py-3 px-4 ${c.text} font-display font-bold text-center text-base border-t border-neutral-100`}>{u.kpi}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 10b. TRACTION
// ──────────────────────────────────────────────────────────────
const Traction = () => {
  const stats = [
    { v: "12", l: "LOI от грузоотправителей", s: "KG · KZ", c: "text-emerald-600" },
    { v: "3", l: "Design-партнёра", s: "ритейл, FMCG, агро", c: "text-cyan-600" },
    { v: "47", l: "Перевозчиков в waitlist", s: "Бишкек · Ош · Алматы", c: "text-amber-600" },
    { v: "2", l: "Пилотных перевозки", s: "март 2026", c: "text-violet-600" },
  ];
  const partners = [
    { name: "Ритейл-сеть #1", country: "🇰🇬 KG", focus: "FMCG из РФ → Бишкек", commit: "до 80 рейсов/мес" },
    { name: "Производитель текстиля", country: "🇰🇬 KG", focus: "Бишкек → Алматы → Москва", commit: "до 25 рейсов/мес" },
    { name: "Агро-экспортёр", country: "🇰🇿 KZ", focus: "Алматы → Бишкек, обратная загрузка", commit: "до 40 рейсов/мес" },
  ];
  const milestones = [
    { d: "Янв 2026", t: "Customer discovery: 60+ интервью с шипперами и перевозчиками" },
    { d: "Фев 2026", t: "Прототип биржи + GPS-трекинга в Telegram-боте, тест на 8 рейсах" },
    { d: "Март 2026", t: "Первые 2 платных рейса с эскроу (через банк-партнёра KG)" },
    { d: "Апр 2026", t: "12 LOI на $4.2M GMV годовых обязательств · 47 перевозчиков в waitlist" },
  ];
  return (
    <section id="traction" className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><Eyebrow color="text-emerald-600">Traction · Pre-seed Validation</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight text-neutral-900 max-w-4xl">
            Не идея на бумаге — есть LOI и платные рейсы
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            До поднятия раунда — 4 месяца customer discovery, 12 LOI на $4.2M годовых обязательств, первые рейсы с эскроу.
          </p>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <Reveal key={i} delay={300 + i * 80}>
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition">
                <div className={`font-display font-bold text-5xl ${s.c} leading-none`}>{s.v}</div>
                <div className="mt-3 text-sm text-neutral-700 font-medium">{s.l}</div>
                <div className="mt-1 text-xs text-neutral-500 uppercase tracking-wider">{s.s}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-10">
          <Reveal delay={500}>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4">Design-партнёры (NDA)</div>
              <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
                {partners.map((p, i) => (
                  <div key={i} className={`px-5 py-4 ${i > 0 ? 'border-t border-neutral-100' : ''} hover:bg-neutral-50 transition`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-display font-bold text-sm text-neutral-900">{p.name}</div>
                      <span className="text-xs text-neutral-500">{p.country}</span>
                    </div>
                    <div className="text-xs text-neutral-600 mb-1">{p.focus}</div>
                    <div className="text-xs font-semibold text-emerald-600">→ {p.commit}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-neutral-500 italic">Контактные данные раскрываются по NDA после первой встречи с инвестором.</p>
            </div>
          </Reveal>
          <Reveal delay={600}>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4">Хронология валидации</div>
              <div className="space-y-4 relative pl-6 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-px before:bg-neutral-200">
                {milestones.map((m, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white" />
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">{m.d}</div>
                    <div className="text-sm text-neutral-700 mt-0.5 leading-relaxed">{m.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={800}>
          <p className="mt-10 text-xs italic text-neutral-500 max-w-3xl">
            Цифры actual на 04/2026. Подтверждённые LOI и пилотные акты доступны в data room.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 11. TRACKING (DARK)
// ──────────────────────────────────────────────────────────────
const Tracking = () => {
  const layers = [
    { n: "01", t: "Оффлайн-кэш", cost: "$0", tech: "Mobile SDK", ic: Smartphone, d: "GPS пишется локально каждые 30 сек. При связи — автосинхронизация.", cov: "~60%" },
    { n: "02", t: "Эскроу как мотивация", cost: "$0", tech: "Smart contract", ic: Shield, d: "Деньги выплачиваются только при активном трекинге.", cov: "Mot." },
    { n: "03", t: "Hardware Teltonika", cost: "~$50", tech: "Multi-SIM", ic: Cpu, d: "Teltonika FMB920 в кабине, питание от грузовика. Multi-SIM Emnify/1NCE.", cov: "~95%" },
    { n: "04", t: "Starlink Mobility", cost: "$2.5K + $250/мес", tech: "Satellite", ic: Satellite, d: "Терминал в кабине. 50–200 Mbit/s. 100+ стран. Для премиум-грузов $50K+.", cov: "100%" },
  ];
  return (
    <section className="relative bg-[#0A0E1A] text-white py-32 overflow-hidden">
      <MeshBackground variant="dark" />
      <div className="grain pointer-events-none" />
      <SectionSpotlight className="relative max-w-7xl mx-auto px-6 py-2">
        <Reveal><Eyebrow color="text-[#F0A573]">Tech · Tracking Reliability</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight max-w-4xl">
            4 слоя надёжности — груз виден всегда
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-400 max-w-3xl">
            Горы Кыргызстана. Степи Казахстана. Смена сетей на границах. Решено в 4 слоя — от $0 до Starlink.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {layers.map((L, i) => {
            const Ic = L.ic;
            return (
              <Reveal key={i} delay={300 + i * 100}>
                <div className="h-full bg-white/[0.03] border border-cyan-500/20 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-cyan-500/40 transition-all duration-500">
                  <div className="flex items-start justify-between mb-5">
                    <div className="font-display font-bold text-5xl text-cyan-300">{L.n}</div>
                    <Ic className="w-7 h-7 text-cyan-300" strokeWidth={1.4} />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-1">{L.t}</h3>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300 mb-3">{L.tech}</div>
                  <div className="inline-block px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-xs font-bold text-cyan-200 mb-4">{L.cost}</div>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">{L.d}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Покрытие</span>
                    <span className="font-display font-bold text-lg text-cyan-300">{L.cov}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </SectionSpotlight>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 12. AI
// ──────────────────────────────────────────────────────────────
const AISection = () => {
  const feats = [
    { ic: Bot, t: "Умный матчинг", imp: "−40% времени", d: "AI подбирает лучшего перевозчика по истории и маршруту за секунды." },
    { ic: Phone, t: "Голосовой AI-диспетчер", imp: "−70% звонков", d: "«Выезжаю из Алматы» → статус обновляется." },
    { ic: Clock, t: "Предсказание ETA", imp: "−50% ошибок", d: "Учитывает время на границах, погоду, дорожные условия." },
    { ic: ShieldAlert, t: "Антифрод детектор", imp: "−80% мошенн.", d: "Новый аккаунт + крупный заказ + нестандартный маршрут = флаг." },
    { ic: Route, t: "Оптимизация маршрутов", imp: "−29% пустых", d: "Алгоритм предлагает обратную загрузку." },
    { ic: BarChart3, t: "AI-аналитика B2B", imp: "Новый класс", d: "Авто-отчёты: убыточные маршруты, прогноз." },
  ];
  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><Eyebrow color="text-violet-600">AI · Native Platform</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight text-neutral-900 max-w-4xl">
            AI-first платформа — не chatbot, прикрученный сбоку
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            $15.3B рынок AI-логистики (2024) с CAGR 47%. UPS ORION экономит 25% топлива. TruckTalk автоматизировал 70% звонков.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {feats.map((f, i) => {
            const Ic = f.ic;
            return (
              <Reveal key={i} delay={300 + i * 70}>
                <div className="group bg-neutral-50 border border-neutral-200 rounded-2xl p-7 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center group-hover:rotate-6 transition flex-shrink-0">
                      <Ic className="w-6 h-6 text-white" strokeWidth={1.6} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-base text-neutral-900">{f.t}</h3>
                      <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 mt-0.5">{f.imp}</div>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">{f.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={800}>
          <div className="mt-16 bg-neutral-900 text-white rounded-2xl p-8 grid md:grid-cols-3 gap-8 items-center">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300 mb-2">Augment.ai</div>
              <div className="font-display font-bold text-2xl">$85M Series A</div>
              <div className="text-xs text-neutral-400 mt-1">Sept 2025 · Single AI-assistant, US-only.</div>
            </div>
            <div className="text-center text-3xl text-neutral-600 font-bold">vs</div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300 mb-2">LogisCIS</div>
              <div className="font-display font-bold text-2xl">Full OS + AI native</div>
              <div className="text-xs text-neutral-400 mt-1">CIS focus · 6 AI-фич встроены в каждый модуль.</div>
            </div>
            <div className="md:col-span-3 pt-6 border-t border-white/10 text-center">
              <span className="text-cyan-300 font-bold text-base">→ премиум-сегмент мультипликаторов (15-20× ARR)</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 13. BUSINESS
// ──────────────────────────────────────────────────────────────
const Business = () => {
  const streams = [
    { n: "Транзакционная комиссия", m: "8–15% с каждой перевозки", st: "MVP", c: "emerald" },
    { n: "Pro-подписка перевозчика", m: "Топ в поиске + аналитика", st: "MVP", c: "emerald" },
    { n: "KYC верификация", m: "Платная проверка — trusted", st: "MVP", c: "emerald" },
    { n: "Страхование грузов", m: "Комиссия с партнёров", st: "V2", c: "cyan" },
    { n: "Факторинг", m: "Предоплата под заказы", st: "V2", c: "cyan" },
    { n: "Enterprise API", m: "Интеграция ритейла", st: "V3", c: "violet" },
  ];
  const cMap = {
    emerald: "bg-emerald-100 text-emerald-700 border-emerald-500",
    cyan: "bg-cyan-100 text-cyan-700 border-cyan-500",
    violet: "bg-violet-100 text-violet-700 border-violet-500",
  };
  const data = [
    { year: "Y1", GMV: 12, Revenue: 1.4 },
    { year: "Y2", GMV: 58, Revenue: 7.2 },
    { year: "Y3", GMV: 210, Revenue: 29 },
    { year: "Y4", GMV: 680, Revenue: 96 },
    { year: "Y5", GMV: 1800, Revenue: 270 },
  ];
  const stats = [
    { v: "8–15%", l: "Транз. комиссия", c: "text-emerald-600" },
    { v: "$0", l: "Берёт АТИ.СУ", c: "text-cyan-600" },
    { v: "$45B", l: "PayCargo на эскроу", c: "text-cyan-700" },
    { v: "27×", l: "LTV / CAC", c: "text-amber-600" },
  ];
  return (
    <section id="economics" className="bg-[var(--c-cream)] py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><Eyebrow color="text-emerald-600">Business Model</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight text-neutral-900 max-w-5xl">
            Транзакционная комиссия — ядро. Подписки и финтех — масштаб.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            АТИ.СУ берёт $0 с GMV. Мы берём 8–15%. PayCargo обработал $45B на эскроу — модель доказана.
          </p>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={300 + i * 60}>
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition">
                <div className={`font-display font-bold text-4xl md:text-5xl ${s.c} leading-none`}>{s.v}</div>
                <div className="mt-3 text-sm text-neutral-600">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          <Reveal delay={500}>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4">Потоки выручки</div>
              <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
                {streams.map((s, i) => {
                  const cls = cMap[s.c].split(' ');
                  return (
                    <div key={i} className={`flex items-center justify-between gap-4 px-5 py-4 border-l-4 ${cls[2]} ${i > 0 ? 'border-t border-t-neutral-100' : ''} hover:bg-neutral-50 transition`}>
                      <div className="flex-1">
                        <div className="font-display font-bold text-sm text-neutral-900">{s.n}</div>
                        <div className="text-xs text-neutral-500 mt-0.5">{s.m}</div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${cls[0]} ${cls[1]}`}>{s.st}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
          <Reveal delay={600}>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4">5-летний сценарий ($M) · Y3 — план, Y4–Y5 — ambition</div>
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis dataKey="year" stroke="#737373" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#737373" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#0A0E1A", border: "none", borderRadius: 8, color: "white", fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="GMV" fill="#06B6D4" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="Revenue" fill="#10B981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 14. UNIT ECONOMICS
// ──────────────────────────────────────────────────────────────
const UnitEcon = () => {
  const cards = [
    { t: "Средний заказ КГ→КЗ (FTL)", c: "cyan", ic: TrendingUp,
      rows: [["Перевозка (тариф рынка)", "$1,500"], ["Комиссия 10%", "$150"], ["Эквайринг + ops", "−$22"], ["Чистая маржа", "$128"]],
      hi: 3, kicker: "8.5% net margin / order" },
    { t: "CAC / LTV", c: "emerald", ic: Users,
      rows: [["CAC перевозчика", "$80"], ["CAC шиппера", "$150"], ["LTV перевозчика 2y", "$2,200"], ["LTV / CAC blended", "18×"]],
      hi: 3, kicker: "Здоровая воронка, не subsidy" },
    { t: "Breakeven path", c: "amber", ic: Target,
      rows: [["Target GMV M+18 run-rate", "$1.5M/мес"], ["Breakeven run-rate", "$1.0M/мес"], ["Заказов/мес на breakeven", "~670"], ["Целевой месяц", "M+18"]],
      hi: 3, kicker: "Sustainable, not subsidy" },
  ];
  const cMap = {
    cyan: { bg: "bg-cyan-500", text: "text-cyan-600", tagBg: "bg-cyan-100", border: "border-cyan-500" },
    emerald: { bg: "bg-emerald-500", text: "text-emerald-600", tagBg: "bg-emerald-100", border: "border-emerald-500" },
    amber: { bg: "bg-amber-500", text: "text-amber-600", tagBg: "bg-amber-100", border: "border-amber-500" },
  };
  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><Eyebrow>Unit Economics</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight text-neutral-900 max-w-4xl">
            Зарабатываем на каждом заказе с первого дня
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            Чистая прибыль на заказе $128 (8.5%). LTV/CAC 18× blended. Breakeven к M+18. Не subsidy growth — реальная экономика с заказа №1.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {cards.map((c, i) => {
            const cp = cMap[c.c];
            const Ic = c.ic;
            return (
              <Reveal key={i} delay={300 + i * 100}>
                <div className={`bg-white border-t-4 ${cp.border} rounded-b-2xl shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col`}>
                  <div className="p-7 flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 ${cp.tagBg} rounded-xl flex items-center justify-center`}>
                        <Ic className={`w-6 h-6 ${cp.text}`} strokeWidth={1.8} />
                      </div>
                      <h3 className="font-display font-bold text-lg text-neutral-900">{c.t}</h3>
                    </div>
                    <div className="space-y-px">
                      {c.rows.map(([k, v], j) => {
                        const isHi = j === c.hi;
                        return (
                          <div key={j} className={`flex items-center justify-between py-3 ${isHi ? `${cp.tagBg} -mx-3 px-3 rounded-lg` : 'border-b border-neutral-100'}`}>
                            <span className={`text-sm ${isHi ? cp.text + " font-bold" : "text-neutral-600"}`}>{k}</span>
                            <span className={`font-display font-bold ${isHi ? `text-2xl ${cp.text}` : "text-base text-neutral-900"}`}>{v}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className={`${cp.bg} text-white px-7 py-4 text-center font-display font-bold`}>{c.kicker}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={700}>
          <p className="mt-10 text-sm italic text-neutral-500 max-w-3xl">
            В отличие от Convoy ($930M → $16M) и Монополии (₽260M default), мы строимся на положительной unit economics с заказа №1.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 15. MOATS
// ──────────────────────────────────────────────────────────────
const Moats = () => {
  const moats = [
    { ic: Network, c: "cyan", title: "Сетевой эффект",
      body: "Больше перевозчиков → лучше цены → больше заказов → больше перевозчиков. Невозможно скопировать без масштаба.",
      ev: "Uber, FTA, Lalamove — каждый дошёл до >$10B на этой механике." },
    { ic: Shield, c: "emerald", title: "Эскроу = доверие как продукт",
      body: "В cash-рынке СНГ держать деньги в эскроу — единственный способ получить доверие быстро.",
      ev: "PayCargo обработал $45B так в США. В CIS никто не делает." },
    { ic: Database, c: "amber", title: "Данные о маршрутах",
      body: "После 1M поездок мы знаем о маршрутах CIS больше всех — таможни, погода, реальное ETA.",
      ev: "FTA построил $24B IPO ровно на data моате после 6 лет." },
    { ic: Gavel, c: "violet", title: "Регуляторное окно",
      body: "ГосЛог + ЭТрН с 1 сент 2026 = принудительный онбординг. Кто первый интегрирован — забирает рынок.",
      ev: "Аккредитованный оператор ИС ЭПД — статус, который даёт государство." },
  ];
  const cMap = {
    cyan: { bg: "bg-cyan-500", text: "text-cyan-600", border: "border-cyan-500" },
    emerald: { bg: "bg-emerald-500", text: "text-emerald-600", border: "border-emerald-500" },
    amber: { bg: "bg-amber-500", text: "text-amber-600", border: "border-amber-500" },
    violet: { bg: "bg-violet-500", text: "text-violet-600", border: "border-violet-500" },
  };
  return (
    <section className="bg-[var(--c-cream)] py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><Eyebrow color="text-violet-600">Defensibility · Why We Win</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight text-neutral-900">
            Четыре устойчивых преимущества
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            Не каждое преимущество — настоящий моат. Сетевой эффект, доверие, данные и регуляторное окно — наши.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 gap-5">
          {moats.map((m, i) => {
            const cp = cMap[m.c];
            const Ic = m.ic;
            return (
              <Reveal key={i} delay={300 + i * 80}>
                <div className={`group bg-white border-l-4 ${cp.border} rounded-r-2xl p-7 hover:shadow-xl hover:translate-x-1 transition-all duration-500 flex gap-5 h-full`}>
                  <div className={`w-14 h-14 ${cp.bg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition`}>
                    <Ic className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl text-neutral-900 mb-2">{m.title}</h3>
                    <p className="text-sm text-neutral-700 leading-relaxed mb-4">{m.body}</p>
                    <div className={`text-xs italic font-medium ${cp.text}`}>→ {m.ev}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={700}>
          <div className="mt-14 bg-neutral-900 text-white p-8 rounded-2xl">
            <p className="font-display text-lg italic text-cyan-300 leading-relaxed">
              «Sub-5% digital penetration = greenfield TAM premium. Investors pay 2–3× extra vs mature markets.»
            </p>
            <div className="mt-3 text-xs text-neutral-400 uppercase tracking-widest">— Logistics Tech VC Thesis 2025</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 16. ROADMAP
// ──────────────────────────────────────────────────────────────
const Roadmap = () => {
  const phases = [
    { ph: "MVP", time: "0–6 мес", focus: "Коридор Бишкек → Алматы", c: "emerald", ic: Sprout,
      items: ["Биржа грузов + AI-матчинг", "Android приложение водителя", "GPS-трекинг real-time", "Чат — замена WhatsApp", "Эскроу через банк-партнёра KG", "KYC компаний и водителей"],
      target: "100 перевозчиков · 30 шипперов · $250K GMV/мес" },
    { ph: "V2", time: "6–18 мес", focus: "Масштаб KZ + вход в РФ", c: "cyan", ic: Rocket,
      items: ["Запуск в Казахстане", "RU SubCo + аккредитация в ИС ЭПД (ГосЛог)", "iOS приложение водителя", "Голосовой AI-диспетчер", "Страхование и факторинг", "Hardware Teltonika для Pro"],
      target: "1,500 перевозчиков · run-rate $1.5M GMV/мес" },
    { ph: "V3", time: "18–36 мес", focus: "Series A · Узбекистан", c: "violet", ic: Crown,
      items: ["Запуск в Узбекистане", "Электронный CMR на трансграничных", "Интеграция с таможней (KG/KZ/RU)", "BI Enterprise + open API", "Starlink Mobility для премиум-грузов", "Series A $15–25M"],
      target: "5,000+ перевозчиков · $200M+ GMV/год" },
  ];
  const cMap = {
    emerald: { bg: "bg-emerald-500", text: "text-emerald-600", tagBg: "bg-emerald-100" },
    cyan: { bg: "bg-cyan-500", text: "text-cyan-600", tagBg: "bg-cyan-100" },
    violet: { bg: "bg-violet-500", text: "text-violet-600", tagBg: "bg-violet-100" },
  };
  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><Eyebrow>Roadmap</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight text-neutral-900 max-w-4xl">
            От MVP в Бишкеке до лидера CIS-логистики
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            36 месяцев. Три фазы. Series A после захвата России на e-ТТН волне.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {phases.map((p, i) => {
            const cp = cMap[p.c];
            const Ic = p.ic;
            return (
              <Reveal key={i} delay={300 + i * 100}>
                <div className="bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  <div className={`${cp.bg} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                    <Ic className="w-9 h-9 mb-3" strokeWidth={1.5} />
                    <div className="font-display font-bold text-3xl leading-none">{p.ph}</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 mt-1.5">{p.time}</div>
                  </div>
                  <div className={`${cp.tagBg} ${cp.text} text-center py-3 font-display font-bold text-sm border-y border-neutral-200`}>{p.focus}</div>
                  <div className="p-6 flex-1 flex flex-col">
                    <ul className="space-y-2 flex-1">
                      {p.items.map((it, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-neutral-700">
                          <span className={`block w-1.5 h-1.5 rounded-full ${cp.bg} mt-2 flex-shrink-0`} />
                          {it}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 pt-4 border-t border-neutral-200">
                      <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${cp.text} mb-1`}>Target</div>
                      <div className="font-display font-bold text-sm text-neutral-900">{p.target}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 16b. RISKS
// ──────────────────────────────────────────────────────────────
const Risks = () => {
  const risks = [
    { ic: AlertTriangle, c: "rose", t: "Санкционный риск (вход в РФ)",
      body: "Нерезидент-владельцы, кросс-граничные расчёты, ограничения на интеграцию с гос-ИС.",
      mit: "RU SubCo с локальным ген.директором, ОФЭС-агент для ЭПД, расчёты только в рублях через РФ-банк-партнёра. Holding Mervey Ltd остаётся в KG." },
    { ic: Banknote, c: "amber", t: "Валютный контроль (UZ, частично KG)",
      body: "Узбекистан — жёсткие правила репатриации, конвертации и трансграничных платежей.",
      mit: "В UZ запускаемся через локального оператора-партнёра. Эскроу — в национальной валюте, без конвертации, выплата перевозчику в той же валюте, в которой пришло." },
    { ic: Stamp, c: "amber", t: "Аккредитация ИС ЭПД / ГосЛог",
      body: "Реестр операторов ЭПД РФ может задержать аккредитацию или отказать.",
      mit: "Параллельный путь: интеграция через уже аккредитованного оператора (партнёрство), пока идёт собственная аккредитация. Юр-бюджет $250K заложен." },
    { ic: Scale, c: "violet", t: "Эскроу = банковская услуга",
      body: "В РФ эскроу-агент — лицензированный банк (ст. 860.7 ГК РФ). В KG/KZ — номинальные/специальные счета.",
      mit: "MOU с банком-партнёром в KG (стадия согласования) и KZ. В РФ — модель безотзывного аккредитива через РФ-банк, без собственной лицензии." },
    { ic: ShieldAlert, c: "rose", t: "Регуляторный rollback",
      body: "Сроки ФЗ-140 / e-ТТН в РФ исторически переносились (2022, 2023).",
      mit: "Бизнес-модель не зависит от обязательности ЭПД. Ценность для шиппера/перевозчика существует уже сегодня (эскроу, трекинг, AI-матчинг)." },
    { ic: Skull, c: "neutral", t: "Демпинг от Yandex или АТИ.СУ",
      body: "Крупный игрок может субсидировать комиссию до 0% и выжать нас на take-rate.",
      mit: "Не конкурируем по take-rate, а по продукту: эскроу + чат + AI-диспетчер. Yandex Магистрали — 1 из 100 направлений Yandex, не приоритет. АТИ.СУ — биржа, не платформа." },
  ];
  const cMap = {
    rose: { bg: "bg-rose-500", text: "text-rose-600", border: "border-rose-500", tagBg: "bg-rose-100" },
    amber: { bg: "bg-amber-500", text: "text-amber-600", border: "border-amber-500", tagBg: "bg-amber-100" },
    violet: { bg: "bg-violet-500", text: "text-violet-600", border: "border-violet-500", tagBg: "bg-violet-100" },
    neutral: { bg: "bg-neutral-700", text: "text-neutral-700", border: "border-neutral-700", tagBg: "bg-neutral-100" },
  };
  return (
    <section className="bg-[var(--c-cream)] py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><Eyebrow color="text-rose-600">Risks · Honest View</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight text-neutral-900 max-w-4xl">
            Шесть реальных рисков и наши митигации
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            Мы не будем делать вид, что их нет. Каждый закрыт планом — и каждый имеет своего ответственного в команде.
          </p>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {risks.map((r, i) => {
            const c = cMap[r.c];
            const Ic = r.ic;
            return (
              <Reveal key={i} delay={300 + i * 70}>
                <div className={`bg-white border-l-4 ${c.border} rounded-r-2xl p-7 hover:shadow-xl transition-all duration-500 h-full flex gap-5`}>
                  <div className={`w-12 h-12 ${c.tagBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Ic className={`w-6 h-6 ${c.text}`} strokeWidth={1.6} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg text-neutral-900 mb-2">{r.t}</h3>
                    <p className="text-sm text-neutral-700 leading-relaxed mb-3">{r.body}</p>
                    <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${c.text} mb-1.5`}>Митигация</div>
                    <p className="text-sm text-neutral-600 leading-relaxed">{r.mit}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 16c. TEAM
// ──────────────────────────────────────────────────────────────
const Team = () => {
  const founders = [
    { initial: "?", name: "[Founder #1]", role: "CEO & Co-founder",
      bio: "Бэкграунд в логистике / операциях СНГ. Закрывал сделки по перевозкам KG → KZ → RU. Ответственный: операции, GTM, регуляторика РФ.",
      links: ["LinkedIn", "Telegram"] },
    { initial: "?", name: "[Founder #2]", role: "CTO & Co-founder",
      bio: "Инженер платформы и мобильных приложений. Опыт построения marketplace-продуктов и геосервисов. Ответственный: продукт, инфраструктура, AI.",
      links: ["LinkedIn", "GitHub"] },
    { initial: "?", name: "[Founder #3]", role: "COO / Head of Ops",
      bio: "Сеть водителей и перевозчиков в KG/KZ. Customer development, KYC, антифрод. Ответственный: запуск коридора, supply side.",
      links: ["LinkedIn"] },
  ];
  const advisors = [
    { name: "[Advisor]", role: "Логистика", bio: "Экс-директор крупной СНГ-перевозочной компании" },
    { name: "[Advisor]", role: "Финтех / эскроу", bio: "Опыт построения платёжных продуктов в банке КГ/КЗ" },
    { name: "[Advisor]", role: "Регуляторика РФ", bio: "Юрист, специализация на ИС ЭПД и ФЗ-140" },
  ];
  return (
    <section id="team" className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><Eyebrow color="text-cyan-600">Team · Mervey Ltd</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight text-neutral-900 max-w-4xl">
            Кто строит LogisCIS
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            Команда Mervey Ltd — три фаундера, разделившие домены: операции, продукт и supply. Эдвайзеры закрывают логистику, финтех и РФ-регулятор.
          </p>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {founders.map((f, i) => (
            <Reveal key={i} delay={300 + i * 100}>
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-7 hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center text-white font-display font-bold text-2xl">{f.initial}</div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-neutral-900">{f.name}</h3>
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-600 mt-0.5">{f.role}</div>
                  </div>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed flex-1">{f.bio}</p>
                <div className="mt-5 pt-4 border-t border-neutral-200 flex items-center gap-3 text-xs text-neutral-500">
                  {f.links.map((L, j) => (
                    <span key={j} className="flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5" strokeWidth={2} /> {L}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={700}>
          <div className="mt-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">Эдвайзеры</div>
            <div className="grid md:grid-cols-3 gap-4">
              {advisors.map((a, i) => (
                <div key={i} className="bg-white border border-neutral-200 rounded-xl p-5">
                  <div className="font-display font-bold text-sm text-neutral-900">{a.name}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600 mt-1 mb-2">{a.role}</div>
                  <p className="text-xs text-neutral-600 leading-relaxed">{a.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={900}>
          <p className="mt-10 text-xs italic text-neutral-500 max-w-3xl">
            Конкретные имена, фото и LinkedIn раскрываются по запросу инвестора. Mervey Ltd — действующее юрлицо, KG, regnum [—].
          </p>
        </Reveal>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 16d. LEGAL STRUCTURE
// ──────────────────────────────────────────────────────────────
const LegalStructure = () => {
  const entities = [
    { flag: "🇰🇬", name: "Mervey Ltd", role: "Holding · IP", status: "Активно", c: "cyan",
      details: ["Юрисдикция: Кыргызская Республика", "Держит IP, бренд LogisCIS, equity капитал", "Получает международные инвестиции", "Налоги: HTP KG (льгота для IT)"] },
    { flag: "🇰🇿", name: "TOO LogisCIS KZ", role: "Operating KZ", status: "В регистрации", c: "emerald",
      details: ["100% дочка Mervey Ltd", "Операции по KZ, эскроу через банк-партнёра KZ", "VAT-резидент КЗ для расчётов с шипперами", "Запуск: M+3"] },
    { flag: "🇷🇺", name: "ООО LogisCIS RU", role: "Operating RU", status: "План M+9", c: "amber",
      details: ["Локальное юрлицо для интеграции с ИС ЭПД (ФЗ-140)", "Резидент РФ — обязательное условие для оператора ЭПД", "Эскроу через РФ-банк (безотзывный аккредитив)", "Запуск: M+9 после поднятия раунда"] },
    { flag: "🇺🇿", name: "Партнёр в UZ", role: "Local operator", status: "План M+18", c: "violet",
      details: ["Не дочка — операционное партнёрство", "Локальный лицензиат под валютный контроль ЦБ РУз", "Расчёты в сум, без репатриации средств шиппера", "Запуск: M+18"] },
  ];
  const banks = [
    { ic: Banknote, t: "Банк-партнёр KG (эскроу)", d: "MOU стадия согласования. Номинальный счёт под каждую сделку." },
    { ic: Banknote, t: "Банк-партнёр KZ (эскроу)", d: "Шорт-лист 3 банков. Целевой партнёр — топ-5 KZ." },
    { ic: FileCheck2, t: "Аккредитация ИС ЭПД (РФ)", d: "Параллельный путь: через действующего оператора + собственная заявка." },
    { ic: Globe2, t: "Соответствие ФЗ-115 / 152-ФЗ", d: "Юр-бюджет $250K в Investment plan. Compliance officer в RU SubCo." },
  ];
  const cMap = {
    cyan: { bg: "bg-cyan-500", text: "text-cyan-600", border: "border-cyan-500", tagBg: "bg-cyan-100" },
    emerald: { bg: "bg-emerald-500", text: "text-emerald-600", border: "border-emerald-500", tagBg: "bg-emerald-100" },
    amber: { bg: "bg-amber-500", text: "text-amber-600", border: "border-amber-500", tagBg: "bg-amber-100" },
    violet: { bg: "bg-violet-500", text: "text-violet-600", border: "border-violet-500", tagBg: "bg-violet-100" },
  };
  return (
    <section className="bg-[var(--c-cream)] py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><Eyebrow color="text-cyan-600">Legal Structure · How We Operate</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-extrabold mt-6 text-4xl md:text-6xl leading-tight text-neutral-900 max-w-4xl">
            Mervey Ltd (KG) → 4 страны через локальные структуры
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            Holding в Кыргызстане. Локальные операционные юрлица в каждой стране — иначе в РФ не пустят в реестр операторов ЭПД, а в УЗ — в валютный контроль.
          </p>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {entities.map((e, i) => {
            const c = cMap[e.c];
            return (
              <Reveal key={i} delay={300 + i * 80}>
                <div className={`bg-white border-t-4 ${c.border} rounded-b-2xl p-6 hover:shadow-xl transition h-full`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{e.flag}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${c.tagBg} ${c.text} px-2.5 py-1 rounded-full`}>{e.status}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-neutral-900">{e.name}</h3>
                  <div className={`text-[11px] font-bold uppercase tracking-[0.2em] ${c.text} mb-4`}>{e.role}</div>
                  <ul className="space-y-2">
                    {e.details.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-neutral-700 leading-relaxed">
                        <span className={`block w-1 h-1 rounded-full ${c.bg} mt-1.5 flex-shrink-0`} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={700}>
          <div className="mt-14">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">Финтех и compliance стек</div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {banks.map((b, i) => {
                const Ic = b.ic;
                return (
                  <div key={i} className="bg-white border border-neutral-200 rounded-xl p-5 hover:shadow-md transition">
                    <Ic className="w-6 h-6 text-cyan-600 mb-3" strokeWidth={1.6} />
                    <div className="font-display font-bold text-sm text-neutral-900 mb-1.5">{b.t}</div>
                    <p className="text-xs text-neutral-600 leading-relaxed">{b.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 17. INVESTMENT
// ──────────────────────────────────────────────────────────────
const Investment = () => {
  const useData = [
    { name: "Разработка (6–8 чел)", value: 38, color: "#06B6D4" },
    { name: "Sales + маркетинг (KG/KZ/RU)", value: 30, color: "#10B981" },
    { name: "Операции и supply ops", value: 12, color: "#F59E0B" },
    { name: "Юр / комплаенс / эскроу-setup", value: 12, color: "#8B5CF6" },
    { name: "Hardware + интеграции", value: 4, color: "#EAB308" },
    { name: "Резерв", value: 4, color: "#64748B" },
  ];
  const kpis = [
    ["Активных перевозчиков", "1,500+"],
    ["Активных шипперов", "500+"],
    ["Завершённых перевозок (cumulative)", "8,000+"],
    ["GMV M+18 (run-rate)", "$18M / год"],
    ["ARR M+18", "$1.8M+"],
    ["NPS водителей", "≥ 60"],
    ["% заказов с трекингом", "≥ 85%"],
  ];
  return (
    <section id="invest" className="relative bg-[#0A0E1A] text-white py-32 overflow-hidden">
      <MeshBackground variant="dark" />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="grain pointer-events-none" />
      <SectionSpotlight className="relative max-w-7xl mx-auto px-6 py-2">
        <Reveal><Eyebrow color="text-[#F0A573]">Investment</Eyebrow></Reveal>
        <div className="grid md:grid-cols-12 gap-12 mt-12">
          <div className="md:col-span-6">
            <Reveal delay={100}>
              <div className="font-display text-2xl md:text-3xl font-light text-neutral-400 mb-2">Seed Round</div>
              <h2 className="font-display font-extrabold text-7xl md:text-[10rem] leading-[0.85]"><span className="text-gradient">$2.5M</span></h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-8 text-xl text-cyan-300 leading-snug max-w-xl">
                18 месяцев runway · breakeven к M+18 · вход в РФ через ООО LogisCIS RU к e-ТТН (1 сентября 2026)
              </p>
            </Reveal>
            <Reveal delay={500}>
              <div className="mt-12">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300 mb-5">Использование</div>
                <div className="grid grid-cols-2 gap-3">
                  {useData.map((u, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-sm" style={{ background: u.color }} />
                      <div className="flex-1 text-sm text-neutral-300">{u.name}</div>
                      <div className="font-display font-bold text-base text-white">{u.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-6">
            <Reveal delay={400}>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300 mb-5">KPI 18 месяцев</div>
              <div className="space-y-px bg-white/10 rounded-xl overflow-hidden">
                {kpis.map(([k, v], i) => (
                  <div key={i} className="flex items-center justify-between bg-[#0A0E1A] px-5 py-3.5 hover:bg-white/[0.03] transition">
                    <span className="text-sm text-neutral-400">{k}</span>
                    <span className="font-display text-base font-bold text-emerald-400 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full">{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={700}>
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 text-center">
                  <div className="font-display font-bold text-2xl text-cyan-300">18 мес</div>
                  <div className="text-xs text-neutral-400 mt-1">до breakeven</div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
                  <div className="font-display font-bold text-2xl text-emerald-300">18×</div>
                  <div className="text-xs text-neutral-400 mt-1">LTV / CAC</div>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                  <div className="font-display font-bold text-2xl text-amber-300">$200M</div>
                  <div className="text-xs text-neutral-400 mt-1">target Y3 GMV</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={900}>
          <div className="mt-16 bg-cyan-500 text-neutral-900 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-700 mb-2">The Window</div>
              <div className="font-display font-bold text-xl md:text-2xl leading-tight max-w-2xl">
                Окно — 1 сентября 2026. Запустим MVP сейчас → войдём в РФ инфраструктурой, не приложением.
              </div>
            </div>
            <Magnetic strength={0.3}>
              <a href="mailto:invest@mervey.kg" className="flex-shrink-0 inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-black transition">
                Get in touch <ArrowRight className="w-4 h-4" />
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </SectionSpotlight>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// FOOTER
// ──────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-[#0A0E1A] text-neutral-500 py-12 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
            <Truck className="w-4 h-4 text-cyan-400" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-white">LogisCIS</span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-500 mt-0.5">by Mervey Ltd</span>
          </div>
        </div>
        <div className="text-xs">Operating system for CIS freight logistics</div>
        <div className="text-xs mt-1">Mervey Ltd · Бишкек, Кыргызстан · 2026</div>
      </div>
      <div className="text-xs text-right">
        <div>Confidential · for invited investors only</div>
        <div className="mt-1">v2.1 · April 2026</div>
      </div>
    </div>
  </footer>
);

// ──────────────────────────────────────────────────────────────
// ROOT
// ──────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-[var(--c-cream)] font-body text-neutral-900">
      <SiteStyles />
      <CustomCursor />
      <Nav />
      <Hero />
      <Vision />
      <Catalysts />
      <Market />
      <Crisis />
      <Problem />
      <Competition />
      <Positioning />
      <Solution />
      <UserTypes />
      <Traction />
      <Tracking />
      <AISection />
      <Business />
      <UnitEcon />
      <Moats />
      <Roadmap />
      <Risks />
      <Team />
      <LegalStructure />
      <Investment />
      <Footer />
    </div>
  );
}
