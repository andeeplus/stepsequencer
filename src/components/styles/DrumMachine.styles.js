import React from 'react'
import styled from 'styled-components'

import { PatternButton } from './PatternSelector.styles' 
import { FlexContainer } from '../../styles/index'
import imgMetal from '../../assets/img_metal.jpeg'

const PlayButtonStyled = styled(PatternButton)`
    margin: 16px; 
    padding: 7px 0; 
    width: 110px; 
    height: 30px;
    outline: none;
`

const ControlStation = styled(FlexContainer)`
    margin: 6px;
    align-items: center;
    padding: 8px 4px;
    border-radius: 4px 4px 16px;
    box-shadow: 1px 3px 5px #000;
    justify-content: flex-start;
    width: ${props => props.width ? props.width : '130px'};
    height: fit-content;
    //background-color: #2f4353;
    //background-image: linear-gradient(315deg, #2f435390 0%, #d2ccc490 74%), url(${imgMetal});

    background-color:#E0E5EC;
    box-shadow: 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5);
`

const PlayButton = (props) => (
    <FlexContainer>
      <PlayButtonStyled {...props}/>
    </FlexContainer>
)

export {
    PlayButton,
    ControlStation
}