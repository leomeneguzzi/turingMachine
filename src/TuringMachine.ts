import { Transitions } from './Transitions';
import { Transition } from './Transition';
export class TuringMachine{

    static testTape(inputTape : Array<string>, transitions : Transitions, positionTape : number = 0, transition : Transition = transitions.initTransition) : boolean{
        if(inputTape[positionTape] == transition.read) {
            inputTape[positionTape] = transition.write;
            positionTape += transition.directionToInt();
            if(transition.targetState != 'H'){
                transition = transitions.getTransitionByEntryState(transition.targetState);
                console.log(transition);
                this.testTape(inputTape, transitions, positionTape, transition);
            }else{
                return true;
            }
        }else{
            return false;
        }
    }
}