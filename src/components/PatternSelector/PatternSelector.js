import React from 'react';
import { PatternSelect, PatternButton } from './styles'
import { LabelName } from '../Fx/ModulePainter.styles'
import { Box } from 'ui';

const buttons = [1,2,3,4,5,6,7,8,9]

const PatternSelector = ({ changePattern, patternIndex, isPlaying, ...props }) => {
  return (
    <Box column alignItems="center" width="120px" bg="gray.4" p={2} borderRadius={1} {...props}>
    <LabelName>PATTERN</LabelName>
      <PatternSelect>
        {buttons.map((item, index) => (
          <PatternButton 
            key={index} 
            onClick={() => patternIndex !== index && changePattern(index)}
            isActive={patternIndex === index}
          >
            <p>{item}</p>
          </PatternButton>
        ))}
      </PatternSelect>
    </Box>
  );
};

export default PatternSelector;

