import React, {Component} from 'react'

const styledDiv = {width:"26px", height: "26px",border: "1px solid #ffe6e6"}
const styledFlex = {display: "flex", flexDirection: "row"}

class SamplerSeq extends Component {


  render (){
    const {sound, sequence, handleChange} = this.props

  return(
    <div className={sound.type} style={styledFlex}>
      { sequence.map((on, i) => 
        <div 
          id="step" 
          className={sound.type} 
          key={i} 
          data-checked={parseInt(on)}
          style={{...styledDiv, background: on !== 0 ? "hotpink" : "lightgrey"}}
          onClick={() => handleChange(on,i,sound.type)} 
          />
        )
      }
      <p className="sound-type">{sound.type.toUpperCase()}</p>
    </div>
    )
  }
}

export default SamplerSeq