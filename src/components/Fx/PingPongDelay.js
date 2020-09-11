import React from 'react';
import { useSelector } from 'react-redux';
import ModulePainter from './ModulePainter'

const PingPongDelay = ({
      instrument,
      init,
      handleValues,
      knobColor,
      storeEffectState,
      ...props
    }) => {
        
    const pingPongParameters = [
      {
        shortName: "time",
        parameters: ["delayTime", instrument],
        minMax: [0, 100],
        ticks: 0,
        initValue: init.delayTime * 100,
      },
      {
        shortName: "feed",
        parameters: ["feedback", instrument],
        minMax: [0, 100],
        ticks: 10,
        initValue: init.feedback * 100,
      },
      {
        shortName: "wet",
        parameters: ["wet", instrument],
        minMax: [0, 100],
        ticks: 10,
        initValue: init.wet * 100,
      },
    ];
    return (
      <ModulePainter
        parameters={pingPongParameters}
        handleValues={handleValues}
        name={"ppDelay"}
        knobColor={knobColor}
        storeEffectState={storeEffectState}
      />
    );
};

export default PingPongDelay;

