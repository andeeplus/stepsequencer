import React, {Component} from 'react'
import { FullKnob, KnobBase, KnobLabel, Ticks, Tick, Outer, Inner, Grip } from './styles'

class Knob extends Component {
	constructor(props) {
		super(props);
		this.fullAngle = props.degrees;
		this.startAngle = (360 - props.degrees) / 2;
		this.endAngle = this.startAngle + props.degrees;
		this.margin = props.size * 0.15;
		this.currentDeg = Math.floor(
			this.convertRange(
			props.min,
			props.max,
			this.startAngle,
			this.endAngle,
			props.value
			)
		);
		this.state = { deg: this.currentDeg };
	}

	startDrag = e => {
		e.preventDefault();
		const knob = e.target.getBoundingClientRect();
		const pts = {
			x: knob.left + knob.width / 2,
			y: knob.top + knob.height / 2
		};
		const moveHandler = e => {
			this.currentDeg = this.getDeg(e.clientX, e.clientY, pts);
			if (this.currentDeg === this.startAngle) this.currentDeg--;
			let newValue = Math.floor(
			this.convertRange(
				this.startAngle,
				this.endAngle,
				this.props.min,
				this.props.max,
				this.currentDeg
			)
			);
			this.setState({ deg: this.currentDeg });
			this.props.onChange(newValue, this.props.typeValue);
		};
		document.addEventListener("mousemove", moveHandler);
		document.addEventListener("mouseup", e => {
			document.removeEventListener("mousemove", moveHandler);
		});
	};

	getDeg = (cX, cY, pts) => {
		const x = cX - pts.x;
		const y = cY - pts.y;
		let deg = Math.atan(y / x) * 180 / Math.PI;
		if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
			deg += 90;
		} else {
			deg += 270;
		}
		let finalDeg = Math.min(Math.max(this.startAngle, deg), this.endAngle);
		return finalDeg;
	};

	convertRange = (oldMin, oldMax, newMin, newMax, oldValue) => {
		return (oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
	};

	renderTicks = () => {
		let ticks = [];
		const incr = this.fullAngle / this.props.numTicks;
		const size = this.margin + this.props.size / 2;
		for (let deg = this.startAngle; deg <= this.endAngle; deg += incr) {
			const tick = {
			deg: deg,
			tickStyle: {
				height: size + 10,
				left: size - 1,
				top: size + 2,
				transform: "rotate(" + deg + "deg)",
				transformOrigin: "top"
			}
			};
			ticks.push(tick);
		}
		return ticks;
	};

	dcpy = o => {
		return JSON.parse(JSON.stringify(o));
	};

	render() {
		let kStyle = {
			width: this.props.size,
			height: this.props.size
		};
		let iStyle = this.dcpy(kStyle);
		let oStyle = this.dcpy(kStyle);
		oStyle.margin = this.margin;
		oStyle.background = this.props.color
		iStyle.transform = "rotate(" + this.state.deg + "deg)";

		return (
      <FullKnob>
        <KnobBase>
          <Ticks>
            {this.props.numTicks
              ? this.renderTicks().map((tick, i) => (
                  <Tick
                    key={i}
                    disabled={this.props.disabled}
                    isActive={tick.deg <= this.currentDeg && true}
                    style={tick.tickStyle}
                  />
                ))
              : null}
          </Ticks>
          <Outer
            style={oStyle}
            onMouseDown={this.props.disabled ? undefined : this.startDrag}
          >
            <Inner disabled={this.props.disabled} style={iStyle}>
              <Grip />
            </Inner>
          </Outer>
        </KnobBase>
        <KnobLabel disabled={this.props.disabled}>
          {this.props.children}
        </KnobLabel>
      </FullKnob>
    );}
}
Knob.defaultProps = {
	size: 150,
	min: 10,
	max: 30,
	numTicks: 0,
	degrees: 270,
	value: 0
};

export default Knob


/* USAGE EXAMPLE (forked by): https://codepen.io/bbx/pen/QBKYOy?editors=0110

state = { value: 0 };

handleChange = newValue => {
	this.setState({
	value: newValue
	});
};

<Knob
size={100}
numTicks={25}
degrees={260}
min={1}
max={100}
value={30}
color={true}
onChange={this.handleChange}
/>

<Knob
numTicks={125}
degrees={180}
min={1}
max={100}
value={0}
onChange={this.handleChange}
/>
</div>

*/