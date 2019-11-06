import React from 'react';
import ModulePainter from './ModulePainter'

const PingPongDelay = (props) => {

    const {instrument, init, handleValues, knobColor, powerFX} = props

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
        <ModulePainter 
            powerFX={powerFX}
            parameters={pingPongParameters} 
            handleValues={handleValues} 
            name={'pp-delay'} 
            knobColor={knobColor}
        />
    )
};

export default PingPongDelay;

