import { Permission } from './permission.model';


interface IRole {
    id?: number,
    name?: string,
    slug?: string,
    description?: string,
    status?: boolean,
    permissions?: Permission[];
    permissions_id?: number[];
}

export class Role implements IRole {
    private _id?: number;
    private _name?: string;
    private _slug?: string;
    private _description?: string;
    private _status?: boolean;
    private _permissions?: Permission[] = [];
    private _permissions_id?: number[] = [];

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

    set permissions(permissions: Permission[]) {
        this._permissions = permissions;
    }
    get permissions(): Permission[] {
        return this._permissions;
    }

    set permissions_id(ids: number[]) {
        this._permissions_id = ids;
    }
    get permissions_id(): number[] {
        return this._permissions_id;
    }
}