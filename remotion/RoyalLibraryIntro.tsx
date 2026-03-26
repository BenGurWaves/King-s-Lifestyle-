// RoyalLibraryIntro.tsx — Remotion 4.x Component
// "The King's Library — Wisdom for the Mind and Spirit" — 60-second intro
// Warm brown accent (#5C4033), parchment, book categories cycling
// Render: npx remotion render src/index.ts RoyalLibraryIntro out/library-intro.mp4

import React from "react";
import {
  AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence,
} from "remotion";

const PARCHMENT = "#FFF6E6";
const BROWN = "#5C4033";
const GOLD = "#A38255";
const PLUM = "#571641";
const SAPPHIRE = "#08052D";
const GREEN = "#052B20";

const fadeIn = (f: number, d: number, dur = 20) =>
  interpolate(f - d, [0, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const slideUp = (f: number, d: number, fps: number) =>
  interpolate(spring({ frame: f - d, fps, config: { damping: 80, stiffness: 100 } }), [0, 1], [40, 0]);

const Crown: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = BROWN }) => (
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
        <p style={{ fontFamily: "serif", fontSize: 13, letterSpacing: 8, color: BROWN, opacity: 0.5, marginBottom: 14 }}>A NEW CAMPUS</p>
        <h1 style={{ fontFamily: "serif", fontSize: 44, color: PLUM, letterSpacing: 2, margin: 0 }}>The King&rsquo;s Library</h1>
        <p style={{ fontFamily: "serif", fontSize: 20, color: BROWN, marginTop: 10, fontStyle: "italic" }}>Wisdom for the Mind and Spirit</p>
      </div>
      <div style={{ opacity: fadeIn(f, 60), height: 1, width: 120, background: `linear-gradient(90deg, transparent, ${BROWN}, transparent)`, marginTop: 14 }} />
      <p style={{ opacity: fadeIn(f, 70), fontFamily: "serif", fontSize: 14, color: `${SAPPHIRE}66`, fontStyle: "italic" }}>
        Proverbs 1:5 &mdash; &ldquo;Let the wise listen and add to their learning.&rdquo;
      </p>
    </AbsoluteFill>
  );
};

