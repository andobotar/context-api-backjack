import React from 'react';

import Card from './Card';

const Hand = ({ cards }) => {

    const hand = cards.map( (card, index) => {
        return <Card face={card} key={index} />
    });

    return (
        <div>
            {hand}
        </div>
    )
};

export default Hand;