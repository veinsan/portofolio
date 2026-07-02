"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

const LINK_DISTANCE = 130;
const POINTER_RADIUS = 160;

/**
 * Ambient neural-network particle field for the hero.
 * Performance/a11y guardrails:
 *  - prefers-reduced-motion → renders a single static frame, no loop
 *  - pauses when the hero leaves the viewport or the tab is hidden
 *  - node count scales with area and is capped; DPR capped at 2
 *  - pointer interaction only on fine pointers (mouse/trackpad)
 */
export default function NeuralCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let nodes: Node[] = [];
    let raf = 0;
    let running = false;
    let width = 0;
    let height = 0;
    const pointer = { x: -9999, y: -9999 };

    function seed() {
      const target = Math.min(Math.floor((width * height) / 16000), 90);
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.4,
      }));
    }

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reducedMotion) draw(); // static frame stays in sync with size
    }

    function step() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Gentle repulsion around the pointer
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < POINTER_RADIUS && dist > 0.01) {
          const force = ((POINTER_RADIUS - dist) / POINTER_RADIUS) * 0.4;
          n.x += (dx / dist) * force;
          n.y += (dy / dist) * force;
        }
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.16;
            ctx!.strokeStyle = `rgba(129, 140, 248, ${alpha.toFixed(3)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx!.fillStyle = "rgba(165, 180, 252, 0.55)";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop() {
      if (!running) return;
      step();
      draw();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reducedMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    let io: IntersectionObserver | null = null;
    if (reducedMotion) {
      draw();
    } else {
      io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { threshold: 0 }
      );
      io.observe(canvas);
      document.addEventListener("visibilitychange", onVisibility);
      if (finePointer) window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    return () => {
      stop();
      ro.disconnect();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
