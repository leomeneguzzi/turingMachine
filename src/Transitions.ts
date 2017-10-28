import {clone} from "lodash";
import {Tape} from "./Tape";
import {Transition } from "./Transition";
export class Transitions {
  private _transitions: Transition[] = [];

  public push(__transition: Transition): void {
    this._transitions.push(__transition);
  }

  public toArray(): Transition[] {
    return clone(this._transitions);
  }

  public getTransitionByEntryState(__state: string): Transition[] {
    return clone(this._transitions.filter((__transition: Transition) => __transition.entryState === __state));
  }

  public isValidTransition(__index: number, __tape: Tape): Transition {
    return this._transitions[__index].read === __tape.actualElement ? this._transitions[__index] : undefined;
  }

  public getValidIndex(__entryState: string, __tape: Tape): number[] {
    let __indexes: number[] = [].concat();
    this._transitions.filter((__transition: Transition, __index: number) => {
      if (__transition.entryState === __entryState && __transition.read === __tape.actualElement){
        __indexes = __indexes.concat(__index);
      }
    });
    return __indexes;
  }

  public getTransitionByStates(__entryState: string, __targetState: string): Transition[] {
    return clone(this._transitions.filter( (__transition: Transition) =>
        __transition.entryState === __entryState && __transition.targetState === __targetState
      )
    );
  }

  public getAlphabet(): string[] {
    return [].concat(
            ...this._transitions.map((__transition, __index, __self) => {
              return [].concat(__transition.read, __transition.write)
            })).filter((__value, __index, __self) => __self.indexOf(__value) === __index);
  }

  public getStates(): string[] {
    return [].concat(
            ...this._transitions.map((__transition, __index, __self) => {
              return [].concat(__transition.entryState, __transition.targetState)
            })).filter((__value, __index, __self) => (__self.indexOf(__value) === __index));
  }
}