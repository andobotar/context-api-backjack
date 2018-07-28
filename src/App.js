import React, { Component } from 'react';
import './App.css';

import Table from './components/Table';
import { ThemeProvider } from './context/ThemeContext';

class App extends Component {
    render() {
        return (
            <ThemeProvider>
                <div className="App">
                    <Table />
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
