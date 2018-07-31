import React, { Component } from 'react';
import shuffle from 'lodash/shuffle';

import Hand from './Hand';
import Interface from './Interface';

class Table extends Component {
    fullDeck = [
        's1',
        's2',
        's3',
        's4',
        's5',
        's6',
        's7',
        's8',
        's9',
        's10',
        's11',
        's12',
        's13',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'h7',
        'h8',
        'h9',
        'h10',
        'h11',
        'h12',
        'h13',
        'c1',
        'c2',
        'c3',
        'c4',
        'c5',
        'c6',
        'c7',
        'c8',
        'c9',
        'c10',
        'c11',
        'c12',
        'c13',
        'd1',
        'd2',
        'd3',
        'd4',
        'd5',
        'd6',
        'd7',
        'd8',
        'd9',
        'd10',
        'd11',
        'd12',
        'd13'
    ];

    state = {
        deck: [...this.fullDeck],
        computerHand: ['00', '00'],
        playerHand: ['00', '00'],
        message: "Press 'Deal' to start the game",
        status: 'playing'
    };

    deal = () => {
        let cards = shuffle([...this.fullDeck]);
        let computersDealtHand = ['00'];
        let playersDealtHand = [];

        // player's hands, deal 2 cards
        playersDealtHand.push(cards.pop());
        playersDealtHand.push(cards.pop());

        // computer's hands

        // let's just burn a Card
        cards.pop();

        // since we are using client side state the dealer secret Card is only popped out of the deal at the time the user clicks Stand
        computersDealtHand.push(cards.pop());

        this.setState({
            computerHand: computersDealtHand,
            playerHand: playersDealtHand,
            deck: cards,
            status: 'playing',
            message: 'Hit or Stand?'
        });
    };

    hit = () => {
        if (this.state.status === 'gameover') return;

        let playersDealtHand = [...this.state.playerHand];

        let shuffled = shuffle([...this.state.deck]);
        playersDealtHand.push(shuffled.pop());

        let score = this.countScore(playersDealtHand);
        if (score > 21) {
            this.setState({
                message: 'OVERDRAWN! Computer Wins!',
                status: 'gameover'
            });
        }

        this.setState({
            playerHand: playersDealtHand,
            deck: shuffled
        });
    };

    stand = () => {
        if (this.state.status === 'gameover') return;

        let computersFullHand = [...this.state.computerHand];
        // remove hidden Card
        computersFullHand.shift();
        // we shuffle every time so you don't cheat by checking component state :D
        let shuffled = shuffle([...this.state.deck]);
        // add a real Card instead of the face-down first Card
        computersFullHand.unshift(shuffled.pop());

        let computerScore = this.countScore(computersFullHand);
        let playerScore = this.countScore(this.state.playerHand);

        // compute game status while dealing cards to the dealer
        while (computerScore < playerScore || computerScore < 17) {
            // deal a Card
            computersFullHand.push(shuffled.pop());
            computerScore = this.countScore(computersFullHand);
        }

        this.setState({
            computerHand: computersFullHand,
            deck: shuffled,
            status: 'gameover',
            message: computerScore > 21 ? 'Computer has overdrawn. Player Wins!' : 'Computer Wins'
        });
    };

    countScore = hand => {
        let score = 0;
        let aces = 0;

        hand.forEach(card => {
            if (card[1] === '1' && card.length === 2) {
                score += 1;
                aces++;
            } else if (card[1] === '1') {
                score += 10;
            } else {
                score += Number(card[1]);
            }
        });
        for (let i = 0; i < aces; i++) {
            if (score <= 11) {
                score += 10;
            }
        }

        return score;
    };

    render() {
        return (
            <div>
                <Hand cards={this.state.computerHand} />
                <Interface
                    message={this.state.message}
                    deal={this.deal}
                    hit={this.hit}
                    stand={this.stand}
                    computerScore={this.countScore(this.state.computerHand)}
                    playerScore={this.countScore(this.state.playerHand)}
                />
                <Hand cards={this.state.playerHand} />
            </div>
        );
    }
}

export default Table;
