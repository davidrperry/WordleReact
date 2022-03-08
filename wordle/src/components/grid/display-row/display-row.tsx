import { v4 as uuid } from 'uuid';
import React from "react";
import { Guess } from "../../../models/guess";
import { Tile } from "../tile/tile";
import './display-row';


export class DisplayRow extends React.Component<Guess>{
    constructor(props: Guess){
        super(props)
    }
    render(): React.ReactNode {
        return(<div className="row">
            {this.props.letters.map(x => {
                return (<Tile letter={x} key={uuid()}></Tile>)
            })}
            </div>
        )
    }
}