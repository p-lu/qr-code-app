import React from "react";

import styles from "./ControlPanel.module.css";

import QRCode from "qrcode";
import Card from "../Card/Card";

function ControlPanel({ canvasRef }) {
  const ERROR_CORRECTION_OPTIONS = ["Low", "Medium", "Quartile", "High"];

  const [message, setMessage] = React.useState("Something");
  const [width, setWidth] = React.useState(500);
  const [colour, setColour] = React.useState("#000000");
  const [errorCorrection, setErrorCorrection] = React.useState(
    ERROR_CORRECTION_OPTIONS[0]
  );

  const generateQRCode = () => {
    QRCode.toCanvas(canvasRef.current, message, {
      width: width,
      errorCorrectionLevel: errorCorrection,
      color: { dark: colour },
    });
  };

  React.useEffect(generateQRCode, [
    canvasRef,
    width,
    colour,
    message,
    errorCorrection,
  ]);

  return (
    <Card>
      <div className={styles.controlPanelWrapper}>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="content">
            Content
          </label>
          <textarea
            className={styles.textArea}
            id="content"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="width">
            Width
          </label>
          <input
            className={styles.slider}
            id="width"
            type="range"
            min={1}
            max={500}
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            onDoubleClick={() => {
              setWidth(250);
            }}
          />
          <span>{width}</span>
        </div>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="colour">
            Colour
          </label>
          <input
            id="colour"
            className={styles.colourPicker}
            type="color"
            value={colour}
            onChange={(e) => {
              setColour(e.target.value);
            }}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Error Correction Level</div>
          <ul className={styles.errorCorrectionRadioList}>
            {ERROR_CORRECTION_OPTIONS.map((option) => {
              const id = `err-correction-${option}`;
              return (
                <div className={styles.errorCorrectionRadioButton}>
                  <input
                    className={styles.errorCorrectionRadio}
                    id={id}
                    type="radio"
                    name="errorCorrection"
                    value={option}
                    checked={option === errorCorrection}
                    onChange={(e) => setErrorCorrection(e.target.value)}
                  />
                  <label
                    className={styles.errorCorrectionRadioLabel}
                    key={id}
                    htmlFor={id}
                  >
                    {option}
                  </label>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </Card>
  );
}

export default ControlPanel;
