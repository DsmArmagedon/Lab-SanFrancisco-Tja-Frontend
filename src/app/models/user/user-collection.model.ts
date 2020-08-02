import { BaseMetaLinks } from '../custom/base-meta-links.model';
import { User } from './user.model';

interface IUserCollection {
    users: Array<User>;
}

export class UserCollection extends BaseMetaLinks implements IUserCollection {
    private _users: Array<User>;

    public get users(): Array<User> {
        return this._users;
    }
    public set data(value: Array<User>) {
        this._users = value;
    }
}