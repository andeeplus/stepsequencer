import React, {useState,useEffect} from 'react';

import Knob from '../Knob'
import {ControlArea, LabelName} from './ModulePainter.styles'
import { FlexContainer } from '../../styles';
import Toggle from '../Elements/Toggle/Toggle'


const ModulePainter = ({name, multiToggle, parameters, knobColor, handleValues, moduleColor, powerFX}) => {

    const [on, setOn] = useState(true)

    return (
        <ControlArea moduleColor={moduleColor} column>
        <Toggle onToggle={
            () => {
                setOn(!on)
                powerFX({fx: name.toUpperCase(), value: on ? 'ADD' : 'REMOVE'})
            }}
            />
        <LabelName>{name.toUpperCase()}</LabelName>  
            <FlexContainer flexWrap='wrap' justifyContent ='space-evenly'> 
                { parameters.map((param,i) => (
                    <Knob 
                        key={i}
                        size={25} 
                        numTicks={param.ticks} 
                        min={param.minMax[0]} 
                        max={param.minMax[1]} 
                        value={param.initValue} 
                        color={knobColor ? knobColor : 'darkgrey'} 
                        onChange={handleValues} 
                        typeValue={param.parameters}
                        >
                        {param.shortName}
                    </Knob>
                    )
                    )
                }
                {multiToggle && multiToggle}
            </FlexContainer>
        </ControlArea>
    );
};

export default ModulePainter;