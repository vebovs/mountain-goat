import React from 'react';

export class Toggle extends React.Component {
    state = {
        on: false
    }

    toggle = () => {
        this.setState({
            on: !this.state.on
        });
    }

    render(){
        const { children } = this.props;
        return children({
            on: this.state.on,
            toggle: this.toggle
        });
    }
}