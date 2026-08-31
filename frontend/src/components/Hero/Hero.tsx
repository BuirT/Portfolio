import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTranslation } from "react-i18next"

export function Hero() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLElement>(null)

  const [imageIndex, setImageIndex] = useState(0)

  // Simple auto-rotate for avatars
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const images = ["avt.png", "avt1.png", "avt2.png", "avt3.png"].map(img => `${import.meta.env.BASE_URL}images/avatars/${img}`);

  // Parallax Scroll
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
      className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-background py-20 lg:py-0"
    >
      {/* Dynamic Background - JDM Style */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--primary)_15%,transparent)_0%,transparent_60%)] pointer-events-none" />
      {/* Thicker, more pronounced scanlines */}
      <div className="scanlines opacity-40 pointer-events-none" />
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#00f0ff0a_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Large background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-black opacity-5 dark:text-white dark:opacity-[0.03] whitespace-nowrap pointer-events-none select-none z-0 tracking-tighter">
        {t("watermarks.portfolio")}
      </div>

      <div className="w-full px-6 lg:px-12 xl:px-20 max-w-[1920px] relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

        {/* LEFT COLUMN: Greeting & CTA */}
        <motion.header
          style={{ opacity: opacityFade }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
        >
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter text-foreground leading-[1] mb-6 uppercase">
            {t("hero.greeting")}{" "}
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-primary text-stroke-primary">
              BuirT
            </span>
          </h1>
        </motion.header>

        {/* CENTER COLUMN: The Avatar */}
        <div className="flex-[1.2] flex justify-center items-center relative order-1 lg:order-2">
          {/* Intense Glowing Backdrop */}
          <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-primary/20 mix-blend-screen filter blur-[100px] animate-pulse pointer-events-none" />

          <motion.figure
            style={{ y: avatarY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-20 w-[260px] h-[340px] md:w-[320px] md:h-[420px] lg:w-[400px] lg:h-[520px] flex items-center justify-center group m-0"
          >
            {/* Sharp, mechanical frame */}
            <div className="relative w-full h-full border-l-[8px] border-l-primary border-t-[1px] border-r-[1px] border-b-[1px] border-border overflow-hidden bg-card/80 backdrop-blur-sm shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(0,240,255,0.3)] group-hover:-translate-y-2">

              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary z-30" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary z-30" />

              {/* Crossfade Images */}
              {images.map((imgSrc, idx) => (
                <img
                  key={imgSrc}
                  src={imgSrc}
                  alt={`BuirT Avatar ${idx}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${idx === imageIndex ? 'opacity-100 grayscale-[20%]' : 'opacity-0'}`}
                />
              ))}

              {/* Scanline overlay over image */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMCAwTDRgMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] z-20 pointer-events-none opacity-50 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-transparent mix-blend-overlay pointer-events-none z-20" />
            </div>

            {/* Telemetry data accents */}
            <div className="absolute -left-12 top-1/4 font-mono text-[10px] text-primary/70 rotate-90 tracking-widest hidden lg:block">
              SYS.ACTIVE // {new Date().getFullYear()}
            </div>
          </motion.figure>
        </div>

        {/* RIGHT COLUMN: Dashboard Stats */}
        <motion.div
          style={{ opacity: opacityFade }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="flex-1 flex flex-col items-center lg:items-end text-center lg:text-right order-3"
        >
          <div className="bg-card/40 backdrop-blur-md p-6 border-r-[4px] border-primary border-y border-l border-border shadow-2xl max-w-sm relative overflow-hidden group hover:bg-card/60 transition-colors">
            {/* Warning stripe pattern */}
            <div className="absolute top-0 right-0 w-full h-1 bg-[repeating-linear-gradient(45deg,var(--primary),var(--primary)_10px,transparent_10px,transparent_20px)] opacity-50" />
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-mono">
              {t("hero.description")}
            </p>
          </div>

          <dl className="mt-12 flex flex-col gap-6 text-sm font-mono text-muted-foreground w-full max-w-sm">
            {[
              { label: t("hero.stats.experience"), value: "1+", max: "10" },
              { label: t("hero.stats.projects"), value: "6+", max: "20" },
              { label: t("hero.stats.dedication"), value: "100%", max: "100" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-end">
                  <dt className="text-xs uppercase tracking-widest text-primary">{stat.label}</dt>
                  <dd className="text-xl font-black text-foreground">{stat.value}</dd>
                </div>
                {/* Progress bar gauge */}
                <div className="w-full h-1 bg-foreground/10 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(parseInt(stat.value) / parseInt(stat.max)) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.2), ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </dl>
        </motion.div>

      </div>
    </section>
  )
}
