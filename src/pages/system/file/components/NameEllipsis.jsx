import { useRef } from "react";
import useContentOverflow from "@/hooks/useContentOverflow";

export default function ContentOverflowDetector({ text, ...rest }) {
  const containerRef = useRef(null);

  const [isOverflow] = useContentOverflow(containerRef);

  return (
    <div
      ref={containerRef}
      className="ellipsis"
      {...rest}
      title={isOverflow ? text : undefined}
    >
      {text}
    </div>
  );
}
