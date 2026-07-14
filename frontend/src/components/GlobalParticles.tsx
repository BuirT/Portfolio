import { memo, useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export const GlobalParticles = memo(function GlobalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let mouse = { x: -1000, y: -1000 };

    let animId: number;
    let initGrid: (() => void) | null = null;

    // --- HIỆU ỨNG CHUNG: LƯỚI NAM CHÂM (MAGNETIC DOT GRID) ---
    // Một hệ thống lưới các điểm đứng im, chỉ phản ứng (đẩy ra) khi chuột đi qua
    // Hoàn toàn không tự cuộn hay trôi dạt -> Tuyệt đối không gây chóng mặt!
    
    // Đổi màu tùy theo chế độ (Trắng cho Tối, Đen cho Sáng)
    const baseColor = isDark ? "255, 255, 255" : "0, 0, 0"; 

    type GridDot = { baseX: number; baseY: number; x: number; y: number; vx: number; vy: number; };
    let dots: GridDot[] = [];
    const SPACING = 35; // Khoảng cách giữa các hạt lưới (mật độ)

    initGrid = () => {
      dots = [];
      for (let x = 0; x <= W + SPACING; x += SPACING) {
        for (let y = 0; y <= H + SPACING; y += SPACING) {
          dots.push({ baseX: x, baseY: y, x: x, y: y, vx: 0, vy: 0 });
        }
      }
    };
    initGrid();

    function tick() {
      animId = requestAnimationFrame(tick);
      ctx!.clearRect(0, 0, W, H);

      for (const dot of dots) {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.hypot(dx, dy);

        // Nếu chuột ở gần, tạo lực đẩy hạt lưới ra xa
        if (dist < 180) {
          const force = (180 - dist) / 180;
          dot.vx -= (dx / dist) * force * 2.5; // Lực đẩy
          dot.vy -= (dy / dist) * force * 2.5;
        }

        // Lực đàn hồi kéo hạt quay lại vị trí gốc của lưới (Spring physics)
        dot.vx += (dot.baseX - dot.x) * 0.04;
        dot.vy += (dot.baseY - dot.y) * 0.04;
        // Ma sát giúp hạt dừng lại (Damping)
        dot.vx *= 0.8;
        dot.vy *= 0.8;
        
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Vẽ hạt lưới
        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, 2, 0, Math.PI * 2); // Kích thước hạt là 2px
        
        // Những hạt đang đứng im thì mờ 15%, hạt nào bị chuột đẩy thì sáng bừng lên
        const displacement = Math.hypot(dot.x - dot.baseX, dot.y - dot.baseY);
        const alpha = 0.15 + Math.min(0.85, displacement / 15);
        
        ctx!.fillStyle = `rgba(${baseColor}, ${alpha})`;
        ctx!.fill();
      }
    }
    tick();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      // Khởi tạo lại lưới nếu người dùng phóng to thu nhỏ màn hình
      if (initGrid) initGrid();
    };
    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [theme]); // Re-run when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
});