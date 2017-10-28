import { Tape } from "./Tape";
import { Tapes } from "./Tapes";
import { Transition } from "./Transition";
import { Transitions } from "./Transitions";
import { TuringMachine } from "./TuringMachine";
import { textAreaToTapes, textAreaToTransition } from "./utils";

$(".form").submit((__event) => {
    __event.preventDefault();
    const __turingMachine = new TuringMachine();
    const __output = ($("#output"));
    __turingMachine.inputTapes = textAreaToTapes($("#inputTape"));
    __turingMachine.blockTransitions = textAreaToTransition($("#transitions"));
    __turingMachine.initState = $("#initState").val().toString();
    __turingMachine.finalState = $("#finalState").val().toString();

    __output.val(
        `Estados: ${__turingMachine.blockTransitions[0].getStates()}
Alfabeto dos estados: ${__turingMachine.getBlocksTransitionsAlphabet()}
Alfabeto das fitas: ${__turingMachine.inputTapes.getAlphabet()}
Estado inicial: ${__turingMachine.initState}
Estado final: ${__turingMachine.finalState}
A maquina é ${__turingMachine.testTapes() ? "válida" : "inválida"}
Fitas de saída: ${__turingMachine.outputTapes.toArray().map((__tape) => __tape.elements.concat("\n"))}`);
});