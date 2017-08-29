import { Transitions } from './Transitions';
import { Transition } from './Transition';
import {clone, cloneDeep} from 'lodash';
export class TuringMachine{

    private _transitions = new Transitions();
    private _inputTapes : string[][];
    private _outputTapes : string[][];
    private _initState : string;

    testTapes(inputTapes : string[][] = this.inputTapes, transitions : Transitions = this.transitions, positionTape : number = 0, state : string = this.initState) : boolean[]{
        return clone(inputTapes.map( (inputTape) => this.testTape(inputTape,transitions)));
    }

    testTape(inputTape : string[] = this.inputTapes[0], transitions : Transitions = this.transitions, positionTape : number = 0, state : string = this.initState) : boolean{
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

    private getTransition(transitions : Transition[], tapeValue : string) : Transition{
        return clone(transitions.find((transition : Transition) => transition.read == tapeValue));
    }

    public get alphabet() :string[] {
        return [].concat(this.inputTapes.map((element, index, self) => index == self.indexOf(element)));
    }

    public get initState(): string {
		return clone(this._initState);
	}
	public set initState(initState: string) {
		this._initState = clone(initState);
    }

    public get endState(): string {
        return clone(this.transitions.toArray.find((transition : Transition) => transition.targetState == 'H').entryState);
	}

    public get transitions(): Transitions {
		return clone(this._transitions);
	}

	public set transitions(transition: Transitions) {
		this._transitions = clone(transition);
    }
    
    public get inputTapes():string[][] {
		return cloneDeep(this._inputTapes);
	}

	public set inputTapes(inputTape: string[][]) {
		this._inputTapes = cloneDeep(inputTape);
    }
    
    public get outputTapes():string[][] {
		return cloneDeep(this._outputTapes);
	}

	public set outputTapes(outputTapes: string[][]) {
		this._inputTapes = cloneDeep(outputTapes);
	}
}