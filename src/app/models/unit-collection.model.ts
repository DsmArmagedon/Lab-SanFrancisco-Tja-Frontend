import { Unit } from './unit.model';
import { BaseMeta } from './base-meta.model';
import { Meta } from './meta.model';

interface IUnitCollection {
    data: Array<Unit>;
    meta?: Meta;
}

export class UnitCollection extends BaseMeta implements IUnitCollection {
    private _units: Array<Unit>;

    constructor(unitCollection?: IUnitCollection) {
        super(unitCollection?.meta);
        this._units = unitCollection?.data;
    }

    public get units(): Array<Unit> {
        return this._units;
    }
    public set data(value: Array<Unit>) {
        this._units = value;
    }
}