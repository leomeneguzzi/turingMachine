import { Transitions } from './Transitions';
import { Transition } from './Transition';
import { TuringMachine } from './TuringMachine';
import { textAreaToTransition,textAreaToTapes } from './utils';

$('.form').submit(function (event){
    event.preventDefault();
    let _turingMachine = new TuringMachine();
    let _output = ($('#output'));
    _turingMachine.inputTapes = textAreaToTapes($('#inputTape'));
    _turingMachine.transitions = textAreaToTransition($('#transitions'));
    _turingMachine.transitions.initState = $('#initState').val().toString();
    _output.val(`Estados: ${_turingMachine.transitions.states}\nAlfabeto dos estados: ${_turingMachine.transitions.alphabet}\nAlfabeto do fita: ${_turingMachine.alphabet}\nEstado inicial: ${_turingMachine.transitions.initState}\nEstado inicial: ${_turingMachine.endTransition().entryState}\n${_turingMachine.testTapes()}\nFitas de saída: ${_turingMachine.outputTapes}`);
    //estados
    //alfabeto dos estados
    //alfabeto da fita
    //estado inicial
    //estado final
    //transições
});