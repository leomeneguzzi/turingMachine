import { Transitions } from './Transitions';
import { Transition } from './Transition';
export class TuringMachine{

    static testTape(inputTape : Array<string>, transitions : Transitions, positionTape : number = 0, state : string = transitions.initState) : boolean{
        let transition = this.testTransitions(transitions.getTransitionByEntryState(state), inputTape[positionTape]);
        if(transition != undefined) {
            inputTape[positionTape] = transition.write;
            positionTape += transition.directionToInt();
            state = transition.targetState;
            return transition.targetState != 'H' ? 
            this.testTape(inputTape, transitions, positionTape, state) : true;
        }else{
            return false;
        }
    }

    private static testTransitions(transitions : Array < Transition >, tapeValue : string) : Transition{
        return transitions.find((transition : Transition) => transition.read == tapeValue);
    }
}