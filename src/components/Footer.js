import React from 'react'
import { FlexContainer } from '../styles'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Rotate = styled.div`
    display: inline-block;
    animation: ${rotate} 2s linear infinite;
    padding: .25rem;
    font-size:10px;
`

const Paragraph = styled.p`
    font-size: 10px;
    font-weight: 100;
    & a{
        font-weight: 400;
    }
`

const Footer = () => 
    <FlexContainer alignItems='center' justifyContent='center' width='100%'>
        <Paragraph>made with <Rotate>☯</Rotate> by <a href='https://github.com/andeeplus'>@andeeplus</a></Paragraph>
    </FlexContainer>
    
export default Footer