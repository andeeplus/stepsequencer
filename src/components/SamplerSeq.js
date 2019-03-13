import React, {Component} from 'react'

const styledDiv = {width:"16px", height: "16px",border: "1px solid black"}
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
          style={{...styledDiv, background: on !== 0 ? "red" : "lightgrey"}}
          onClick={() => handleChange(on,i,sound.type)} 
          />
        )
      }
      <p>{sound.type.toUpperCase()}</p>
    </div>
    )
  }
}

export default SamplerSeq