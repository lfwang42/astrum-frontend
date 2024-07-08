"use client";
import { ReactNode, useEffect, useRef } from "react";
type Props = {
  // children: ReactNode;
  backgroundImage: string;
  className?: string;
};


const canvasHeight = 800
const canvasWidth = 800
const scaling = 2

export default function ImageCanvas({ backgroundImage, className }: Props) {
  console.log(backgroundImage)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  //yoinked this from akasha ngl because working with canvas stuff is actual aids 
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    
    const gradientMask = context!.createLinearGradient(
      canvasWidth - 400,
      0,
      canvasWidth,
      0,
    );
    gradientMask.addColorStop(0, "black");
    gradientMask.addColorStop(1, "transparent");
    
    context!.fillStyle = gradientMask;
    context!.fillRect(0, 0, canvasWidth, canvasHeight);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = backgroundImage;

    img.onload = () => {
      //Our first draw
      const imageWidth = img.width;
      const imageHeight = img.height;
      const scale = Math.max(
        canvasWidth / imageWidth,
        canvasHeight / imageHeight
      );
      console.log(scale)
      const newWidth = imageWidth * scale;
      const newHeight = imageHeight * scale;
  
      let x = canvasWidth  / 2 - newWidth / 2 - 125;
      let y = canvasHeight  / 2 - newHeight / 2 - 65;
      context!.globalCompositeOperation = "source-in";
      context!.drawImage(img, x, y, newWidth, newHeight);
    };
  }, [canvasRef, backgroundImage]);
  return (<canvas className={className ? className : ""} 
    height={canvasHeight * 1.7} 
    width={canvasWidth * 1.7 }
    style={{
      width: canvasWidth,
      height: canvasHeight,
    }}
    ref={canvasRef}></canvas>);
};
