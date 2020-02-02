import React from 'react'
import styled from 'styled-components'

import { PatternButton } from './PatternSelector.styles' 
import { FlexContainer } from '../../styles/index'

const PlayButtonStyled = styled(PatternButton)`
    margin: 16px; 
    padding: 7px 0; 
    width: 110px; 
    height: 30px;
    outline: none;
    color: ${({theme}) => theme.colors.text};
`

const ControlStation = styled(FlexContainer)`
    margin: 6px;
    margin-bottom: 32px;
    align-items: center;
    padding: 8px 4px;
    border-radius: 4px 4px 16px;
    justify-content: flex-start;
    width: ${props => props.width ? props.width : '130px'};
    height: fit-content;
    background-color:${({theme}) => theme.colors.main};
    box-shadow: ${({theme}) => theme.shadows.large};
    transition: all .4s ease-out;
`

const ToggleDiv = styled.div`
    position: absolute;
    left: 16px;
    top: 0;
`

const PlayButton = (props) => (
    <FlexContainer>
      <PlayButtonStyled {...props}/>
    </FlexContainer>
)

export {
    PlayButton,
    ControlStation,
    ToggleDiv
}