interface ICompanyPosition {
    id?: number;
    name?: string;
    slug?: string;
    description?: string;
    status?: boolean;
}

export class CompanyPosition implements ICompanyPosition {
    private _id?: number;
    private _name?: string;
    private _slug?: string;
    private _description?: string;
    private _status?: boolean;

    constructor(companyPosition?: ICompanyPosition) {
        this._id = companyPosition?.id ?? null;
        this._name = companyPosition?.name ?? null;
        this._slug = companyPosition?.slug ?? null;
        this._description = companyPosition?.description ?? null;
        this._status = companyPosition?.status ?? true;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get slug(): string {
        return this._slug;
    }
    public set slug(value: string) {
        this._slug = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get status(): boolean {
        return this._status;
    }
    public set status(value: boolean) {
        this._status = value;
    }

    toJSON() {
        return {
            name: this._name,
            description: this._description,
            status: this._status
        }
    }
}

