import { CompanyPosition } from './company-position.model';
import { BaseMetaLinks } from '../custom/base-meta-links.model';

interface ICompanyPositionCollection {
    companyPositions: Array<CompanyPosition>;
}

export class CompanyPositionCollection extends BaseMetaLinks implements ICompanyPositionCollection {
    private _companyPositions: Array<CompanyPosition>;

    public get companyPositions(): Array<CompanyPosition> {
        return this._companyPositions;
    }
    public set data(value: Array<CompanyPosition>) {
        this._companyPositions = value;
    }
}