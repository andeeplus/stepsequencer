import React from 'react';
import { PatternBlock, PatternSelect, PatternButton } from './styles/PatternSelector.styles'
import { LabelName } from './Fx/ModulePainter.styles'

const buttons = [1,2,3,4,5,6,7,8,9]

const PatternSelector = ({ changePattern, patternIndex, isPlaying }) => {
  return (
    <PatternBlock>
    <LabelName>PATTERN</LabelName>
      <PatternSelect>
        {buttons.map((item, index) => (
          <PatternButton 
            key={index} 
            onClick={() => isPlaying && changePattern(index)}
            isActive={patternIndex === index}
          >
            <p>{item}</p>
          </PatternButton>
        ))}
      </PatternSelect>
    </PatternBlock>
  );
};

export default PatternSelector;

