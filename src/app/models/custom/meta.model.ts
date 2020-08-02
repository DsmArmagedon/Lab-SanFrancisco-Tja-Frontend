interface IMeta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export class Meta implements IMeta {
    private _current_page: number = null;
    private _from: number = null;
    private _last_page: number = null;
    private _path: string = null;
    private _per_page: number = null;
    private _to: number = null;
    private _total: number = null;

    set current_page(value: number) {
        this._current_page = value;
    }
    get current_page(): number {
        return this._current_page;
    }

    set from(value: number) {
        this._from = value;
    }
    get from(): number {
        return this._from;
    }

    set last_page(value: number) {
        this._last_page = value;
    }
    get last_page(): number {
        return this._last_page;
    }

    set path(value: string) {
        this._path = value;
    }
    get path(): string {
        return this._path;
    }

    set per_page(value: number) {
        this._per_page = value;
    }
    get per_page(): number {
        return this._per_page;
    }

    set to(value: number) {
        this._to = value;
    }
    get to(): number {
        return this._to;
    }

    set total(value: number) {
        this._total = value;
    }
    get total(): number {
        return this._total;
    }
}