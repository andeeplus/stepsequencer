import React from "react";
import ModulePainter from "./ModulePainter";

const Reverb = ({
  instrument,
  init,
  handleValues,
  knobColor,
  storeEffectState,
}) => {

  
  const reverb = [
    {
      shortName: "room",
      parameters: ["roomSize", instrument],
      minMax: [0, 100],
      ticks: 10,
      initValue: init.roomSize * 100,
    },
    {
      shortName: "wet",
      parameters: ["wet", instrument],
      minMax: [0, 100],
      initValue: init.wet * 100,
    },
    {
      shortName: "damp",
      parameters: ["dampening", instrument],
      minMax: [0, 10000],
      ticks: 0,
      initValue: init.dampening,
    },
  ];

  return (
    <ModulePainter
      parameters={reverb}
      handleValues={handleValues}
      name={"reverb"}
      knobColor={knobColor}
      storeEffectState={storeEffectState}
    />
  );
};

export default Reverb;
