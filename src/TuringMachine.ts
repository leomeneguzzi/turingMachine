import { Transitions } from './Transitions';
import { Transition } from './Transition';
import {clone, cloneDeep, isEqual, zip} from 'lodash';
export class TuringMachine{

    private _transitions : Transitions[];
    private _inputTapes : string[][] = [].concat('-');
    private _tapesPositions : number[] = [];
    private _outputTapes : string[][] = [];
    private _initState : string;

    testTapes(inputTapes : string[][] = this.inputTapes, transitions : Transitions[] = this.transitions, tapePosition : number = 0, state : string = this._initState) : boolean{
        //this.testTape(inputTape, index, transitions);
        return this.testTape(inputTapes[0], 0, transitions[0]);
    }

    testTape(tape : string[] = this.inputTapes[0], index : number = 0, transitions : Transitions = this.transitions[0], tapePosition : number = 0, state : string = this._initState) : boolean{
        console.log(tape);
        if(tapePosition == -1) { tape.unshift('-'); tapePosition+=1;}
        this._outputTapes[index] = tape;
        let transition = this.getTransition(transitions, state, tape[tapePosition]);
        if(transition != undefined) {
            tape[tapePosition] = transition.write;
            return isEqual(transition, this.endTransition(transitions)) ? 
                true : 
                    this.testTape(
                        tape,
                        index,
                        transitions, 
                        tapePosition += transition.directionToInt(),
                        transition.targetState
                    );
        }else return false;
    }

    private getTransition(actualTransitions: Transitions,state : string, tapeValue : string) : Transition{
        //console.log(this._tapesPositions);
        let _transtition = actualTransitions.getTransitionByEntryState(state).find((transition : Transition) => transition.read == tapeValue);
        if(_transtition == undefined) return undefined;
        let _transitions = this.transitions.map((transitions : Transitions) => transitions.getTransitionByStates(_transtition.entryState,_transtition.targetState));
        let temp = _transitions.map((value) => value[0]).filter((value,index)=> value.read == this._outputTapes[index][this._tapesPositions[index]]);
        console.log(this._tapesPositions);
        if (temp.length == this._transitions.length){
            temp.map((value,index) => {
                this._outputTapes[index][this._tapesPositions[index]] = value.write;
                this._tapesPositions[index] += value.directionToInt();
                if (this._tapesPositions[index] == -1){this._outputTapes[index].unshift('-'); this._tapesPositions[index] +=1;}  ;
            });
            return _transtition;
        } else return undefined;
    }

    public get alphabet() :string[] {
        return [].concat(...this.inputTapes).filter((value,index,self) => self.indexOf(value) === index);
    }

    public endTransition(transitions : Transitions): Transition {
        return clone(transitions.toArray.find((transition) => transition.targetState == 'H'));
	}

    public get transitions(): Transitions[] {
		return this._transitions;
	}

	public set transitions(transition: Transitions[]) {
		this._transitions = clone(transition);
    }

	public addTransitions(transition: Transitions) {
		this._transitions.concat(clone(transition));
    }
    
    public get inputTapes():string[][] {
		return cloneDeep(this._inputTapes);
	}

	public set inputTapes(inputTapes: string[][]) {
        this._inputTapes = cloneDeep(inputTapes.map((tape) => tape.concat('-')));
        this._inputTapes.map(() => this._tapesPositions.push(0));
        this._outputTapes = clone(this._inputTapes);
    }
    
    public get outputTapes():string[][] {
		return cloneDeep(this._outputTapes);
    }

	public get initState(): string {
		return this._initState;
	}

	public set initState(value: string) {
		this._initState = value;
    }

	public get tapesPositions(): number[]  {
		return this._tapesPositions;
	}

	public set tapesPositions(value: number[] ) {
		this._tapesPositions = value;
	}
    
    
}