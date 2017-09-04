import { Transition } from './Transition';
import {clone} from 'lodash';
export class Transitions {
    private _initState : string;
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
        return [].concat(
            ...this._transitions.map((transition,index,self) => {
                return [].concat(transition.read,transition.write)
            })).filter((value,index,self) => self.indexOf(value) === index);
    }

    get states() : string[]{
        return [].concat(
            ...this._transitions.map((transition,index,self) => {
                return [].concat(transition.entryState,transition.targetState)
            })).filter((value,index,self) => (self.indexOf(value) === index) && (value != 'H'));
    }

	public get initState(): string {
		return this._initState;
	}

	public set initState(value: string) {
        this._initState = value;
	}
    

}