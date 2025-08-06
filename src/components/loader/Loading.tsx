import "./Loading.css";
// import Prototypes from "prop-types";
import * as React from "react";

interface LoadingProps {
  color?: string ;
  escala?: number | string;
}

export default function Loading({ color = "#ffffff", escala = "1" }: LoadingProps) {
  return (
    // <div
    //   className="dot-spinner"
    //   style={{
    //     ["--uib-color" as any]: color,
    //     transform: `scale(${escala})`,
    //   }}
    // >
    //   <div className="dot-spinner__dot"></div>
    //   <div className="dot-spinner__dot"></div>
    //   <div className="dot-spinner__dot"></div>
    //   <div className="dot-spinner__dot"></div>
    //   <div className="dot-spinner__dot"></div>
    //   <div className="dot-spinner__dot"></div>
    //   <div className="dot-spinner__dot"></div>
    //   <div className="dot-spinner__dot"></div>
    // </div>

    <div className="loader"></div>

  );
}
