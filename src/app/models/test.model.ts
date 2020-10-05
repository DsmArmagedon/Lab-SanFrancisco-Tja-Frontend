
import { Study } from './study.model';

interface ITest {
    id?: number;
    name?: string;
    slug?: string;
    price?: number;
    type?: TypeTest;
    study_id?: number;
    status?: boolean;
    study?: Study;
}
export type TypeData = 'numerico' | 'texto' | 'parrafo' | 'opciones';
export type TypeTest = 'simple' | 'compuesto';

export class Test implements ITest {
    protected _id?: number;
    protected _name?: string;
    protected _slug?: string;
    protected _price?: number;
    protected _type?: TypeTest;
    protected _study_id?: number;
    protected _status?: boolean;
    protected _study?: Study;

    constructor(id?: number, name?: string, slug?: string, price?: number, type?: TypeTest, study_id?: number, status?: boolean, study?: Study) {
        this._id = id ?? null;
        this._name = name ?? null;
        this._slug = slug ?? null;
        this._price = price ?? null;
        this._type = type ?? null;
        this._study_id = study_id ?? null;
        this._status = status ?? true;
        this._study = study;
    }

    public set id(value: number) {
        this._id = value;
    }
    public get id(): number {
        return this._id;
    }

    public set name(value: string) {
        this._name = value;
    }
    public get name(): string {
        return this._name;
    }

    public set slug(value: string) {
        this._slug = value;
    }
    public get slug(): string {
        return this._slug;
    }

    public set price(value: number) {
        this._price = value;
    }
    public get price(): number {
        return this._price;
    }

    public set type(value: TypeTest) {
        this._type = value;
    }
    public get type(): TypeTest {
        return this._type;
    }

    public set study_id(value: number) {
        this._study_id = value;
    }
    public get study_id(): number {
        return this._study_id;
    }

    public set status(value: boolean) {
        this._status = value;
    }
    public get status(): boolean {
        return this._status;
    }

    public set study(value: Study) {
        this._study = value;
    }
    public get study(): Study {
        return this._study;
    }
}