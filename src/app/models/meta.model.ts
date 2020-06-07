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

    set current_page(current_page: number) {
        this._current_page = current_page;
    }

    get current_page(): number {
        return this._current_page;
    }

    set from(from: number) {
        this._from = from;
    }

    get from(): number {
        return this._from;
    }

    set last_page(last_page: number) {
        this._last_page = last_page;
    }

    get last_page(): number {
        return this._last_page;
    }

    set path(path: string) {
        this._path = path;
    }

    get path(): string {
        return this._path;
    }

    set per_page(per_page: number) {
        this._per_page = per_page;
    }

    get per_page(): number {
        return this._per_page;
    }

    set to(to: number) {
        this._to = to;
    }

    get to(): number {
        return this._to;
    }

    set total(total: number) {
        this._total = total;
    }

    get total(): number {
        return this._total;
    }
 }