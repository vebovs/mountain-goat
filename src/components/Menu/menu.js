import React from 'react';
import './menu.css';

import Button from '../Buttons/buttons';

export default class Menu extends React.Component {

    render() {
        return (
            <div className='container'>
                <Button></Button>
                <div className='menu'>
                    <h1>Menu Component</h1>
                </div>
            </div>
        );
    }
}