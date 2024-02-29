import * as React from "react";
import { useCarousel } from "../hooks/useCarousel";

export interface IAppProps {}

export default function TestPage(props: IAppProps) {
  const { width, ref, onBack, onNext } = useCarousel({
    slideToShow: 4,
    slideToScroll: 1,
    behavior: "smooth",
    gap: 10,
  });
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        className="back"
        onClick={onBack}
        style={{
          position: "absolute",
          background: "green",
          top: "50%",
          left: 0,
          width: "10px",
          height: "10px",
          transform: "translateY(-50%)",
        }}
      ></div>
      <div
        className="next"
        onClick={onNext}
        style={{
          position: "absolute",
          background: "green",
          top: "50%",
          right: 0,
          width: "10px",
          height: "10px",
          transform: "translateY(-50%)",
        }}
      ></div>
      <div ref={ref} style={{ display: "flex", gap: 10, overflowX: "hidden" }}>
        <div
          style={{
            width: width,
            height: "100px",
            background: "blue",
            flexShrink: 0,
          }}
        ></div>
        <div
          style={{
            width: width,
            height: "100px",
            background: "red",
            flexShrink: 0,
          }}
        ></div>
        <div
          style={{
            width: width,
            height: "100px",
            background: "blue",
            flexShrink: 0,
          }}
        ></div>
        <div
          style={{
            width: width,
            height: "100px",
            background: "red",
            flexShrink: 0,
          }}
        ></div>
        <div
          style={{
            width: width,
            height: "100px",
            background: "blue",
            flexShrink: 0,
          }}
        ></div>
        <div
          style={{
            width: width,
            height: "100px",
            background: "red",
            flexShrink: 0,
          }}
        ></div>
        <div
          style={{
            width: width,
            height: "100px",
            background: "blue",
            flexShrink: 0,
          }}
        ></div>
        <div
          style={{
            width: width,
            height: "100px",
            background: "red",
            flexShrink: 0,
          }}
        ></div>
      </div>
    </div>
  );
}
