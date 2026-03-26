// AttireLesson05.tsx — Remotion 4.x Component
// "The Trimmed Crown — Biblical Haircuts for 2026" — 60-second animated video
// Taupe accent (#8B7D6B), parchment background, smooth text animations
// Render: npx remotion render src/index.ts AttireLesson05 out/attire-05.mp4

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

const PARCHMENT = "#FFF6E6";
const TAUPE = "#8B7D6B";
const GOLD = "#A38255";
const PLUM = "#571641";
const SAPPHIRE = "#08052D";
const GREEN = "#052B20";

const fadeIn = (frame: number, delay: number, duration = 20) =>
  interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

const slideUp = (frame: number, delay: number, fps: number) => {
  const s = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 100 } });
  return interpolate(s, [0, 1], [40, 0]);
};

const Crown: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = TAUPE }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" width={size} height={size * 0.75}
    fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
    <path d="M10 48 L18 18 L40 30 L62 18 L70 48 Z" />
    <line x1="18" y1="18" x2="18" y2="13" /><circle cx="18" cy="11" r="2.5" />
    <line x1="40" y1="30" x2="40" y2="8" /><circle cx="40" cy="6" r="3" />
    <line x1="62" y1="18" x2="62" y2="13" /><circle cx="62" cy="11" r="2.5" />
    <line x1="8" y1="52" x2="72" y2="52" />
  </svg>
);

const ParchmentBg: React.FC = () => (
  <AbsoluteFill style={{
    backgroundColor: PARCHMENT,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
  }} />
);

// Scene 1: Title (0–6s)
const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 16 }}>
      <ParchmentBg />
      <div style={{ opacity: fadeIn(frame, 10), transform: `translateY(${slideUp(frame, 10, fps)}px)` }}>
        <Crown size={90} />
      </div>
      <div style={{ opacity: fadeIn(frame, 28), transform: `translateY(${slideUp(frame, 28, fps)}px)`, textAlign: "center" }}>
        <p style={{ fontFamily: "serif", fontSize: 13, letterSpacing: 6, color: TAUPE, opacity: 0.6, marginBottom: 12 }}>
          ATTIRE — CAMPUS II
        </p>
        <h1 style={{ fontFamily: "serif", fontSize: 46, color: PLUM, letterSpacing: 2, margin: 0 }}>LESSON 05</h1>
        <h2 style={{ fontFamily: "serif", fontSize: 30, color: TAUPE, margin: "8px 0 0", fontWeight: 400 }}>
          The Trimmed Crown
        </h2>
        <p style={{ opacity: fadeIn(frame, 50), fontFamily: "serif", fontSize: 16, color: `${SAPPHIRE}77`, marginTop: 14, fontStyle: "italic" }}>
          Biblical Haircuts for 2026
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: The Raw Ingredient (6–20s)
const RawIngredient: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 60 }}>
      <ParchmentBg />
      <p style={{ opacity: fadeIn(frame, 5), fontFamily: "serif", fontSize: 13, letterSpacing: 6, color: TAUPE, marginBottom: 24 }}>
        THE RAW INGREDIENT
      </p>
      <div style={{
        opacity: fadeIn(frame, 15), transform: `translateY(${slideUp(frame, 15, fps)}px)`,
        maxWidth: 680, textAlign: "center", padding: "28px 36px",
        border: `1px solid ${TAUPE}33`, borderRadius: 16, backgroundColor: `${SAPPHIRE}06`,
      }}>
        <p style={{ fontFamily: "serif", fontSize: 24, fontStyle: "italic", color: PLUM, lineHeight: 1.6, margin: 0 }}>
          &ldquo;Does not the very nature of things teach you that if a man has long hair, it is a disgrace to him?&rdquo;
        </p>
        <p style={{ fontFamily: "sans-serif", fontSize: 14, color: `${SAPPHIRE}66`, marginTop: 12 }}>
          &mdash; 1 Corinthians 11:14
        </p>
      </div>
      <div style={{ opacity: fadeIn(frame, 55), marginTop: 22, maxWidth: 560, textAlign: "center" }}>
        <p style={{ fontFamily: "sans-serif", fontSize: 16, color: `${SAPPHIRE}aa`, lineHeight: 1.7 }}>
          <span style={{ color: TAUPE, fontWeight: 600 }}>Hebrew:</span>{" "}
          <em>kasam</em> (כָּסַם) &mdash; to shear, to clip. Ezekiel 44:20 commanded
          priests to keep their hair &ldquo;well trimmed.&rdquo; Discipline starts at the crown.
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: The Three Cuts (20–38s)
const ThreeCuts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cuts = [
    { name: "Short Fade", desc: "Clean sides, structured top. The modern king\u2019s default.", delay: 15 },
    { name: "Textured Crop", desc: "Natural movement, low maintenance. Disciplined yet effortless.", delay: 55 },
    { name: "Caesar Cut", desc: "Forward fringe, uniform length. Authority in simplicity.", delay: 95 },
  ];
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 60 }}>
      <ParchmentBg />
      <p style={{ opacity: fadeIn(frame, 5), fontFamily: "serif", fontSize: 13, letterSpacing: 6, color: TAUPE, marginBottom: 36 }}>
        THE THREE ROYAL CUTS
      </p>
      <div style={{ display: "flex", gap: 24 }}>
        {cuts.map((c, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, c.delay), transform: `translateY(${slideUp(frame, c.delay, fps)}px)`,
            width: 220, padding: "24px 20px", borderTop: `3px solid ${TAUPE}`,
            backgroundColor: `${TAUPE}08`, borderRadius: "0 0 12px 12px", textAlign: "center",
          }}>
            <p style={{ fontFamily: "serif", fontSize: 11, color: TAUPE, letterSpacing: 3, margin: "0 0 8px" }}>
              {["I", "II", "III"][i]}
            </p>
            <p style={{ fontFamily: "serif", fontSize: 20, color: PLUM, margin: "0 0 8px" }}>{c.name}</p>
            <p style={{ fontFamily: "sans-serif", fontSize: 13, color: `${SAPPHIRE}88`, margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
          </div>
        ))}
      </div>
      <p style={{
        opacity: fadeIn(frame, 140), fontFamily: "sans-serif", fontSize: 15,
        color: `${SAPPHIRE}99`, marginTop: 28, textAlign: "center", maxWidth: 500,
      }}>
        Every 2&ndash;3 weeks. Floyd&rsquo;s 99 or The Man Cave Barbershop in Aurora.
        A standing appointment is non-negotiable.
      </p>
    </AbsoluteFill>
  );
};

