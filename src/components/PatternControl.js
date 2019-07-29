import React, {useState} from 'react'
import styled from 'styled-components'
import plus from '../assets/plus.svg'
import save from '../assets/save.svg'
import pencil from '../assets/pencil.svg'

import { FlexContainer } from '../styles'
import { LabelName } from './Fx/ModulePainter.styles'

const Squared = styled.button`
	width: 24px;
	height: 24px;
	background-color: ${props => props.active ? 'mustard' : 'antiquewhite'};
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

export const PatternControl = ({savePattern, changeName, loadPattern, patternName}) => {
	
	const [isEdit, setEdit] = useState(false)
	const [newName, setNewName] = useState()

	return(
		<FlexContainer column>
			<InputStyle as='input' 
				disabled={!isEdit} 
				onChange={(e) => setNewName(e.target.value)}
				value={isEdit ? newName : patternName}
				/>
			<FlexContainer justifyContent='center'>
				<ActionButton icon={save} editing={isEdit} onClick={savePattern} />
				<ActionButton icon={plus} onClick={isEdit ? changeName : loadPattern} />
				<ActionButton icon={pencil} onClick={() => setEdit(!isEdit)} />
			</FlexContainer>
		</FlexContainer>
	)
}
