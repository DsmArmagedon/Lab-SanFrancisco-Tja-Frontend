import { HealthCenter } from './health-center.model';
import { BaseMetaLinks } from './base-meta-links.model';

interface IHealthCenterCollection {
    healthCenters: Array<HealthCenter>;
}

export class HealthCenterCollection extends BaseMetaLinks implements IHealthCenterCollection {
    private _healthCenters: Array<HealthCenter>;

    public get healthCenters(): Array<HealthCenter> {
        return this._healthCenters;
    }
    public set data(value: Array<HealthCenter>) {
        this._healthCenters = value;
    }
}