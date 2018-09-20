import React, { Component } from 'react';
import shuffle from 'lodash/shuffle';

import Hand from './Hand';
import Interface from './Interface';
import { fullDeck } from "../util/fullDeck";

class Table extends Component {

    state = {
        computerHand: ['00', '00'],
        playerHand: ['00', '00'],
        message: "Press 'Deal' to start the game",
        playing: false
    };

    deal = () => {
        const cards = shuffle(fullDeck);
        const computersDealtHand = ['00'];
        const playersDealtHand = [];

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
            playing: true,
            message: 'Hit or Stand?'
        });
    };

    hit = () => {
        if (!this.state.playing) return;

        let playersDealtHand = [...this.state.playerHand];

        let shuffled = shuffle([...this.state.deck]);
        playersDealtHand.push(shuffled.pop());

        let score = this.countScore(playersDealtHand);
        if (score > 21) {
            this.setState({
                message: 'OVERDRAWN! Computer Wins!',
                playing: false
            });
        }

        this.setState({
            playerHand: playersDealtHand,
            deck: shuffled
        });
    };

    stand = () => {
        if (!this.state.playing) return;

        const computersFullHand = [...this.state.computerHand];
        // remove hidden Card
        computersFullHand.shift();
        // we shuffle every time so you don't cheat by checking component state :D
        const shuffled = shuffle([...this.state.deck]);
        // add a real Card instead of the face-down first Card
        computersFullHand.unshift(shuffled.pop());

        let computerScore = this.countScore(computersFullHand);

        // compute game status while dealing cards to the dealer
        while (computerScore < 17) {
            // deal a Card
            computersFullHand.push(shuffled.pop());
            computerScore = this.countScore(computersFullHand);
        }

        this.setState({
            computerHand: computersFullHand,
            deck: shuffled,
            playing: false,
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
