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
    const onMouseUp = (e) => {
      setDragging(false);
      e.stopPropagation();
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      if (!dragging || !ref.current) return;
      e.stopPropagation();
      e.preventDefault();

      const boundingRect = ref.current.getBoundingClientRect();

      let x = e.clientX;
      let y = e.clientY;

      // Clamp within bounds
      x = Math.max(boundingRect.left, Math.min(x, boundingRect.right));
      y = Math.max(boundingRect.top, Math.min(y, boundingRect.bottom));

      x -= boundingRect.left;
      y -= boundingRect.top;

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
    const boundingRect = ref.current.getBoundingClientRect();
    const rel = {
      x: e.clientX - boundingRect.left,
      y: e.clientY - boundingRect.top,
    };
    setPosition(rel);
    setDragging(true);
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      className={styles.saturation}
      onMouseDown={onMouseDown}
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
