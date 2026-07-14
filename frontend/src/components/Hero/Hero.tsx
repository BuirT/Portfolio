import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame, MotionValue } from "framer-motion"
import { useTranslation } from "react-i18next"
import { ParticleBackground } from "../ParticleBackground"
import { Code2, Rocket } from "lucide-react"

function OrbitalBadge({
  children,
  baseAngle,
  offsetAngle,
  isDragging,
  onPointerDown
}: {
  children: React.ReactNode,
  baseAngle: MotionValue<number>,
  offsetAngle: number,
  isDragging: boolean,
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void
}) {
  // Squircle math to make the orbit perfectly hug the rounded rectangular frame!
  const W = 54; // 54% width (keeps it slightly outside the border)
  const H = 52; // 52% height
  const n = 6;  // Sharpness of the corners (6 is a very good rounded rectangle)

  const leftStyle = useTransform(baseAngle, (base) => {
    const angle = base + offsetAngle;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const r = 1 / Math.pow(Math.pow(Math.abs(cosA / W), n) + Math.pow(Math.abs(sinA / H), n), 1 / n);
    return `calc(50% + ${r * cosA}%)`;
  });

  const topStyle = useTransform(baseAngle, (base) => {
    const angle = base + offsetAngle;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const r = 1 / Math.pow(Math.pow(Math.abs(cosA / W), n) + Math.pow(Math.abs(sinA / H), n), 1 / n);
    return `calc(50% + ${r * sinA}%)`;
  });

  return (
    <motion.div
      onPointerDown={onPointerDown}
      className={`absolute z-40 touch-none transition-transform ${isDragging ? "cursor-grabbing scale-125" : "cursor-grab scale-100"}`}
      style={{
        left: leftStyle,
        top: topStyle,
        x: "-50%",
        y: "-50%",
      }}
    >
      {children}
    </motion.div>
  )
}



