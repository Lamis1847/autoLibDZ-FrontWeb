import React, { Component } from 'react';
import ModifBorne from './ModifBorne';


class VisuAndModifBorne extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = {
            gestBornes: {
                width: "50%"
            }
        }
        return (
            <>
                <ModifBorne borne={this.props.borne}></ModifBorne>
            </>
        )
    }

}

export default VisuAndModifBorne;