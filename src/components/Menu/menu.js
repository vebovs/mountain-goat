import React from 'react';
import './menu.css';

import { Profile, Close } from '../Buttons';

export default class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            visibility: false
        };
    }

    toggle = () => {
        this.setState(state => ({
            visibility: !state.visibility
        }));
    }
 
    render() {
        return (
            <div className='container'>
                <Profile onClick={this.toggle}></Profile>
                {this.state.visibility &&
                    <div className='menu'>
                        <Close onClick={this.toggle}></Close>
                    </div>
                }
            </div>
        );
    }
}