export function Hero() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLElement>(null)

  // Interactive Orbit State (Bypasses React re-renders for max FPS)
  const baseAngle = useMotionValue(0);
  const centerRef = useRef({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  // Auto-orbit at 60/120fps using Framer Motion's useAnimationFrame
  useAnimationFrame((_, delta) => {
    if (!isDragging) {
      // delta is time since last frame in ms. Base speed 0.0001 rad/ms
      baseAngle.set(baseAngle.get() + 0.00015 * delta);
    }
  });

  // Sync image index to baseAngle changes
  useEffect(() => {
    return baseAngle.on("change", (latest) => {
      let normalized = latest % (Math.PI * 2);
      if (normalized < 0) normalized += Math.PI * 2;

      let newIndex = 0;
      if (normalized >= 0 && normalized < Math.PI / 2) newIndex = 0;
      else if (normalized >= Math.PI / 2 && normalized < Math.PI) newIndex = 1;
      else if (normalized >= Math.PI && normalized < 1.5 * Math.PI) newIndex = 2;
      else newIndex = 3;

      setImageIndex(prev => prev !== newIndex ? newIndex : prev);
    });
  }, [baseAngle]);

  const createDragHandler = (offsetAngle: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);

    // Find the center of the avatar figure
    const container = e.currentTarget.parentElement;
    if (container) {
      const rect = container.getBoundingClientRect();
      centerRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - centerRef.current.x;
      const dy = moveEvent.clientY - centerRef.current.y;
      const newRawAngle = Math.atan2(dy, dx);
      // Update motion value directly (no React re-render)
      baseAngle.set(newRawAngle - offsetAngle);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const images = ["avt.png", "avt1.png", "avt2.png", "avt3.png"].map(img => `${import.meta.env.BASE_URL}images/avatars/${img}`);

  // Parallax Scroll for the Avatar and Background Elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const avatarY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0])


  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-transparent py-20 lg:py-0"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--primary)_8%,transparent)_0%,transparent_70%)] pointer-events-none" />
      <ParticleBackground />
      <div className="scanlines opacity-20 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* Main Grid Layout: Left Info - Center Avatar - Right Info */}
      <div className="w-full px-6 lg:px-12 xl:px-20 max-w-[1920px] relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

        {/* LEFT COLUMN: Greeting & CTA */}
        <motion.header
          style={{ opacity: opacityFade }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
        >

          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold font-heading tracking-tight text-foreground leading-[1.1] mb-6">
            {t("hero.greeting")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_auto]">BuirT</span>
          </h1>

        </motion.header>

        {/* CENTER COLUMN: The Avatar */}
        <div className="flex-[1.2] flex justify-center items-center relative order-1 lg:order-2">
          {/* Intense Glowing Backdrop for Avatar */}
          <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-primary/20 rounded-full mix-blend-screen filter blur-[80px] animate-pulse pointer-events-none" />

          <motion.figure
            style={{ y: avatarY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-20 w-[260px] h-[340px] md:w-[320px] md:h-[420px] lg:w-[400px] lg:h-[520px] flex items-center justify-center group m-0"
          >
            {/* Styled Rounded Rectangle Frame for Avatar */}
            <div className="relative w-full h-full rounded-[2rem] md:rounded-[3rem] border-[6px] border-background overflow-hidden bg-muted shadow-[0_0_50px_color-mix(in_oklch,var(--primary)_30%,transparent)] transition-all duration-700 group-hover:shadow-[0_0_80px_color-mix(in_oklch,var(--primary)_60%,transparent)]">
              {/* Render 4 images and only fade opacity based on imageIndex for smooth crossfade */}
              {images.map((imgSrc, idx) => (
                <img
                  key={imgSrc}
                  src={imgSrc}
                  alt={`BuirT Avatar ${idx}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${idx === imageIndex ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/10 mix-blend-overlay pointer-events-none" />

              {/* Inner glowing ring */}
              <div className="absolute inset-0 z-30 rounded-[2rem] md:rounded-[3rem] border border-white/20 animate-pulse pointer-events-none" />
            </div>

            {/* Orbiting Tech Accents - ORBITAL DRAG */}
            <OrbitalBadge
              baseAngle={baseAngle}
              offsetAngle={Math.PI} // 180 degrees offset (Left side)
              isDragging={isDragging}
              onPointerDown={createDragHandler(Math.PI)}
            >
              <div className="w-14 h-14 rounded-full bg-background/80 backdrop-blur-md border border-primary/50 shadow-[0_0_20px_color-mix(in_oklch,var(--primary)_50%,transparent)] flex items-center justify-center">
                <Code2 className="w-7 h-7 text-primary" />
              </div>
            </OrbitalBadge>

            <OrbitalBadge
              baseAngle={baseAngle}
              offsetAngle={0} // 0 degrees offset (Right side)
              isDragging={isDragging}
              onPointerDown={createDragHandler(0)}
            >
              <div className="w-14 h-14 rounded-full bg-background/80 backdrop-blur-md border border-accent/50 shadow-[0_0_20px_color-mix(in_oklch,var(--accent)_50%,transparent)] flex items-center justify-center">
                <Rocket className="w-7 h-7 text-accent" />
              </div>
            </OrbitalBadge>
          </motion.figure>
        </div>

        {/* RIGHT COLUMN: Description & Stats */}
        <motion.div
          style={{ opacity: opacityFade }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex-1 flex flex-col items-center lg:items-end text-center lg:text-right order-3"
        >
          <div className="bg-background/40 backdrop-blur-xl p-6 rounded-2xl border border-border/50 shadow-xl max-w-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent" />
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("hero.description")}
            </p>
          </div>

          <dl className="mt-8 flex flex-wrap justify-center lg:justify-end gap-6 text-sm font-mono text-muted-foreground m-0 p-0">
            <div className="flex flex-col items-center lg:items-end gap-1">
              <dt className="text-2xl font-bold text-foreground">1+</dt>
              <dd className="m-0">{t("hero.stats.experience")}</dd>
            </div>
            <div className="flex flex-col items-center lg:items-end gap-1">
              <dt className="text-2xl font-bold text-foreground">6+</dt>
              <dd className="m-0">{t("hero.stats.projects")}</dd>
            </div>
            <div className="flex flex-col items-center lg:items-end gap-1">
              <dt className="text-2xl font-bold text-primary">100%</dt>
              <dd className="m-0">{t("hero.stats.dedication")}</dd>
            </div>
          </dl>
        </motion.div>

      </div>
    </section>
  )
}
