import { Unit } from './unit.model';
import { BaseMetaLinks } from './base-meta-links.model';
import { Meta } from './meta.model';
import { Links } from './links.model';

interface IUnitCollection {
    data: Array<Unit>;
    meta?: Meta;
    links?: Links;
}

export class UnitCollection extends BaseMetaLinks implements IUnitCollection {
    private _units: Array<Unit>;

    constructor(unitCollection?: IUnitCollection) {
        super(unitCollection?.meta, unitCollection?.links);
        this._units = unitCollection?.data;
    }

    public get units(): Array<Unit> {
        return this._units;
    }
    public set data(value: Array<Unit>) {
        this._units = value;
    }
}