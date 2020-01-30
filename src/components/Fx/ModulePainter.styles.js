import styled from 'styled-components'
import { ControlStation } from '../styles/DrumMachine.styles'

const ControlArea = styled(ControlStation)`
    //background: ${props => props.moduleColor};
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
    box-shadow: 0px 0px 12px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5);
`

export {
    ControlArea,
    LabelName
}