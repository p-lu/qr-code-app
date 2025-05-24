import React from "react";

import styles from "./Saturation.module.css";

function Saturation({ ref, position, setPosition, hue }) {
  const [dragging, setDragging] = React.useState(false);

  React.useEffect(() => {
    const onMouseUp = (e) => {
      setDragging(false);
      e.stopPropagation();
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      if (!dragging || !ref.current) return;

      const { parentElement, offsetParent, offsetWidth, offsetHeight } =
        ref.current;
      const parentRect = parentElement.getBoundingClientRect();
      const offsetParentRect = offsetParent.getBoundingClientRect();
      const elemWidth = offsetWidth || 1;
      const elemHeight = offsetHeight || 1;

      let x = e.clientX;
      let y = e.clientY;

      // Clamp within parent bounds
      x = Math.max(parentRect.left, Math.min(x, parentRect.right - elemWidth));
      y = Math.max(parentRect.top, Math.min(y, parentRect.bottom - elemHeight));

      // Adjust for offsetParent
      x -= offsetParentRect.left;
      y -= offsetParentRect.top;

      setPosition({ x, y });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [ref, dragging, setPosition]);

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    var pos = ref.current.parentElement.getBoundingClientRect();
    const rel = {
      x: e.clientX - pos.left,
      y: e.clientY - pos.top,
    };
    setPosition(rel);
    setDragging(true);
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      className={styles.saturation}
      onMouseDown={onMouseDown}
      style={{
        background: `linear-gradient(to top, #000, rgba(0, 0, 0, 0)), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`,
      }}
    >
      <div
        ref={ref}
        style={{ position: "absolute", left: position.x, top: position.y }}
      >
        <button className={styles.pointer} />
      </div>
    </div>
  );
}

export default Saturation;
