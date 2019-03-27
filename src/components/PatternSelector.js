import React from 'react';

const buttons = [1,2,3,4,5,6,7,8,9]

const PatternSelector = (props) => {
  return (
    <div className="pattern-block">
      <div className="pattern-selector">
        {buttons.map((item, index) => (
          <div className="pattern-drums-button" key={index} onClick={() => props.changePattern(index)}><p>{item}</p></div>
        ))}
      </div>
      <p className="text-light-inset">PATTERN</p>
    </div>
  );
};

export default PatternSelector;

