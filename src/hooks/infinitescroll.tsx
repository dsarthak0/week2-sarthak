import  { useState, useEffect, useRef, useCallback } from "react";

// 1. Updated Interface to match your generator
export interface Trade {
  id: number;
  Symbol: string;
  Type: "BUY" | "SELL";
  Qty: number;
  Price: string;
  Date: string;
}

// Hook remains mostly the same, but with a small ref safety fix
export function useInfiniteScroll<T>(items: T[], batchSize = 10) {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + batchSize, items.length));
  }, [batchSize, items.length]);

  useEffect(() => {
    const observerTarget = bottomRef.current;
    if (!observerTarget) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    }, { threshold: 0.1 });

    observer.observe(observerTarget);
    return () => observer.unobserve(observerTarget); // Specific cleanup
  }, [loadMore]);

  return {
    visibleItems: items.slice(0, visibleCount),
    bottomRef,
    hasMore: visibleCount < items.length
  };
}

export function TradeLedger({ data }: { data: Trade[] }) {
  const { visibleItems, bottomRef, hasMore } = useInfiniteScroll<Trade>(data, 10);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f8f9fa" }}>
            <th>ID</th><th>Symbol</th><th>Type</th><th>Qty</th><th>Price</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {visibleItems.map((trade) => (
            <tr key={trade.id}>
              <td>{trade.id}</td>
              {/* FIX: Use Capitalized keys to match your Trade interface */}
              <td style={{ fontWeight: "bold" }}>{trade.Symbol}</td>
              <td style={{ color: trade.Type === "BUY" ? "green" : "red" }}>{trade.Type}</td>
              <td>{trade.Qty}</td>
              <td>${trade.Price}</td>
              <td>{trade.Date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* The Sentinel Element */}
      <div ref={bottomRef} style={{ padding: "40px", textAlign: "center" }}>
        {hasMore ? "Loading more..." : "All 50 trades loaded."}
      </div>
    </div>
  );
}