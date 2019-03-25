import React from 'react'

const buttonDiv = {
  width:"28px", 
  height: "28px",
  border: "1px solid #ffe6e6",
  'box-sizing': 'border-box',
  borderRadius: 3,
  margin: 5,
}

const styles = {
  basic:{
    ...buttonDiv,
    'box-shadow': 'inset 2px 1px 1px #000', 
    background: 'lightgrey'
  },
  active: {
    ...buttonDiv,
    'border-style': 'outset',
    'border-width': 2,
    'border-color': 'darkgrey', 
    background: 'hotpink',
  },
}

const styledFlex = {display: "flex", flexDirection: "row"}

const SamplerChannel = (props) => {


  const updateInternalSequence = (addRemove, i, sound) => {

    const {sequence} = props
    const {updateGlobalSequence} = props
    let individualSeq = sequence

    if(addRemove === 'ADD'){
      individualSeq.push(i)
    } else {
      const stepToRemove = individualSeq.indexOf(i)
      individualSeq.splice(stepToRemove,1)
    }
    
    updateGlobalSequence(sequence, sound)
    
  }

  const { sound, sequence } = props
 
  return(
    sequence &&
    <div className={sound} style={styledFlex}>
      { [...Array(16)].map((step, i) => 
        <div 
          id="step" 
          className={sound} 
          key={i} 
          style={sequence.includes(i) ? styles.active : styles.basic }
          onClick={() => updateInternalSequence((sequence.includes(i) ? 'REMOVE' : 'ADD'), i, sound)} 
          />
        )
      }
      <p className="text-light-inset">{sound.toUpperCase()}</p>
    </div>
    )
}

export default SamplerChannel