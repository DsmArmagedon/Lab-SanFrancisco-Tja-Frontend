import { Title } from './title.model';
import { Unit } from './unit.model';
interface IParameter {
    id?: number;
    name?: string;
    type_data?: TestTypeData;
    reference_vaues?: string;
    options?: Array<string>;
    default_values?: string;
    status?: boolean;
    unit_id?: number;
    unit?: Unit;
    title_id?: number;
    title?: Title;
}
enum TestTypeData {
    'numerico',
    'texto',
    'parrafo',
    'opciones'
}
export class Parameter implements IParameter {
    private _id?: number;
    private _name?: string;
    private _type_data?: TestTypeData;
    private _reference_values?: string;
    private _options?: Array<string>;
    private _default_values?: string;
    private _status?: boolean;
    private _unit_id?: number;
    private _unit?: Unit;
    private _title_id?: number;
    private _title?: Title;

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

    set status(status: boolean) {
        this._status = status;
    }
    get status(): boolean {
        return this._status;
    }

    set unit_id(unit_id: number) {
        this._unit_id = unit_id;
    } 
    get unit_id (): number {
        return this._unit_id;
    }

    set unit(unit: Unit) {
        this._unit = Object.assign(new Unit, unit);
    }
    get unit(): Unit {
        return this._unit;
    }

    set title_id(title_id: number) {
        this._title_id = title_id;
    } 
    get title_id (): number {
        return this._title_id;
    }

    set title(title: Title) {
        this._title = title;
    }
    get title(): Title {
        return this._title;
    }
}