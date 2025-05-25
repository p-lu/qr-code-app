import React from "react";

import styles from "./ColourPicker.module.css";
import { hsvToRgb, rgbToHex } from "./colourUtils";
import Saturation from "./Saturation";
import Hue from "./Hue/Hue";

function ColourPicker() {
  const [rgb, setRgb] = React.useState({ r: 0, g: 0, b: 0 });
  const [saturation, setSaturation] = React.useState({ s: 0, v: 0 });
  const [hue, setHue] = React.useState(0);

  React.useEffect(() => {
    const { s, v } = saturation;
    const h = hue;
    setRgb(hsvToRgb(h, s, v));
  }, [saturation, hue]);

  return (
    <div>
      {`RGB: ${JSON.stringify(rgb)}`}
      <br />
      {`HEX: ${rgbToHex(rgb.r, rgb.g, rgb.b)}`}
      <div
        className={styles.swatch}
        style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
      />
      <Saturation setSaturation={setSaturation} hue={hue} />
      <Hue hue={hue} setHue={setHue} />
    </div>
  );
}

export default ColourPicker;
