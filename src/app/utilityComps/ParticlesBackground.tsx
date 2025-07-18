"use client";

import { useEffect } from "react";

export default function ParticlesBackground() {
  useEffect(() => {
    const initParticles = async () => {
      await import("particles.js");

      const container = document.getElementById("particles-js");

      // ✅ Function to update container height to full scroll height
      const resizeContainerHeight = () => {
        if (container) {
          container.style.height = `${document.body.scrollHeight}px`;
        }
      };

      // ✅ Run once initially and also whenever window resizes
      resizeContainerHeight();
      window.addEventListener("resize", resizeContainerHeight);

      // ✅ Also re-run after all content loads (in case layout shifts)
      window.addEventListener("load", resizeContainerHeight);

      // ✅ Initialize particles.js with config
      if (window.particlesJS) {
        window.particlesJS("particles-js", {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: {
              type: "circle",
              stroke: { width: 0, color: "#000000" },
              polygon: { nb_sides: 5 },
              image: { src: "img/github.svg", width: 100, height: 100 },
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
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
            },
          },
          interactivity: {
            detect_on: "canvas",
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

      // ✅ Cleanup on unmount
      return () => {
        window.removeEventListener("resize", resizeContainerHeight);
        window.removeEventListener("load", resizeContainerHeight);
      };
    };

    initParticles();
  }, []);

  return (
    <div
      id="particles-js"
      className="absolute top-0 left-0 w-full -z-10"
      style={{ height: "100%" }} // will be overridden dynamically
    />
  );
}
