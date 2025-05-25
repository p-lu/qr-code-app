import React from "react";

import styles from "./ColourPicker.module.css";
import { hexToHsv, hsvToHex } from "./colourUtils";
import Saturation from "./Saturation";
import Hue from "./Hue/Hue";

function ColourPicker({ colour, setColour }) {
  const { h, s, v } = hexToHsv(colour);

  const handleSaturationChange = (saturation) => {
    const sat = saturation.s;
    const val = saturation.v;
    setColour(hsvToHex(h, sat, val));
  };
  const handleHueChange = (hue) => {
    setColour(hsvToHex(hue, s, v));
  };

  return (
    <div className={styles.colourPicker}>
      <Saturation
        saturation={{ s, v }}
        setSaturation={handleSaturationChange}
        hue={h}
      />
      <Hue hue={h} setHue={handleHueChange} />
    </div>
  );
}

export default ColourPicker;
