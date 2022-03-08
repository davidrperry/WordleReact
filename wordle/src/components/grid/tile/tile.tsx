import React from "react";
import { Letter } from "../../../models/letter";
import { LetterState } from "../../../models/letter-state";
import './tile.css';

export class Tile extends React.Component<{letter:Letter}>{
    constructor(props: {letter:Letter} ){
        super(props);
    }

    render(): React.ReactNode {
        return (<span className={this.getClass(this.props.letter.state)}>{this.props.letter.value}</span>)
    }

    private getClass(state: LetterState): string{
        switch(state){
            case LetterState.correct: {
                return "correct";
            }
            case LetterState.incorrect:{
                return "incorrect";
            }
            case LetterState.partial:{
                return "partial";
            }
            default:{
                return "empty"
            }
        }
    }

}