import { words } from "../shared/words";
import { Guess } from "./guess";
import { Letter } from "./letter";
import { LetterState } from "./letter-state";

export class GameState {

    private _matchedLetters: Array<Letter> = [];
    private _unmatchedLetters: Array<Letter> = [];

    guesses: ReadonlyArray<Guess>;
    guessCount: number = 0;
    gameState: number = 1;
    gameWord: string = '';

    get matchedLetters() {
        return [...this._matchedLetters];
    }

    get unmatchedLetters() {
        return [...this._unmatchedLetters];
    }


    addMatchedLetter(letter: Letter) {
        const index = this.findIndexInmatched(letter);
        this.removeFromUnmatched(letter);

        if (letter.state === LetterState.correct && index > -1) {
            this._matchedLetters.splice(index, 1);
            this._matchedLetters.push(letter);
        }
        if(index === -1){
            this._matchedLetters.push(letter);
        }
    }

    addUnmatchedLetter(letter: Letter) {
        if (this.findIndexInUnmatched(letter) === -1 && this.findIndexInmatched(letter) === -1) {
            this._unmatchedLetters.push(letter);
        }
    }

    private removeFromUnmatched(letter: Letter) {
        const index = this.findIndexInUnmatched(letter);
        if(index > -1){
        this._unmatchedLetters.splice(this.findIndexInUnmatched(letter), 1);
        }
    }

    private findIndexInUnmatched(letter: Letter): number {
        return this._unmatchedLetters.findIndex(x => x.value === letter.value);
    }

    private findIndexInmatched(letter: Letter): number {
        return this._matchedLetters.findIndex(x => x.value === letter.value);
    }


    constructor() {
        this.guesses = this.initGuessess();
        this.setGameWord();
    }


    private setGameWord() {
        const index = Math.floor(Math.random() * (words.length - 1));
        this.gameWord = words[index];
    }

    private initGuessess() {
        return [
            this.defaultGuess(),
            this.defaultGuess(),
            this.defaultGuess(),
            this.defaultGuess(),
            this.defaultGuess()
        ];
    }

    private defaultGuess(): Guess {
        return {
            correct: false,
            letters: [this.defaultLetter(), this.defaultLetter(), this.defaultLetter(), this.defaultLetter(), this.defaultLetter()]
        };
    }

    private defaultLetter(): Letter {
        return <Letter>{
            value: ''
        }
    }
}