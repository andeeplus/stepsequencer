import React from 'react'

import { TextLightInset, IndividualSeqActions, 
  StepButton, SquareButton, SquareButtonLed } from 'components/styles/SamplerChannel.style'
import { Box } from 'ui'


const StepLine = ({
  sequence,
  sound = "  ",
  updateChannelSequence,
  indexSeq,
}) =>
  sequence && (
    <Box>
      {[...Array(16)].map((step, i) => (
        <StepButton
          id="step"
          className={sound}
          key={i}
          isActive={sequence.includes(i)}
          onClick={() =>
            updateChannelSequence(
              sequence.includes(i) ? "REMOVE" : "ADD",
              sound,
              i
            )
          }
        >
          <SquareButtonLed isActive={sequence.includes(i) && i === indexSeq} />
        </StepButton>
      ))}
      <IndividualSeqActions>
        <SquareButton onClick={() => updateChannelSequence("CLEAR", sound)}>
          X
        </SquareButton>
        <TextLightInset>{sound.toUpperCase()}</TextLightInset>
      </IndividualSeqActions>
    </Box>
  );

export default StepLine