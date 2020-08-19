import { CompanyPosition } from './company-position.model';
import { BaseMetaLinks } from './base-meta-links.model';
import { Meta } from './meta.model';
import { Links } from './links.model';

interface ICompanyPositionCollection {
    data?: Array<CompanyPosition>;
    meta?: Meta;
    links?: Links;
}

export class CompanyPositionCollection extends BaseMetaLinks implements ICompanyPositionCollection {
    private _companyPositions: Array<CompanyPosition>;

    constructor(companyPositionCollection?: ICompanyPositionCollection) {
        super(companyPositionCollection?.meta, companyPositionCollection?.links);
        this._companyPositions = companyPositionCollection?.data;
    }

    public get companyPositions(): Array<CompanyPosition> {
        return this._companyPositions;
    }
    public set data(value: Array<CompanyPosition>) {
        this._companyPositions = value;
    }
}