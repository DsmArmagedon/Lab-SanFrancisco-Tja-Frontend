import { BaseMetaLinks } from './base-meta-links.model';
import { Role } from './role.model';
import { Links } from './links.model';
import { Meta } from './meta.model';

interface IRoleCollection {
    data?: Array<Role>;
    meta?: Meta;
    links?: Links;
}

export class RoleCollection extends BaseMetaLinks implements IRoleCollection {
    private _roles: Array<Role>;

    constructor(roleCollection?: IRoleCollection) {
        super(roleCollection?.meta, roleCollection?.links);
        this._roles = roleCollection?.data;
    }

    public get roles(): Array<Role> {
        return this._roles;
    }
    public set data(value: Array<Role>) {
        this._roles = value;
    }
}