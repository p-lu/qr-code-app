import React from "react";

import styles from "./Hue.module.css";

function Hue({ hue, setHue }) {
  const ref = React.useRef();
  const [position, setPosition] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);

  const hueToPosition = (hue) => {
    const width = ref.current.getBoundingClientRect().width;
    return (hue / 360) * width;
  };

  const positionToHue = (pos) => {
    const width = ref.current.getBoundingClientRect().width;
    return Math.round((pos / width) * 360);
  };

  React.useEffect(() => {
    const pos = hueToPosition(hue);
    setPosition(pos);
  }, [hue]);

  React.useEffect(() => {
    const onMove = (clientX) => {
      if (!dragging || !ref.current) return;

      let x = clientX;
      const hueBar = ref.current.getBoundingClientRect();
      x = Math.max(hueBar.left, Math.min(x, hueBar.right));
      x -= hueBar.left;
      const hue = positionToHue(x);
      setHue(hue);
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
  }, [dragging, setHue]);

  const handleStart = (clientX) => {
    const pos = clientX - ref.current.getBoundingClientRect().left;
    const hue = positionToHue(pos);
    setHue(hue);
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
