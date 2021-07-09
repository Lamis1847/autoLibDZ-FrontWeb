import React, { Component } from 'react'
import PropTypes from 'prop-types';


export class TypeReclamation extends Component {

    static propTypes = {
        value: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        change: PropTypes.func.isRequired
      }; 

    render() {
        const { value, index, change } = this.props;
        const colors = {
        "green": "#2DCE89",
        "yellow": "#FFCB00",
        "red": "#F5365C",
        }

        let backgroundColor = colors.black;
        if (value === "service") {
        backgroundColor = colors.green;
        } else if (value === "autre") {
        backgroundColor = colors.yellow;
        } else if (value === "bug") {
        backgroundColor = colors.red;
        }

        return (
            <span
            value={value}
            onChange={event => change(event.target.value, index)}
            style={{ backgroundColor: backgroundColor, color:"#FFFFFF", padding:"6px", borderRadius:"10px", fontWeight:"bold" }}>
                {value}
            </span>
        )
    }
}

export default TypeReclamation
