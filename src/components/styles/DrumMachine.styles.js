import React from 'react'
import styled from 'styled-components'

import { PatternButton } from './PatternSelector.styles' 
import { FlexContainer } from '../../styles/index'

const PlayButtonStyled = styled(PatternButton)`
    margin: 20px; 
    padding: 7px 0; 
    width: 110px; 
    height: 30px;
    outline: none;
`

const ControlStation = styled(FlexContainer)`
    margin: 16px 0;
    align-items: center;
    background-color: lightgrey;
    padding: 16px 4px;
    border-radius: 4px 4px 16px;
    box-shadow: 1px 3px 5px #000;
    margin: 16px 16px;
    justify-content: flex-start;
    width: ${props => props.width ? props.width : '136px'};
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