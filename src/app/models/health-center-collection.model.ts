import { HealthCenter } from './health-center.model';
import { BaseMetaLinks } from './base-meta-links.model';
import { Links } from './links.model';
import { Meta } from './meta.model';

interface IHealthCenterCollection {
    data?: Array<HealthCenter>;
    meta?: Meta;
    links?: Links;
}

export class HealthCenterCollection extends BaseMetaLinks implements IHealthCenterCollection {
    private _healthCenters: Array<HealthCenter>;
    constructor(healthCenterCollection?: IHealthCenterCollection) {
        super(healthCenterCollection?.meta, healthCenterCollection?.links);
        this._healthCenters = healthCenterCollection?.data;
    }
    public get healthCenters(): Array<HealthCenter> {
        return this._healthCenters;
    }
    public set data(value: Array<HealthCenter>) {
        this._healthCenters = value;
    }
}