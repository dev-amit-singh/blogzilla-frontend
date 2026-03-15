"use client";

import { useEffect, useRef, useState } from "react";

function cssVarToHex(varName: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();

  if (!value) return 0x000000;

  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return 0x000000;

  ctx.fillStyle = value;
  return parseInt(ctx.fillStyle.replace("#", ""), 16);
}

declare global {
  interface Window {
    VANTA: {
      BIRDS: (options: any) => { destroy: () => void; resize: () => void; setOptions: (opts: any) => void };
    };
    THREE: any;
  }
}

interface VantaBirdsProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  backgroundColor?: number;
  color1?: number;
  color2?: number;
  minHeight?: number;
}

export default function VantaBirds({
  children,
  className = "",
  style = {},
  backgroundColor = 0xffffff,
  color1 = 0x2822a2,
  color2 = 0x3a3b1,
  minHeight = 300,
}: VantaBirdsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [bgColor, setBgColor] = useState(backgroundColor);

  /* 🔹 theme → background only */
  useEffect(() => {
    const updateBg = () => {
      setBgColor(cssVarToHex("--bg-page"));
    };

    updateBg();

    const observer = new MutationObserver(updateBg);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  /* 🔹 Vanta init */
  useEffect(() => {
    // UPDATED: Now checks if the global variable exists, and properly waits for the load event
    const loadScript = (src: string, globalVar: string): Promise<void> =>
      new Promise((resolve, reject) => {
        // If it's already loaded on the window, resolve immediately
        if ((window as any)[globalVar]) {
          resolve();
          return;
        }

        let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;

        if (script) {
          // The script tag exists but hasn't finished loading. Attach to its load event.
          script.addEventListener("load", () => resolve());
          script.addEventListener("error", () => reject());
          return;
        }

        script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.head.appendChild(script);
      });

    const initVanta = async () => {
      try {
        // Pass the global variables we expect so the script loader can check for them
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js", "THREE");
        await loadScript("https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js", "VANTA");

        if (!containerRef.current || !window.VANTA || !window.THREE) return;

        // Clear out the old effect if it exists before making a new one
        if (vantaEffect.current) {
          vantaEffect.current.destroy();
        }

        const isMobile = window.innerWidth < 768;

        vantaEffect.current = window.VANTA.BIRDS({
          el: containerRef.current,
          THREE: window.THREE, // ✅ FIXED: Explicitly handing THREE to Vanta
          mouseControls: !isMobile,
          touchControls: true,
          gyroControls: false,
          scale: isMobile ? 0.7 : 1,
          scaleMobile: 0.7,
          backgroundColor: bgColor, 
          color1,
          color2,
        });

        setIsInitialized(true);
      } catch (err) {
        console.error("Vanta init failed", err);
      }
    };

    initVanta();

    const handleResize = () => vantaEffect.current?.resize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [bgColor, color1, color2]); // Re-runs safely when theme changes now

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-x-hidden ${className}`}
      style={{ minHeight, overflowY: "visible", ...style }}
    >
      {!isInitialized && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "var(--bg-page)", zIndex: 0 }}
        >
          Loading animation…
        </div>
      )}

      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}