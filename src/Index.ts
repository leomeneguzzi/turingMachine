import { Transitions } from './Transitions';
import { Transition } from './Transition';
import { TuringMachine } from './TuringMachine';
import { textAreaToTransition,textAreaToTapes } from './utils';

$('.form').submit(function (event){
    event.preventDefault();
    let _turingMachine = new TuringMachine();
    let _output = ($('#output'));
    let temp = textAreaToTapes($('#inputTape'));
    _turingMachine.tapesPositions = [].concat(...temp.map((value)=>Number(value.splice(-1,1))));
    _turingMachine.inputTapes = temp;
    _turingMachine.transitions = textAreaToTransition($('#transitions'));
    _turingMachine.initState = $('#initState').val().toString();
    _output.val(`Estados: ${_turingMachine.transitions[0].states}\nAlfabeto dos estados: ${_turingMachine.transitions[0].alphabet}\nAlfabeto da fita: ${_turingMachine.alphabet}\nEstado inicial: ${_turingMachine.initState}\nEstado final: ${_turingMachine.endTransition(_turingMachine.transitions[0]).entryState}\n${_turingMachine.testTapes()}\nFitas de saída: ${_turingMachine.outputTapes.map((value)=>value.concat('\n'))}`);
});