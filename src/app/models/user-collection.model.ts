import { BaseMetaLinks } from './base-meta-links.model';
import { User } from './user.model';
import { Meta } from './meta.model';
import { Links } from './links.model';

interface IUserCollection {
    data: Array<User>;
    meta?: Meta;
    links?: Links;
}

export class UserCollection extends BaseMetaLinks implements IUserCollection {
    private _users: Array<User>;

    constructor(userCollection?: UserCollection) {
        super(userCollection?.meta, userCollection?.links);
        this._users = userCollection?.data;
    }

    public get users(): Array<User> {
        return this._users;
    }
    public set data(value: Array<User>) {
        this._users = value;
    }
}