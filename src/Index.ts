import {Transitions} from './Transitions';
import { Transition } from './Transition';
import { TuringMachine } from './TuringMachine';

$('.form').submit(function (event){
    event.preventDefault();
    let _transitionsHTML = $('#transitions');
    let _inputTapeHTML = $('#inputTape');
    //console.log([].concat((_transitions.val() as string).split(/\r?\n/)));
    let _turingMachine = new TuringMachine();
    _turingMachine.inputTapes = [].concat((_inputTapeHTML.val() as string).split(/\r?\n/)).map( (element : string) => element.split(','));
    [].concat((_transitionsHTML.val() as string).split(/\r?\n/)).map((transition : string)=> _turingMachine.transitions.pushTransition(new Transition(...transition.split(','))));
    _turingMachine.initState = $('#initState').val().toString();
    console.log(_turingMachine.testTapes());
    console.log(_turingMachine.outputTapes);
});