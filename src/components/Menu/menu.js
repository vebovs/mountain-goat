import React from 'react';
import './menu.css';

export default class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            visibility: false,
            isMobile: false,
            size: '50%'
        };
    }

    toggle = () => {
        this.setState(state => ({
            visibility: !state.visibility,
            size: !state.visibility ? '50%' : '0%'
        }));
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({
                isMobile: window.innerWidth < 768
            });
        });
    }
 
    render() {
        return (
            <div className='wrapper' style={{width: this.state.size}}>
                <div className='menubtn'>
                    <this.props.openbtn onClick={this.toggle}></this.props.openbtn>
                </div>
                <div className='menu'>
                    <div className='container'>
                        <nav className='level'>
                            {!this.state.isMobile && <div className='level-left'>
                                <div className='level-item'>
                                    <h3 className='title is-3'>{this.props.title}</h3>
                                </div>
                            </div>}
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