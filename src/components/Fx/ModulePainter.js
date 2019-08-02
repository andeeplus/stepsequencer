import React from 'react';

import Knob from '../Knob'
import {ControlArea, LabelName} from './ModulePainter.styles'
import { FlexContainer } from '../../styles';


const ModulePainter = ({name, multiToggle, parameters, knobColor, handleValues, moduleColor, toggleSwitch}) => {
    return (
        <ControlArea moduleColor={moduleColor} column>
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