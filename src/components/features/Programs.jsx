/**
 * Programs.jsx
 * Mobile-optimized: vertical stacked cards on mobile, original side layout on desktop.
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Fingerprint, Beaker, Sprout, Users, ArrowRight, Microscope } from 'lucide-react';

const VB = 1000;

// Desktop: uốn lượn rộng sang trái/phải
const PATH_DESKTOP = `
  M 500 0
  C 750 80,  900 180, 600 280
  C 300 380, 100 450, 300 600
  C 500 750, 900 750, 650 850
  C 400 950, 350 980, 500 1000
`.trim();

const PATH_MOBILE = `
  M 500 0
  C 580 80,  620 180, 500 280
  C 380 380, 420 480, 500 580
  C 580 680, 540 780, 500 870
  C 460 940, 490 970, 500 1000
`.trim();

const PROGRAMS = [
  {
    id: 'p1', t: 0.12, side: 'right',
    seq: '01', title: 'Research Retreat', sub: 'Chuyên gia & Nghiên cứu',
    desc: 'Phòng làm việc riêng tư tại ICISE hoặc The Beach Lab, internet vệ tinh, trợ lý cá nhân và liệu trình Ecotherapy phục hồi nhận thức mỗi ngày — để mạch tư duy không bao giờ bị đứt.',
    Icon: Beaker, accent: '#38bdf8', glow: 'rgba(56,189,248,0.5)', bg: 'rgba(56,189,248,0.08)',
  },
  {
    id: 'p2', t: 0.38, side: 'left',
    seq: '02', title: 'Ocean Guardian', sub: 'Du lịch Bền vững',
    desc: 'Ra Cù Lao Xanh đánh giá tác động sinh thái, thu thập dữ liệu rạn san hô, rồi chèo SUP khảo sát rừng ngập mặn Đầm Thị Nại — khoa học thực địa gắn với thiên nhiên.',
    Icon: Sprout, accent: '#2dd4bf', glow: 'rgba(45,212,191,0.5)', bg: 'rgba(45,212,191,0.08)',
  },
  {
    id: 'p3', t: 0.65, side: 'right',
    seq: '03', title: 'Digital Heritage', sub: 'Công nghệ & Di sản',
    desc: 'Scan 3D Tháp Đôi, phục dựng hoa văn gốm cổ Gò Sành và nghiên cứu biomechanics võ cổ truyền Bình Định — nơi công nghệ số gặp gỡ văn hóa Chăm Pa.',
    Icon: Users, accent: '#a78bfa', glow: 'rgba(167,139,250,0.5)', bg: 'rgba(167,139,250,0.08)',
  },
  {
    id: 'p4', t: 0.90, side: 'left',
    seq: '04', title: 'Startup Bootcamp', sub: 'Digital Nomads & Startup',
    desc: 'Hackathon tại The Beach Lab, brainstorming trên bãi biển Kỳ Co và Pitching Night tại Science Bar — trạm sạc ý tưởng cho founder và remote team.',
    Icon: Microscope, accent: '#f472b6', glow: 'rgba(244,114,182,0.5)', bg: 'rgba(244,114,182,0.08)',
  },
];

function getPointAt(pathEl, t) {
  const len = pathEl.getTotalLength();
  return pathEl.getPointAtLength(Math.max(0, Math.min(1, t)) * len);
}

// ─── Desktop Card (trái/phải như cũ) ──────────────────────────────────────
const DesktopCard = React.memo(function DesktopCard({ prog, dotX, dotY, wrapW }) {
  const { seq, title, sub, desc, Icon, accent, glow, bg, side } = prog;
  const HALF = wrapW / 2;
  const DOT_GAP = 28;
  const CARD_W = Math.min(HALF - DOT_GAP - 16, 380);
  const cardLeft = side === 'right' ? dotX + DOT_GAP : dotX - DOT_GAP - CARD_W;

  return (
    <motion.div
      style={{ position: 'absolute', left: dotX, top: dotY, zIndex: 20, willChange: 'transform, opacity' }}
      initial={{ opacity: 0, scale: 0.55 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, margin: '-18% 0px -18% 0px' }}
      transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.7 }}
    >
      {/* Dot */}
      <div style={{ position: 'relative', transform: 'translate(-50%,-50%)', width: 24, height: 24 }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: accent, opacity: 0.5,
          animation: 'prog-ping 2.2s cubic-bezier(0,0,0.2,1) infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 3, borderRadius: '50%',
          background: '#030712', border: `3px solid ${accent}`,
          boxShadow: `0 0 0 3px ${glow}, 0 0 18px ${glow}`,
        }} />
      </div>

      {/* Card */}
      <motion.div
        style={{
          position: 'absolute', top: '50%', left: cardLeft - dotX,
          transform: 'translateY(-50%)', width: CARD_W, minWidth: 240,
        }}
        initial={{ opacity: 0, x: side === 'right' ? -16 : 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: '-18% 0px -18% 0px' }}
        transition={{ delay: 0.08, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{
          position: 'absolute', inset: -1, borderRadius: 18,
          background: `radial-gradient(ellipse at 50% 0%, ${glow} 0%, transparent 65%)`,
          opacity: 0.35, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'relative', background: 'rgba(4,6,20,0.90)',
          backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
          border: `1px solid ${accent}35`, borderRadius: 18,
          padding: '20px 24px',
          boxShadow: '0 20px 56px rgba(0,0,0,0.75), 0 1px 0 rgba(255,255,255,0.06) inset',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 20, right: 20, height: 2,
            borderRadius: '0 0 3px 3px',
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            opacity: 0.75,
          }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <div style={{
                padding: 10, borderRadius: 11, flexShrink: 0,
                background: bg, border: `1px solid ${accent}30`, boxShadow: `0 4px 14px ${glow}`,
              }}>
                <Icon size={17} color={accent} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ color: accent, fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 3, whiteSpace: 'nowrap' }}>
                  {sub}
                </p>
                <h4 style={{ color: '#fff', fontSize: 17, fontWeight: 700, lineHeight: 1.15, margin: 0, letterSpacing: '-0.01em' }}>
                  {title}
                </h4>
              </div>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.05)', fontSize: 34, fontWeight: 900, lineHeight: 1, flexShrink: 0 }}>
              {seq}
            </span>
          </div>
          <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)', marginBottom: 14 }} />
          <p style={{ color: 'rgba(255,255,255,0.46)', fontSize: 12.5, lineHeight: 1.7, marginBottom: 16 }}>
            {desc}
          </p>
          <button
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 6, padding: '11px 0', borderRadius: 10, fontSize: 10, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
              color: 'rgba(255,255,255,0.55)', transition: 'all 0.2s',
            }}
            onMouseEnter={e => Object.assign(e.currentTarget.style, { background: accent, color: '#000', borderColor: accent, boxShadow: `0 0 18px ${glow}` })}
            onMouseLeave={e => Object.assign(e.currentTarget.style, { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.55)', borderColor: 'rgba(255,255,255,0.09)', boxShadow: 'none' })}
          >
            <Fingerprint size={12} />
            Initialize Sequence
            <ArrowRight size={12} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
});

