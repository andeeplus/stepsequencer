import React from 'react'

const styledDiv = {width:"26px", height: "26px",border: "1px solid #ffe6e6"}
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
          style={{...styledDiv, background: sequence.includes(i) ? "hotpink" : "lightgrey"}}
          onClick={() => updateInternalSequence((sequence.includes(i) ? 'REMOVE' : 'ADD'), i, sound)} 
          />
        )
      }
      <p className="sound-type">{sound.toUpperCase()}</p>
    </div>
    )
}

export default SamplerChannel