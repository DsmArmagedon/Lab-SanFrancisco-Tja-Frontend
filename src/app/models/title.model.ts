import { Parameter } from './parameter.model';

interface ITitle {
    id?: number;
    name?: string;
    slug?: string;
    print?: boolean;
    note?: string;
    status?: boolean;
    test_id?: number;
    parameters?: Array<Parameter>;
}

export class Title implements ITitle {
    private _id?: number = null;
    private _name?: string = null;
    private _slug?: string = null;
    private _print?: boolean = null;
    private _note?: string = null;
    private _status?: boolean = null;
    private _test_id?: number = null;
    private _parameters?: Array<Parameter> = [];

    constructor(title?: ITitle) {
        this._id = title?.id;
        this._name = title?.name;
        this._slug = title?.slug;
        this._print = title?.print;
        this._note = title?.note;
        this._status = title?.status;
        this._test_id = title?.test_id;
        this._parameters = title?.parameters;
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

    public get slug(): string {
        return this._slug;
    }
    public set slug(value: string) {
        this._slug = value;
    }

    public get print(): boolean {
        return this._print;
    }
    public set print(value: boolean) {
        this._print = value;
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

    public get test_id(): number {
        return this._test_id;
    }
    public set test_id(value: number) {
        this._test_id = value;
    }

    public get parameters(): Array<Parameter> {
        return this._parameters;
    }
    public set parameters(value: Array<Parameter>) {
        this._parameters = value;
    }

    toJSON() {
        return {
            name: this._name,
            print: this._print,
            note: this._note,
            status: this._status
        }
    }
}