import React, { useState } from 'react'
import styled from 'styled-components'

import { PatternButton } from '../styles/PatternSelector.styles'
import { LabelName } from '../Fx/ModulePainter.styles'
import { FlexContainer } from '../../styles';

const ToggleButton = styled(PatternButton)`
    width:${props => `${props.size}px`};
    height:${props => `${props.size}px`};
    border: ${props => props.isActive ? '2px outset darkgrey' : '2px outset #ffe6e6;'};
    box-shadow: ${props => !props.isActive ? '1px 3px 5px #000' : 'inset 4px 3px 5px #000'};
    background: ${props => props.isActive ? '#ed8f37' : 'lightgrey' };
    p{
        margin: 2px;
        font-size: ${props => props.isActive ? '12px' : '12px'};
    }
`

export const MultiToggle = ({parameters, steps, perRow, handleValues, name, size = 20}) => {

    const [isActive, setActive] = useState(5)

    const action = (value, parameters, index) => {
        handleValues(value, parameters)
        setActive(index)
    }

    let maxWidth = size * steps.length
    let rows = steps.length / perRow

    let width = (maxWidth/rows) + (size * 2)
    
    return(
        <FlexContainer column  alignItems='center'>
        <LabelName>{name.toUpperCase()}</LabelName>
        <FlexContainer width={`${width}px`} flexWrap='wrap'>
            {parameters.map( (parameter, i) => parameter.steps.map((p, index) => 
                <FlexContainer 
                    key={i + index} 
                    flex={`0 1 ${100 / perRow}%`} 
                    alignItems='center' 
                    justifyContent='center'
                >
                    <ToggleButton
                        key={`${parameter.value}-ToggleButton`}
                        size={size}
                        perRow={perRow}
                        onClick={() => action(steps[index], parameters[i].parameters, index)}
                        isActive={isActive === index}
                    >
                        <p>{index + 1}</p>
                    </ToggleButton>
                </FlexContainer>
                ))
            }
        </FlexContainer>
        </FlexContainer>
    )
}