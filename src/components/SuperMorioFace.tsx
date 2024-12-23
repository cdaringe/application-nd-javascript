"use client";

import React, { useState } from "react";

const SuperMorioFace: React.FC<{ id?: string }> = ({ id }) => {
  const [nosePosition, setNosePosition] = useState({ x: 150, y: 150 });
  const [mustachePosition, setMustachePosition] = useState({ x: 150, y: 180 });
  const [chinPosition, setChinPosition] = useState({ x: 150, y: 220 });
  const [hatPosition, setHatPosition] = useState({ x: 150, y: 50 });
  const [dragging, setDragging] = useState<string | null>(null);

  const handleMouseDown = (part: string) => () => {
    setDragging(part);
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    if (!dragging) return;

    const svg = e.currentTarget;
    const point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
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
    }
  };

  return (
    <div>
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Hat */}
        <rect
          x={hatPosition.x - 50}
          y={hatPosition.y}
          width="100"
          height="30"
          fill="red"
          onMouseDown={handleMouseDown("hat")}
          style={{ cursor: "move" }}
        />

        {/* Face */}
        <circle cx="150" cy="150" r="100" fill="#ffdbac" />

        {/* Eyes */}
        <circle cx="120" cy="120" r="10" fill="black" />
        <circle cx="180" cy="120" r="10" fill="black" />

        {/* Nose */}
        <circle
          cx={nosePosition.x}
          cy={nosePosition.y}
          r="15"
          fill="#ffb6c1"
          onMouseDown={handleMouseDown("nose")}
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
          style={{ cursor: "move" }}
        />

        {/* Chin */}
        <path
          d={`M ${chinPosition.x - 40} ${chinPosition.y} Q ${chinPosition.x} ${chinPosition.y + 20} ${chinPosition.x + 40} ${chinPosition.y}`}
          fill="none"
          stroke="black"
          strokeWidth="2"
          onMouseDown={handleMouseDown("chin")}
          style={{ cursor: "move" }}
        />
      </svg>
    </div>
  );
};

export default SuperMorioFace;
