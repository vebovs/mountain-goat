import React from 'react';
import './menu.css';

export default class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            toggle: false
        };
    }

    toggle = () => {
        this.setState(state => ({
            toggle: !state.toggle
        }));
    }

    render() {
        return (
            <div className={!this.state.toggle ? 'wrapper' : 'wrapper responsive'}>
                <div className='menubtn'>
                    <this.props.openbtn onClick={this.toggle}></this.props.openbtn>
                </div>
                <div className='menu'>
                    <div className='container'>
                        <nav className='level'>
                            <div className='level-left'>
                                <div className='level-item'>
                                    <h3 className='title is-3'>{this.props.title}</h3>
                                </div>
                            </div>
                            <div className='level-right'>
                                <div className='level-item'>
                                    <this.props.closebtn className='menubtn' onClick={this.toggle}></this.props.closebtn>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div>
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}