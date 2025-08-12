"use client";

import { ParticlesJSInstance } from "@/types/particles-global";
import { useEffect } from "react";

export default function ParticlesBackground() {
  useEffect(() => {
    let destroyed = false;

    (async () => {
      await import("particles.js");

      // init once the module is in
      if (!destroyed && window.particlesJS) {
        window.particlesJS("particles-js", {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { 
              type: "circle", 
              stroke: { width: 0, color: "#000000" },
              polygon: { nb_sides: 5  },
            },
            opacity: { value: 0.5 },
            size: { value: 5, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 6,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 1200 }
            },
          },
          interactivity: {
  detect_on: "window", // or "canvas"
  events: {
    onhover: { enable: true, mode: "repulse" },
    onclick: { enable: true, mode: "push" },
    resize: true,
  },
  modes: {
    grab: { distance: 400, line_linked: { opacity: 1 } },
    bubble: {
      distance: 400,
      size: 40,
      duration: 2,
      opacity: 8,
      speed: 3,
    },
    repulse: { distance: 200, duration: 0.4 },
    push: { particles_nb: 4 },
    remove: { particles_nb: 2 },
  },
},

          retina_detect: true,
        });
      }
    })();

    return () => {
      destroyed = true;
      // clean up particles.js instance to avoid leaks during HMR/navigation
        const instances = (window.pJSDom ?? []) as ParticlesJSInstance[];
  instances.forEach(p => p.pJS?.fn?.vendors?.destroy?.());
    };
  }, []);

  return (
    <div
      id="particles-js"
      className="
        fixed inset-0 h-screen w-screen
        -z-10 pointer-events-none
      "
    />
  );
}
