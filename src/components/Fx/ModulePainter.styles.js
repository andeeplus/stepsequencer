import styled from 'styled-components'
import { ControlStation } from '../styles/DrumMachine.styles'

const ControlArea = styled(ControlStation)`
    background: ${props => props.moduleColor};
`

const LabelName = styled.h1`
    text-align: center;
    font-size: 12px;
    margin: 0 0 16px;
    color: black;
    background-color: antiquewhite;
    border-radius: 4px;
    padding: 4px 16px;    
    background-clip: text;
`

export {
    ControlArea,
    LabelName
}