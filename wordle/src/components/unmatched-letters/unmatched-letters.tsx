import { v4 as uuid } from 'uuid';
import React from "react";
import { Letter } from "../../models/letter";
import { Tile } from "../grid/tile/tile";

export class UnmatchedLetters extends React.Component<{letters:Array<Letter>}>{
    constructor(props: {letters: Array<Letter>}){
        super(props);
    }
    render(){
        return(<div>
                {this.props.letters.map(x => {
                return (<Tile letter={x} key={uuid()}></Tile>)
            })}
        </div>)
    }
}