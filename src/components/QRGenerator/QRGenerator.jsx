import React from "react";

import styles from "./QRGenerator.module.css";
import ControlPanel from "../ControlPanel";
import Card from "../Card";

function QRGenerator() {
  const qrCanvasRef = React.useRef();
  const [xy, setXy] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const onMouseMove = (e) => {
      setXy({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      {`x:${xy.x}, y:${xy.y}`}
      <header className={styles.header}>
        <h1>A Boring QR Code Generator</h1>
      </header>
      <div className={styles.qrGenerator}>
        <ControlPanel canvasRef={qrCanvasRef} />
        <Card>
          <div className={styles.qrWrapper}>
            <canvas className={styles.qrCanvas} ref={qrCanvasRef} />
          </div>
        </Card>
      </div>
    </>
  );
}

export default QRGenerator;
