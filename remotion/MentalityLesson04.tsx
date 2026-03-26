// MentalityLesson04.tsx — Remotion 4.x Component
// "The King's Hours — Time as Divine Stewardship" — 60-second animated video
// Deep olive accent (#3D4F2F), parchment background
// Render: npx remotion render src/index.ts MentalityLesson04 out/mentality-04.mp4

import React from "react";
import {
  AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence,
} from "remotion";

const PARCHMENT = "#FFF6E6";
const OLIVE = "#3D4F2F";
const GOLD = "#A38255";
const PLUM = "#571641";
const SAPPHIRE = "#08052D";
const GREEN = "#052B20";

const fadeIn = (frame: number, delay: number, dur = 20) =>
  interpolate(frame - delay, [0, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const slideUp = (frame: number, delay: number, fps: number) =>
  interpolate(spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 100 } }), [0, 1], [40, 0]);

const Crown: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = OLIVE }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" width={size} height={size * 0.75}
    fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
    <path d="M10 48 L18 18 L40 30 L62 18 L70 48 Z" />
    <line x1="18" y1="18" x2="18" y2="13" /><circle cx="18" cy="11" r="2.5" />
    <line x1="40" y1="30" x2="40" y2="8" /><circle cx="40" cy="6" r="3" />
    <line x1="62" y1="18" x2="62" y2="13" /><circle cx="62" cy="11" r="2.5" />
    <line x1="8" y1="52" x2="72" y2="52" />
  </svg>
);

const Bg: React.FC = () => (
  <AbsoluteFill style={{
    backgroundColor: PARCHMENT,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
  }} />
);

const TitleCard: React.FC = () => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 16 }}>
      <Bg />
      <div style={{ opacity: fadeIn(f, 10), transform: `translateY(${slideUp(f, 10, fps)}px)` }}><Crown size={90} /></div>
      <div style={{ opacity: fadeIn(f, 28), transform: `translateY(${slideUp(f, 28, fps)}px)`, textAlign: "center" }}>
        <p style={{ fontFamily: "serif", fontSize: 13, letterSpacing: 6, color: OLIVE, opacity: 0.6, marginBottom: 12 }}>MENTALITY — CAMPUS III</p>
        <h1 style={{ fontFamily: "serif", fontSize: 46, color: PLUM, letterSpacing: 2, margin: 0 }}>LESSON 04</h1>
        <h2 style={{ fontFamily: "serif", fontSize: 30, color: OLIVE, margin: "8px 0 0", fontWeight: 400 }}>The King&rsquo;s Hours</h2>
        <p style={{ opacity: fadeIn(f, 50), fontFamily: "serif", fontSize: 16, color: `${SAPPHIRE}77`, marginTop: 14, fontStyle: "italic" }}>Time as Divine Stewardship</p>
      </div>
    </AbsoluteFill>
  );
};

const RawIngredient: React.FC = () => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 60 }}>
      <Bg />
      <p style={{ opacity: fadeIn(f, 5), fontFamily: "serif", fontSize: 13, letterSpacing: 6, color: OLIVE, marginBottom: 24 }}>THE RAW INGREDIENT</p>
      <div style={{ opacity: fadeIn(f, 15), transform: `translateY(${slideUp(f, 15, fps)}px)`, maxWidth: 680, textAlign: "center", padding: "28px 36px", border: `1px solid ${OLIVE}33`, borderRadius: 16, backgroundColor: `${SAPPHIRE}06` }}>
        <p style={{ fontFamily: "serif", fontSize: 24, fontStyle: "italic", color: PLUM, lineHeight: 1.6, margin: 0 }}>&ldquo;Teach us to number our days, that we may gain a heart of wisdom.&rdquo;</p>
        <p style={{ fontFamily: "sans-serif", fontSize: 14, color: `${SAPPHIRE}66`, marginTop: 12 }}>&mdash; Psalm 90:12</p>
      </div>
      <div style={{ opacity: fadeIn(f, 55), marginTop: 22, maxWidth: 560, textAlign: "center" }}>
        <p style={{ fontFamily: "sans-serif", fontSize: 16, color: `${SAPPHIRE}aa`, lineHeight: 1.7 }}>
          <span style={{ color: OLIVE, fontWeight: 600 }}>Hebrew:</span> <em>manah</em> (מָנָה) &mdash; to count, to assign, to appoint. Moses asks God to teach the act of numbering &mdash; not mere arithmetic, but the weight of each day.
        </p>
      </div>
    </AbsoluteFill>
  );
};

