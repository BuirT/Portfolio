import { memo, useEffect, useRef } from "react"
import { useTheme } from "./ThemeProvider"

export const ParticleBackground = memo(function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    if (!ctx) return

    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)

    // --- Color Palettes ---
    const C = {
      grid: isDark ? "rgba(30, 200, 130, 0.05)" : "rgba(15, 100, 65, 0.15)",
      radarSweep: isDark ? "30, 220, 140" : "15, 110, 70",
      radarLine: isDark ? "rgba(50, 255, 160, 0.35)" : "rgba(20, 150, 80, 0.5)",
      blip: isDark ? "50, 255, 160" : "20, 150, 80",
      targetFlash: isDark ? "#FFFFFF" : "#FF0000",
      targetWarning: isDark ? "255, 80, 80" : "200, 20, 20",
      targetCenter: isDark ? "255, 60, 60" : "220, 20, 20",
      targetDistance: isDark ? "255, 180, 180" : "180, 20, 20",
      targetRingWhite: isDark ? "255,255,255" : "0,0,0",
      crosshairGreen: isDark ? "50, 255, 160" : "20, 150, 80",
      crosshairRed: isDark ? "255, 80, 80" : "220, 20, 20",
      bulletSpark: isDark ? "255, 220, 80" : "200, 150, 20",
      bulletCore: isDark ? "255, 240, 100" : "220, 180, 20",
      explosions: isDark 
        ? ["#FF4444", "#FF8800", "#FFDD00", "#FF6622", "#FFAAAA"]
        : ["#CC0000", "#DD5500", "#AA8800", "#CC3300", "#880000"]
    }

    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight

    let mouse = { x: W / 2, y: H / 2 }
    let radarAngle = 0
    let score = 0 // Biến lưu điểm số

    // ─── BULLETS ───────────────────────────────────────────────
    type Bullet = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }
    const bullets: Bullet[] = []

    // ─── TARGETS (Bulls-eye) ───────────────────────────────────
    type Target = {
      x: number; y: number
      radius: number       // outer ring radius
      life: number         // 0→1 alive, counts down
      maxLife: number
      pulse: number        // oscillation phase
      hit: boolean         // marked for explosion
      hitTimer: number     // explosion countdown
    }
    const targets: Target[] = []
    const MAX_TARGETS = 5

    // ─── EXPLOSIONS ────────────────────────────────────────────
    type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string }
    const particles: Particle[] = []

    const spawnTarget = () => {
      if (targets.length >= MAX_TARGETS) return
      const margin = 80
      targets.push({
        x: margin + Math.random() * (W - margin * 2),
        y: margin + Math.random() * (H - margin * 2),
        radius: 28 + Math.random() * 20,
        life: 1,
        maxLife: 300 + Math.random() * 200, // frames alive
        pulse: Math.random() * Math.PI * 2,
        hit: false,
        hitTimer: 0,
      })
    }

    const explodeTarget = (t: Target) => {
      const count = 24
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3
        const speed = 2 + Math.random() * 5
        particles.push({
          x: t.x, y: t.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0.8 + Math.random() * 0.5,
          color: C.explosions[Math.floor(Math.random() * C.explosions.length)],
        })
      }
    }

    // ─── RADAR BLIPS ───────────────────────────────────────────
    type Blip = { x: number; y: number; life: number }
    const blips: Blip[] = []
    const MAX_BLIPS = 30

    const spawnBlip = (x: number, y: number) => {
      if (blips.length < MAX_BLIPS) blips.push({ x, y, life: 1 })
    }

    // Spawn targets and ambient blips
    const ambientInterval = setInterval(() => {
      spawnBlip(Math.random() * W, Math.random() * H)
    }, 600)

    const targetInterval = setInterval(() => {
      spawnTarget()
    }, 2500)

    // Spawn a couple immediately
    spawnTarget(); spawnTarget()

    // ─── DRAW BULLS-EYE TARGET ─────────────────────────────────
    const drawTarget = (t: Target) => {
      const { x, y, radius, life, pulse, hit, hitTimer } = t
      if (hit) {
        // Flash on hit
        const flash = hitTimer / 18
        ctx.globalAlpha = flash
        ctx.beginPath(); ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = C.targetFlash; ctx.fill()
        ctx.globalAlpha = 1
        return
      }

      const pulseMod = 1 + Math.sin(pulse) * 0.06  // subtle breathing
      const r = radius * pulseMod
      const alpha = Math.min(life * 1.5, 0.85)

      // Outer warning ring (blinks as life decreases)
      if (life < 0.3) {
        const blink = Math.sin(pulse * 8) > 0 ? 0.5 : 0.1
        ctx.strokeStyle = `rgba(${C.targetWarning}, ${blink})`
        ctx.lineWidth = 2
        ctx.beginPath(); ctx.arc(x, y, r + 10, 0, Math.PI * 2); ctx.stroke()
      }

      // Rings — Red/White bulls-eye pattern
      const rings = [
        { r: r, color: `rgba(${C.targetWarning}, ${alpha * 0.25})`, stroke: `rgba(${C.targetWarning}, ${alpha})` },
        { r: r * 0.7, color: `rgba(${C.targetRingWhite}, ${alpha * 0.15})`, stroke: `rgba(${C.targetRingWhite}, ${alpha * 0.7})` },
        { r: r * 0.45, color: `rgba(${C.targetWarning}, ${alpha * 0.3})`, stroke: `rgba(${C.targetWarning}, ${alpha})` },
        { r: r * 0.22, color: `rgba(${C.targetRingWhite}, ${alpha * 0.2})`, stroke: `rgba(${C.targetRingWhite}, ${alpha})` },
      ]
      for (const ring of rings) {
        ctx.beginPath(); ctx.arc(x, y, ring.r, 0, Math.PI * 2)
        ctx.fillStyle = ring.color; ctx.fill()
        ctx.lineWidth = 1.5; ctx.strokeStyle = ring.stroke; ctx.stroke()
      }

      // Bullseye center dot
      ctx.beginPath(); ctx.arc(x, y, r * 0.08, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${C.targetCenter}, ${alpha})`; ctx.fill()

      // Crosshair lines across target
      ctx.strokeStyle = `rgba(${C.targetWarning}, ${alpha * 0.5})`
      ctx.lineWidth = 0.8
      ctx.setLineDash([3, 3])
      ctx.beginPath(); ctx.moveTo(x - r, y); ctx.lineTo(x + r, y); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x, y + r); ctx.stroke()
      ctx.setLineDash([])

      // Distance label
      ctx.fillStyle = `rgba(${C.targetDistance}, ${alpha * 0.8})`
      ctx.font = `bold 9px monospace`
      ctx.textAlign = "center"
      ctx.fillText(`${Math.floor(Math.hypot(x - mouse.x, y - mouse.y))}m`, x, y - r - 6)
    }

    // ─── RENDER LOOP ───────────────────────────────────────────
    let animId = requestAnimationFrame(tick)

    function tick() {
      animId = requestAnimationFrame(tick)
      radarAngle += 0.008

      ctx.clearRect(0, 0, W, H)

      // ── Grid ────────────────────────────────────────────────
      ctx.strokeStyle = C.grid
      ctx.lineWidth = 0.5
      const GRID = 80
      for (let x = 0; x < W; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // ── Radar ───────────────────────────────────────────────
      const cx = W * 0.5, cy = H * 0.5
      const radarR = Math.min(W, H) * 0.45

      ctx.strokeStyle = C.grid
      ctx.lineWidth = 1
      for (let r = radarR / 4; r <= radarR; r += radarR / 4) {
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke()
      }

      const sweepLen = Math.PI * 0.6
      for (let i = 0; i < 30; i++) {
        const angle = radarAngle - (i / 30) * sweepLen
        const alpha = (1 - i / 30) * (isDark ? 0.07 : 0.15)
        ctx.strokeStyle = `rgba(${C.radarSweep}, ${alpha})`
        ctx.lineWidth = radarR / 15
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + Math.cos(angle) * radarR, cy + Math.sin(angle) * radarR)
        ctx.stroke()
      }
      ctx.strokeStyle = C.radarLine
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(radarAngle) * radarR, cy + Math.sin(radarAngle) * radarR)
      ctx.stroke()

      // Radar blips
      for (let i = blips.length - 1; i >= 0; i--) {
        const b = blips[i]
        b.life -= 0.007
        if (b.life <= 0 || Math.hypot(b.x - cx, b.y - cy) > radarR) { blips.splice(i, 1); continue }
        ctx.beginPath(); ctx.arc(b.x, b.y, 3 * b.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${C.blip}, ${b.life * 0.7})`; ctx.fill()
      }
      for (let i = 0; i < 2; i++) {
        const angle = radarAngle - (i / 2) * 0.1
        const r = Math.random() * radarR
        if (Math.random() < 0.04) spawnBlip(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r)
      }

      // ── TARGETS ─────────────────────────────────────────────
      for (let i = targets.length - 1; i >= 0; i--) {
        const t = targets[i]
        t.pulse += 0.06

        if (t.hit) {
          t.hitTimer -= 1
          if (t.hitTimer <= 0) { targets.splice(i, 1); continue }
          drawTarget(t)
          continue
        }

        // Count down life (decrements per frame ratio of maxLife)
        t.life -= 1 / t.maxLife
        if (t.life <= 0) { targets.splice(i, 1); continue }

        // ── Bullet collision detection ──────────────────────────
        for (let j = bullets.length - 1; j >= 0; j--) {
          const bul = bullets[j]
          if (Math.hypot(bul.x - t.x, bul.y - t.y) < t.radius) {
            // HIT!
            if (!t.hit) score += 100; // Cộng 100 điểm cho mỗi lần bắn trúng
            t.hit = true
            t.hitTimer = 18
            explodeTarget(t)
            bullets.splice(j, 1)
            spawnBlip(t.x, t.y)
            break
          }
        }

        drawTarget(t)
      }

      // ── Explosion particles ──────────────────────────────────
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy
        p.vx *= 0.94; p.vy *= 0.94
        p.life -= 0.025
        if (p.life <= 0) { particles.splice(i, 1); continue }
        ctx.globalAlpha = p.life
        ctx.beginPath(); ctx.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2)
        ctx.fillStyle = p.color; ctx.fill()
        // Spark trail
        ctx.beginPath(); ctx.moveTo(p.x - p.vx * 3, p.y - p.vy * 3); ctx.lineTo(p.x, p.y)
        ctx.strokeStyle = p.color; ctx.lineWidth = 1.5 * p.life; ctx.stroke()
        ctx.globalAlpha = 1
      }

      // ── Crosshair ───────────────────────────────────────────
      const ch = 18, gap = 6
      // Check if aiming near a target
      const aiming = targets.find(t => !t.hit && Math.hypot(mouse.x - t.x, mouse.y - t.y) < t.radius + 15)
      const hairColor = aiming ? `rgba(${C.crosshairRed}, 0.9)` : `rgba(${C.crosshairGreen}, 0.9)`
      const hairGlow = aiming ? `rgba(${C.crosshairRed}, 0.3)` : `rgba(${C.crosshairGreen}, 0.2)`

      ctx.strokeStyle = hairColor; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y - gap); ctx.lineTo(mouse.x, mouse.y - ch - gap); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y + gap); ctx.lineTo(mouse.x, mouse.y + ch + gap); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(mouse.x - gap, mouse.y); ctx.lineTo(mouse.x - ch - gap, mouse.y); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(mouse.x + gap, mouse.y); ctx.lineTo(mouse.x + ch + gap, mouse.y); ctx.stroke()
      ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = hairColor; ctx.fill()
      ctx.beginPath(); ctx.arc(mouse.x, mouse.y, ch * 1.1, 0, Math.PI * 2)
      ctx.strokeStyle = hairGlow; ctx.stroke()

      // "LOCKED" label when aiming at target
      if (aiming) {
        ctx.fillStyle = `rgba(${C.targetCenter}, 0.9)`
        ctx.font = "bold 10px monospace"
        ctx.textAlign = "center"
        ctx.fillText("◆ LOCKED ◆", mouse.x, mouse.y - ch - 14)
      }

      // ── Bullet trails ───────────────────────────────────────
      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i]
        b.x += b.vx; b.y += b.vy
        b.life -= 1
        if (b.life <= 0 || b.x < 0 || b.x > W || b.y < 0 || b.y > H) {
          bullets.splice(i, 1); continue
        }
        const t = b.life / b.maxLife
        ctx.beginPath()
        ctx.moveTo(b.x - b.vx * 8, b.y - b.vy * 8)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(${C.bulletSpark}, ${t * 0.8})`
        ctx.lineWidth = 2 * t; ctx.stroke()
        ctx.beginPath(); ctx.arc(b.x, b.y, 3 * t, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${C.bulletCore}, ${t})`; ctx.fill()
      }

      // ── Draw Score ───────────────────────────────────────
      ctx.fillStyle = `rgba(${C.crosshairGreen}, 0.9)`;
      ctx.font = "bold 24px monospace";
      ctx.textAlign = "right";
      ctx.fillText(`SCORE: ${score.toString().padStart(5, '0')}`, W - 40, 60);
    }

    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }

    const onMouseDown = (e: MouseEvent) => {
      const dirs = 8
      for (let i = 0; i < dirs; i++) {
        const angle = (i / dirs) * Math.PI * 2
        const speed = 6 + Math.random() * 4
        bullets.push({ x: e.clientX, y: e.clientY, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 60, maxLife: 60 })
      }
      spawnBlip(e.clientX, e.clientY)
    }

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(ambientInterval)
      clearInterval(targetInterval)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("resize", onResize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  )
})
