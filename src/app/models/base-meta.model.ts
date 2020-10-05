import { Meta } from './meta.model';

export interface IBaseMeta {
    meta?: Meta;
}

export abstract class BaseMeta implements IBaseMeta {
    protected _meta?: Meta;

    constructor(meta?: Meta) {
        this._meta = meta;
    }

    get meta(): Meta {
        return this._meta;
    }
    set meta(value: Meta) {
        this._meta = new Meta(value);
    }
}