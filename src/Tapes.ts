import {clone} from "lodash";
import { Tape } from './Tape';

export class Tapes {
  private _tapes: Tape[] = [];

  public push(__tape: Tape): void {
    this._tapes.push(__tape);
  }

  public toArray(): Tape[] {
    return clone(this._tapes);
	}

	public fixTapes(): void{
			this._tapes.map( (__tape) => __tape.fixTape() );
	}

	public getTape(__index: number): Tape  {
		return this._tapes[__index];
	}

	public get count(): number{
		return this._tapes.length;
	}

	public getAlphabet(): string[]{
		return [].concat(...this._tapes.map(
				(__tape: Tape) => __tape.getAlphabet()
		)).filter((__value, __index, __self) => __self.indexOf(__value) === __index);
	}
}