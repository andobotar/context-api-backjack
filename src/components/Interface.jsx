import React from 'react';

import Outcome from './Outcome';

const Interface = ({ message, computerScore, playerScore, deal, hit, stand}) => {
    return (
        <div>
            <Outcome message={message} />
            <div>
                <a className="score">Dealer Score : {computerScore}</a>
                <a className="score">Player Score : {playerScore}</a>
            </div>
            <button id="deal-button" onClick={deal}>Deal</button>
            <button id="hit-button" onClick={hit}>Hit</button>
            <button id="stand-button" onClick={stand}>Stand</button>
        </div>
    )
};

export default Interface;