interface ILinks {
    first: string;
    last: string;
    prev: string;
    next: string;
}

export class Links implements ILinks {
    private _first: string;
    private _last: string;
    private _prev: string;
    private _next: string;

    set first(first: string) {
        this._first = first;
    }
    get first(): string {
        return this._first;
    }

    set last(last: string) {
        this._last = last;
    }
    get last(): string {
        return this._last;
    }

    set prev(prev: string) {
        this._prev = prev;
    }
    get prev(): string {
        return this._prev;
    }

    set next(next: string) {
        this._next = next;
    }
    get next(): string {
        return this._next;
    }
}