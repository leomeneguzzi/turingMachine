import { Transitions } from './Transitions';
import { Transition } from './Transition';
import { TuringMachine } from './TuringMachine';
import { textAreaToTransition,textAreaToTapes } from './utils';

$('.form').submit(function (event){
    event.preventDefault();
    let _turingMachine = new TuringMachine();
    _turingMachine.inputTapes = textAreaToTapes($('#inputTape'));
    _turingMachine.transitions = textAreaToTransition($('#transitions'));
    _turingMachine.transitions.initState = $('#initState').val().toString();
    console.log(_turingMachine.testTapes());
});