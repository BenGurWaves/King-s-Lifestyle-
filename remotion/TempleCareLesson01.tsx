// TempleCareLesson01.tsx — Remotion 4.x Component
// "Hairstyles for a King" — 60-second animated lesson video
// Parchment background, warm stone accents, smooth text animations
// Render: npx remotion render src/index.ts TempleCareLesson01 out/templecare-01.mp4

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
const STONE = "#6B5B4E";
const GOLD = "#A38255";
const PLUM = "#571641";
const SAPPHIRE = "#08052D";
const GREEN = "#052B20";

const fadeIn = (frame: number, delay: number, duration = 20) =>
  interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideUp = (frame: number, delay: number, fps: number) => {
  const s = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 100 } });
  return interpolate(s, [0, 1], [40, 0]);
};

const Crown: React.FC<{ size?: number; color?: string }> = ({
  size = 80,
  color = GOLD,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 80 60"
    width={size}
    height={size * 0.75}
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ opacity: 0.8 }}
  >
    <path d="M10 48 L18 18 L40 30 L62 18 L70 48 Z" />
    <line x1="18" y1="18" x2="18" y2="13" />
    <circle cx="18" cy="11" r="2.5" />
    <line x1="40" y1="30" x2="40" y2="8" />
    <circle cx="40" cy="6" r="3" />
    <line x1="62" y1="18" x2="62" y2="13" />
    <circle cx="62" cy="11" r="2.5" />
    <line x1="8" y1="52" x2="72" y2="52" />
  </svg>
);

const GoldDivider: React.FC<{ width?: number; color?: string }> = ({
  width = 200,
  color = STONE,
}) => (
  <div
    style={{
      height: 1,
      width,
      margin: "0 auto",
      background: `linear-gradient(90deg, transparent, ${color} 50%, transparent)`,
    }}
  />
);

const ParchmentBg: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: PARCHMENT,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
    }}
  />
);

