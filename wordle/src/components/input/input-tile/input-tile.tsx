import React from "react"
import { Letter } from "../../../models/letter";
import { Tile } from "../../grid/tile/tile";

export type Props = {
    onClick: (letter: string) => void,
    letter: Letter
}

export class InputTile extends React.Component<Props>{
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (<div className="input-tile" onClick={() => this.props.onClick(this.props.letter.value)}><Tile letter={this.props.letter}></Tile></div>)
    }

}