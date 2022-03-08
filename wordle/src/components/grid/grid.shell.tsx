import { v4 as uuid } from 'uuid';
import React from "react";
import { Guess } from "../../models/guess";
import { DisplayRow } from "./display-row/display-row";
import './grid.shell.css';
export class GridShell extends React.Component<{guesses: ReadonlyArray<Guess>}>{

    constructor(props: {guesses: ReadonlyArray<Guess>, onSubmit: Function}){
        super(props);
    }

    render(): React.ReactNode {
        return (<div id="display-grid"> <DisplayRow correct={false} letters={[]}/>
            {this.props.guesses.map(x => {
                return (<DisplayRow correct={x.correct} letters={x.letters} key={uuid()}></DisplayRow>);
            })}
        </div>);
    }
}