import React, { Component } from 'react';

const themes = {
    basic: '00',
    adam: '00-2'
}

export const ThemeContext = React.createContext(themes.basic);

export class ThemeProvider extends Component {

    state = {
        theme: 'basic'
    }
    
    switchTheme = () => {
        this.setState( (prevState) => {
            return {theme: prevState.theme === 'basic' ? 'adam' : 'basic'}
        });
    }

    render() {
        return (
            <ThemeContext.Provider value={{theme: themes[this.state.theme], switchTheme: this.switchTheme}}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}