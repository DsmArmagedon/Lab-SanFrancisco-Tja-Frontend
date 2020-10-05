import { BaseMeta } from './base-meta.model';
import { Role } from './role.model';
import { Meta } from './meta.model';

interface IRoleCollection {
    data?: Array<Role>;
    meta?: Meta;
}

export class RoleCollection extends BaseMeta implements IRoleCollection {
    private _roles: Array<Role>;

    constructor(roleCollection?: IRoleCollection) {
        super(roleCollection?.meta);
        this._roles = roleCollection?.data;
    }

    public get roles(): Array<Role> {
        return this._roles;
    }
    public set data(value: Array<Role>) {
        this._roles = value;
    }
}