// ─── Mobile Card (full-width, dưới dot, không chia trái/phải) ─────────────
const MobileCard = React.memo(function MobileCard({ prog, dotX, dotY, wrapW }) {
  const { seq, title, sub, desc, Icon, accent, glow, bg } = prog;

  // Card rộng 88% màn hình, căn giữa
  const CARD_W = Math.min(wrapW * 0.88, 340);
  const cardLeft = (wrapW - CARD_W) / 2;
  // Card hiển thị phía dưới dot với khoảng cách nhỏ
  const CARD_TOP_OFFSET = 20;

  return (
    <motion.div
      style={{ position: 'absolute', left: dotX, top: dotY, zIndex: 20 }}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, margin: '-15% 0px -15% 0px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.8 }}
    >
      {/* Dot */}
      <div style={{ position: 'relative', transform: 'translate(-50%,-50%)', width: 20, height: 20, zIndex: 2 }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: accent, opacity: 0.5,
          animation: 'prog-ping 2.2s cubic-bezier(0,0,0.2,1) infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 3, borderRadius: '50%',
          background: '#030712', border: `2.5px solid ${accent}`,
          boxShadow: `0 0 0 2px ${glow}, 0 0 14px ${glow}`,
        }} />
      </div>

      {/* Connector line từ dot xuống card */}
      <div style={{
        position: 'absolute',
        left: -1,
        top: -10, // từ giữa dot
        width: 2,
        height: CARD_TOP_OFFSET + 18, // đến top border của card
        background: `linear-gradient(to bottom, ${accent}80, ${accent}20)`,
        transform: 'translateX(-50%)',
        zIndex: 1,
      }} />

      {/* Card */}
      <motion.div
        style={{
          position: 'absolute',
          top: CARD_TOP_OFFSET,
          left: cardLeft - dotX,
          width: CARD_W,
        }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-15% 0px -15% 0px' }}
        transition={{ delay: 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{
          position: 'absolute', inset: -1, borderRadius: 16,
          background: `radial-gradient(ellipse at 50% 0%, ${glow} 0%, transparent 65%)`,
          opacity: 0.3, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'relative', background: 'rgba(4,6,20,0.92)',
          backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
          border: `1px solid ${accent}40`, borderRadius: 16,
          padding: '16px 18px',
          boxShadow: '0 16px 48px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.06) inset',
        }}>
          {/* Top accent line */}
          <div style={{
            position: 'absolute', top: 0, left: 16, right: 16, height: 2,
            borderRadius: '0 0 3px 3px',
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            opacity: 0.8,
          }} />

          {/* Header: icon + title + seq */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
              <div style={{
                padding: 9, borderRadius: 10, flexShrink: 0,
                background: bg, border: `1px solid ${accent}30`,
                boxShadow: `0 4px 12px ${glow}`,
              }}>
                <Icon size={16} color={accent} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <p style={{ color: accent, fontSize: 8.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 3 }}>
                  {sub}
                </p>
                <h4 style={{ color: '#fff', fontSize: 15, fontWeight: 700, lineHeight: 1.2, margin: 0, letterSpacing: '-0.01em' }}>
                  {title}
                </h4>
              </div>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.06)', fontSize: 30, fontWeight: 900, lineHeight: 1, flexShrink: 0 }}>
              {seq}
            </span>
          </div>

          <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)', marginBottom: 12 }} />

          <p style={{ color: 'rgba(255,255,255,0.50)', fontSize: 12, lineHeight: 1.65, marginBottom: 14 }}>
            {desc}
          </p>

          {/* CTA — min 44px height để đủ touch target */}
          <button
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 6, minHeight: 44, padding: '0 16px',
              borderRadius: 10, fontSize: 9.5, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer',
              background: 'rgba(255,255,255,0.05)', border: `1px solid ${accent}30`,
              color: accent, transition: 'all 0.2s',
              // Mobile: dùng accent color sẵn để không cần hover state
              WebkitTapHighlightColor: 'transparent',
            }}
            onTouchStart={e => Object.assign(e.currentTarget.style, { background: accent, color: '#000', borderColor: accent })}
            onTouchEnd={e => setTimeout(() => Object.assign(e.currentTarget.style, { background: 'rgba(255,255,255,0.05)', color: accent, borderColor: `${accent}30` }), 150)}
            onMouseEnter={e => Object.assign(e.currentTarget.style, { background: accent, color: '#000', borderColor: accent, boxShadow: `0 0 18px ${glow}` })}
            onMouseLeave={e => Object.assign(e.currentTarget.style, { background: 'rgba(255,255,255,0.05)', color: accent, borderColor: `${accent}30`, boxShadow: 'none' })}
          >
            <Fingerprint size={11} />
            Initialize Sequence
            <ArrowRight size={11} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
});

