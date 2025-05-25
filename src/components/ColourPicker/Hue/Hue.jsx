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
    const onMouseMove = (e) => {
      if (!dragging || !ref.current) return;
      e.stopPropagation();
      e.preventDefault();

      let x = e.clientX;
      const hueBar = ref.current.getBoundingClientRect();
      x = Math.max(hueBar.left, Math.min(x, hueBar.right));
      x -= hueBar.left;
      setPosition(x);
    };
    const onMouseUp = (e) => {
      setDragging(false);
      e.stopPropagation();
      e.preventDefault();
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging]);

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    setPosition(e.clientX - ref.current.getBoundingClientRect().left);
    setDragging(true);
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div className={styles.hue} ref={ref} onMouseDown={onMouseDown}>
      <button
        className={styles.pointer}
        style={{ left: position, backgroundColor: `hsl(${hue},100%,50%)` }}
      />
    </div>
  );
}

export default Hue;
