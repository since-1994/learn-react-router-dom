import React from "react";
import { ColorConsumer } from "../contexts/color";

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

const SelectColors = () => {
  return (
    <div>
      <h2>색상을 선택하세요.</h2>
      <ColorConsumer>
        {({ actions }) => {
          return (
            <div
              style={{
                display: "flex",
              }}
            >
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => actions.setColor(color)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    actions.setSubcolor(color);
                  }}
                  style={{
                    background: color,
                    width: "24px",
                    height: "24px",
                  }}
                />
              ))}
            </div>
          );
        }}
      </ColorConsumer>
    </div>
  );
};

export default SelectColors;
