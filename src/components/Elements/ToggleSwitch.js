import React from 'react';
import styled from 'styled-components'

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  background: ${({theme, disabled}) => disabled ? theme.colors.red[7] : theme.colors.yellow[9]};
  &:checked + ${CheckBoxLabel} {
    background: ${({theme, disabled}) => disabled ? theme.colors.gray[8] : theme.colors.yellow[7]};
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;


export const ToggleSwitch = ({onChange, disabled}) => {
  return (
    <CheckBoxWrapper>
      <CheckBox id="checkbox" type="checkbox" onChange={onChange} disabled={disabled} />
      <CheckBoxLabel htmlFor="checkbox" disabled={disabled}/>
    </CheckBoxWrapper>

  );
}