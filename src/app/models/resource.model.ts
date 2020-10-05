import { Permission } from "./permission.model";

interface IResource {
    display: string,
    total: number,
    select: number,
    permissions: Array<Permission>
}

export class Resource implements IResource {
    private _display?: string;
    private _total?: number;
    private _select?: number;
    private _permissions?: Array<Permission>;

    constructor(resource?: IResource) {
        this._display = resource?.display ?? null;
        this._total = resource?.total ?? null;
        this._select = resource?.select ?? null;
        this._permissions = resource?.permissions ?? [];
    }

    public get display(): string {
        return this._display;
    }
    public set display(value: string) {
        this._display = value;
    }

    public get total(): number {
        return this._total;
    }
    public set total(value: number) {
        this._total = value;
    }

    public get select(): number {
        return this._select;
    }
    public set select(value: number) {
        this._select = value;
    }

    public get permissions(): Array<Permission> {
        return this._permissions;
    }
    public set permissions(value: Array<Permission>) {
        this._permissions = value;
    }
}