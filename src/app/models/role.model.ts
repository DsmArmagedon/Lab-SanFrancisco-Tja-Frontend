import { Permission } from './permission.model';
import { User } from './user.model';

interface IRole {
    id?: number;
    name?: string;
    slug?: string;
    description?: string;
    status?: boolean;
    permissions_id?: number[];
    permissions?: Permission[];
}

export class Role implements IRole {
    private _id?: number = null;
    private _name?: string = null;
    private _slug?: string = null;
    private _description?: string = null;
    private _status?: boolean = true;
    private _permissions_id?: Array<number> = [];
    private _permissions?: Array<Permission> = [];
    private _users?: Array<User> = [];

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

    public get permissions_id(): Array<number> {
        return this._permissions_id;
    }
    public set permissions_id(value: Array<number>) {
        this._permissions_id = value;
    }

    public get permissions(): Array<Permission> {
        return this._permissions;
    }
    public set permissions(value: Array<Permission>) {
        this._permissions = value;
    }

    public get users(): Array<User> {
        return this._users;
    }
    public set users(value: Array<User>) {
        this._users = value;
    }

    toJSON() {
        return {
            name: this._name,
            description: this._description,
            permissions_id: this._permissions_id,
            status: this._status
        }
    }
}
