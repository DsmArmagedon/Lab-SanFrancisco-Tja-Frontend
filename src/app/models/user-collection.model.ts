import { BaseMeta } from './base-meta.model';
import { User } from './user.model';
import { Meta } from './meta.model';

interface IUserCollection {
    data: Array<User>;
    meta?: Meta;
}

export class UserCollection extends BaseMeta implements IUserCollection {
    private _users: Array<User>;

    constructor(userCollection?: UserCollection) {
        super(userCollection?.meta);
        this._users = userCollection?.data;
    }

    public get users(): Array<User> {
        return this._users;
    }
    public set data(value: Array<User>) {
        this._users = value;
    }
}