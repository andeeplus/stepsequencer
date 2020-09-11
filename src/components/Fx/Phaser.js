import React from 'react'
import ModulePainter from './ModulePainter'

const Phaser = ({
      instrument,
      init,
      handleValues,
      knobColor,
      storeEffectState,
      ...props
    }) => {

    const phaserParameters = [
      {
        shortName: "freq",
        parameters: ["frequency", instrument],
        minMax: [0, 30],
        ticks: 30,
        initValue: init.frequency,
      },
      {
        shortName: "oct",
        parameters: ["octaves", instrument],
        minMax: [0, 5],
        ticks: 5,
        initValue: init.octaves,
      },
      {
        shortName: "stages",
        parameters: ["stages", instrument],
        minMax: [0, 12],
        ticks: 12,
        initValue: init.stages,
      },
      {
        shortName: "Q",
        parameters: ["Q", instrument],
        minMax: [0, 100],
        ticks: 0,
        initValue: init.Q * 100,
      },
      {
        shortName: "bfreq",
        parameters: ["baseFrequency", instrument],
        minMax: [0, 10000],
        ticks: 0,
        initValue: init.baseFrequency,
      },
      {
        shortName: "wet",
        parameters: ["wet", instrument],
        minMax: [0, 100],
        ticks: 0,
        initValue: init.wet * 100,
        wet: 0,
      },
    ];


    return (
      <ModulePainter
        parameters={phaserParameters}
        handleValues={handleValues}
        name={"phaser"}
        knobColor={knobColor}
        storeEffectState={storeEffectState}
      />
    );
}

export default Phaser