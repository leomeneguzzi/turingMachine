import { Transition } from './Transition';
export class Transitions {
    private _transitions : Array<Transition> = [];


    pushTransition(transition: Transition): void {
        this._transitions.push(transition);
    }

    get transitions(): Array < Transition > {
        return [].concat(this._transitions);
    }
    getTransitionByEntryState(state : string) : Array < Transition >{
        return [].concat(this._transitions.filter((transition : Transition) => transition.entryState == state));
    }

}