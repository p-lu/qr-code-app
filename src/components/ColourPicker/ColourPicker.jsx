import React from "react";

import styles from "./ColourPicker.module.css";
import { hsvToRgb, rgbToHex } from "./colourUtils";
import Saturation from "./Saturation";
import Hue from "./Hue/Hue";

function ColourPicker() {
  const ref = React.useRef();
  const [saturationPos, setSaturationPos] = React.useState({ x: 0, y: 0 });
  const [rgb, setRgb] = React.useState({ r: 0, g: 0, b: 0 });
  const [hue, setHue] = React.useState(0);

  React.useEffect(() => {
    const saturationArea = ref.current.parentElement.getBoundingClientRect();
    const { x, y } = saturationPos;
    const h = hue;
    const s = Math.floor(((x + 1) / saturationArea.width) * 100);
    const v = Math.ceil(
      ((saturationArea.height - (y + 1)) / saturationArea.height) * 100
    );
    setRgb(hsvToRgb(h, s, v));
  }, [saturationPos, hue]);

  return (
    <div>
      {`RGB: ${JSON.stringify(rgb)}`}
      <br />
      {`HEX: ${rgbToHex(rgb.r, rgb.g, rgb.b)}`}
      <div
        className={styles.swatch}
        style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
      />
      <Saturation
        ref={ref}
        position={saturationPos}
        setPosition={setSaturationPos}
        hue={hue}
      />
      <Hue hue={hue} setHue={setHue} />
    </div>
  );
}

export default ColourPicker;
