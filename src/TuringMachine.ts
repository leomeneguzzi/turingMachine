import { Transitions } from './Transitions';
import { Transition } from './Transition';
export class TuringMachine{

    private _transitions = new Transitions();
    private _inputTapes : Array < Array < string > >;
    private _initState : string;

    testTapes(inputTapes : Array < Array < string > > = this.inputTapes, transitions : Transitions = this.transitions, positionTape : number = 0, state : string = this._initState) : Array < boolean >{
        return [].concat(inputTapes.map( (inputTape) => this.testTape(inputTape,transitions)));
    }

    testTape(inputTape : Array<string> = this.inputTapes[0], transitions : Transitions = this.transitions, positionTape : number = 0, state : string = this._initState) : boolean{
        let transition = this.getTransition(transitions.getTransitionByEntryState(state), inputTape[positionTape]);
        if(transition != undefined) {
            inputTape[positionTape] = transition.write;
            positionTape += transition.directionToInt();
            state = transition.targetState;
            return transition.entryState != this.endState ? 
            this.testTape(inputTape, transitions, positionTape, state) : true;
        }else{
            return false;
        }
    }

    private getTransition(transitions : Array < Transition >, tapeValue : string) : Transition{
        return transitions.find((transition : Transition) => transition.read == tapeValue);
    }

    public get alphabet() : Array<string> {
        //return [].concat(this._inputTapes.filter((element, index, self) => index == self.indexOf(element)));
        console.log(this.inputTapes);
        return [].concat(this._inputTapes.map((element, index, self) => index == self.indexOf(element)));
    }

    public get initState(): string {
		return this._initState;
	}
	public set initState(value: string) {
		this._initState = value;
    }

    public get endState(): string {
        return this.transitions.transitions.find((transition : Transition) => transition.targetState == 'H').entryState;
	}

    public get transitions(): Transitions {
		return this._transitions;
	}

	public set transitions(value: Transitions) {
		this._transitions = value;
    }
    
    public get inputTapes(): Array < Array < string > > {
		return new Array().concat(this._inputTapes);
	}

	public set inputTapes(value: Array < Array < string > >) {
		this._inputTapes = [].concat(value);
	}
}