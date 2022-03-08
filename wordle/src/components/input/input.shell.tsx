import classNames from "classnames";
import { timeStamp } from "console";
import React from "react";
import { Letter } from "../../models/letter";
import { LetterState } from "../../models/letter-state";
import { words } from "../../shared/words";
import { InputTile } from "./input-tile/input-tile";
import './input.shell.css';


export type Props = {
    onSubmit: (value: string) => void,
    matchedLetters: Array<Letter>,
    unmatchedLetters: Array<Letter>
}

const approvedKeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

export class InputShell extends React.Component<Props> {

    state: {
        word: string
        valid: boolean;
    }


    constructor(props: Props) {
        super(props);
        this.state = {
            word: '',
            valid: true
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeypress.bind(this), false);
    }
    private handleKeypress(event: KeyboardEvent) {
        if (approvedKeys.includes(event.key)) {
            this.addLetter(event.key.toLocaleUpperCase());
        }
        if(event.key === "Backspace"){
            this.deleteLetter();
        }
        if(event.key === "Enter" && this.state.word.length === 5){
            this.submit();
        }
    }

    private submitWord(event: any) {
        this.setWord(event.target.value);
    }


    private setWord(word: string) {
        this.setState({ ...this.state, word: word });
    }

    private addLetter(letter: string) {
        if (this.state.word.length !== 5) {
            this.setWord(`${this.state.word}${letter}`);
        }
    }

    private deleteLetter() {
        this.setWord(this.state.word.slice(0, this.state.word.length - 1));
    }

    private submit() {
        if(this.validateWord(this.state.word)){
        this.props.onSubmit(this.state.word);
        this.setState({ ...this.state, word: '' });
        }
        else{
            this.setState({...this.state, valid: false});
            setTimeout(() => {this.setState({...this.state, valid: true})}, 2000)
        }
    }

    private mapToLetter(value: string): Letter {
        return { value, state: this.getState(value) } as Letter;
    }

    private getState(value: string): LetterState | null {
        const matched = this.props.matchedLetters.find(x => x.value.toLocaleLowerCase() === value.toLocaleLowerCase());
        if (matched) {
            return matched.state;
        }
        const unmatched = this.props.unmatchedLetters.find(x => x.value.toLocaleLowerCase() === value.toLocaleLowerCase());
        if (unmatched) {
            return unmatched.state;
        }
        return null;
    }

    private validateWord(word: string): boolean{
        return words.includes(word.toLocaleLowerCase());
    }

    render(): React.ReactNode {
        return (<div className="input-panel">
            <input className={classNames({"word-input": true, invalid: !this.state.valid})}  type="text" maxLength={5} readOnly={true} placeholder="Word" onChange={this.submitWord.bind(this)} value={this.state.word}></input>
            {
               this.state.valid? null:  <p className="invalid">Invalid Word!</p>
            }
            {/* keyboard start */}
            <div>
                {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(x => {
                    return <InputTile letter={this.mapToLetter(x)} onClick={this.addLetter.bind(this)} key={x}></InputTile>
                })}
            </div>
            <div>
                {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map(x => {
                    return <InputTile letter={this.mapToLetter(x)} onClick={this.addLetter.bind(this)} key={x}></InputTile>
                })}
            </div>
            <div>
                {["Z", "X", "C", "V", "B", "N", "M"].map(x => {
                    return <InputTile letter={this.mapToLetter(x)} onClick={this.addLetter.bind(this)} key={x}></InputTile>
                })}
            </div>

            {/* keyboard end*/}

            <input type="button" className="btn" disabled={this.state.word.length === 0} value="DEL" onClick={this.deleteLetter.bind(this)} ></input>
            <input type="button" value={"GO"} className={classNames({
                btn: true,
                "btn-primary": this.state.word.length === 5
            })} disabled={this.state.word.length !== 5} onClick={this.submit.bind(this)}></input>
        </div>)
    }
}