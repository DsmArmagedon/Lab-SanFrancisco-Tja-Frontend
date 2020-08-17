import { Meta } from './meta.model';
import { Links } from './links.model';

interface IBaseMetaLinks {
    meta?: Meta;
    links?: Links;
}

export class BaseMetaLinks implements IBaseMetaLinks {
    protected _meta: Meta;
    protected _links: Links;

    constructor() { }

    get meta(): Meta {
        return this._meta;
    }
    set meta(value: Meta) {
        this._meta = Object.assign(new Meta, value);
    }

    get links(): Links {
        return this._links;
    }
    set links(value: Links) {
        this._links = Object.assign(new Links, value);
    }
}