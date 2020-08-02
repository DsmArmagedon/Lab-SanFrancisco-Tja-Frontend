
import { Study } from '../study/study.model';

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
    protected _id?: number = null;
    protected _name?: string = null;
    protected _slug?: string = null;
    protected _price?: number = null;
    protected _type?: TypeTest = null;
    protected _study_id?: number = null;
    protected _status?: boolean = true;
    protected _study?: Study;

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