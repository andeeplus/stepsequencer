import React, {Component} from 'react'

const buttonDiv = {
  width:"28px", 
  height: "28px",
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

class SamplerChannel extends Component {


  state = {sequence:null, sound:null}

  updateInternalSequence = (addRemove, sound, i) => {

    const {sequence} = this.state
    const {updateGlobalSequence} = this.props
    let individualSeq = sequence

    if (addRemove === 'ADD') {
      individualSeq.push(i)
    } else if (addRemove === 'REMOVE') {
      const stepToRemove = individualSeq.indexOf(i)
      individualSeq.splice(stepToRemove,1)
    } else {
      individualSeq.length = 0
    }
    

    updateGlobalSequence(sequence, sound)
    this.setState({sequence: individualSeq})
  }

  componentDidMount = () => {
    const {sequence, sound} = this.props
    this.setState({sequence, sound})
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.sequence !== this.props.sequence){
      const {sequence} = this.props
      let individualSeq = sequence
      console.log('DID UPDATE', prevProps.sequence, individualSeq)
      this.setState({sequence: individualSeq})
      this.props.updateGlobalSequence(individualSeq, this.state.sound)
    }
  }


  render (){

  const { sequence, sound } = this.state

  return(
    sequence &&
    <div className={sound} style={styledFlex}>
      { [...Array(16)].map((step, i) => 
        <div 
          id="step" 
          className={sound} 
          key={i} 
          style={sequence.includes(i) ? styles.active : styles.basic }
          onClick={() => this.updateInternalSequence((sequence.includes(i) ? 'REMOVE' : 'ADD'), sound, i)} 
          />
        )
      }
      <div className="individual-seq-actions">
        <button className="square-button" onClick={() => this.updateInternalSequence('CLEAR', sound)}>✕</button>
        <p className="text-light-inset">{sound.toUpperCase()}</p>
      </div>
    </div>
    )
  }
}

export default SamplerChannel