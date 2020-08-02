import { Unit } from './unit.model';
import { BaseMetaLinks } from '../custom/base-meta-links.model';

interface IUnitCollection {
    units: Array<Unit>;
}

export class UnitCollection extends BaseMetaLinks implements IUnitCollection {
    private _units: Array<Unit>;

    public get units(): Array<Unit> {
        return this._units;
    }
    public set data(value: Array<Unit>) {
        this._units = value;
    }
}