import React from 'react';
import './App.css';
import { GridShell } from './components/grid/grid.shell';
import { InputShell } from './components/input/input.shell';
import { UnmatchedLetters } from './components/unmatched-letters/unmatched-letters';
import { GameState } from './models/game-state';
import { Guess } from './models/guess';
import { Letter } from './models/letter';
import { LetterState } from './models/letter-state';

export class App extends React.Component {

  private _state: GameState;

  state: {
    internalGuesses: Array<Guess>
  };


  constructor(props = {}) {
    super(props);
    this._state = new GameState();
    this.state = { internalGuesses: [...this._state.guesses] };
  }

  render(): React.ReactNode {
    return (
      <div className="App">
        <div id="shell">
          <GridShell guesses={this.state.internalGuesses} />
          <InputShell onSubmit={this.submitGuess.bind(this)} matchedLetters={this._state.matchedLetters} unmatchedLetters={this._state.unmatchedLetters} />
        </div>
      </div>
    );
  }

  submitGuess(word: string) {
    console.log(`${word} has been submitted to app.ts`)
    const letterArray = word.toLocaleUpperCase().split('');
    const activeGuess = this._state.guesses[this._state.guessCount];


    letterArray.forEach((x, i) => {
      const letter = activeGuess.letters[i]
      this.setLetterState(x, i, this._state.gameWord, activeGuess, letter);
      activeGuess.correct = false;
    });

    this.setState({ ...this.state, internalGuesses: [...this._state.guesses] });
    this._state.guessCount += 1;

  }

  private setLetterState(guessLetter: string, index: number, word: string, activeGuess: Guess, letter: Letter) {
    letter.value = guessLetter;
    word = word.toLocaleUpperCase();
    this.setInitialState(word, index, guessLetter, letter);
    if (letter.state === LetterState.correct) {
      this.validateCorrectState(guessLetter, index, activeGuess, word);
      this._state.addMatchedLetter(letter);
    }
    else if (letter.state === LetterState.partial) {
      this.validdatePartialState(letter, index, activeGuess, word);
      this._state.addMatchedLetter(letter);
    }
    else{
      this._state.addUnmatchedLetter(letter);
    }
  }


  private validateCorrectState(guessLetter: string, index: number, activeGuess: Guess, word: string) {
    const countOfLetter = word.split('').filter(x => x === guessLetter).length;
    if (countOfLetter === 1) {
      activeGuess.letters.forEach((x, i) => {
        if (x.value === guessLetter && index !== i) {
          x.state = LetterState.incorrect;
        }
      });
    }
  }

  private validdatePartialState(guessLetter: Letter, index: number, activeGuess: Guess, word: string) {
    let markInvalid = false;
    const countOfLetter = word.split('').filter(x => x === guessLetter.value).length;
    if (countOfLetter === 1) {
      for (let i = 0; i < activeGuess.letters.length; i++) {
        const letter = activeGuess.letters[i];
        if (letter.value === guessLetter.value && i < index) {
          markInvalid = true;
          break;
        }
      }
      if (markInvalid) {
        guessLetter.state = LetterState.incorrect;
      }
    }
  }

  private setInitialState(word: string, index: number, guessLetter: string, letter: Letter) {
    if (word[index] === guessLetter) {
      letter.state = LetterState.correct;
    } else if (word.includes(guessLetter)) {
      letter.state = LetterState.partial;
    } else {
      letter.state = LetterState.incorrect;
    }
  }
}

export default App;
