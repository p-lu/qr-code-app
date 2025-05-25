import React from "react";

import styles from "./Saturation.module.css";

function Saturation({ setSaturation, hue }) {
  const ref = React.useRef();
  const [dragging, setDragging] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const boundingRect = ref.current.getBoundingClientRect();
    const { x, y } = position;
    const s = Math.floor(((x + 1) / boundingRect.width) * 100);
    const v = Math.ceil(
      ((boundingRect.height - (y + 1)) / boundingRect.height) * 100
    );
    setSaturation({ s, v });
  }, [position, setSaturation]);

  React.useEffect(() => {
    const onEnd = (e) => {
      setDragging(false);
      e.preventDefault();
    };

    const onMove = (clientX, clientY) => {
      if (!dragging || !ref.current) return;
      const boundingRect = ref.current.getBoundingClientRect();

      // Clamp within bounds
      let x = Math.max(
        boundingRect.left,
        Math.min(clientX, boundingRect.right)
      );
      let y = Math.max(
        boundingRect.top,
        Math.min(clientY, boundingRect.bottom)
      );

      // Adjust to local coordinates
      x -= boundingRect.left;
      y -= boundingRect.top;

      setPosition({ x, y });
    };

    const onMouseMove = (e) => {
      onMove(e.clientX, e.clientY);
      e.preventDefault();
    };

    const onTouchMove = (e) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      onMove(touch.clientX, touch.clientY);
      e.preventDefault();
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onEnd);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onEnd);
    };
  }, [ref, dragging, setPosition]);

  const handleStart = (clientX, clientY) => {
    const boundingRect = ref.current.getBoundingClientRect();
    const x = clientX - boundingRect.left;
    const y = clientY - boundingRect.top;
    setPosition({ x, y });
    setDragging(true);
  };

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    handleStart(e.clientX, e.clientY);
    e.preventDefault();
  };

  const onTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      className={styles.saturation}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        background: `linear-gradient(to top, #000, rgba(0, 0, 0, 0)), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`,
      }}
    >
      <button
        className={styles.pointer}
        style={{ position: "absolute", left: position.x, top: position.y }}
      />
    </div>
  );
}

export default Saturation;
