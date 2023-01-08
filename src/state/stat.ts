export class Stat {
  public get value() {
    return this._value;
  }
  public get minumum() {
    return this._minumum;
  }
  public get maximum() {
    return this._maximum;
  }

  constructor(
    private _value: number,
    private _minumum?: number,
    private _maximum?: number
  ) {}

  setValue(newValue: number): void {
    this._value = newValue;
    this.adjust();
  }

  setMinimum(newMinimum: number): void {
    this._minumum = newMinimum;
    this.adjust();
  }

  setMaximum(newMaximum: number): void {
    this._maximum = newMaximum;
    this.adjust();
  }

  private adjust() {
    if (
      this._minumum !== undefined &&
      this._maximum !== undefined &&
      this._minumum > this._maximum
    ) {
      this._minumum = this._maximum;
    }

    if (this._maximum !== undefined && this._value > this._maximum) {
      this._value = this._maximum;
    }

    if (this._minumum !== undefined && this._value < this._minumum) {
      this._value = this._minumum;
    }
  }
}
