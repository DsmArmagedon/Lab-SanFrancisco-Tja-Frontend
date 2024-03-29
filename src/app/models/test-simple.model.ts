
import { TypeData, Test, TypeTest } from './test.model';
import { Unit } from './unit.model';
import { Study } from './study.model';

interface ITestSimple {
    id?: number;
    name?: string;
    slug?: string;
    price?: number;
    type?: TypeTest;
    study_id?: number;
    status?: boolean;
    study?: Study;
    unit_id?: number;
    unit?: Unit;
    type_data?: TypeData;
    reference_values?: string;
    note?: string;
    options?: Array<string>;
    default_values?: string;
}

export class TestSimple extends Test implements ITestSimple {
    private _unit_id?: number = null;
    private _unit?: Unit = new Unit;
    private _type_data?: TypeData = 'texto';
    private _reference_values?: string = null;
    private _note?: string = null;
    private _options?: Array<string> = [];
    private _default_values?: string = null;

    constructor(testSimple?: ITestSimple) {
        super(testSimple?.id, testSimple?.name, testSimple?.slug, testSimple?.price, testSimple?.type, testSimple?.study_id, testSimple?.status, testSimple?.study);
        this._unit_id = testSimple?.unit_id;
        this._unit = testSimple?.unit;
        this._type_data = testSimple?.type_data;
        this._reference_values = testSimple?.reference_values;
        this._note = testSimple?.note;
        this._options = testSimple?.options;
        this._default_values = testSimple?.default_values;
    }

    public get unit_id(): number {
        return this._unit_id;
    }
    public set unit_id(value: number) {
        this._unit_id = value;
    }

    public get unit(): Unit {
        return this._unit;
    }
    public set unit(value: Unit) {
        this._unit = value;
    }

    public get type_data(): TypeData {
        return this._type_data;
    }
    public set type_data(value: TypeData) {
        this._type_data = value;
    }

    public get reference_values(): string {
        return this._reference_values;
    }
    public set reference_values(value: string) {
        this._reference_values = value;
    }

    public get note(): string {
        return this._note;
    }
    public set note(value: string) {
        this._note = value;
    }

    public get options(): Array<string> {
        return this._options;
    }
    public set options(value: Array<string>) {
        this._options = value;
    }

    public get default_values(): string {
        return this._default_values;
    }
    public set default_values(value: string) {
        this._default_values = value;
    }
}