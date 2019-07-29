import React from 'react'
import styled from 'styled-components'
import { LabelName } from '../Fx/ModulePainter.styles'

const Squared = styled.div`
	width: 24px;
	height: 24px;
	background-color: ${props => props.active ? '#ffcc66' : 'antiquewhite'};
	border: ${props => props.active && '2px solid antiquewhite'};
	box-sizing: border-box;
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 4px;
	outline: 0;
`

const ButtonImage = styled.img`
	height: 14px;
`

const InputStyle = styled(LabelName)`
	width: 80px;
`

const ActionButton = ({icon, editing, onClick}) => (
	<Squared active={editing} onClick={onClick}>
		<ButtonImage src={icon} alt='img' />
	</Squared> 
)

export{ InputStyle, ActionButton }