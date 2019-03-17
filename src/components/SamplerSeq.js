import React, {Component} from 'react'

const styledDiv = {width:"26px", height: "26px",border: "1px solid #ffe6e6"}
const styledFlex = {display: "flex", flexDirection: "row"}

class SamplerSeq extends Component {

  state = {
    sequence: null,
    loading: true
  }

  componentDidMount(){
    this.setState({sequence: this.props.sequence, loading: false})
  }

  handleChange = (on,i) => {
    const {sequence} = this.state
    let sequenceUpdate = [...sequence]
    if (on === 0) {sequenceUpdate[i] = 1}
    else{sequenceUpdate[i] = 0}
    this.setState({sequence: sequenceUpdate})
  }

  render (){
    const { sequence, loading } = this.state
    const { sound } = this.props

  return(
    !loading &&
    <div className={sound.type} style={styledFlex}>
      { sequence.map((on, i) => 
        <div 
          id="step" 
          className={sound.type} 
          key={i} 
          data-checked={parseInt(on)}
          style={{...styledDiv, background: on !== 0 ? "hotpink" : "lightgrey"}}
          onClick={() => this.handleChange(on,i,sound.type)} 
          />
        )
      }
      <p className="sound-type">{sound.type.toUpperCase()}</p>
    </div>
    )
  }
}

export default SamplerSeq