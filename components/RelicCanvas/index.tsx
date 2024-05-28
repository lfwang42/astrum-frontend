"use client";
import { useEffect, useRef } from "react";
type CanvasProps = {
  backgroundImage: string;
};

export const RelicCanvas: React.FC<CanvasProps> = ({ backgroundImage }) => {
  // console.log(backgroundImage)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWidth = 50;
  const canvasHeight = 50;
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = backgroundImage;
    img.width = 115
    img.height = 115
    img.onload = () => {
      //Our first draw
      context!.drawImage(img, -10, 0, img.width * 0.8, img.height * 0.8);
    };
  }, [canvasRef, backgroundImage]);
  return <canvas className="" width={90} height={90} ref={canvasRef}></canvas>;
};
