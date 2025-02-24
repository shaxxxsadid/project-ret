// components/AnimatedBackground.tsx
"use client";

import { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";

const AnimatedBackground = () => {
  useEffect(() => {
    const createElements = () => {
      const elements = [];
      // Подбираем цвета из палитры + дополнительные акцентные
      const colors = [
        "white",
        "#BFAAAA",
        "#D9D4BF"
      ];
      

      for (let i = 0; i < 15; i++) {
        const element = document.createElement("div");
        element.style.position = "absolute";
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.width = `${Math.random() * 50 + 20}px`;
        element.style.height = element.style.width;
        element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        element.style.filter = "blur(5px)";
        element.style.borderRadius = "50%";
        element.style.opacity = "0.5";
        element.style.mixBlendMode = "soft-light";
        element.style.opacity = "1"; // Универсальное значение
        element.classList.add("shape");
        elements.push(element);
      }
      return elements;
    };

    const animate = (elements: HTMLDivElement[]) => {
      anime({
        targets: elements,
        translateX: () => anime.random(-150, 150),
        translateY: () => anime.random(-150, 150),
        scale: () => anime.random(0.8, 1.8),
        rotate: () => anime.random(0, 360),
        duration: () => anime.random(3000, 5000),
        delay: () => anime.random(0, 500),
        easing: "easeInOutQuad",
        loop: true,
        direction: "alternate",
      });
    };

    const elements = createElements();
    const container = document.getElementById("animated-bg");
    elements.forEach(el => container?.appendChild(el));
    animate(elements);

    return () => {
      elements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div
      id="animated-bg"
      className="fixed inset-0 -z-10 bg-gradient-to-b from-black via-[#392C26] to-[#F24F1C] transition-defaultTransition"
    />
  );
};

export default AnimatedBackground;
