import React from "react";

import styles from "./ColourPicker.module.css";
import { hsvToRgb, rgbToHex } from "./colourUtils";
import Saturation from "./Saturation";
import Hue from "./Hue/Hue";

function ColourPicker({ setColour }) {
  const [saturation, setSaturation] = React.useState({ s: 0, v: 0 });
  const [hue, setHue] = React.useState(0);

  React.useEffect(() => {
    const { s, v } = saturation;
    const h = hue;
    const rgb = hsvToRgb(h, s, v);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setColour(hex);
  }, [saturation, hue, setColour]);

  return (
    <div className={styles.colourPicker}>
      <Saturation setSaturation={setSaturation} hue={hue} />
      <Hue hue={hue} setHue={setHue} />
    </div>
  );
}

export default ColourPicker;
