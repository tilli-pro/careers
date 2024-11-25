"use client";

import { useEffect } from "react";

import Gradient from "./Gradient";

interface GradientProps {
  className?: string;
  id: string;
}
const GradientFC: React.FC<GradientProps> = ({ className, id }) => {
  useEffect(() => {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    const gradient = new Gradient({
      canvas,
      colors: ["#a960ee", "#ff333d", "#90e0ff", "#ffcb57"],
    });

    gradient.init();

    return () => gradient.disconnect();
  }, [id]);

  return (
    <canvas width={1024} height={300} id={id} className={className}></canvas>
  );
};

export default GradientFC;
