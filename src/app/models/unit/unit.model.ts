
interface IUnit {
    id?: number;
    name?: string;
    display?: string;
    note?: string;
    status?: boolean;
}

export class Unit implements IUnit {
    private _id?: number = null;
    private _name?: string = null;
    private _display?: string = null;
    private _note?: string = null;
    private _status?: boolean = null;

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

