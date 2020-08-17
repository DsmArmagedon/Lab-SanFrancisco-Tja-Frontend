
import { Unit } from './unit.model';
import { TypeData } from './test.model';
import { Title } from './title.model';

interface IParameter {
    unit?: Unit;
    title?: Title;
}

export class Parameter implements IParameter {
    private _id?: number = null;
    private _name?: string = null;
    private _type_data?: TypeData = null;
    private _reference_values?: string = null;
    private _options?: Array<string> = [];
    private _default_value?: string = null;
    private _status?: boolean = true;
    private _unit_id?: number = null;
    private _title_id?: number = null;
    private _unit?: Unit;
    private _title?: Title;

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

    public get options(): Array<string> {
        return this._options ? this._options : new Array<string>();
    }
    public set options(value: Array<string>) {
        this._options = value;
    }

    public get default_value(): string {
        return this._default_value;
    }
    public set default_value(value: string) {
        this._default_value = value;
    }

    public get status(): boolean {
        return this._status;
    }
    public set status(value: boolean) {
        this._status = value;
    }

    public get unit_id(): number {
        return this._unit_id;
    }
    public set unit_id(value: number) {
        this._unit_id = value;
    }

    public get title_id(): number {
        return this._title_id;
    }
    public set title_id(value: number) {
        this._title_id = value;
    }

    public get unit(): Unit {
        return this._unit;
    }
    public set unit(value: Unit) {
        this._unit = value;
    }

    public get title(): Title {
        return this._title;
    }
    public set title(value: Title) {
        this._title = value;
    }

    toJSON() {
        return {
            name: this._name,
            unit_id: this._unit_id,
            type_data: this._type_data,
            reference_values: this._reference_values,
            options: this._options,
            default_value: this._default_value,
            status: this._status
        }
    }
}