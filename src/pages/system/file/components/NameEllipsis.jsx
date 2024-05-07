import { useRef } from "react";
import useContentOverflow from "@/hooks/useContentOverflow";

export default function ContentOverflowDetector({ text, ...rest }) {
  const containerRef = useRef(null);

  const { isOverflowX } = useContentOverflow(containerRef);

  return (
    <div
      ref={containerRef}
      className="ellipsis"
      {...rest}
      title={isOverflowX ? text : undefined}
    >
      {text}
    </div>
  );
}
