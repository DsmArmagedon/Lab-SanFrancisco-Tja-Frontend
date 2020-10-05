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
    private _current_page: number;
    private _from: number;
    private _last_page: number;
    private _path: string;
    private _per_page: number;
    private _to: number;
    private _total: number;

    constructor(meta?: Meta) {
        this._current_page = meta?.current_page ?? null;
        this._from = meta?.from ?? null;
        this._last_page = meta?.last_page ?? null;
        this._path = meta?.path ?? null;
        this._per_page = meta?.per_page ?? null;
        this._to = meta?.to ?? null;
        this._total = meta?.total ?? null;
    }

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