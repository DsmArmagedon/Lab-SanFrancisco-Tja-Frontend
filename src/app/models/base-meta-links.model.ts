import { Meta } from './meta.model';
import { Links } from './links.model';

export interface IBaseMetaLinks {
    meta?: Meta;
    links?: Links;
}

export abstract class BaseMetaLinks implements IBaseMetaLinks {
    protected _meta?: Meta;
    protected _links?: Links;

    constructor(meta?: Meta, links?: Links) {
        this._meta = meta;
        this._links = links;
    }

    get meta(): Meta {
        return this._meta;
    }
    set meta(value: Meta) {
        this._meta = new Meta(value);
    }

    get links(): Links {
        return this._links;
    }
    set links(value: Links) {
        this._links = new Links(value);
    }
}