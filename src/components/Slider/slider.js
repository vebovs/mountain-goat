import React from 'react';
import './slider.css';

export default class Card extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '3',
            toggle: false
        }
    }

    toggle = () => {
        console.log('halp');
        this.setState(state => ({
            toggle: !state.toggle
        }));
    }

    sliderValue = (value) => {
        console.log(value.target.value);
        //this.state.value = value.target.value;
        //console.log(this.state.value);
        this.setState({ value: value.target.value });
    }

    componentDidMount() {
        this.setState({toggle: this.props.toggle});
    }
 
    render() {
        return (
            <div className={!this.props.toggle ? 'slider-wrapper' : 'slider-wrapper visible'}>
                    <div className='slider-box'>
                        <input className='slider-input is-fullwidth is-info' step='1' min='1' max='20' value={this.state.value} onChange={value => this.sliderValue(value)} type='range' orient='vertical' />
                        <button className='button enter'>
                            <span className='icon'>
                                <i className='fa fa-search'></i>
                            </span>
                        </button>
                        <button className='button remove'>
                            <span className='icon'>
                                <i className='fa fa-times'></i>
                            </span>
                        </button>
                    </div>
            </div>
        );
    }
}