import { BaseMetaLinks } from './base-meta-links.model';

interface ICompanyPosition {
    id?: number;
    name?: string;
    slug?: string;
    description?: string;
    status?: boolean;
}

interface ICompanyPositionCollection {
    companyPositions: Array<CompanyPosition>;
}

export class CompanyPosition implements ICompanyPosition {
    private _id?: number;
    private _name?: string;
    private _slug?: string;
    private _description?: string;
    private _status?: boolean;

    set id(id: number) {
        this._id = id;
    }
    get id(): number {
        return this._id;
    }

    set name(name: string) {
        this._name = name;
    }
    get name(): string {
        return this._name;
    }

    set slug(slug: string) {
        this._slug = slug;
    }
    get slug(): string {
        return this._slug;
    }

    set description(description: string) {
        this._description = description;
    }
    get description(): string {
        return this._description;
    }

    set status(status: boolean) {
        this._status = status;
    }
    get status(): boolean {
        return this._status;
    }
}

export class CompanyPositionCollection extends BaseMetaLinks implements ICompanyPositionCollection {
    private _companyPositions: Array<CompanyPosition>;

    set data(companyPositions: Array<CompanyPosition>) {
        this._companyPositions = companyPositions.map((e) => {
            return Object.assign(new CompanyPosition, e);
        })
    }
    get companyPositions(): Array<CompanyPosition> {
        return this._companyPositions;
    }
}