// Scene 1: Title Card (0–6s)
const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 20 }}>
      <ParchmentBg />
      <div style={{ opacity: fadeIn(frame, 10), transform: `translateY(${slideUp(frame, 10, fps)}px)` }}>
        <Crown size={90} color={STONE} />
      </div>
      <div style={{ opacity: fadeIn(frame, 25), transform: `translateY(${slideUp(frame, 25, fps)}px)`, textAlign: "center" }}>
        <p style={{ fontFamily: "serif", fontSize: 13, letterSpacing: 6, color: STONE, opacity: 0.6, marginBottom: 12 }}>
          TEMPLE CARE — CAMPUS V
        </p>
        <h1 style={{ fontFamily: "serif", fontSize: 48, color: PLUM, letterSpacing: 3, margin: 0, lineHeight: 1.2 }}>
          LESSON 02
        </h1>
        <h2 style={{ fontFamily: "serif", fontSize: 32, color: STONE, margin: "8px 0 0", fontWeight: 400 }}>
          Hairstyles for a King
        </h2>
      </div>
      <div style={{ opacity: fadeIn(frame, 55), marginTop: 16 }}>
        <GoldDivider width={140} color={STONE} />
      </div>
      <p style={{ opacity: fadeIn(frame, 65), fontFamily: "serif", fontSize: 15, color: `${SAPPHIRE}88`, fontStyle: "italic", marginTop: 12 }}>
        Stewarding the Dwelling Place of the Holy Spirit
      </p>
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
      <p style={{ opacity: fadeIn(frame, 5), fontFamily: "serif", fontSize: 13, letterSpacing: 6, color: STONE, marginBottom: 24 }}>
        THE RAW INGREDIENT
      </p>
      <div style={{
        opacity: fadeIn(frame, 15),
        transform: `translateY(${slideUp(frame, 15, fps)}px)`,
        maxWidth: 700, textAlign: "center", padding: "28px 36px",
        border: `1px solid ${STONE}33`, borderRadius: 16, backgroundColor: `${SAPPHIRE}06`,
      }}>
        <p style={{ fontFamily: "serif", fontSize: 24, fontStyle: "italic", color: PLUM, lineHeight: 1.6, margin: 0 }}>
          &ldquo;Does not the very nature of things teach you that if a man has long hair, it is a disgrace to him?&rdquo;
        </p>
        <p style={{ fontFamily: "sans-serif", fontSize: 14, color: `${SAPPHIRE}66`, marginTop: 14 }}>
          &mdash; 1 Corinthians 11:14
        </p>
      </div>
      <div style={{ opacity: fadeIn(frame, 55), transform: `translateY(${slideUp(frame, 55, fps)}px)`, marginTop: 24, maxWidth: 580, textAlign: "center" }}>
        <p style={{ fontFamily: "sans-serif", fontSize: 16, color: `${SAPPHIRE}aa`, lineHeight: 1.7 }}>
          <span style={{ color: STONE, fontWeight: 600 }}>Hebrew:</span>{" "}
          <em>kasam</em> (כָּסַם) &mdash; to shear, to clip. The priests of Ezekiel 44:20 were
          commanded to keep their hair trimmed. Discipline begins at the crown of the head.
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: The Preparation (20–35s)
const Preparation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const points = [
    { delay: 10, text: "In ancient Israel, a man\u2019s hair communicated his station. Priests kept theirs trimmed as an act of service. Only Nazirites grew theirs long \u2014 and only under a specific vow." },
    { delay: 70, text: "The principle is not about a single hairstyle. It is about intentionality. A king\u2019s hair is disciplined, maintained, and deliberate \u2014 never neglected." },
    { delay: 130, text: "Your barber is your first line of defense in temple stewardship. Every two to three weeks, without exception." },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 60 }}>
      <ParchmentBg />
      <p style={{ opacity: fadeIn(frame, 5), fontFamily: "serif", fontSize: 13, letterSpacing: 6, color: STONE, marginBottom: 36 }}>
        THE PREPARATION
      </p>
      <div style={{ maxWidth: 680, display: "flex", flexDirection: "column", gap: 22 }}>
        {points.map((p, i) => (
          <div key={i} style={{ opacity: fadeIn(frame, p.delay), transform: `translateY(${slideUp(frame, p.delay, fps)}px)`, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: STONE, marginTop: 8, flexShrink: 0 }} />
            <p style={{ fontFamily: "sans-serif", fontSize: 19, color: `${SAPPHIRE}cc`, lineHeight: 1.7, margin: 0 }}>
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: The Consumption (35–48s)
const Consumption: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 60 }}>
      <ParchmentBg />
      <p style={{ opacity: fadeIn(frame, 5), fontFamily: "serif", fontSize: 13, letterSpacing: 6, color: STONE, marginBottom: 28 }}>
        THE CONSUMPTION &mdash; 2026 AURORA
      </p>
      <div style={{ opacity: fadeIn(frame, 15), transform: `translateY(${slideUp(frame, 15, fps)}px)`, maxWidth: 680, textAlign: "center", marginBottom: 28 }}>
        <p style={{ fontFamily: "sans-serif", fontSize: 19, color: `${SAPPHIRE}cc`, lineHeight: 1.8 }}>
          Book a standing appointment at Floyd&rsquo;s 99 or The Man Cave Barbershop in Aurora.
          The short fade, the textured crop, the Caesar cut &mdash; clean, disciplined silhouettes
          that communicate authority before you speak a single word.
        </p>
      </div>
      <div style={{ opacity: fadeIn(frame, 60), display: "flex", gap: 18, marginTop: 8 }}>
        {["Short Fade", "Textured Crop", "Caesar Cut"].map((style, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 75 + i * 22),
            transform: `translateY(${slideUp(frame, 75 + i * 22, fps)}px)`,
            padding: "14px 22px", border: `1px solid ${STONE}44`, borderRadius: 12,
            backgroundColor: `${STONE}08`, textAlign: "center",
          }}>
            <p style={{ fontFamily: "serif", fontSize: 13, color: STONE, letterSpacing: 2, margin: "0 0 4px" }}>
              {["I", "II", "III"][i]}
            </p>
            <p style={{ fontFamily: "sans-serif", fontSize: 14, color: `${SAPPHIRE}aa`, margin: 0 }}>
              {style}
            </p>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Closing (48–60s)
const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 20 }}>
      <AbsoluteFill style={{ backgroundColor: GREEN }} />
      <div style={{ opacity: fadeIn(frame, 10), transform: `translateY(${slideUp(frame, 10, fps)}px)` }}>
        <Crown size={65} color={STONE} />
      </div>
      <p style={{ opacity: fadeIn(frame, 30), fontFamily: "serif", fontSize: 26, color: STONE, letterSpacing: 3, textAlign: "center" }}>
        Discipline begins
        <br />
        at the crown of the head.
      </p>
      <div style={{ opacity: fadeIn(frame, 50), marginTop: 8 }}>
        <GoldDivider width={100} color={STONE} />
      </div>
      <p style={{ opacity: fadeIn(frame, 65), fontFamily: "serif", fontSize: 13, color: `${STONE}88`, letterSpacing: 3, marginTop: 14 }}>
        AKINGSLIFESTYLE.CALYVENT.COM
      </p>
      <p style={{ opacity: fadeIn(frame, 80), fontFamily: "sans-serif", fontSize: 11, color: `${STONE}55` }}>
        A Calyvent Venture
      </p>
    </AbsoluteFill>
  );
};

// Main Composition
export const TempleCareLesson01: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={fps * 6}><TitleCard /></Sequence>
      <Sequence from={fps * 6} durationInFrames={fps * 14}><RawIngredient /></Sequence>
      <Sequence from={fps * 20} durationInFrames={fps * 15}><Preparation /></Sequence>
      <Sequence from={fps * 35} durationInFrames={fps * 13}><Consumption /></Sequence>
      <Sequence from={fps * 48} durationInFrames={fps * 12}><Closing /></Sequence>
    </AbsoluteFill>
  );
};

// Registration — add to Root.tsx:
//
// import { TempleCareLesson01 } from "./TempleCareLesson01";
//
// <Composition
//   id="TempleCareLesson01"
//   component={TempleCareLesson01}
//   durationInFrames={30 * 60}
//   fps={30}
//   width={1920}
//   height={1080}
// />
