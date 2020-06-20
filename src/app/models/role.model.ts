import { Permission } from './permission.model';
import { BaseMetaLinks } from './base-meta-links.model';


interface IRole {
    id?: number,
    name?: string,
    slug?: string,
    description?: string,
    status?: boolean,
    permissions?: Permission[];
    permissions_id?: number[];
}

interface IRoleCollection {
    roles: Array<Role>;
}

export class Role implements IRole {
    private _id?: number;
    private _name?: string;
    private _slug?: string;
    private _description?: string;
    private _status?: boolean;
    private _permissions?: Array<Permission>;
    private _permissions_id?: Array<number>;

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

    set permissions(permissions: Array<Permission>) {
        this._permissions = permissions.map((e) => {
            return Object.assign(new Permission, e);
        });
    }
    get permissions(): Array<Permission> {
        return this._permissions;
    }

    set permissions_id(ids: Array<number>) {
        this._permissions_id = ids;
    }
    get permissions_id(): Array<number> {
        return this._permissions_id;
    }
}

export class RoleCollection extends BaseMetaLinks implements IRoleCollection {
    private _roles: Array<Role>;

    set data(roles: Array<Role>) {
        this._roles = roles.map((e) => {
            return Object.assign(new Role, e);
        });
    }
    get roles(): Array<Role> {
        return this._roles;
    }
}