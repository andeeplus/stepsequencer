import styled from 'styled-components'
import imgMetal from '../../assets/img_metal.jpeg'

const FullKnob = styled.div`
  display:flex;
  flex-direction: column;
  width: 30px;
  height: 60px;
  margin: 15px;
  margin-bottom: 5px;
  justify-content: center;
  align-items: center;
`

const KnobBase = styled.div `
  display: flex;
  position: relative;
`

const Ticks = styled.div`
  position: absolute;
  top: -1px;
  z-index: 0;
`
const Tick = styled.div`
    position: absolute;
    background: black;
    box-shadow: ${
    props => props.isActive 
      ? 'inset 0 0 5px 2px #deff49, 0 0 0 1px rgb(194, 193, 186)' 
      : 'inset 0 0 0 0 black'};
    width: 3px;
    transition: box-shadow 0.5s;
    z-index: 0;
`

const Outer = styled.div`
  border-radius: 50%;
  border: 1px solid #222;
  box-shadow: 0 5px 15px 2px black, 0 0 5px 3px black, 0 0 0 11px #444;
  z-index: 1;
`
const Inner =styled.div`
  border-radius: 50%;
  background-image: linear-gradient(315deg, #2f435390 0%, #d2ccc490 74%), url(${imgMetal});
`

const Grip = styled.div`
  position: absolute;
  width: 5%;
  height: 5%;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: #509eec;
  box-shadow: 0 0 3px 1px black;
`
const KnobLabel = styled.p`
  text-transform: uppercase;
  border-radius: 4px;
  text-align: center;
  font-size: 9px;
  min-width: 50px;
  background-color: ${props => props.color || 'darkgrey'};
  color: white;    
  margin-top: 16px;
`

export {
    FullKnob,
    KnobBase,
    KnobLabel,
    Ticks,
    Tick,
    Outer,
    Inner,
    Grip
}