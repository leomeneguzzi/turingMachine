// import * as cytoscape from "cytoscape";
import { Tape } from "./Tape";
import { Tapes } from "./Tapes";
import { Transition } from "./Transition";
import { Transitions } from "./Transitions";
import { TuringMachine } from "./TuringMachine";
import { textAreaToTapes, textAreaToTransition } from "./utils";
declare var download: any;
declare var cytoscape: any;
let cy: any;

$("#executeMachine").submit((__event) => {
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

$("#generateNodes").submit( (__event) => {
    __event.preventDefault();
    generateNodes();
})

$("#saveNodes").submit( (__event) => {
    __event.preventDefault();
    saveNodes();
})

async function generateNodes(){
    const __turingMachine = new TuringMachine();
    __turingMachine.blockTransitions = textAreaToTransition($("#transitions"));
    cy = cytoscape({
        container: document.getElementById("cy"),
        elements: [],
        style: [ // the stylesheet for the graph
            {
              selector: "node",
              style: {
                "background-color": "#111",
                "label": "data(id)",
                "width": 60,
                "height": 60
              }
            },
            {
              selector: "edge",
              style: {
                "width": 1,
                "line-color": "#333",
                "target-arrow-color": "#000",
                "target-arrow-shape": "triangle",
                "target-arrow-fill": "hollow",
                "arrow-scale": "2",
                "control-point-step-size": 50,
                "curve-style": "bezier",
                "label": "data(label)",
                "loop-direction": "180deg",
                "text-background-color": "#BBB",
                "text-background-opacity": 0.8
              }
            }
        ],
        zoom: 1,
        minZoom: 0.5,
        maxZoom: 1
    });
    __turingMachine.blockTransitions[0].getStates().map((__state) => {
        cy.add([
            { group: "nodes", data: { id:  __state}}
        ])
    });

    __turingMachine.blockTransitions[0].toArray().map((__transition, __index) => {
        const label = __turingMachine.blockTransitions.map((__blockTransition) => {
            const __transition = __blockTransition.toArray()[__index];
            return `${__transition.read}; ${__transition.write}, ${__transition.direction}`
        });
        cy.add([{
            group: "edges",
            data: {
                id: "e" + __index,
                source: __transition.entryState,
                target: __transition.targetState,
                label: label.join(" | ")
            }
        }])
    });

    const options = {
        name: "cose",
        nodeDimensionsIncludeLabels: true,
        randomize: true,
        nodeRepulsion: 20000000,
        edgeElasticity: 50,
        nodeOverlap: 4
    };
    cy.layout(options).run();
}

async function saveNodes() {
    download(cy.jpg(), "nodes.png", "image/png")
}