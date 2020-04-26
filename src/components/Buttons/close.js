import React from 'react';
import './buttons.css';

export default class Close extends React.Component {

    render() {
        return (
            <button className='fa fa-times close' onClick={this.props.onClick}></button>
        );
    }
}