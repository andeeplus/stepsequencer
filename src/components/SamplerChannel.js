import React from 'react'

const buttonDiv = {
  width:"34px", 
  height: "34px",
  border: "1px solid #ffe6e6",
  boxSizing: 'border-box',
  borderRadius: 3,
  margin: 5,
}

const styles = {
  basic:{
    ...buttonDiv,
    boxShadow: 'inset 2px 1px 1px #000', 
    background: 'lightgrey'
  },
  active: {
    ...buttonDiv,
    borderStyle: 'outset',
    borderWidth: 2,
    borderColor: 'darkgrey', 
    background: 'hotpink',
  },
}

const styledFlex = {display: "flex", flexDirection: "row"}

const SamplerChannel = (props) => {


  const { sequence, sound, updateChannelSequence } = props

  return(
    sequence &&
    <div className={sound} style={styledFlex}>
      { [...Array(16)].map((step, i) => 
        <div 
          id="step" 
          className={sound} 
          key={i} 
          style={sequence.includes(i) ? styles.active : styles.basic }
          onClick={() => updateChannelSequence((sequence.includes(i) ? 'REMOVE' : 'ADD'), sound, i)} 
          />
        )
      }
      <div className="individual-seq-actions">
        <button className="square-button" onClick={() => updateChannelSequence('CLEAR', sound)}>✕</button>
        <p className="text-light-inset">{sound.toUpperCase()}</p>
      </div>
    </div>
    )
  // }
}

export default SamplerChannel