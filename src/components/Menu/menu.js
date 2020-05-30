import React from 'react';
import './menu.css';

export default class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            visibility: false,
            size: '80%'
        };
    }

    toggle = () => {
        this.setState(state => ({
            visibility: !state.visibility,
            size: !state.visibility ? '50%' : '0%'
        }));
    }
 
    render() {
        return (
            <div className='container' style={{width: this.state.size}}>
                <this.props.openbtn onClick={this.toggle}></this.props.openbtn>
                <div className='menu'>
                    <div className="header">
                        <h3 className="title">{this.props.title}</h3>
                        <this.props.closebtn onClick={this.toggle}></this.props.closebtn>
                    </div>
                    <div className="content">
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}