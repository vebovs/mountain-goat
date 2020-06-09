import React from 'react';
import './dropdown.css';

export default class Dropdown extends React.Component {
    constructor() {
        super();
        this.state = {
            toggle: false
        }
    }

    handleToggle = () => {
        this.setState(state => {
            return state.toggle = !state.toggle;
        });
    }
 
    render() {
        return (
            <div className='dropdown-wrapper'>
                <div className='container is-fluid'>
                    <button className={this.state.toggle ? 'button rotate-up' : 'button rotate-down'} onClick={this.handleToggle}>
                        <span className='icon'>
                            <i className='fa fa-chevron-down'></i>
                        </span>
                    </button>
                    <div className={this.state.toggle ? 'dropdown-content extend' : 'dropdown-content'}>
                        <div className='box'>
                            <div className='field'>
                                <div className='control'>
                                    <input id="nickname" className="input is info" type="text" placeholder="Nickname"></input>
                                </div>
                            </div>
                            <div className='field is-grouped'>
                                <p className='control'>
                                <button className='button' onClick={this.toggle}>
                                    <span className='icon'>
                                        <i className='fa fa-heart'></i>
                                    </span>
                                </button>
                                </p>
                                <p className='control'>
                                <button className='button' onClick={this.toggle}>
                                    <span className='icon'>
                                        <i className='fa fa-times'></i>
                                    </span>
                                </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}