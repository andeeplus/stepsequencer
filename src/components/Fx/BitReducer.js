import React from "react";
import ModulePainter from "./ModulePainter";
import { MultiToggle } from "../Elements";

const BitReducer = ({
  instrument,
  init,
  handleValues,
  knobColor,
  ...props
}) => {
  const bitReducer = {
      shortName: "bits",
      parameters: ["bits", instrument],
      minMax: [1, 8],
      steps: [8, 7, 6, 5, 4, 3, 2, 1],
      initValue: init.bits,
    }


  const main = [
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
      parameters={main}
      handleValues={handleValues}
      name={"bitReducer"}
      knobColor={knobColor}
      {...props}
    >
      <MultiToggle
        parameters={bitReducer}
        handleValues={handleValues}
        steps={[8, 7, 6, 5, 4, 3, 2, 1]}
        perRow={4}
        name={'bitReducer'}
        paramName="bits"
      />
    </ModulePainter>
  );
};

export default BitReducer;
