// RoyalVisualizationIntro.tsx — Remotion 4.x Component
// "The Royal Visualization" — 60-second animated intro
// A young king generating his transformed self through image generation
// Render: npx remotion render src/index.ts RoyalVisualizationIntro out/royal-viz-intro.mp4

import React from "react";
import {
  AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence,
} from "remotion";

const PARCHMENT = "#FFF6E6";
const GOLD = "#A38255";
const PLUM = "#571641";
const SAPPHIRE = "#08052D";
const GREEN = "#052B20";
const CHARCOAL = "#1a1a1a";

const fadeIn = (f: number, d: number, dur = 20) =>
  interpolate(f - d, [0, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const fadeOut = (f: number, d: number, dur = 15) =>
  interpolate(f - d, [0, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const slideUp = (f: number, d: number, fps: number) =>
  interpolate(spring({ frame: f - d, fps, config: { damping: 80, stiffness: 100 } }), [0, 1], [40, 0]);
const scaleIn = (f: number, d: number, fps: number) =>
  interpolate(spring({ frame: f - d, fps, config: { damping: 60, stiffness: 80 } }), [0, 1], [0.8, 1]);

const Crown: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = GOLD }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" width={size} height={size * 0.75}
    fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
    <path d="M10 48 L18 18 L40 30 L62 18 L70 48 Z" />
    <line x1="18" y1="18" x2="18" y2="13" /><circle cx="18" cy="11" r="2.5" />
    <line x1="40" y1="30" x2="40" y2="8" /><circle cx="40" cy="6" r="3" />
    <line x1="62" y1="18" x2="62" y2="13" /><circle cx="62" cy="11" r="2.5" />
    <line x1="8" y1="52" x2="72" y2="52" />
  </svg>
);

const Bg: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <AbsoluteFill style={{
    backgroundColor: dark ? CHARCOAL : PARCHMENT,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
  }} />
);

const ImageIcon: React.FC<{ size?: number; color?: string; opacity?: number }> = ({ size = 60, color = GOLD, opacity = 1 }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24" style={{ opacity }}>
    <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
  </svg>
);

// Scene 1: Title Card — "The Royal Visualization"
const TitleScene: React.FC = () => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 20 }}>
      <Bg dark />
      <div style={{ opacity: fadeIn(f, 8), transform: `translateY(${slideUp(f, 8, fps)}px)` }}>
        <Crown size={100} color={GOLD} />
      </div>
      <div style={{ opacity: fadeIn(f, 25), transform: `translateY(${slideUp(f, 25, fps)}px)`, textAlign: "center" }}>
        <p style={{ fontFamily: "serif", fontSize: 12, letterSpacing: 10, color: `${GOLD}88`, marginBottom: 16 }}>
          A NEW FEATURE
        </p>
        <h1 style={{ fontFamily: "serif", fontSize: 46, color: GOLD, letterSpacing: 3, margin: 0, lineHeight: 1.2 }}>
          The Royal Visualization
        </h1>
        <p style={{ fontFamily: "serif", fontSize: 18, color: `${PARCHMENT}66`, marginTop: 14, fontStyle: "italic" }}>
          See the king you are becoming.
        </p>
      </div>
      <div style={{
        opacity: fadeIn(f, 55), height: 1, width: 140,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, marginTop: 10,
      }} />
      <p style={{ opacity: fadeIn(f, 65), fontFamily: "serif", fontSize: 13, color: `${PARCHMENT}44`, fontStyle: "italic" }}>
        v0.0.12 &mdash; A King&rsquo;s Lifestyle
      </p>
    </AbsoluteFill>
  );
};