const ThreeCategories: React.FC = () => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  const cats = [
    { name: "Visualization & Mindset", count: "10 lessons", books: "Psycho-Cybernetics, Mindset, Think and Grow Rich", delay: 15 },
    { name: "Productivity & Time", count: "7 lessons", books: "Atomic Habits, Deep Work, Getting Things Done", delay: 55 },
    { name: "Spiritual Growth", count: "8 lessons", books: "Purpose Driven Life, Mere Christianity, Cost of Discipleship", delay: 95 },
  ];
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 60 }}>
      <Bg />
      <p style={{ opacity: fadeIn(f, 5), fontFamily: "serif", fontSize: 13, letterSpacing: 6, color: BROWN, marginBottom: 32 }}>THREE PILLARS OF KNOWLEDGE</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 650, width: "100%" }}>
        {cats.map((c, i) => (
          <div key={i} style={{
            opacity: fadeIn(f, c.delay), transform: `translateY(${slideUp(f, c.delay, fps)}px)`,
            borderLeft: `3px solid ${BROWN}`, padding: "16px 20px", backgroundColor: `${BROWN}08`, borderRadius: "0 10px 10px 0",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <p style={{ fontFamily: "serif", fontSize: 18, color: PLUM, margin: 0 }}>{c.name}</p>
              <p style={{ fontFamily: "sans-serif", fontSize: 12, color: `${BROWN}88` }}>{c.count}</p>
            </div>
            <p style={{ fontFamily: "sans-serif", fontSize: 13, color: `${SAPPHIRE}77`, margin: 0 }}>{c.books}</p>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const BibleFirst: React.FC = () => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 60 }}>
      <Bg />
      <p style={{ opacity: fadeIn(f, 5), fontFamily: "serif", fontSize: 13, letterSpacing: 6, color: BROWN, marginBottom: 24 }}>THE PRINCIPLE</p>
      <div style={{
        opacity: fadeIn(f, 15), transform: `translateY(${slideUp(f, 15, fps)}px)`,
        maxWidth: 620, textAlign: "center", padding: "28px 32px",
        border: `1px solid ${BROWN}33`, borderRadius: 16, backgroundColor: `${SAPPHIRE}06`,
      }}>
        <p style={{ fontFamily: "serif", fontSize: 22, fontStyle: "italic", color: PLUM, lineHeight: 1.6, margin: 0 }}>
          &ldquo;All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.&rdquo;
        </p>
        <p style={{ fontFamily: "sans-serif", fontSize: 14, color: `${SAPPHIRE}66`, marginTop: 12 }}>&mdash; 2 Timothy 3:16</p>
      </div>
      <div style={{ opacity: fadeIn(f, 60), marginTop: 24, maxWidth: 500, textAlign: "center" }}>
        <p style={{ fontFamily: "sans-serif", fontSize: 17, color: `${SAPPHIRE}aa`, lineHeight: 1.7 }}>
          Bible first. Books as tools. Every lesson anchors in Scripture, then uses the best modern wisdom as a practical amplifier for young men becoming kings.
        </p>
      </div>
    </AbsoluteFill>
  );
};

const Decree: React.FC = () => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 60 }}>
      <Bg />
      <div style={{
        opacity: fadeIn(f, 10), transform: `translateY(${slideUp(f, 10, fps)}px)`,
        maxWidth: 600, borderLeft: `4px solid ${GOLD}`, padding: "28px 24px 28px 28px",
        backgroundColor: `${GOLD}06`, borderRadius: "0 14px 14px 0",
      }}>
        <p style={{ fontFamily: "serif", fontSize: 12, color: GOLD, letterSpacing: 4, marginBottom: 12 }}>ROYAL DECREE</p>
        <p style={{ fontFamily: "serif", fontSize: 20, fontStyle: "italic", color: PLUM, lineHeight: 1.7, margin: 0 }}>
          &ldquo;A king who does not read is a king who does not think. A king who does not think is a king who does not reign. The Library is where reigns are built in silence.&rdquo;
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
      <p style={{ opacity: fadeIn(f, 30), fontFamily: "serif", fontSize: 24, color: BROWN, letterSpacing: 3, textAlign: "center" }}>
        25 lessons. 30 books.
        <br />
        Bible at the center.
      </p>
      <div style={{ opacity: fadeIn(f, 50), height: 1, width: 100, background: `linear-gradient(90deg, transparent, ${BROWN}, transparent)` }} />
      <p style={{ opacity: fadeIn(f, 65), fontFamily: "serif", fontSize: 13, color: `${GOLD}88`, letterSpacing: 3, marginTop: 12 }}>AKINGSLIFESTYLE.CALYVENT.COM</p>
      <p style={{ opacity: fadeIn(f, 80), fontFamily: "sans-serif", fontSize: 11, color: `${GOLD}55` }}>A Calyvent Venture</p>
    </AbsoluteFill>
  );
};

export const RoyalLibraryIntro: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={fps * 6}><TitleCard /></Sequence>
      <Sequence from={fps * 6} durationInFrames={fps * 14}><ThreeCategories /></Sequence>
      <Sequence from={fps * 20} durationInFrames={fps * 12}><BibleFirst /></Sequence>
      <Sequence from={fps * 32} durationInFrames={fps * 10}><Decree /></Sequence>
      <Sequence from={fps * 42} durationInFrames={fps * 18}><Closing /></Sequence>
    </AbsoluteFill>
  );
};

// Add to Root.tsx:
// <Composition id="RoyalLibraryIntro" component={RoyalLibraryIntro}
//   durationInFrames={30 * 60} fps={30} width={1920} height={1080} />
