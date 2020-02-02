import React from 'react'

import { TextLightInset, IndividualSeqActions, 
  StepButton, SquareButton, SquareButtonLed } from './styles/SamplerChannel.style'
import { FlexContainer } from '../styles/index'


const StepLine = ({ sequence, sound = '  ', updateChannelSequence, indexSeq } ) => sequence &&
    <FlexContainer>
	  { [...Array(16)].map((step, i) => 
        <StepButton 
			id="step" 
			className={sound} 
			key={i} 
			isActive={sequence.includes(i)}
			onClick={() => updateChannelSequence(
				(sequence.includes(i) ? 'REMOVE' : 'ADD'), sound, i)
			} 
		>
			<SquareButtonLed isActive={sequence.includes(i) && i === indexSeq}/>
		</StepButton>
        )
      }
		<IndividualSeqActions>
			<SquareButton
				onClick={() => updateChannelSequence('CLEAR', sound)}>
				X
			</SquareButton>
			<TextLightInset>{sound.toUpperCase()}</TextLightInset>
		</IndividualSeqActions>
    </FlexContainer>

export default StepLine