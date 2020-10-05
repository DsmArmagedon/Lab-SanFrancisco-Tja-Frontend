import { CompanyPosition } from './company-position.model';
import { BaseMeta } from './base-meta.model';
import { Meta } from './meta.model';

interface ICompanyPositionCollection {
    data?: Array<CompanyPosition>;
    meta?: Meta;
}

export class CompanyPositionCollection extends BaseMeta implements ICompanyPositionCollection {
    private _companyPositions: Array<CompanyPosition>;

    constructor(companyPositionCollection?: ICompanyPositionCollection) {
        super(companyPositionCollection?.meta);
        this._companyPositions = companyPositionCollection?.data;
    }

    public get companyPositions(): Array<CompanyPosition> {
        return this._companyPositions;
    }
    public set data(value: Array<CompanyPosition>) {
        this._companyPositions = value;
    }
}