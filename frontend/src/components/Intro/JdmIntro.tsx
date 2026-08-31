import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import r34Neon from "../../assets/r34-neon.jpg"

interface JdmIntroProps {
  onFinish: () => void
}

export function JdmIntro({ onFinish }: JdmIntroProps) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    // Fast Cut Timing
    const t1 = setTimeout(() => setStage(1), 200) // Flash 1: SYSTEM
    const t2 = setTimeout(() => setStage(2), 350) // Flash 2: R-34
    const t3 = setTimeout(() => setStage(3), 500) // Flash 3: ENGINE
    const t4 = setTimeout(() => setStage(4), 650) // Flash 4: ENGAGE
    const t5 = setTimeout(() => setStage(5), 800) // Black screen tension
    const t6 = setTimeout(() => setStage(6), 1100) // IMPACT: Taillights + Skyline
    const t7 = setTimeout(() => setStage(7), 1800) // Logo slams in
    const t8 = setTimeout(() => setStage(8), 3800) // Blade cut exit
    const t9 = setTimeout(() => onFinish(), 4500) // Finish

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
      clearTimeout(t6)
      clearTimeout(t7)
      clearTimeout(t8)
      clearTimeout(t9)
    }
  }, [onFinish])

  return (
    <AnimatePresence>
      {stage < 9 && (
        <motion.div
          key="intro-container"
          initial={{ opacity: 1 }}
          animate={
            stage === 8
              ? { scaleY: 0, opacity: 0 } // Blade cut exit
              : { scaleY: 1, opacity: 1 }
          }
          transition={{ duration: 0.6, ease: [0.8, 0, 0.2, 1] }} // Sharp ease for the cut
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020304] overflow-hidden pointer-events-auto origin-center"
        >
          {/* CRT Noise Overlay */}
          <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-30">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPgogIDwvZmlsdGVyPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZUZpbHRlcikiLz4KPC9zdmc+')] mix-blend-overlay" />
          </div>

          {/* STAGES 1-4: FAST CUT TYPOGRAPHY */}
          {stage >= 1 && stage < 5 && (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black">
              {stage === 1 && <h1 className="text-white text-[15vw] font-black uppercase tracking-tighter">SYSTEM</h1>}
              {stage === 2 && <h1 className="text-transparent text-[20vw] font-black uppercase tracking-tighter stroke-[#00f0ff] mix-blend-screen" style={{ WebkitTextStroke: "4px #00f0ff" }}>[CODE]</h1>}
              {stage === 3 && <h1 className="text-white text-[15vw] font-black uppercase tracking-tighter bg-white text-black px-8">DEPLOY</h1>}
              {stage === 4 && <h1 className="text-[#ff003c] text-[25vw] font-black uppercase tracking-widest blur-[2px]">BuirT</h1>}
            </div>
          )}

          {/* STAGE 6+: MAIN IMPACT SEQUENCE */}
          {stage >= 6 && (
            <motion.div
              initial={{ x: -10, y: 10 }}
              animate={{ x: [10, -10, 5, -5, 0], y: [-10, 10, -5, 5, 0] }} // Screen shake on impact
              transition={{ duration: 0.4 }}
              className="relative z-10 flex flex-col items-center justify-center w-full h-full"
            >

              {/* Massive Background Neon Chinese Characters */}
              <motion.div
                initial={{ opacity: 1, scale: 1.2 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute flex items-center justify-center select-none pointer-events-none"
              >
                <h1
                  className="text-transparent text-[30vw] font-black tracking-widest stroke-[#00f0ff]"
                  style={{
                    WebkitTextStroke: "2px #00f0ff",
                    textShadow: "0 0 100px rgba(0, 240, 255, 0.8)"
                  }}
                >
                  BUIRT
                </h1>
              </motion.div>

              {/* High Quality Neon R34 Image */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)", scale: 0.8 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                className="flex flex-col items-center justify-center mb-8 z-20 relative w-[280px] sm:w-[400px]"
              >
                <img 
                  src={r34Neon} 
                  alt="Nissan Skyline R34 Neon" 
                  className="w-full h-auto object-contain mix-blend-screen drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  style={{
                    maskImage: "radial-gradient(circle at center, black 50%, transparent 80%)",
                    WebkitMaskImage: "radial-gradient(circle at center, black 50%, transparent 80%)"
                  }}
                />
              </motion.div>

              {/* Logo Slams In */}
              {stage >= 7 && (
                <motion.div
                  initial={{ opacity: 0, scale: 3, y: 50, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
                  className="relative z-30 flex flex-col items-center"
                >
                  <div className="flex gap-4 sm:gap-6 items-center mb-6 w-full justify-center">
                    <span className="h-[2px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#00f0ff] to-[#00f0ff]" />
                    <span className="text-white font-black text-xs sm:text-sm tracking-[0.3em] uppercase bg-[#00f0ff] px-2 py-1 text-black">SYS.READY</span>
                    <span className="h-[2px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-[#00f0ff] to-[#00f0ff]" />
                  </div>

                  <h1 className="text-white text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.2em] uppercase relative z-10 drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]">
                    PORTFOLIO
                  </h1>
                  
                  {/* Glitch Aberration */}
                  <motion.h1 
                    initial={{ x: -10, opacity: 1 }}
                    animate={{ x: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#ff003c] text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.2em] uppercase absolute inset-0 z-0 mix-blend-screen -ml-2 top-10"
                  >
                    PORTFOLIO
                  </motion.h1>
                  <motion.h1 
                    initial={{ x: 10, opacity: 1 }}
                    animate={{ x: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#00f0ff] text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.2em] uppercase absolute inset-0 z-0 mix-blend-screen ml-2 top-10"
                  >
                    PORTFOLIO
                  </motion.h1>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
