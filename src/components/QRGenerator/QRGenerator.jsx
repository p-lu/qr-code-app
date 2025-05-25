import React from "react";

import styles from "./QRGenerator.module.css";
import ControlPanel from "../ControlPanel";
import Card from "../Card";

function QRGenerator() {
  const qrCanvasRef = React.useRef();

  return (
    <>
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
