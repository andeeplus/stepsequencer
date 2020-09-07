import React from 'components/ActionButton/styles/react'
import styled from 'components/ActionButton/styles/styled-components'
import { LabelName } from '../Fx/ModulePainter.styles'
import { Button } from 'components/ActionButton/styles/ui'

const Squared = styled(Button)`
  width: 24px;
  height: 24px;
  background-color: ${(props) =>
    props.active ? props.theme.colors.main : props.theme.colors.main400};
  box-shadow: ${({ theme }) => theme.shadows.small};
  border: ${(props) =>
    props.active && `2px solid ${props.theme.colors.main400}`};
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 4px;
  outline: 0;
`;


const InputStyle = styled(LabelName)`
	width: 80px;
`

const ActionButton = ({icon, active, onClick, ...props}) => (
	<Squared active={active} onClick={onClick} {...props}>
		{React.createElement(icon, {fill:'text', size: '14'})}
	</Squared> 
)

export{ InputStyle, ActionButton }