// Scene 2: The Concept — Lesson becomes vision
const ConceptScene: React.FC = () => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  const steps = [
    { icon: "lesson", label: "Study the lesson", delay: 15 },
    { icon: "reflect", label: "Reflect on the wisdom", delay: 50 },
    { icon: "visualize", label: "Generate your royal vision", delay: 85 },
  ];
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 60 }}>
      <Bg />
      <p style={{ opacity: fadeIn(f, 5), fontFamily: "serif", fontSize: 12, letterSpacing: 8, color: GOLD, marginBottom: 36 }}>
        HOW IT WORKS
      </p>
      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div style={{
              opacity: fadeIn(f, step.delay),
              transform: `scale(${scaleIn(f, step.delay, fps)})`,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: 160,
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: 20, border: `2px solid ${GOLD}33`,
                display: "flex", alignItems: "center", justifyContent: "center",
                backgroundColor: `${GOLD}08`,
              }}>
                {step.icon === "lesson" && (
                  <svg width="36" height="36" fill="none" stroke={PLUM} strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                )}
                {step.icon === "reflect" && (
                  <svg width="36" height="36" fill="none" stroke={PLUM} strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                )}
                {step.icon === "visualize" && <ImageIcon size={36} color={PLUM} />}
              </div>
              <p style={{ fontFamily: "serif", fontSize: 14, color: PLUM, textAlign: "center", lineHeight: 1.4 }}>
                {step.label}
              </p>
            </div>
            {i < steps.length - 1 && (
              <div style={{ opacity: fadeIn(f, step.delay + 20), color: `${GOLD}44`, fontSize: 24, marginTop: -20 }}>
                &rarr;
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: The Transformation — Before/After
const TransformScene: React.FC = () => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  const goldGlow = interpolate(f, [0, 60, 120], [0, 0.3, 0.6], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 30 }}>
      <Bg dark />
      <p style={{ opacity: fadeIn(f, 5), fontFamily: "serif", fontSize: 12, letterSpacing: 8, color: GOLD, marginBottom: 10 }}>
        THE TRANSFORMATION
      </p>
      <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
        {/* Before */}
        <div style={{
          opacity: fadeIn(f, 15), transform: `translateY(${slideUp(f, 15, fps)}px)`,
          width: 220, height: 280, borderRadius: 16, border: `1px solid ${PARCHMENT}15`,
          backgroundColor: `${PARCHMENT}08`, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 14, padding: 20,
        }}>
          <div style={{ width: 70, height: 70, borderRadius: "50%", border: `2px solid ${PARCHMENT}20`,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ fontFamily: "serif", fontSize: 28, color: `${PARCHMENT}30` }}>?</p>
          </div>
          <p style={{ fontFamily: "serif", fontSize: 16, color: `${PARCHMENT}50`, textAlign: "center" }}>The student</p>
          <p style={{ fontFamily: "sans-serif", fontSize: 11, color: `${PARCHMENT}30`, textAlign: "center", lineHeight: 1.5 }}>
            Reading lessons<br />Absorbing wisdom<br />Building habits
          </p>
        </div>
        {/* Arrow */}
        <div style={{ opacity: fadeIn(f, 50), display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <p style={{ fontFamily: "serif", fontSize: 36, color: GOLD }}>&#x2192;</p>
          <p style={{ fontFamily: "sans-serif", fontSize: 10, letterSpacing: 4, color: `${GOLD}66` }}>VISUALIZE</p>
        </div>
        {/* After */}
        <div style={{
          opacity: fadeIn(f, 60), transform: `scale(${scaleIn(f, 60, fps)})`,
          width: 220, height: 280, borderRadius: 16, border: `2px solid ${GOLD}`,
          backgroundColor: `${GOLD}12`, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 14, padding: 20,
          boxShadow: `0 0 ${goldGlow * 60}px ${GOLD}${Math.round(goldGlow * 40).toString(16).padStart(2, "0")}`,
        }}>
          <Crown size={60} color={GOLD} />
          <p style={{ fontFamily: "serif", fontSize: 16, color: GOLD, textAlign: "center" }}>The king you see</p>
          <p style={{ fontFamily: "sans-serif", fontSize: 11, color: `${PARCHMENT}50`, textAlign: "center", lineHeight: 1.5 }}>
            Personalized vision<br />AI-generated imagery<br />Your transformation, visible
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Feature Showcase
const FeatureScene: React.FC = () => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  const features = [
    { title: "Every Lesson", desc: "Generate a royal visualization after any lesson", delay: 10 },
    { title: "Every Campus", desc: "Nourishment, Attire, Mentality \u2014 all nine pillars", delay: 40 },
    { title: "Personalized", desc: "Uses your goals, location, and journal reflections", delay: 70 },
    { title: "Shareable", desc: "Download or share your royal insight cards", delay: 100 },
  ];
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 60 }}>
      <Bg />
      <p style={{ opacity: fadeIn(f, 3), fontFamily: "serif", fontSize: 12, letterSpacing: 8, color: GOLD, marginBottom: 30 }}>
        AVAILABLE EVERYWHERE
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 560, width: "100%" }}>
        {features.map((feat, i) => (
          <div key={i} style={{
            opacity: fadeIn(f, feat.delay), transform: `translateX(${interpolate(
              spring({ frame: f - feat.delay, fps, config: { damping: 80, stiffness: 100 } }),
              [0, 1], [-30, 0],
            )}px)`,
            padding: "14px 20px", borderLeft: `3px solid ${GOLD}`, backgroundColor: `${GOLD}06`,
            borderRadius: "0 10px 10px 0",
          }}>
            <p style={{ fontFamily: "serif", fontSize: 17, color: PLUM, margin: 0 }}>{feat.title}</p>
            <p style={{ fontFamily: "sans-serif", fontSize: 12, color: `${SAPPHIRE}66`, margin: "4px 0 0" }}>{feat.desc}</p>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Closing — Call to action
const ClosingScene: React.FC = () => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  const pulse = Math.sin(f * 0.08) * 0.04 + 1;
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 24 }}>
      <Bg dark />
      <div style={{
        opacity: fadeIn(f, 10), transform: `scale(${pulse})`,
      }}>
        <Crown size={90} color={GOLD} />
      </div>
      <div style={{ opacity: fadeIn(f, 30), transform: `translateY(${slideUp(f, 30, fps)}px)`, textAlign: "center" }}>
        <h2 style={{ fontFamily: "serif", fontSize: 36, color: GOLD, letterSpacing: 2, margin: 0, lineHeight: 1.3 }}>
          See what you are becoming.
        </h2>
        <p style={{ fontFamily: "serif", fontSize: 16, color: `${PARCHMENT}44`, marginTop: 16, fontStyle: "italic" }}>
          The more time you invest, the clearer the vision.
        </p>
      </div>
      <div style={{
        opacity: fadeIn(f, 65), marginTop: 20, padding: "14px 40px",
        border: `2px solid ${GOLD}`, borderRadius: 12,
      }}>
        <p style={{ fontFamily: "serif", fontSize: 15, color: GOLD, letterSpacing: 4, margin: 0 }}>
          akingslifestyle.com
        </p>
      </div>
      <p style={{ opacity: fadeIn(f, 80), fontFamily: "sans-serif", fontSize: 10, color: `${PARCHMENT}22`, marginTop: 14 }}>
        A Calyvent Venture
      </p>
    </AbsoluteFill>
  );
};

// Main Composition — 60 seconds at 30fps = 1800 frames
// Scene breakdown: Title(0-150), Concept(150-450), Transform(450-750), Features(750-1200), Closing(1200-1800)
export const RoyalVisualizationIntro: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={150}><TitleScene /></Sequence>
      <Sequence from={150} durationInFrames={300}><ConceptScene /></Sequence>
      <Sequence from={450} durationInFrames={300}><TransformScene /></Sequence>
      <Sequence from={750} durationInFrames={450}><FeatureScene /></Sequence>
      <Sequence from={1200} durationInFrames={600}><ClosingScene /></Sequence>
    </AbsoluteFill>
  );
};

export default RoyalVisualizationIntro;
