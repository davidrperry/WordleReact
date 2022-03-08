import classNames from "classnames";
import React from "react";
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

    private setWord(event: any) {
        this.setState({ ...this.state, word: event.target.value });
    }


    private submit() {
        this.props.onSubmit(this.state.word);
        this.setState({ ...this.state, word: '' });
    }

    render(): React.ReactNode {
        return (<div className="input-panel">
            <input className="word-input" type="text" maxLength={5} placeholder="Word" onChange={this.setWord.bind(this)} value={this.state.word}></input>
            <input type="button" value={"Go"} className={classNames({
                btn: true,
                "btn-primary": this.state.word.length === 5
            })} disabled={this.state.word.length !== 5} onClick={this.submit.bind(this)}></input>
        </div>)
    }
}