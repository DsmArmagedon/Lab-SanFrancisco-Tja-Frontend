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

    set id(id:number) {
        this._id = id;
    }
    get id():number {
        return this._id;
    }

    set name(name: string) {
        this._name = name;
    }
    get name(): string {
        return this._name;
    } 

    set display(display: string) {
        this._display = display;
    }
    get display(): string {
        return this._display;
    }

    set note(note: string) {
        this._note = note;
    }
    get note(): string {
        return this._note;
    }

    set status(status: boolean) {
        this._status = status;
    }
    get status(): boolean {
        return this._status;
    }
}