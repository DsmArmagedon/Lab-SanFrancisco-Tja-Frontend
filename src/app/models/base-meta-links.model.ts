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

    set meta(meta: Meta) {
        this._meta = meta;
    }
    get meta(): Meta {
        return this._meta;
    }

    set links(links: Links) {
        this._links = links;
    }
    get links(): Links {
        return this._links;
    }
}