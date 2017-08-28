import { Transition } from './Transition';
export class Transitions {
    private _transitions : Array<Transition> = [];
    private _initTransition : Transition;
    private _endTransition : Transition;

    push(transition: Transition): void {
        this._transitions.push(transition);
    }

    toArray(): Array < Transition > {
        return [].concat(this._transitions);
    }

    getTransitionByEntryState(state : String){
        return this._transitions.find((transition : Transition) => transition.entryState == state);
    }

    public get initTransition(): Transition {
		return this._initTransition;
	}
	public set initTransition(value: Transition) {
		this._initTransition = value;
    }

    public get endTransition(): Transition {
		return this._endTransition;
	}
	public set endTransition(value: Transition) {
		this._endTransition = value;
    }
}