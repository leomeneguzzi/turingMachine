import { Transitions } from './Transitions';
import { Transition } from './Transition';
import { clone } from 'lodash';

export function textAreaToTransition(textArea : JQuery) : Transitions[]{
    let _transitions : Transitions[] = [];
    //[].concat((textArea.val() as string).split(/\r?\n/)).map((transition : string)=> _transitions.pushTransition(new Transition(...transition.split(','))));
    //console.log([].concat((textArea.val() as string).split('**').map( (transitions:string) => transitions.split(/\r?\n/).filter( (transition) => Boolean(transition)).map((transition : string)=> transition.split(',')))));
    [].concat((textArea.val() as string).split('**').map( (transitions:string, index) => { _transitions.push(new Transitions()); transitions.split(/\r?\n/).filter( (transition) => Boolean(transition)).map((transition : string)=> _transitions[index].pushTransition(new Transition(...transition.split(','))))}));
    return _transitions;
}

export function textAreaToTapes(textArea : JQuery) : string[][]{
    return [].concat((textArea.val() as string).split(/\r?\n/)).map( (element : string) => element.split(/[:,]+/))
}