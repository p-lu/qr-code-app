import React from "react";

import styles from "./Hue.module.css";

function Hue({ hue, setHue }) {
  const ref = React.useRef();
  const [position, setPosition] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);

  React.useEffect(() => {
    const width = ref.current.getBoundingClientRect().width;
    const hue = Math.round((position / width) * 360);
    setHue(hue);
  }, [position, setHue]);

  React.useEffect(() => {
    const onMove = (clientX) => {
      if (!dragging || !ref.current) return;

      let x = clientX;
      const hueBar = ref.current.getBoundingClientRect();
      x = Math.max(hueBar.left, Math.min(x, hueBar.right));
      x -= hueBar.left;
      setPosition(x);
    };
    const onMouseMove = (e) => {
      onMove(e.clientX);
      e.preventDefault();
    };
    const onTouchMove = (e) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      onMove(touch.clientX);
      e.preventDefault();
    };

    const onEnd = (e) => {
      setDragging(false);
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
  }, [dragging]);

  const handleStart = (clientX) => {
    setPosition(clientX - ref.current.getBoundingClientRect().left);
    setDragging(true);
  };

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    handleStart(e.clientX);
    e.preventDefault();
  };

  const onTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    handleStart(e.touches[0].clientX);
    e.preventDefault();
  };

  return (
    <div
      className={styles.hue}
      ref={ref}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <button
        className={styles.pointer}
        style={{ left: position, backgroundColor: `hsl(${hue},100%,50%)` }}
      />
    </div>
  );
}

export default Hue;
