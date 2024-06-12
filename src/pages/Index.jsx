import React, { useRef, useEffect, useState } from "react";
import { Box, Button, VStack, HStack } from "@chakra-ui/react";
import { FaEraser, FaPaintBrush } from "react-icons/fa";

const colors = ["#D40920", "#1356A2", "#F7D842", "#000000", "#FFFFFF"];

const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current.getContext("2d");
    context.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <Box width="100vw" height="100vh" position="relative">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ border: "1px solid #000" }}
      />
      <VStack position="absolute" top={4} left={4} spacing={2}>
        {colors.map((c) => (
          <Button
            key={c}
            backgroundColor={c}
            width="40px"
            height="40px"
            onClick={() => setColor(c)}
          />
        ))}
        <Button onClick={clearCanvas} leftIcon={<FaEraser />}>
          Clear
        </Button>
      </VStack>
    </Box>
  );
};

export default Index;