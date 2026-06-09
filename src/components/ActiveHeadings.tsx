"use client";

import { useEffect, useState } from "react";

type ActiveHeadingsProps = {
  align?: "start" | "end";
  headings: string[];
};

export function ActiveHeadings({ align = "start", headings }: ActiveHeadingsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % headings.length);
    }, 1800);

    return () => window.clearInterval(intervalId);
  }, [headings.length]);

  return (
    <div
      className={`statistics__content--header ${
        align === "end" ? "statistics__content--header-second" : ""
      }`}
    >
      {headings.map((heading, index) => (
        <div
          className={`statistics__heading ${
            index === activeIndex ? "statistics__heading--active" : ""
          }`}
          key={heading}
        >
          {heading}
        </div>
      ))}
    </div>
  );
}
