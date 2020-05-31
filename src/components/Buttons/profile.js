import React from 'react';
import './buttons.css';

export default class Profile extends React.Component {

    render() {
        return (
            <button className='button' onClick={this.props.onClick}>
                <span className='icon'>
                    <i className='fa fa-user'></i>
                </span>
            </button>
        );
    }
}
