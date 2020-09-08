import React from 'react';

import Knob from '../Knob'
import {ControlArea, LabelName} from './ModulePainter.styles'
import { Box } from 'ui';


const ModulePainter = ({name, multiToggle, parameters, knobColor, handleValues, moduleColor, toggleSwitch}) => {
    return (
        <ControlArea moduleColor={moduleColor} column>
        <LabelName>{name.toUpperCase()}</LabelName>  
            <Box flexWrap='wrap' justifyContent ='space-evenly'> 
                { parameters.map((param,i) => (
                    <Knob 
                        key={i}
                        size={20} 
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
            </Box>
        </ControlArea>
    );
};

export default ModulePainter;