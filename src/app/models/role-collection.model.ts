import { BaseMetaLinks } from './base-meta-links.model';
import { Role } from './role.model';

interface IRoleCollection {
    roles: Array<Role>;
}

export class RoleCollection extends BaseMetaLinks implements IRoleCollection {
    private _roles: Array<Role>;

    public get roles(): Array<Role> {
        return this._roles;
    }
    public set data(value: Array<Role>) {
        this._roles = value;
    }
}