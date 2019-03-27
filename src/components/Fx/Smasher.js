import React from 'react';
import ModulePainter from './ModulePainter'

const Smasher = (props) => {

  const {instrument, init, handleValues, color} = props

  const smasherParameters = [
    { 
      shortName: 'dist',
      parameters: ['distortion', instrument[0]],
      minMax: [1,100],
      ticks: 0,
      initValue: init.distortion
    },
    {
      shortName: 'bits',
      parameters: ['bits', instrument[1]],
      minMax: [1,8],
      ticks: 8,
      initValue: init.bits
    },
    {
      shortName: 'wet',
      parameters: ['wet', instrument[1]],
      minMax: [0,100],
      ticks: 0,
      initValue: init.wet
    }
  ]
    return (
      <ModulePainter parameters={smasherParameters} handleValues={handleValues} name={'smasher'} color={color}/>
    )
};

export default Smasher;