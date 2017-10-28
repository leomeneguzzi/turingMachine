import {clone} from "lodash";
import { Tape } from "./Tape";
import { Tapes } from "./Tapes";
import {Transition} from "./Transition";
import {Transitions} from "./Transitions";

export function textAreaToTransition(__textArea: JQuery): Transitions[]{
    const _transitions: Transitions[] = [];
    [].concat(
        (__textArea.val() as string).split("**").map((transitions: string, index) => {
             _transitions.push(new Transitions());
             transitions.split(/\r?\n/).filter(
                (transition) => Boolean(transition)).map(
                    (transition: string) => _transitions[index].push(new Transition(...transition.split(",")))
                )
        })
    );
    return _transitions;
}

export function textAreaToTapes(textArea: JQuery): Tapes{
    const __tapesArea = (textArea.val() as string).split(/\r?\n/).map( (element: string) => element.split(/[:,]+/));
    const __tapesPositions = [].concat(...__tapesArea.map((value) => Number(value.splice(-1, 1))));
    const __tapes = new Tapes();
    __tapesArea.map((__tape: string[], __index: number) => __tapes.push(new Tape(__tape, __tapesPositions[__index])));

    return __tapes;
}