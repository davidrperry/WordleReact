import exp from "constants";
import { Letter } from "../models/letter";
import { LetterState } from "../models/letter-state";
import { words } from "../shared/words";
import { GameState as GameStateService } from "./game-state.service";

describe("Game App Service", () => {

    let service: GameStateService
    beforeEach(() => {
        service = new GameStateService();
    })

    it("should start with guess count 0", () => {
        expect(service.guessCount).toBe(0);
    });
    it("should start with word from word list", () => {
        expect(words.includes(service.gameWord)).toBeTruthy();
    });
    it("should start with start with six empty guesses", () => {
        expect(service.guesses.length).toBe(6);
        expect(service.guesses[0].correct).toBeFalsy();
        expect(service.guesses[0].letters.filter(x => !x.state).length).toBe(5);
    });

    it("should start the game in playing state", () => {
        expect(service.gameState).toBe(1);
    });


    describe("addMatchedLetter", () => {
        it("should add letter to matched letters when empty", () => {
            const letter = <Letter>{
                state: LetterState.partial,
                value: 'A'
            };
            service.addMatchedLetter(letter);
            expect(service.matchedLetters.indexOf(letter)).toBeGreaterThan(-1);
        });
        it("should not affect letter when already exists", () => {
            const letter = <Letter>{
                state: LetterState.partial,
                value: 'A'
            };

            const duplicate = <Letter>{
                state: LetterState.partial,
                value: 'A'
            };
            
            service.addMatchedLetter(letter);
            service.addMatchedLetter(duplicate);
            expect(service.matchedLetters.indexOf(letter)).toBeGreaterThan(-1);
            expect(service.matchedLetters.indexOf(duplicate)).toEqual(-1);
        });

        it("should overwrite letter when it already exists", () => {
            const partial = <Letter>{
                state: LetterState.partial,
                value: 'A'
            };

            const correct = <Letter>{
                state: LetterState.correct,
                value: 'A'
            };
            
            service.addMatchedLetter(partial);
            service.addMatchedLetter(correct);
            expect(service.matchedLetters.indexOf(correct)).toBeGreaterThan(-1);
            expect(service.matchedLetters.indexOf(partial)).toEqual(-1);
        });

        it("should remove from unmatched when added to matched", () => {
            const incorrect = <Letter>{
                state: LetterState.incorrect,
                value: 'A'
            };
            (service as any)._unmatchedLetters = [incorrect];

            const correct = <Letter>{
                state: LetterState.correct,
                value: 'A'
            };

            service.addMatchedLetter(correct);

            expect(service.unmatchedLetters.length).toEqual(0);

        });
    });


    describe("AddUnmatchedLetter", () => {
        it("should add when does not already exist", () => {
            const letter = <Letter>{
                state: LetterState.partial,
                value: 'A'
            };
            service.addUnmatchedLetter(letter);
            expect(service.unmatchedLetters.indexOf(letter)).toBeGreaterThan(-1);
        });

        it("should not add when already exists", () => {
            const letter = <Letter>{
                state: LetterState.partial,
                value: 'A'
            };

            const duplicate = <Letter>{
                state: LetterState.partial,
                value: 'A'
            };
            
            service.addUnmatchedLetter(letter);
            service.addUnmatchedLetter(duplicate);
            expect(service.unmatchedLetters.indexOf(letter)).toBeGreaterThan(-1);
            expect(service.unmatchedLetters.indexOf(duplicate)).toEqual(-1);
        });

        it("should not add when exists in matched already", () => {
            const incorrect = <Letter>{
                state: LetterState.incorrect,
                value: 'A'
            };

            const correct = <Letter>{
                state: LetterState.correct,
                value: 'A'
            };

            (service as any)._matchedLetters = [correct];

            service.addUnmatchedLetter(incorrect);

            expect(service.unmatchedLetters.length).toEqual(0);
        });
    });
});