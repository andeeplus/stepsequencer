import styled from 'styled-components'
import imgMetal from '../../assets/img_metal.jpeg'

const TextLightInset = styled.p`
  text-align: center;
  margin: 0;
  font-size: 12px;
  background-color: #565656;
  color: black;
  width: 2rem;
  text-shadow: 1px 2px 10px rgb(184, 212, 212);
  -webkit-background-clip: text;
     -moz-background-clip: text;
          background-clip: text;
`

const IndividualSeqActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const StepButton = styled.div`
  width: 25px;
  height: 25px;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 4px;
  box-shadow: ${props => !props.isActive ? '3px 6px 12px rgb(163,177,198,0.6), -5px -5px 14px rgba(255,255,255, 0.5)' : 'inset 3px 6px 12px rgb(163,177,198,0.6), -5px -5px 14px rgba(255,255,255, 0.5)'};
  //background-image: linear-gradient(315deg, ${props => props.isActive ? '#bfe7d3c9' : '#2f435360'} 0%, #d2ccc460 74%), url(${imgMetal});
  transition: all .2s ease-out;
  background-color: ${props => props.isActive ? '#E0E5EC' : '#E0E5EC'};
  //box-shadow: 7px 7px 12px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5);
`


const SquareButton = styled.div`
    margin: 5px; 
    color: white;
    background-color: black;
    width: 12px; 
    height: 12px;
    border-radius: 50%;
    font-size: 8px;
    line-height: 12px;
    display: flex;
    justify-content: center;
    align-items: initial;
    outline: none;
    &:hover {
      background-color: red;
      color: #f5f578;
    }
    &:active {
      background-color: orange;
      color: #f5f578;
    }
`


export { StepButton, TextLightInset, IndividualSeqActions, SquareButton }