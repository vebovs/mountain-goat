import React from 'react';
import './menu.css';

export default class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            visibility: false,
            size: '0%'
        };
    }

    toggle = () => {
        this.setState(state => ({
            visibility: !state.visibility,
            size: !state.visibility ? '100%' : '0%'
        }));
    }
 
    render() {
        return (
            <div className={`container-${this.props.variant}`} style={{height: this.state.size}}>
                <this.props.openbtn onClick={this.toggle}></this.props.openbtn>
                {this.state.visibility &&
                    <div className='menu'>
                        <div className="header">
                            <h3 class="title">{this.props.title}</h3>
                            <this.props.closebtn onClick={this.toggle}></this.props.closebtn>
                        </div>
                        <div className="content">
                            { this.props.children }
                        </div>
                    </div>
                }
            </div>
        );
    }
}