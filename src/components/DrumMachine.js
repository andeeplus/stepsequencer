import React from 'react'

import StepLine from './StepLine'
import MasterControl from './MasterControl'
import PatternSelector from './PatternSelector'
import Phaser from './Fx/Phaser'
import PingPongDelay from './Fx/PingPongDelay'
import Smasher from './Fx/Smasher'
import { PatternControl } from './PatternControl'
import { initFX } from '../presets/drums'
import { PlayButton, ControlStation, ToggleDiv } from './styles/DrumMachine.styles'
import { FlexContainer } from '../styles/index'
import { Timeline } from './Timeline'

const DrumMachine = (
    { sequence, patternName, changePattern, play, updateChannelSequence, 
        playStop, handleVolume, handleBpm, handleValues, indexSeq, patternIndex, toggleTheme }
) => {

    return(
        <FlexContainer 
            column 
            justifyContent='center' 
            alignItems='center' 
            margin='20px 0 0 0' 
            height='100%'
            padding='0px'
        >
            <ControlStation column width='auto'>
            { sequence && Object.keys(sequence).map((sound) => 
                <StepLine 
                    sound={sound} 
                    key={sound} 
                    sequence={sequence[sound]} 
                    updateChannelSequence={updateChannelSequence}
                    indexSeq={indexSeq}
                />)} 
            <Timeline indexSeq={indexSeq} steps={[...Array(16)]} isPlaying={play}/>
            </ControlStation>
            <FlexContainer justifyContent='center' >
                <FlexContainer column justifyContent='space-between'>
                    <ControlStation column>
                        <PatternSelector changePattern={changePattern} patternIndex={patternIndex} isPlaying={play}/> 
                        <PlayButton as="button" onClick={playStop}>{play ? "◼" : "►"}</PlayButton>
                        <PatternControl patternName={patternName} />
                    </ControlStation>
                    <MasterControl handleBpm={handleBpm} handleVolume={handleVolume}/>
                </FlexContainer>
                <Smasher 
                    handleValues={handleValues} 
                    instrument={['drumDist', 'drumCrusher']} 
                    init={{...initFX.fxDist, ...initFX.fxBitCrusher}}
                />
                <PingPongDelay 
                    handleValues={handleValues} 
                    instrument={'drumPPDelay'} 
                    init={initFX.fxPPDelay}
                />
                <Phaser 
                    handleValues={handleValues} 
                    instrument={'drumPhaser'} 
                    init={initFX.fxPhaser}
                />
                </FlexContainer>  
                <ToggleDiv>
                </ToggleDiv>
        </FlexContainer>

    )
}

export default DrumMachine

