import { Transition } from './Transition';
import {clone} from 'lodash';
export class Transitions {
    private _transitions : Transition[] = [];


    pushTransition(transition: Transition): void {
        this._transitions.push(transition);
    }

    get toArray(): Transition[] {
        return clone(this._transitions);
    }
    getTransitionByEntryState(state : string) : Transition[]{
        return clone(this._transitions.filter((transition : Transition) => transition.entryState == state));
    }

    get alphabetTransitions() : string[]{
        return [].concat(...this._transitions.map((transition,index,self) => [].concat(transition.read,transition.write)))
                              .filter((value,index,self) => self.indexOf(value) === index);
    }

}