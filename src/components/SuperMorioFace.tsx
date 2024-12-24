/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import React, { useState } from "react";

const SuperMorioFace: React.FC = () => {
  const [nosePosition, setNosePosition] = useState({ x: 150, y: 150 });
  const [mustachePosition, setMustachePosition] = useState({ x: 150, y: 180 });
  const [chinPosition, setChinPosition] = useState({ x: 150, y: 220 });
  const [hatPosition, setHatPosition] = useState({ x: 150, y: 50 });
  const [dragging, setDragging] = useState<string | null>(null);
  const [facePosition, setFacePosition] = useState({ x: 150, y: 150 });
  const [leftEyePosition, setLeftEyePosition] = useState({ x: -30, y: -30 }); // relative to face
  const [rightEyePosition, setRightEyePosition] = useState({ x: 30, y: -30 }); // relative to face

  const handleMouseDown =
    (part: string) => (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault(); // Prevent scrolling on touch
      setDragging(part);
    };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleMouseMove = (
    e: React.MouseEvent<SVGElement> | React.TouchEvent<SVGElement>
  ) => {
    if (!dragging) return;

    const svg = e.currentTarget;
    // @ts-ignore
    const point = svg.createSVGPoint();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    point.x = clientX;
    point.y = clientY;
    // @ts-ignore
    const cursorPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());

    switch (dragging) {
      case "nose":
        setNosePosition({ x: cursorPoint.x, y: cursorPoint.y });
        break;
      case "mustache":
        setMustachePosition({ x: cursorPoint.x, y: cursorPoint.y });
        break;
      case "chin":
        setChinPosition({ x: cursorPoint.x, y: cursorPoint.y });
        break;
      case "hat":
        setHatPosition({ x: cursorPoint.x, y: cursorPoint.y });
        break;
      case "face":
        setFacePosition({ x: cursorPoint.x, y: cursorPoint.y });
        break;
      case "leftEye":
        setLeftEyePosition({
          x: cursorPoint.x - facePosition.x,
          y: cursorPoint.y - facePosition.y,
        });
        break;
      case "rightEye":
        setRightEyePosition({
          x: cursorPoint.x - facePosition.x,
          y: cursorPoint.y - facePosition.y,
        });
        break;
    }
  };

  return (
    <div>
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Face */}
        <circle
          cx={facePosition.x}
          cy={facePosition.y}
          r="100"
          fill="#ffdbac"
          onMouseDown={handleMouseDown("face")}
          onTouchStart={handleMouseDown("face")}
          style={{ cursor: "move" }}
        />

        {/* Eyes */}
        <circle
          cx={facePosition.x + leftEyePosition.x}
          cy={facePosition.y + leftEyePosition.y}
          r="10"
          fill="black"
          onMouseDown={handleMouseDown("leftEye")}
          onTouchStart={handleMouseDown("leftEye")}
          style={{ cursor: "move" }}
        />
        <circle
          cx={facePosition.x + rightEyePosition.x}
          cy={facePosition.y + rightEyePosition.y}
          r="10"
          fill="black"
          onMouseDown={handleMouseDown("rightEye")}
          onTouchStart={handleMouseDown("rightEye")}
          style={{ cursor: "move" }}
        />

        {/* Nose */}
        <circle
          cx={nosePosition.x}
          cy={nosePosition.y}
          r="15"
          fill="#ffb6c1"
          onMouseDown={handleMouseDown("nose")}
          onTouchStart={handleMouseDown("nose")}
          style={{ cursor: "move" }}
        />

        {/* Mustache */}
        <rect
          x={mustachePosition.x - 40}
          y={mustachePosition.y}
          width="80"
          height="10"
          fill="brown"
          onMouseDown={handleMouseDown("mustache")}
          onTouchStart={handleMouseDown("mustache")}
          style={{ cursor: "move" }}
        />

        {/* Chin */}
        <path
          d={`M ${chinPosition.x - 40} ${chinPosition.y} Q ${chinPosition.x} ${chinPosition.y + 20} ${chinPosition.x + 40} ${chinPosition.y}`}
          fill="none"
          stroke="black"
          strokeWidth="2"
          onMouseDown={handleMouseDown("chin")}
          onTouchStart={handleMouseDown("chin")}
          style={{ cursor: "move" }}
        />

        {/* Hat - moved to end for top layer */}
        <rect
          x={hatPosition.x - 50}
          y={hatPosition.y}
          width="100"
          height="30"
          fill="red"
          onMouseDown={handleMouseDown("hat")}
          onTouchStart={handleMouseDown("hat")}
          style={{ cursor: "move" }}
        />
      </svg>
    </div>
  );
};

export default SuperMorioFace;
