import { Transition } from './Transition';
export class Transitions {
    private _transitions : Array<Transition> = [];
    private _initState : string;
    private _endState : string;

    push(transition: Transition): void {
        this._transitions.push(transition);
    }

    toArray(): Array < Transition > {
        return [].concat(this._transitions);
    }

    getTransitionByEntryState(state : string) : Array < Transition >{
        return [].concat(this._transitions.filter((transition : Transition) => transition.entryState == state));
    }

    public get initState(): string {
		return this._initState;
	}
	public set initState(value: string) {
		this._initState = value;
    }

    public get endState(): string {
		return this._endState;
	}
	public set endState(value: string) {
		this._endState = value;
    }
}