const Hours168: React.FC = () => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  const blocks = [
    { label: "Sleep", hours: "56h", pct: 33, delay: 15 },
    { label: "Work", hours: "45h", pct: 27, delay: 35 },
    { label: "Temple", hours: "14h", pct: 8, delay: 55 },
    { label: "Kingdom", hours: "53h", pct: 32, delay: 75 },
  ];
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 60 }}>
      <Bg />
      <p style={{ opacity: fadeIn(f, 5), fontFamily: "serif", fontSize: 13, letterSpacing: 6, color: OLIVE, marginBottom: 30 }}>168 HOURS PER WEEK</p>
      <div style={{ width: 600, display: "flex", flexDirection: "column", gap: 16 }}>
        {blocks.map((b, i) => (
          <div key={i} style={{ opacity: fadeIn(f, b.delay), display: "flex", alignItems: "center", gap: 14 }}>
            <p style={{ fontFamily: "serif", fontSize: 14, color: OLIVE, width: 70, textAlign: "right" }}>{b.label}</p>
            <div style={{ flex: 1, height: 28, backgroundColor: `${OLIVE}15`, borderRadius: 6, overflow: "hidden" }}>
              <div style={{ width: `${interpolate(f - b.delay, [0, 30], [0, b.pct], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`, height: "100%", backgroundColor: OLIVE, borderRadius: 6, transition: "width 0.5s" }} />
            </div>
            <p style={{ fontFamily: "sans-serif", fontSize: 13, color: `${SAPPHIRE}88`, width: 40 }}>{b.hours}</p>
          </div>
        ))}
      </div>
      <p style={{ opacity: fadeIn(f, 100), fontFamily: "sans-serif", fontSize: 14, color: `${SAPPHIRE}77`, marginTop: 22, textAlign: "center" }}>
        Where do your 168 hours go? Track one week in 30-minute blocks.
      </p>
    </AbsoluteFill>
  );
};

const Decree: React.FC = () => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 60 }}>
      <Bg />
      <div style={{ opacity: fadeIn(f, 10), transform: `translateY(${slideUp(f, 10, fps)}px)`, maxWidth: 600, borderLeft: `4px solid ${GOLD}`, padding: "28px 24px 28px 28px", backgroundColor: `${GOLD}06`, borderRadius: "0 14px 14px 0" }}>
        <p style={{ fontFamily: "serif", fontSize: 12, color: GOLD, letterSpacing: 4, marginBottom: 12 }}>ROYAL DECREE</p>
        <p style={{ fontFamily: "serif", fontSize: 20, fontStyle: "italic", color: PLUM, lineHeight: 1.7, margin: 0 }}>
          &ldquo;Time is the only resource a king cannot manufacture. He can earn more gold, build more rooms, train more soldiers &mdash; but he cannot add a single hour to the day. Number them.&rdquo;
        </p>
      </div>
    </AbsoluteFill>
  );
};

const Closing: React.FC = () => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 18 }}>
      <AbsoluteFill style={{ backgroundColor: GREEN }} />
      <div style={{ opacity: fadeIn(f, 10), transform: `translateY(${slideUp(f, 10, fps)}px)` }}><Crown size={65} color={GOLD} /></div>
      <p style={{ opacity: fadeIn(f, 30), fontFamily: "serif", fontSize: 24, color: OLIVE, letterSpacing: 3, textAlign: "center" }}>
        Number your days.
        <br />
        Gain a heart of wisdom.
      </p>
      <div style={{ opacity: fadeIn(f, 50), height: 1, width: 100, background: `linear-gradient(90deg, transparent, ${OLIVE}, transparent)` }} />
      <p style={{ opacity: fadeIn(f, 65), fontFamily: "serif", fontSize: 13, color: `${GOLD}88`, letterSpacing: 3, marginTop: 12 }}>AKINGSLIFESTYLE.CALYVENT.COM</p>
      <p style={{ opacity: fadeIn(f, 80), fontFamily: "sans-serif", fontSize: 11, color: `${GOLD}55` }}>A Calyvent Venture</p>
    </AbsoluteFill>
  );
};

export const MentalityLesson04: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={fps * 6}><TitleCard /></Sequence>
      <Sequence from={fps * 6} durationInFrames={fps * 14}><RawIngredient /></Sequence>
      <Sequence from={fps * 20} durationInFrames={fps * 18}><Hours168 /></Sequence>
      <Sequence from={fps * 38} durationInFrames={fps * 10}><Decree /></Sequence>
      <Sequence from={fps * 48} durationInFrames={fps * 12}><Closing /></Sequence>
    </AbsoluteFill>
  );
};

// Add to Root.tsx:
// <Composition id="MentalityLesson04" component={MentalityLesson04}
//   durationInFrames={30 * 60} fps={30} width={1920} height={1080} />