// ─── Main ─────────────────────────────────────────────────────────────────
export default function Programs() {
  const outerRef = useRef(null);
  const svgWrapRef = useRef(null);
  const pathRef = useRef(null);

  const [state, setState] = useState({ dots: [], wrapW: 0, isMobile: false });

  const recalc = useCallback(() => {
    const mob = window.innerWidth < 768;
    const wrap = svgWrapRef.current;
    const path = pathRef.current;
    if (!wrap || !path) { setState(s => ({ ...s, isMobile: mob })); return; }

    const w = wrap.offsetWidth;
    const h = wrap.offsetHeight;
    if (!w || !h) return;

    const dots = PROGRAMS.map(p => {
      const pt = getPointAt(path, p.t);
      return { id: p.id, x: (pt.x / VB) * w, y: (pt.y / VB) * h };
    });

    setState({ dots, wrapW: w, isMobile: mob });
  }, []);

  useEffect(() => {
    const t = setTimeout(recalc, 60);
    const ro = new ResizeObserver(recalc);
    if (svgWrapRef.current) ro.observe(svgWrapRef.current);
    return () => { clearTimeout(t); ro.disconnect(); };
  }, [recalc]);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end']   // ← sửa 'start end' → 'start start'
  });
  const lineFollow = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });
  const drawn = useSpring(lineFollow, {
    stiffness: 600,   // ← tăng từ 300
    damping: 60,      // ← tăng từ 40
    mass: 0.1         // ← giảm từ 0.2
  });
  const { dots, wrapW, isMobile } = state;

  // Mobile cần chiều cao lớn hơn vì card hiển thị phía dưới dot (không song song)
  const totalH = isMobile ? '520vh' : '440vh';
  const pathD = isMobile ? PATH_MOBILE : PATH_DESKTOP;

  return (
    <div ref={outerRef} style={{ position: 'relative', width: '100%', height: totalH, background: 'transparent' }}>

      <style>{`
        @keyframes prog-ping {
          0%        { transform: scale(1);   opacity: 0.55; }
          70%, 100% { transform: scale(2.8); opacity: 0; }
        }
      `}</style>

      <div style={{ position: 'absolute', inset: 0 }}>

        {/* ── Sticky header ── */}
        <div style={{
          position: 'sticky', top: isMobile ? 16 : 44, zIndex: 30,
          textAlign: 'center', padding: '0 20px', pointerEvents: 'none',
        }}>
          <motion.h2
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Sora','Inter',sans-serif",
              fontSize: isMobile ? 28 : 'clamp(44px,5.5vw,82px)',
              fontWeight: 800, color: '#fff',
              marginBottom: isMobile ? 4 : 6,
              letterSpacing: '-0.03em', lineHeight: 1.05,
              textShadow: '0 8px 48px rgba(0,0,0,0.95)',
            }}
          >
            Mission{' '}
            <span style={{
              background: 'linear-gradient(130deg,#38bdf8 0%,#818cf8 50%,#2dd4bf 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 300,
            }}>
              Sequences.
            </span>
          </motion.h2>
          <p style={{
            color: 'rgba(255,255,255,0.32)',
            fontSize: isMobile ? 8.5 : 11,
            letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500,
          }}>
            {isMobile ? 'Cuộn để khám phá' : 'Cuộn xuống để theo dõi luồng dữ liệu'}
          </p>
        </div>

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', justifyContent: 'center', alignItems: 'stretch',
          paddingTop: isMobile ? 80 : 136,
          paddingBottom: 0,
          paddingLeft: isMobile ? 0 : 32,
          paddingRight: isMobile ? 0 : 32,
        }}>
          <div
            ref={svgWrapRef}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'visible',
              transform: 'translateZ(0)',
            }}
          >
            <svg
              viewBox={`0 0 ${VB} ${VB}`}
              preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
            >
              <defs>
                <linearGradient id="pg-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="33%" stopColor="#818cf8" />
                  <stop offset="67%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
                <filter id="pg-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Nét mờ */}
              <path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={isMobile ? 6 : 8}
                vectorEffect="non-scaling-stroke"
              />

              {/* Nét phát sáng animated */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#pg-grad)"
                // Tăng độ dày: Mobile nét to hơn (14), Desktop (12)
                strokeWidth={isMobile ? 14 : 12}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                filter="url(#pg-glow)"
                style={{ pathLength: drawn, willChange: 'stroke-dashoffset' }}
              />
            </svg>

            {dots.map(dot => {
              const prog = PROGRAMS.find(p => p.id === dot.id);
              if (!prog) return null;
              return isMobile ? (
                <MobileCard
                  key={dot.id}
                  prog={prog}
                  dotX={dot.x}
                  dotY={dot.y}
                  wrapW={wrapW}
                />
              ) : (
                <DesktopCard
                  key={dot.id}
                  prog={prog}
                  dotX={dot.x}
                  dotY={dot.y}
                  wrapW={wrapW}
                />
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}