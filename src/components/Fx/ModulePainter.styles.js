import styled from 'styled-components'
import { ControlStation } from '../styles/DrumMachine.styles'

const ControlArea = styled(ControlStation)`
    //background: ${props => props.moduleColor};
`

const LabelName = styled.h1`
    text-align: center;
    font-size: 12px;
    margin: 0 0 16px;
    color: ${({theme}) => theme.colors.text};
    background-color: ${({theme}) => theme.colors.main200};
    border-radius: 4px;
    padding: 4px 16px;    
    background-clip: text;
    box-shadow: ${({theme}) => theme.shadows.small};
    transition: all .4s ease-out;
`

export {
    ControlArea,
    LabelName
}