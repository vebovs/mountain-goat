import React from 'react';
import './buttons.css';

export default class Profile extends React.Component {

    render() {
        return (
            <button className='fa fa-user profile' onClick={this.props.onClick}></button>
        );
    }
}
