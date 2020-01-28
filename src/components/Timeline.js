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
    background-color: ${({theme, isActive}) => isActive ? theme.colors.mustard100 : theme.colors.grey100 };
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, 
        ${({theme, isActive}) => isActive ? theme.colors.mustard100 : theme.colors.grey100 } 0 2px 12px;
}
`

const Timeline = ({steps, indexSeq}) => 
<FlexContainer width='100%' justifyContent='flex-start'>
    <FlexContainer width='91%'>
    {steps.map((step, i) => 
        <LedBox key={i}>
            <LedColor 
                isActive={i === indexSeq} 
            ></LedColor>
        </LedBox>
    )}
    </FlexContainer>
</FlexContainer>

export { Timeline }