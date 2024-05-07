import { useRef } from "react";
import useContentOverflowDom from "@/hooks/useContentOverflowDom";

export default function ContentOverflowDetector({ text, ...rest }) {
  const containerRef = useRef(null);

  const [isOverflow] = useContentOverflowDom(containerRef);

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
