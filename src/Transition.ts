export class Transition {
    //(estado atual, read), (estado destino, write, direção)
    constructor(...args: string[]);
    constructor(
        private _actualState : string,
        private _read        : string,
        private _targetState : string,
        private _write       : string,
        private _direction   : string
    ){}


	public get actualState(): string {
		return this._actualState;
	}
	public set actualState(value: string) {
		this._actualState = value;
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
}