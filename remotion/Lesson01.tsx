// Lesson01.tsx — Remotion 4.x Component
// "The Ancient Blueprint" — 60-second animated lesson video
// Parchment background, gold accents, smooth text animations
// Ready to render: npx remotion render src/index.ts Lesson01 out/lesson01.mp4

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Audio,
  Img,
} from "remotion";

// ─── CONFIG ────────────────────────────────────────────────
const PARCHMENT = "#FFF6E6";
const GOLD = "#A38255";
const PLUM = "#571641";
const SAPPHIRE = "#08052D";
const GREEN = "#052B20";

// ─── HELPERS ───────────────────────────────────────────────
const fadeIn = (frame: number, delay: number, duration = 20) =>
  interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideUp = (frame: number, delay: number, fps: number) => {
  const s = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 100 } });
  return interpolate(s, [0, 1], [40, 0]);
};

// ─── CROWN SVG ─────────────────────────────────────────────
const Crown: React.FC<{ size?: number; opacity?: number }> = ({
  size = 80,
  opacity = 0.8,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 80 60"
    width={size}
    height={size * 0.75}
    fill="none"
    stroke={GOLD}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ opacity }}
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

// ─── GOLD DIVIDER ──────────────────────────────────────────
const GoldDivider: React.FC<{ width?: number }> = ({ width = 200 }) => (
  <div
    style={{
      height: 1,
      width,
      margin: "0 auto",
      background: `linear-gradient(90deg, transparent, ${GOLD} 50%, transparent)`,
    }}
  />
);

// ─── PARCHMENT TEXTURE OVERLAY ─────────────────────────────
const ParchmentBg: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: PARCHMENT,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
    }}
  />
);

// ─── SCENE 1: TITLE CARD (0–5s) ───────────────────────────
const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <ParchmentBg />
      <div
        style={{
          opacity: fadeIn(frame, 10),
          transform: `translateY(${slideUp(frame, 10, fps)}px)`,
        }}
      >
        <Crown size={100} />
      </div>
      <div
        style={{
          opacity: fadeIn(frame, 25),
          transform: `translateY(${slideUp(frame, 25, fps)}px)`,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "serif",
            fontSize: 14,
            letterSpacing: 8,
            color: GOLD,
            opacity: 0.6,
            marginBottom: 12,
          }}
        >
          YEAR 1 — THE ARCHITECTURE OF WISDOM
        </p>
        <h1
          style={{
            fontFamily: "serif",
            fontSize: 52,
            color: PLUM,
            letterSpacing: 3,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          LESSON 01
        </h1>
        <h2
          style={{
            fontFamily: "serif",
            fontSize: 36,
            color: GOLD,
            margin: "8px 0 0",
            fontWeight: 400,
          }}
        >
          The Ancient Blueprint
        </h2>
      </div>
      <div
        style={{
          opacity: fadeIn(frame, 50),
          marginTop: 20,
        }}
      >
        <GoldDivider width={160} />
      </div>
      <p
        style={{
          opacity: fadeIn(frame, 60),
          fontFamily: "serif",
          fontSize: 16,
          color: `${SAPPHIRE}99`,
          fontStyle: "italic",
          marginTop: 16,
        }}
      >
        A King&rsquo;s Lifestyle — Nourishment
      </p>
    </AbsoluteFill>
  );
};

