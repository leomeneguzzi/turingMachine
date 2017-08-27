import { Transition } from './Transition';
export class Transitions {
    private _transitions : Array<Transition> = [];

    push(negociacao: Transition): void {
        this._transitions.push(negociacao);
    }

    toArray(): Array < Transition > {
        return [].concat(this._transitions);
    }
}