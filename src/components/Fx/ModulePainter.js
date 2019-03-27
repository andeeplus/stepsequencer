import React from 'react';
import Knob from '../Knob'

const ModulePainter = (props) => {
  return (
    <div className="control-area">
      <h1 className="text-light-inset-maxi">{props.name.toUpperCase()}</h1>  
      <div className="knobs-line"> 
        { props.parameters.map(param => (
            <Knob 
              size={25} 
              numTicks={param.ticks} 
              min={param.minMax[0]} 
              max={param.minMax[1]} 
              value={param.initValue} 
              color={props.color ? props.color : 'darkgrey'} 
              onChange={props.handleValues} 
              typeValue={param.parameters}
              >
              {param.shortName}
            </Knob>
            )
          )
        }
      </div>
    </div>
  );
};

export default ModulePainter;