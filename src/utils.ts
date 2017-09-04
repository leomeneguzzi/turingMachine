import { Transitions } from './Transitions';
import { Transition } from './Transition';

export function textAreaToTransition(textArea : JQuery) : Transitions{
    let _transitions = new Transitions();
    [].concat((textArea.val() as string).split(/\r?\n/)).map((transition : string)=> _transitions.pushTransition(new Transition(...transition.split(','))));
    return _transitions;
}

export function textAreaToTapes(textArea : JQuery) : string[][]{
    return [].concat((textArea.val() as string).split(/\r?\n/)).map( (element : string) => element.split(','))
}