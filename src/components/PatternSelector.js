import React from 'react';
import { PatternBlock, PatternSelect, PatternButton } from './styles/PatternSelector.styles'
import { LabelName } from './Fx/ModulePainter.styles'

const buttons = [1,2,3,4,5,6,7,8,9]

const PatternSelector = (props) => {
  return (
    <PatternBlock>
    <LabelName>PATTERN</LabelName>
      <PatternSelect>
        {buttons.map((item, index) => (
          <PatternButton key={index} onClick={() => props.changePattern(index)}><p>{item}</p></PatternButton>
        ))}
      </PatternSelect>
    </PatternBlock>
  );
};

export default PatternSelector;

