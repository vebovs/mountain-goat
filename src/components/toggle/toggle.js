//The code for this toggle component is from LevelUpTuts. Video can be found here: https://www.youtube.com/watch?v=NJBzUZW0jcE&t=
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