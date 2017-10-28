export class Transition{
  //(estado atual, read), (estado destino, write, direção)
  constructor(...args: string[]);
  constructor(
    private _entryState: string,
    private _read: string,
    private _targetState: string,
    private _write: string,
    private _direction: string
  ){}

  public get entryState(): string{
    return this._entryState;
  }

  public set entryState(__value: string){
    this._entryState = __value;
  }

  public get read(): string{
    return this._read;
  }

  public set read(__value: string){
    this._read = __value;
  }

  public get targetState(): string{
    return this._targetState;
  }

  public set targetState(__value: string){
    this._targetState = __value;
  }

  public get write(): string{
    return this._write;
  }

  public set write(__value: string){
    this._write = __value;
  }

  public get direction(): string{
    return this._direction;
  }

  public set direction(__value: string){
    this._direction = __value;
  }

  public directionToInt(): number{
    return this._direction === "R" ? +1 : this._direction === "L" ? -1 : 0
  }
}
