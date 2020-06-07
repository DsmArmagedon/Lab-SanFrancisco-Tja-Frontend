import { TestComposed } from './test-composed.model';
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
    private _id?: number;
    private _name?: string;
    private _slug?: string;
    private _print?: boolean;
    private _note?: string;
    private _status?: boolean;
    private _test_id?: number;
    private _parameters?: Array<Parameter> = new Array<Parameter>();

    set id(id: number) {
        this._id = id;
    }
    get id(): number {
        return this._id;
    }

    set name(name: string) {
        this._name = name;
    }
    get name(): string {
        return this._name;
    }

    set slug(slug: string) {
        this._slug = slug;
    }
    get slug(): string {
        return this._slug;
    }

    set print(print: boolean) {
        this._print = print;
    }
    get print(): boolean {
        return this._print;
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

    set test_id(test_id: number) {
        this._test_id = test_id;
    }
    get test_id(): number{
        return this._test_id;
    }

    set parameters(parameters: Array<Parameter>) {
        this._parameters = parameters.map( (e) => {
            return Object.assign(new Parameter, e);
        });
    }
    get parameters(): Array<Parameter> {
        return this._parameters;
    }
}