import { Test } from './test.model';


interface IStudy {
    id?: number;
    name?: string;
    slug?: string;
    description?: string;
    status?: boolean;
    tests: Array<Test>;
}

export class Study implements IStudy {
    private _id?: number;
    private _name?: string;
    private _slug?: string;
    private _description?: string;
    private _status?: boolean;
    private _tests: Array<Test>;

    constructor(study?: IStudy) {
        this._id = study?.id ?? null;
        this._name = study?.name ?? null;
        this._slug = study?.slug ?? null;
        this._description = study?.description ?? null;
        this._status = study?.status ?? true;
        this._tests = study?.tests ?? [];
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

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get status(): boolean {
        return this._status;
    }
    public set status(value: boolean) {
        this._status = value;
    }

    public get tests(): Array<Test> {
        return this._tests;
    }
    public set tests(value: Array<Test>) {
        this._tests = value.map(e => Object.assign(new Test, e));
    }

    toJSON() {
        return {
            name: this._name,
            description: this._description,
            status: this._status
        }
    }
}