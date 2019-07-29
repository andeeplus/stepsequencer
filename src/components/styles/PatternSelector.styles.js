import styled from 'styled-components'

import { StepButton } from './SamplerChannel.style' 

let PatternBlock = styled.div`
  width: 120px;
`

let PatternSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
`

let PatternButton = styled(StepButton)`
  flex: 1 0 20%; 
  margin: 5px;
  width: 30px;
  height: 30px;
  line-height: 14px;
  &:hover{
    background-color: #f59542;
  }
  &:active{
    background-color: #eff598;
  }
  & p {
    margin: 6px;
    background-color: #6e1414;
    color: transparent;
    text-align: center;
    text-shadow: 1px 2px 10px rgb(125, 151, 151);
    -webkit-background-clip: text;
       -moz-background-clip: text;
            background-clip: text;
  }
`
export { 
  PatternBlock,
  PatternSelect,
  PatternButton
}