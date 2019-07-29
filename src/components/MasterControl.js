import React from 'react'

import { FlexContainer } from '../styles/'
import Knob from './Knob'

const MasterControl = ({handleBpm, handleVolume}) => (
    <FlexContainer flexWrap='wrap' justifyContent ='space-evenly'> 
            <Knob size={25} min={1} max={100} value={100} color={'lightgrey'} onChange={handleVolume}>VOL</Knob>
            <Knob size={25} min={60} max={180} value={120} color={'lightgrey'} onChange={handleBpm}>BPM</Knob>
    </FlexContainer> 
)

export default MasterControl