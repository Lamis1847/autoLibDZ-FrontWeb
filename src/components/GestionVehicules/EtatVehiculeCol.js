import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class EtatVehiculeCol extends Component {

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
          "black": "#000000"
        }
    
        let backgroundColor = colors.black;
        if (value === "en service") {
          backgroundColor = colors.green;
        } else if (value === "circulation") {
          backgroundColor = colors.yellow;
        } else if (value === "hors service") {
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

export default EtatVehiculeCol
