export class Transition {
    //(estado atual, read), (estado destino, write, direção)
    constructor(...args: string[]);
    constructor(
        private _entryState  : string,
        private _read        : string,
        private _targetState : string,
        private _write       : string,
        private _direction   : string
    ){}


	public get entryState(): string {
		return this._entryState;
	}
	public set entryState(value: string) {
		this._entryState = value;
  }
    
  public get read(): string {
		return this._read;
	}
	public set read(value: string) {
		this._read = value;
	}

	public get targetState(): string {
		return this._targetState;
	}
	public set targetState(value: string) {
		this._targetState = value;
  }

  public get write(): string {
		return this._write;
	}
	public set write(value: string) {
		this._write = value;
  }

  public get direction(): string {
		return this._direction;
	}
	public set direction(value: string) {
		this._direction = value;
	}
	
	public directionToInt() : number{
		return this._direction == 'R' ? +1 : this._direction == 'L' ? -1 : 0;
	}
}