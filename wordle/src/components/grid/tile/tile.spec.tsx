import { render, screen } from "@testing-library/react";
import { Letter } from "../../../models/letter";
import { LetterState } from "../../../models/letter-state";
import { Tile } from "./tile";

describe("Tile", () => {

    let tileLetter: Letter;

    beforeEach(() => {
        tileLetter = {
            value: 'A'
        } as Letter;
    });

    it('should have class correct if letter correct', () => {
        tileLetter.state = LetterState.correct;
        render(<Tile letter={tileLetter}> </Tile>);
        const item = screen.getByText('A');
        expect(item.classList.contains('correct'));
    });
     it('should have partial class if letter partial', () => {
        tileLetter.state = LetterState.partial;
        render(<Tile letter={tileLetter}> </Tile>);
        const item = screen.getByText('A');
        expect(item.classList.contains('partial'));
     });
    it('should have class incorrect if letter incorrect', () => {
        tileLetter.state = LetterState.incorrect;
        render(<Tile letter={tileLetter}> </Tile>);
        const item = screen.getByText('A');
        expect(item.classList.contains('incorrect'));
    });
});