// Scene 4: Royal Decree (38–48s)
const RoyalDecree: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 60 }}>
      <ParchmentBg />
      <div style={{
        opacity: fadeIn(frame, 10), transform: `translateY(${slideUp(frame, 10, fps)}px)`,
        maxWidth: 620, borderLeft: `4px solid ${GOLD}`, paddingLeft: 28,
        backgroundColor: `${GOLD}06`, padding: "32px 28px 32px 32px", borderRadius: "0 14px 14px 0",
      }}>
        <p style={{ fontFamily: "serif", fontSize: 12, color: GOLD, letterSpacing: 4, marginBottom: 14 }}>
          ROYAL DECREE
        </p>
        <p style={{ fontFamily: "serif", fontSize: 22, fontStyle: "italic", color: PLUM, lineHeight: 1.7, margin: 0 }}>
          &ldquo;A king&rsquo;s hair communicates discipline before he speaks a single word.
          The trimmed crown is not vanity &mdash; it is the first visible act of temple stewardship.&rdquo;
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Closing (48–60s)
const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 18 }}>
      <AbsoluteFill style={{ backgroundColor: GREEN }} />
      <div style={{ opacity: fadeIn(frame, 10), transform: `translateY(${slideUp(frame, 10, fps)}px)` }}>
        <Crown size={65} color={GOLD} />
      </div>
      <p style={{ opacity: fadeIn(frame, 30), fontFamily: "serif", fontSize: 24, color: TAUPE, letterSpacing: 3, textAlign: "center" }}>
        Discipline begins
        <br />
        at the crown of the head.
      </p>
      <div style={{ opacity: fadeIn(frame, 50), height: 1, width: 100, background: `linear-gradient(90deg, transparent, ${TAUPE}, transparent)` }} />
      <p style={{ opacity: fadeIn(frame, 65), fontFamily: "serif", fontSize: 13, color: `${GOLD}88`, letterSpacing: 3, marginTop: 12 }}>
        AKINGSLIFESTYLE.CALYVENT.COM
      </p>
      <p style={{ opacity: fadeIn(frame, 80), fontFamily: "sans-serif", fontSize: 11, color: `${GOLD}55` }}>A Calyvent Venture</p>
    </AbsoluteFill>
  );
};

export const AttireLesson05: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={fps * 6}><TitleCard /></Sequence>
      <Sequence from={fps * 6} durationInFrames={fps * 14}><RawIngredient /></Sequence>
      <Sequence from={fps * 20} durationInFrames={fps * 18}><ThreeCuts /></Sequence>
      <Sequence from={fps * 38} durationInFrames={fps * 10}><RoyalDecree /></Sequence>
      <Sequence from={fps * 48} durationInFrames={fps * 12}><Closing /></Sequence>
    </AbsoluteFill>
  );
};

// Registration — add to Root.tsx:
// import { AttireLesson05 } from "./AttireLesson05";
// <Composition id="AttireLesson05" component={AttireLesson05}
//   durationInFrames={30 * 60} fps={30} width={1920} height={1080} />
