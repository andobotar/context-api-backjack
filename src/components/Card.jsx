import React from 'react';

import { ThemeContext } from '../context/ThemeContext';

const Card = ({ face }) => {
   
    return (
        <div className="card">
            <ThemeContext.Consumer>
                {({theme, switchTheme}) =>
                    face === '00' ? (
                        <img src={`images/${theme}.png`} onClick={switchTheme} style={styles.Pointer} alt="card" />
                    ) : (
                        <img src={`images/${face}.png`} alt="card" />
                    )
                }
            </ThemeContext.Consumer>
        </div>
    );
};

export default Card;

const styles = {
    Pointer: {
        cursor: 'pointer'
    }
}