import React, { useState, Fragment } from 'react';
import styled from 'styled-components'

const ReactSwitchCheckbox = styled.input.attrs(
  { type: 'checkbox' }
  )`
    height: 0;
    width: 0;
    visibility: hidden;
    & :checked{
      left: calc(100% - 2px);
      transform: translateX(-100%);

    }
`

const ReactSwitchButton = styled.span`
  content: '';
  position: absolute;
  top: 2px;
  left: ${props => props.isOn ? '2' : 'calc(100% - 2px)'};
  width: ${props => props.isOn ? '60px' : '45px'};
  height: 45px;
  border-radius: 45px;
  transition: 0.2s;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  transform: translateX(-100%);
  & :active{
    width: 60px;
  }
`

const ReactSwitchLabel = styled(ReactSwitchButton)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100px;
  height: 50px;
  background: ${props => props.isOn ? '#06D6A0' : 'grey'};
  border-radius: 100px;
  position: relative;
  transition: background-color .2s;
`


const Switch = ({ isOn, handleToggle }) => {
  return (
    <Fragment>
      <ReactSwitchCheckbox
        checked={isOn}
        onChange={() => handleToggle}
      />
      <ReactSwitchLabel
        isOn={isOn}
      >
        <ReactSwitchButton 
        isOn={isOn}
        />
      </ReactSwitchLabel>
    </Fragment>
  );
}

export const ToggleSwitch = ({handleValues}) => {

  const [value, setValue] = useState(false);
  console.log('hola')
  return (
    <div>
      <Switch
        isOn={value}
        console={console.log(value)}
        onChange={() => setValue(!value)}
      />
    </div>
  );
}