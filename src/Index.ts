import {Transitions} from './Transitions';
import { Transition } from './Transition';
import { TuringMachine } from './TuringMachine';

$('.form').submit(function (event){
    event.preventDefault();
    let _transitionsHTML = $('#transitions');
    let _inputTapeHTML = $('#inputTape');
    //console.log([].concat((_transitions.val() as string).split(/\r?\n/)));
    let _transitionsArray = [].concat((_transitionsHTML.val() as string).split(/\r?\n/));
    let _inputTapeArray = [].concat((_inputTapeHTML.val() as string).split(','));

    let _transitions = new Transitions();
    _transitionsArray.forEach(transition => {
        //(...transitions.split(','))
        _transitions.push(new Transition(...transition.split(',')));
    });
    
    _transitions.initState = '1';
    _transitions.endState = '3';

    console.log(TuringMachine.testTape(_inputTapeArray,_transitions));

});