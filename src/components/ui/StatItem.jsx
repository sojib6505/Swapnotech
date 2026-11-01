import { useEffect, useRef, useState } from "react";

const statsData = [
  {
    id: 1,
    value: 100,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    id: 2,
    value: 150,
    suffix: "+",
    label: "Projects Delivered",
  },
  {
    id: 3,
    value: 20,
    suffix: "+",
    label: "Services Offered",
  },
];

function StatItem({ stat, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setCount(stat.value);
      return;
    }

    const duration = 1400;
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (startTime === undefined) {
        startTime = timestamp;
      }

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setCount(Math.round(easedProgress * stat.value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, stat.value]);

  return (
    <div className="group min-w-0">
      <div className="flex items-baseline gap-0.5">
        <span className="text-xl font-extrabold tracking-tight text-[#18181B] transition-colors duration-300 sm:text-2xl lg:text-3xl">
          {count}
        </span>

        <span className="text-lg font-bold text-[#F97316] sm:text-xl">
          {stat.suffix}
        </span>
      </div>

      <p className="mt-1 text-[10px] font-medium leading-4 text-zinc-500 transition-colors duration-300 group-hover:text-[#18181B] sm:text-xs">
        {stat.label}
      </p>

      <span
        aria-hidden="true"
        className="mt-2 block h-0.5 w-5 rounded-full bg-[#F97316]/60 transition-all duration-300 group-hover:w-8 group-hover:bg-[#F97316]"
      />
    </div>
  );
}

export default function HeroStats() {
  const statsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = statsRef.current;

    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={statsRef}
      aria-label="Swapno Tech business metrics"
      className="w-full bg-transparent"
    >
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {statsData.map((stat) => (
          <StatItem
            key={stat.id}
            stat={stat}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
}