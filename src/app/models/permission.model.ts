interface IPermission {
    id?: number,
    name?: string,
    slug?: string,
    description?: string,
    resource?: string,
    index?: number,
    status?: boolean
}

export class Permission implements IPermission {
    private _id?: number = null;
    private _name?: string = null;
    private _slug?: string = null;
    private _description?: string = null;
    private _resource?: string = null;
    private _index?: number = null;
    private _status?: boolean = true;

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

    public get resource(): string {
        return this._resource;
    }
    public set resource(value: string) {
        this._resource = value;
    }

    public get index(): number {
        return this._index;
    }
    public set index(value: number) {
        this._index = value;
    }
}