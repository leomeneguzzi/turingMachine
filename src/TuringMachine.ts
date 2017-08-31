import { Transitions } from './Transitions';
import { Transition } from './Transition';
import {clone, cloneDeep, isEqual} from 'lodash';
export class TuringMachine{

    private _transitions = new Transitions();
    private _inputTapes : string[][] = [].concat('-');
    private _outputTapes : string[][] = [];
    private _initState : string;

    testTapes(inputTapes : string[][] = this.inputTapes, transitions : Transitions = this.transitions, positionTape : number = 0, state : string = this.initState) : boolean[]{
        return clone(inputTapes.map( (inputTape,index) => this.testTape(inputTape, index,transitions)));
    }

    testTape(tape : string[] = this.inputTapes[0], index : number = 0, transitions : Transitions = this.transitions, positionTape : number = 0, state : string = this.initState) : boolean{
        if(positionTape == -1) { tape.unshift('-'); positionTape+=1;}
        this._outputTapes[index] = tape;
        //console.log(this._outputTapes[index]);
        let transition = this.getTransition(transitions.getTransitionByEntryState(state), tape[positionTape]);
        if(transition != undefined) {
            tape[positionTape] = transition.write;
            return isEqual(transition, this.endTransition()) ? 
                true : 
                    this.testTape(  tape,
                        index,
                        transitions, 
                        positionTape += transition.directionToInt(),
                        transition.targetState
                    );
        }else return false;
    }

    private getTransition(transitions : Transition[], tapeValue : string) : Transition{
        return clone(transitions.find((transition : Transition) => transition.read == tapeValue));
    }

    public get alphabet() :string[] {
        return [].concat(this.inputTapes.map((tape) => [].concat(tape,this.transitions.alphabetTransitions).filter((value,index,self) => self.indexOf(value) === index)));
    }

    public get initState(): string {
		return clone(this._initState);
	}
	public set initState(initState: string) {
		this._initState = clone(initState);
    }

    public endTransition(transitions = this.transitions): Transition {
        return clone(transitions.toArray.find((transition) => transition.targetState == 'H'));
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

	public set inputTapes(inputTapes: string[][]) {
		this._inputTapes = cloneDeep(inputTapes.map((tape) => tape.concat('-')));
    }
    
    public get outputTapes():string[][] {
		return cloneDeep(this._outputTapes);
	}
}