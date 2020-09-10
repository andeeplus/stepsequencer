import React from "react";
import ModulePainter from "./ModulePainter";

const Distorsion = (props) => {
  const { instrument, init, handleValues, knobColor } = props;

  const smasherParameters = [
    {
      shortName: "dist",
      parameters: ["distortion", instrument],
      minMax: [1, 100],
      ticks: 0,
      initValue: init.distortion,
    },
    {
      shortName: "wet",
      parameters: ["wet", instrument],
      minMax: [0, 100],
      ticks: 0,
      initValue: init.wet,
    },
  ];

  return (
    <ModulePainter
      parameters={smasherParameters}
      handleValues={handleValues}
      name={"dist"}
      knobColor={knobColor}
    />
  );
};

export default Distorsion;
