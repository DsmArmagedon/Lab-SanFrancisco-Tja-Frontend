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
    private _id?: number;
    private _name?: string;
    private _slug?: string;
    private _description?: string;
    private _resource?: string;
    private _index?: number;
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

    set resource(resource: string) {
        this._resource = resource;
    }
    get resource(): string {
        return this._resource;
    }

    set index(index: number) {
        this._index = index;
    }
    get index(): number {
        return this._index;
    }
}