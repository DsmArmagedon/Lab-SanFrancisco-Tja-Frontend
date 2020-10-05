interface IUnit {
    id?: number;
    name?: string;
    display?: string;
    note?: string;
    status?: boolean;
}

export class Unit implements IUnit {
    private _id?: number;
    private _name?: string;
    private _display?: string;
    private _note?: string;
    private _status?: boolean;

    constructor(unit?: IUnit) {
        this._id = unit?.id ?? null;
        this._name = unit?.name ?? null;
        this._display = unit?.display ?? null;
        this._note = unit?.note ?? null;
        this._status = unit?.status ?? null;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get display(): string {
        return this._display;
    }
    public set display(value: string) {
        this._display = value;
    }

    public get note(): string {
        return this._note;
    }
    public set note(value: string) {
        this._note = value;
    }

    public get status(): boolean {
        return this._status;
    }
    public set status(value: boolean) {
        this._status = value;
    }

    toJSON() {
        return {
            name: this._name,
            note: this._note,
            status: this._status
        }
    }
}

