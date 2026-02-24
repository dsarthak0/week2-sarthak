import React, { useEffect, useRef } from "react";

interface PriceItem {
  symbol: string;
  price: string;
  change: string;
}

interface PriceTickerProps {
  prices: PriceItem[];
  speed?: number; // pixels per frame
}

const PriceTicker: React.FC<PriceTickerProps> = ({ prices, speed = 1 }) => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef<number>(0);
  const pausedRef = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    const ticker = tickerRef.current;
    if (!container || !ticker) return;

    // Clear any previous content
    ticker.innerHTML = "";

    // Duplicate items for seamless scroll
    const allItems = [...prices, ...prices];
    allItems.forEach((item) => {
      const span = document.createElement("span");
      span.textContent = `${item.symbol} ${item.price} ${item.change}`;
      span.style.display = "inline-block";
      span.style.marginRight = "50px";
      span.style.fontWeight = "bold";
      span.style.fontFamily = "sans-serif";
      span.style.color = item.change.includes("▲") ? "green" : "red";
      ticker.appendChild(span);
    });

    // Pause on hover
    container.addEventListener("mouseenter", () => (pausedRef.current = true));
    container.addEventListener("mouseleave", () => (pausedRef.current = false));

    // Animation
    const animate = () => {
      if (!pausedRef.current) {
        offsetRef.current -= speed;
        if (Math.abs(offsetRef.current) >= ticker.offsetWidth / 2) {
          offsetRef.current = 0; // reset
        }
        ticker.style.transform = `translateX(${offsetRef.current}px)`;
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, [prices, speed]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        overflow: "hidden",
        border: "1px solid #ddd",
        background: "#f7f7f7",
        whiteSpace: "nowrap",
        padding: "10px 0",
        boxSizing: "border-box",
      }}
    >
      <div ref={tickerRef}></div>
    </div>
  );
};

export default PriceTicker;