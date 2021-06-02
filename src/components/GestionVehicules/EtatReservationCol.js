import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class EtatReservationCol extends Component {

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
          "black": "#000000",
          "orange": "#ff6600"
        }
    
        let backgroundColor = colors.black;
        if (value === "Terminée") {
          backgroundColor = colors.green;
        } else if (value === "En cours") {
          backgroundColor = colors.orange;
        } else if (value === "Annulée") {
          backgroundColor = colors.red;
        } else if (value == "Active") {
          backgroundColor = colors.yellow
        }
    
        return (
          <span
            value={value}
            onChange={event => change(event.target.value, index)}
            style={{ backgroundColor: backgroundColor, color:"#FFFFFF", padding:"4px", borderRadius:"10px", fontWeight:"bold" }}>{value}</span>
        )
      }
}

export default EtatReservationCol
