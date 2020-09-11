import React from "react";
import ModulePainter from "./ModulePainter";

const distortion = (props) => {
  const { instrument, init, handleValues, knobColor, storeEffectState } = props;

  const distParameters = [
    {
      shortName: "dist",
      parameters: ["distortion", instrument],
      minMax: [1, 100],
      ticks: 0,
      initValue: init.distortion * 100,
    },
    {
      shortName: "wet",
      parameters: ["wet", instrument],
      minMax: [0, 100],
      ticks: 0,
      initValue: init.wet * 100,
    },
  ];

  return (
    <ModulePainter
      parameters={distParameters}
      handleValues={handleValues}
      name={"distortion"}
      knobColor={knobColor}
      storeEffectState={storeEffectState}
    />
  );
};

export default distortion;
