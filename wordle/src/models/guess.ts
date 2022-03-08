import { Letter } from "./letter";

export interface Guess{
    letters: ReadonlyArray<Letter>;
    correct: boolean;
}