// DailyCodexLesson01.tsx — Remotion 4.x Component
// "The Daily Royal Codex" — 60-second animated intro video
// Mixed-campus feel: gold + multiple accent colors cycling
// Render: npx remotion render src/index.ts DailyCodexLesson01 out/daily-codex-01.mp4

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
const GOLD = "#A38255";
const PLUM = "#571641";
const SAPPHIRE = "#08052D";
const GREEN = "#052B20";
const TAUPE = "#8B7D6B";
const OLIVE = "#3D4F2F";
const STONE = "#6B5B4E";
const CHARCOAL = "#3A3A3A";
const SLATE = "#4A5568";

const CAMPUS_COLORS = [GOLD, TAUPE, OLIVE, STONE, CHARCOAL, SLATE, PLUM];

const fadeIn = (frame: number, delay: number, duration = 20) =>
  interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideUp = (frame: number, delay: number, fps: number) => {
  const s = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 100 } });
  return interpolate(s, [0, 1], [40, 0]);
};

const Crown: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = GOLD }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" width={size} height={size * 0.75}
    fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
    style={{ opacity: 0.8 }}>
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

// Scene 1: Title — The Daily Royal Codex (0–6s)
const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 16 }}>
      <ParchmentBg />
      <div style={{ opacity: fadeIn(frame, 10), transform: `translateY(${slideUp(frame, 10, fps)}px)` }}>
        <Crown size={90} />
      </div>
      <div style={{ opacity: fadeIn(frame, 30), transform: `translateY(${slideUp(frame, 30, fps)}px)`, textAlign: "center" }}>
        <p style={{ fontFamily: "serif", fontSize: 13, letterSpacing: 8, color: GOLD, opacity: 0.5, marginBottom: 14 }}>
          A KING'S LIFESTYLE
        </p>
        <h1 style={{ fontFamily: "serif", fontSize: 46, color: PLUM, letterSpacing: 2, margin: 0 }}>
          The Daily Royal Codex
        </h1>
        <p style={{ fontFamily: "serif", fontSize: 20, color: GOLD, marginTop: 10, fontStyle: "italic" }}>
          One lesson. Every day. Across every pillar of kingship.
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: The 8 Campuses cycling (6–20s)
const CampusCycle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const campuses = [
    { name: "Nourishment", num: "I", color: GOLD, desc: "The Creator's blueprint for fuel" },
    { name: "Attire", num: "II", color: TAUPE, desc: "Modest adornment and the king's wardrobe" },
    { name: "Mentality", num: "III", color: OLIVE, desc: "Servant leadership and inner discipline" },
    { name: "Temple Care", num: "V", color: STONE, desc: "Grooming, rest, and body stewardship" },
    { name: "Presence", num: "VI", color: CHARCOAL, desc: "Commanding rooms without a word" },
    { name: "Speech", num: "VII", color: SLATE, desc: "Words that shape kingdoms" },
    { name: "Legacy", num: "+", color: PLUM, desc: "What outlasts your lifetime" },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 60 }}>
      <ParchmentBg />
      <p style={{ opacity: fadeIn(frame, 5), fontFamily: "serif", fontSize: 13, letterSpacing: 6, color: GOLD, marginBottom: 40 }}>
        8 ROYAL CAMPUSES — ONE DAILY JOURNEY
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", maxWidth: 800 }}>
        {campuses.map((c, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 20 + i * 18),
            transform: `translateY(${slideUp(frame, 20 + i * 18, fps)}px)`,
            padding: "12px 20px", borderLeft: `3px solid ${c.color}`,
            backgroundColor: `${c.color}0a`, borderRadius: "0 10px 10px 0", minWidth: 180,
          }}>
            <p style={{ fontFamily: "serif", fontSize: 11, color: c.color, letterSpacing: 3, margin: "0 0 4px" }}>{c.num}</p>
            <p style={{ fontFamily: "serif", fontSize: 16, color: SAPPHIRE, margin: "0 0 2px" }}>{c.name}</p>
            <p style={{ fontFamily: "sans-serif", fontSize: 11, color: `${SAPPHIRE}88`, margin: 0 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Today's Lesson Example (20–38s)
const TodaysLesson: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 60 }}>
      <ParchmentBg />
      <p style={{ opacity: fadeIn(frame, 5), fontFamily: "serif", fontSize: 13, letterSpacing: 6, color: GOLD, marginBottom: 20 }}>
        TODAY'S ROYAL LESSON
      </p>
      <div style={{
        opacity: fadeIn(frame, 15), transform: `translateY(${slideUp(frame, 15, fps)}px)`,
        maxWidth: 650, textAlign: "center", padding: "32px 40px",
        border: `1px solid ${GOLD}33`, borderRadius: 16, backgroundColor: `${SAPPHIRE}06`,
      }}>
        <div style={{ display: "inline-block", padding: "4px 16px", backgroundColor: `${GOLD}15`,
          borderRadius: 20, marginBottom: 16 }}>
          <p style={{ fontFamily: "serif", fontSize: 12, color: GOLD, letterSpacing: 3, margin: 0 }}>
            NOURISHMENT — CAMPUS I
          </p>
        </div>
        <h2 style={{ fontFamily: "serif", fontSize: 30, color: PLUM, margin: "0 0 10px" }}>
          The Ancient Blueprint
        </h2>
        <p style={{ fontFamily: "serif", fontSize: 18, fontStyle: "italic", color: `${SAPPHIRE}aa`, lineHeight: 1.6, margin: 0 }}>
          Why the Creator engraved food laws on eternity.
        </p>
      </div>
      <div style={{
        opacity: fadeIn(frame, 60), transform: `translateY(${slideUp(frame, 60, fps)}px)`,
        marginTop: 24, padding: "16px 28px", border: `1px solid ${GOLD}33`, borderRadius: 12,
      }}>
        <p style={{ fontFamily: "serif", fontSize: 22, fontStyle: "italic", color: PLUM, textAlign: "center", margin: 0 }}>
          &ldquo;The Lord said to Moses and Aaron, &lsquo;Of all the animals that live on land, these are the ones you may eat.&rsquo;&rdquo;
        </p>
        <p style={{ fontFamily: "sans-serif", fontSize: 13, color: `${SAPPHIRE}66`, textAlign: "center", marginTop: 10 }}>
          &mdash; Leviticus 11:1&ndash;2
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: LLM Enhancement teaser (38–48s)
const EnhanceTeaser: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 60 }}>
      <ParchmentBg />
      <p style={{ opacity: fadeIn(frame, 5), fontFamily: "serif", fontSize: 13, letterSpacing: 6, color: GOLD, marginBottom: 30 }}>
        PERSONALIZED WISDOM
      </p>
      <div style={{
        opacity: fadeIn(frame, 15), transform: `translateY(${slideUp(frame, 15, fps)}px)`,
        maxWidth: 600, textAlign: "center",
      }}>
        <p style={{ fontFamily: "sans-serif", fontSize: 20, color: `${SAPPHIRE}cc`, lineHeight: 1.8, marginBottom: 24 }}>
          Connect your own AI model. Every lesson generates a personalized Royal Insight
          tailored to your journey, your location, and your progress.
        </p>
        <div style={{
          opacity: fadeIn(frame, 50),
          display: "inline-block", padding: "14px 32px", backgroundColor: GOLD,
          borderRadius: 10, color: "white",
        }}>
          <p style={{ fontFamily: "serif", fontSize: 15, letterSpacing: 2, margin: 0 }}>
            ENHANCE WITH MY WISDOM
          </p>
        </div>
        <p style={{
          opacity: fadeIn(frame, 70),
          fontFamily: "sans-serif", fontSize: 13, color: `${SAPPHIRE}66`, marginTop: 16,
        }}>
          Ollama &bull; OpenAI &bull; Grok &bull; Custom endpoint
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
        <Crown size={65} />
      </div>
      <p style={{ opacity: fadeIn(frame, 30), fontFamily: "serif", fontSize: 26, color: GOLD, letterSpacing: 3, textAlign: "center" }}>
        One lesson. Every day.
        <br />
        Every pillar of kingship.
      </p>
      <div style={{ opacity: fadeIn(frame, 50), height: 1, width: 100, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
      <p style={{ opacity: fadeIn(frame, 65), fontFamily: "serif", fontSize: 13, color: `${GOLD}88`, letterSpacing: 3, marginTop: 12 }}>
        AKINGSLIFESTYLE.CALYVENT.COM
      </p>
      <p style={{ opacity: fadeIn(frame, 80), fontFamily: "sans-serif", fontSize: 11, color: `${GOLD}55` }}>
        A Calyvent Venture
      </p>
    </AbsoluteFill>
  );
};

export const DailyCodexLesson01: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={fps * 6}><TitleCard /></Sequence>
      <Sequence from={fps * 6} durationInFrames={fps * 14}><CampusCycle /></Sequence>
      <Sequence from={fps * 20} durationInFrames={fps * 18}><TodaysLesson /></Sequence>
      <Sequence from={fps * 38} durationInFrames={fps * 10}><EnhanceTeaser /></Sequence>
      <Sequence from={fps * 48} durationInFrames={fps * 12}><Closing /></Sequence>
    </AbsoluteFill>
  );
};

// Registration — add to Root.tsx:
// import { DailyCodexLesson01 } from "./DailyCodexLesson01";
// <Composition id="DailyCodexLesson01" component={DailyCodexLesson01}
//   durationInFrames={30 * 60} fps={30} width={1920} height={1080} />
