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
    img.width = 100
    img.height = 100
    img.onload = () => {
      //Our first draw
      context!.drawImage(img, -5, 0, img.width * 0.8, img.height * 0.8);
    };
  }, [canvasRef, backgroundImage]);
  return <canvas className="" width={75} height={75} ref={canvasRef}></canvas>;
};
