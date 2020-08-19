interface ILinks {
    first: string;
    last: string;
    prev: string;
    next: string;
}

export class Links implements ILinks {
    private _first: string = null;
    private _last: string = null;
    private _prev: string = null;
    private _next: string = null;

    constructor(links?: Links) {
        this._first = links?.first;
        this._last = links?.last;
        this._prev = links?.prev;
        this._next = links?.next;
    }

    set first(value: string) {
        this._first = value;
    }
    get first(): string {
        return this._first;
    }

    set last(value: string) {
        this._last = value;
    }
    get last(): string {
        return this._last;
    }

    set prev(value: string) {
        this._prev = value;
    }
    get prev(): string {
        return this._prev;
    }

    set next(value: string) {
        this._next = value;
    }
    get next(): string {
        return this._next;
    }
}