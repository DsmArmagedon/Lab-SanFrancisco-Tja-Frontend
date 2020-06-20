import { Study } from "./study.model";
import { Unit } from './unit.model';
enum TestType {
    'simple',
    'compuesto'
}

enum TestTypeData {
    'numerico',
    'texto',
    'parrafo',
    'opciones'
}
interface ITestSimple {
    unit_id?: number;
    unit?: Unit;
    type_data?: TestTypeData;
    reference_values?: string;
    note?: string;
    options?: Array<string>;
    default_values?: string;
}

export class TestSimple implements ITestSimple {
    private _id?: number;
    private _name?: string;
    private _slug?: string;
    private _price?: number;
    private _type?: TestType;
    private _status?: boolean;
    private _study_id?: number;
    private _study?: Study = new Study;
    private _unit_id?: number;
    private _unit?: Unit = new Unit;
    private _type_data?: TestTypeData;
    private _reference_values?: string;
    private _note?: string;
    private _options?: Array<string> = new Array<string>();
    private _default_values?: string;

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

    set price(price: number) {
        this._price = price;
    }
    get price(): number {
        return this._price;
    }

    set type(type: TestType) {
        this._type = type;
    }
    get type(): TestType {
        return this._type;
    }

    set status(status: boolean) {
        this._status = status;
    }
    get status(): boolean {
        return this._status;
    }

    set study_id(study_id: number) {
        this._study_id = study_id;
    }
    get study_id(): number {
        return this._study_id;
    }

    set study(study: Study) {
        this._study = study;
    }
    get study(): Study {
        return this._study;
    }

    set unit_id(unit_id: number) {
        this._unit_id = unit_id;
    }
    get unit_id(): number {
        return this._unit_id;
    }

    set unit(unit: Unit) {
        this._unit = unit;
    }
    get unit(): Unit {
        return this._unit;
    }

    set type_data(type_data: TestTypeData) {
        this._type_data = type_data;
    }
    get type_data(): TestTypeData {
        return this._type_data;
    }

    set reference_values(reference_values: string) {
        this._reference_values = reference_values;
    }
    get reference_values(): string {
        return this._reference_values;
    }

    set note(note: string) {
        this._note = note;
    }
    get note(): string {
        return this._note;
    }

    set options(options: Array<string>) {
        this._options = options;
    }
    get options(): Array<string> {
        return this._options;
    }

    set default_values(default_values: string) {
        this._default_values = default_values;
    }
    get default_values(): string {
        return this._default_values;
    }
}