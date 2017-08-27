import {Transitions} from './Transitions';
import { Transition } from './Transition';

$('.form').submit(function (event){
    event.preventDefault();
    let _transitions = $('#transitions');
    //console.log([].concat((_transitions.val() as string).split(/\r?\n/)));
    let transitionsInput = [].concat((_transitions.val() as string).split(/\r?\n/));

    let transitions = new Transitions();
    transitionsInput.forEach(transition => {
        //(...transitions.split(','))
        transitions.push(new Transition(...transition.split(',')));
    });
    console.log(transitions.toArray());
});