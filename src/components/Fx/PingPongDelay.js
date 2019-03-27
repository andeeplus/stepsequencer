import React from 'react';
import ModulePainter from './ModulePainter'

const PingPongDelay = (props) => {

  const {instrument, init, handleValues, color} = props

  const pingPongParameters = [
    { 
      shortName: 'time',
      parameters: ['delayTime', instrument],
      minMax: [0,100],
      ticks: 0,
      initValue: init.delayTime
    },
    {
      shortName: 'feed',
      parameters: ['feedback', instrument],
      minMax: [0,100],
      ticks: 10,
      initValue: init.feedback
    },
    {
      shortName: 'wet',
      parameters: ['wet', instrument],
      minMax: [0,100],
      ticks: 10,
      initValue: init.wet
    }
  ]
    return (
      <ModulePainter parameters={pingPongParameters} handleValues={handleValues} name={'pp-delay'} color={color}/>
    )
};

export default PingPongDelay;

