import { HealthCenter } from './health-center.model';
import { BaseMeta } from './base-meta.model';
import { Meta } from './meta.model';

interface IHealthCenterCollection {
    data?: Array<HealthCenter>;
    meta?: Meta;
}

export class HealthCenterCollection extends BaseMeta implements IHealthCenterCollection {
    private _healthCenters: Array<HealthCenter>;
    constructor(healthCenterCollection?: IHealthCenterCollection) {
        super(healthCenterCollection?.meta);
        this._healthCenters = healthCenterCollection?.data;
    }
    public get healthCenters(): Array<HealthCenter> {
        return this._healthCenters;
    }
    public set data(value: Array<HealthCenter>) {
        this._healthCenters = value;
    }
}