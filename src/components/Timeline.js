import React from 'react'
import { FlexContainer } from '../styles'
import styled from 'styled-components'

const LedBox = styled.div`
    height: 10px;
    width: 25%;
    margin: 10px 0;
    float: left;
`
const LedColor = styled.div`
    margin: 0 auto;
    width: 20px;
    height: 10px;
    background-color: ${({theme, isActive}) => isActive ? theme.colors.mainHover : theme.colors.grey300 };
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset ${({theme, isActive}) => isActive ? theme.colors.grey100 : theme.colors.grey300 } 0 -1px 5px, 
        ${({theme, isActive}) => isActive ? theme.colors.mainHover : theme.colors.white } 0 2px 12px;
    transition: all .25s ease-out;
`

const Timeline = ({steps, indexSeq, isPlaying}) => 
    <FlexContainer width='100%' justifyContent='flex-start'>
        <FlexContainer width='91%'>
        {steps.map((step, i) => 
            <LedBox key={i}>
                <LedColor isActive={isPlaying && i === indexSeq} />
            </LedBox>
        )}
        </FlexContainer>
    </FlexContainer>

export { Timeline }