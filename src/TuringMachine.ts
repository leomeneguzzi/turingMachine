import {clone, cloneDeep, isEqual, zip} from "lodash";
import {Tape} from "./Tape";
import { Tapes } from "./Tapes";
import { Transition } from "./Transition";
import {Transitions} from "./Transitions";

export class TuringMachine{
    private _blocksTransitions: Transitions[];
    private _inputTapes: Tapes = new Tapes();
    private _outputTapes: Tapes = new Tapes();
    private _initState: string;
    private _finalState: string;

    public testTapes(
        __inputTapes: Tapes = this._inputTapes,
        __blockTransitions: Transitions[] = this._blocksTransitions,
        __actualState: string = this._initState
    ): boolean{

        __inputTapes.fixTapes();
        const __filteredTransitions = this.checkTransitions(__inputTapes, __blockTransitions, __actualState);
        if (__filteredTransitions !== undefined){
            __filteredTransitions.map((__transition, __index) => {
                __inputTapes.getTape(__index).actualElement = __transition.write;
                __inputTapes.getTape(__index).position += __transition.directionToInt();
            });
            this._outputTapes = __inputTapes;

            return this.isEndTransition(__filteredTransitions[0]) ?
            true :
                this.testTapes(
                    __inputTapes,
                    __blockTransitions,
                    __filteredTransitions[0].targetState
                );
        } else {
            this._outputTapes = __inputTapes;
            return false;
        }
    }

    private checkTransitions(
        __inputTapes: Tapes,
        __blockTransitions: Transitions[],
        __actualState: string
    ): Transition[] {
        return __blockTransitions[0].getValidIndex(__actualState, __inputTapes.getTape(0)).map((__index: number) =>
            __blockTransitions.map((__transitions: Transitions, __blockIndex: number) =>
                __transitions.isValidTransition(__index,  __inputTapes.getTape(__blockIndex))
            )
        ).find((__transitions: Transition[]) => __transitions.length === this._blocksTransitions.length);
    }

    public get blockTransitions(): Transitions[]{
		return this._blocksTransitions;
	}

	public set blockTransitions(__value: Transitions[]){
		this._blocksTransitions = clone(__value);
    }

	public get initState(): string{
		return this._initState;
	}

	public set initState(__value: string){
		this._initState = __value;
    }

    public isEndTransition(__transition: Transition): boolean{
        return __transition.targetState === this._finalState ? true : false;
    }

	public addTransitions(__value: Transitions){
		this._blocksTransitions.concat(clone(__value));
    }

	public get inputTapes(): Tapes {
		return this._inputTapes;
	}

	public set inputTapes(value: Tapes) {
		this._inputTapes = value;
    }

	public get outputTapes(): Tapes {
		return this._outputTapes;
	}

	public set outputTapes(value: Tapes) {
		this._outputTapes = value;
    }

	public get finalState(): string {
		return this._finalState;
	}

	public set finalState(value: string) {
		this._finalState = value;
    }

    public getBlocksTransitionsAlphabet(): string[]{
        return [].concat(...this._blocksTransitions.map(
            (__blockTransition: Transitions) => __blockTransition.getAlphabet()
        )).filter((__value, __index, __self) => __self.indexOf(__value) === __index);
    }
}