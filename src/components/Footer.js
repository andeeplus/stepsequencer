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

const FooterStyled = styled(FlexContainer)`
    font-size: 10px;
    font-weight: 100;
    position: absolute;
    bottom: 0;
    color: white;
    & a {
        font-weight: 400;
        margin-left: 5px;
        color: aquamarine;
    }
`

const Footer = () => 
        <FooterStyled alignItems='center' justifyContent='center' width='100%'>
            <p>made with</p>
            <Rotate>☯</Rotate>
            <p>by</p><a href='https://github.com/andeeplus' rel='noopener noreferrer' target="_blank">@andeeplus</a>
        </FooterStyled>

    
export default Footer