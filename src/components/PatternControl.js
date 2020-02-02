import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Save, Pencil} from '../components/tools/svgCreator'

import { FlexContainer } from '../styles'
import { InputStyle, ActionButton } from './styles/PatternControl.styles'
import { SAVE_PATTERN, CHANGE_PATTERN_NAME } from '../store/actions/sequencerActions'


export const PatternControl = () => {

	const actualPattern = useSelector(store => store.sequencer.sequence)
	const patternName = useSelector(state => state.sequencer.patternName)
	const index = useSelector(state => state.sequencer.index)

	const [isEdit, setEdit] = useState(false)
	const [newName, setNewName] = useState(patternName)

	useEffect(() => {
		setNewName(patternName)
	}, [patternName]);
	
	const now = new Date() 
	const timestamp = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()

	const patternToSave = {...actualPattern, name: patternName, timestamp, index}

	const dispatch = useDispatch()
	const savePattern = () => dispatch({type: SAVE_PATTERN, patternToSave})
	const changePatternName = () => dispatch({type: CHANGE_PATTERN_NAME, patternName: newName})

	const keyPressed = (event) => {
		if (event.key === "Enter") changePatternName(newName) && setEdit(false)
	}

	return(
		<FlexContainer column>
			<InputStyle as='input' 
				disabled={!isEdit} 
				onChange={(e) => setNewName(e.target.value)}
				value={newName}
				onKeyPress={keyPressed}
				/>
			<FlexContainer justifyContent='center'>
				<ActionButton icon={Save} editing={isEdit} onClick={isEdit ? changePatternName : savePattern} />
				<ActionButton icon={Pencil} onClick={() => setEdit(!isEdit)} />
			</FlexContainer>
		</FlexContainer>
	)
}
