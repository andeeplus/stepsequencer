import styled from 'styled-components'

import { StepButton } from 'components/styles/SamplerChannel.style' 

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
  width: 22px;
  height: 22px;
  line-height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover{
    background-color: #f5954270;
  }
  &:active{
    background-color: #eff598;
  }
  & p {
    margin: 6px;
    background-color: #6e1414;
    color: ${({theme}) => theme.colors.text};
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