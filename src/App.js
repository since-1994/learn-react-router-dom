import React from "react";
import ColorBox from "./components/ColorBox";
import SelectColors from "./components/SelectColors";
import { ColorProvider } from "./contexts/color";

const App = () => {
  return (
    <ColorProvider>
      <SelectColors />
      <ColorBox />
    </ColorProvider>
  );
};

export default App;