// ─── SCENE 2: THE RAW INGREDIENT (5–18s) ──────────────────
const RawIngredient: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 60,
      }}
    >
      <ParchmentBg />
      <p
        style={{
          opacity: fadeIn(frame, 5),
          fontFamily: "serif",
          fontSize: 13,
          letterSpacing: 6,
          color: GOLD,
          marginBottom: 24,
        }}
      >
        THE RAW INGREDIENT
      </p>
      <div
        style={{
          opacity: fadeIn(frame, 15),
          transform: `translateY(${slideUp(frame, 15, fps)}px)`,
          maxWidth: 700,
          textAlign: "center",
          padding: "30px 40px",
          border: `1px solid ${GOLD}33`,
          borderRadius: 16,
          backgroundColor: `${SAPPHIRE}08`,
        }}
      >
        <p
          style={{
            fontFamily: "serif",
            fontSize: 26,
            fontStyle: "italic",
            color: PLUM,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          &ldquo;The Lord said to Moses and Aaron, &lsquo;Speak to the
          Israelites: Of all the animals that live on land, these are the ones
          you may eat.&rsquo;&rdquo;
        </p>
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 14,
            color: `${SAPPHIRE}66`,
            marginTop: 16,
          }}
        >
          — Leviticus 11:1–2
        </p>
      </div>
      <div
        style={{
          opacity: fadeIn(frame, 50),
          transform: `translateY(${slideUp(frame, 50, fps)}px)`,
          marginTop: 28,
          maxWidth: 600,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 16,
            color: `${SAPPHIRE}aa`,
            lineHeight: 1.7,
          }}
        >
          <span style={{ color: GOLD, fontWeight: 600 }}>Hebrew Root:</span>{" "}
          <em>torah</em> (תּוֹרָה) — not &ldquo;law&rdquo; but
          &ldquo;instruction.&rdquo; An arrow pointing toward optimal fuel for
          the body God engineered.
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 3: THE PREPARATION (18–35s) ────────────────────
const Preparation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const points = [
    {
      delay: 10,
      text: "Three thousand years before nutritionists existed, the Creator handed Moses a document that would outlast every diet trend in human history.",
    },
    {
      delay: 70,
      text: "Leviticus 11 was not a list of arbitrary restrictions. It was an engineering manual — written by the Engineer who designed every mitochondrion.",
    },
    {
      delay: 130,
      text: "Modern science has spent centuries catching up to what was declared in a single chapter in the wilderness.",
    },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 60,
      }}
    >
      <ParchmentBg />
      <p
        style={{
          opacity: fadeIn(frame, 5),
          fontFamily: "serif",
          fontSize: 13,
          letterSpacing: 6,
          color: GOLD,
          marginBottom: 40,
        }}
      >
        THE PREPARATION
      </p>
      <div style={{ maxWidth: 700, display: "flex", flexDirection: "column", gap: 24 }}>
        {points.map((p, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, p.delay),
              transform: `translateY(${slideUp(frame, p.delay, fps)}px)`,
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: GOLD,
                marginTop: 8,
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: 20,
                color: `${SAPPHIRE}cc`,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 4: THE CONSUMPTION (35–48s) ────────────────────
const Consumption: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 60,
      }}
    >
      <ParchmentBg />
      <p
        style={{
          opacity: fadeIn(frame, 5),
          fontFamily: "serif",
          fontSize: 13,
          letterSpacing: 6,
          color: GOLD,
          marginBottom: 30,
        }}
      >
        THE CONSUMPTION — 2026
      </p>
      <div
        style={{
          opacity: fadeIn(frame, 15),
          transform: `translateY(${slideUp(frame, 15, fps)}px)`,
          maxWidth: 700,
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 20,
            color: `${SAPPHIRE}cc`,
            lineHeight: 1.8,
          }}
        >
          When you walk into Whole Foods on South Parker Road or King Soopers on
          East Iliff, you navigate ten thousand products. The ancient blueprint
          cuts through every marketing claim.
        </p>
      </div>
      <div
        style={{
          opacity: fadeIn(frame, 60),
          display: "flex",
          gap: 20,
          marginTop: 10,
        }}
      >
        {["Read Leviticus 11", "Audit Your Pantry", "Tell One Person"].map(
          (step, i) => (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, 80 + i * 25),
                transform: `translateY(${slideUp(frame, 80 + i * 25, fps)}px)`,
                padding: "16px 24px",
                border: `1px solid ${GOLD}44`,
                borderRadius: 12,
                backgroundColor: `${GOLD}0a`,
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "serif",
                  fontSize: 14,
                  color: GOLD,
                  letterSpacing: 2,
                  margin: "0 0 6px",
                }}
              >
                {["I", "II", "III"][i]}
              </p>
              <p
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 15,
                  color: `${SAPPHIRE}aa`,
                  margin: 0,
                }}
              >
                {step}
              </p>
            </div>
          )
        )}
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 5: CLOSING (48–60s) ────────────────────────────
const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <AbsoluteFill style={{ backgroundColor: GREEN }} />
      <div
        style={{
          opacity: fadeIn(frame, 10),
          transform: `translateY(${slideUp(frame, 10, fps)}px)`,
        }}
      >
        <Crown size={70} opacity={1} />
      </div>
      <p
        style={{
          opacity: fadeIn(frame, 30),
          fontFamily: "serif",
          fontSize: 28,
          color: GOLD,
          letterSpacing: 4,
          textAlign: "center",
        }}
      >
        The throne is built
        <br />
        one discipline at a time.
      </p>
      <div style={{ opacity: fadeIn(frame, 50), marginTop: 10 }}>
        <GoldDivider width={120} />
      </div>
      <p
        style={{
          opacity: fadeIn(frame, 65),
          fontFamily: "serif",
          fontSize: 14,
          color: `${GOLD}88`,
          letterSpacing: 3,
          marginTop: 16,
        }}
      >
        AKINGSLIFESTYLE.CALYVENT.COM
      </p>
      <p
        style={{
          opacity: fadeIn(frame, 80),
          fontFamily: "sans-serif",
          fontSize: 12,
          color: `${GOLD}55`,
        }}
      >
        A Calyvent Venture
      </p>
    </AbsoluteFill>
  );
};

// ─── MAIN COMPOSITION ──────────────────────────────────────
export const Lesson01: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      {/* Scene 1: Title Card — 0s to 5s */}
      <Sequence from={0} durationInFrames={fps * 5}>
        <TitleCard />
      </Sequence>

      {/* Scene 2: Raw Ingredient — 5s to 18s */}
      <Sequence from={fps * 5} durationInFrames={fps * 13}>
        <RawIngredient />
      </Sequence>

      {/* Scene 3: Preparation — 18s to 35s */}
      <Sequence from={fps * 18} durationInFrames={fps * 17}>
        <Preparation />
      </Sequence>

      {/* Scene 4: Consumption — 35s to 48s */}
      <Sequence from={fps * 35} durationInFrames={fps * 13}>
        <Consumption />
      </Sequence>

      {/* Scene 5: Closing — 48s to 60s */}
      <Sequence from={fps * 48} durationInFrames={fps * 12}>
        <Closing />
      </Sequence>
    </AbsoluteFill>
  );
};

// ─── REGISTRATION (for src/index.ts or Root.tsx) ───────────
// Add to your Root.tsx:
//
// import { Lesson01 } from "./Lesson01";
//
// export const RemotionRoot = () => (
//   <>
//     <Composition
//       id="Lesson01"
//       component={Lesson01}
//       durationInFrames={30 * 60}  // 60 seconds at 30fps
//       fps={30}
//       width={1920}
//       height={1080}
//     />
//   </>
// );
