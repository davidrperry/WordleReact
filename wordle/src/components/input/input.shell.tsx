import classNames from "classnames";
import React from "react";
import { Letter } from "../../models/letter";
import { InputTile } from "./input-tile/input-tile";
import './input.shell.css';

export class InputShell extends React.Component<{ onSubmit: any }> {

    state: {
        word: string
    }

    constructor(props: { onSubmit: any }) {
        super(props);
        this.state = {
            word: ''
        }
    }

    private submitWord(event: any) {
        this.setWord(event.target.value);
    }


    private setWord(word: string) {
        this.setState({ ...this.state, word: word });
    }

    addLetter(letter: string) {
        if (this.state.word.length !== 5) {
            this.setWord(`${this.state.word}${letter}`);
        }
    }

    deleteLetter() {
        this.setWord(this.state.word.slice(0, this.state.word.length - 1));
    }

    private submit() {
        this.props.onSubmit(this.state.word);
        this.setState({ ...this.state, word: '' });
    }

    private mapToLetter(value: string): Letter {
        return { value } as Letter;
    }

    render(): React.ReactNode {
        return (<div className="input-panel">
            <input className="word-input" type="text" maxLength={5} readOnly={true} placeholder="Word" onChange={this.submitWord.bind(this)} value={this.state.word}></input>
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