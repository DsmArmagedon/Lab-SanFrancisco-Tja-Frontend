import { Title } from "./title.model";
import { Test, TypeTest } from './test.model';
import { Study } from './study.model';

interface ITestComposed {
    id?: number;
    name?: string;
    slug?: string;
    price?: number;
    type?: TypeTest;
    study_id?: number;
    status?: boolean;
    study?: Study;
    titles?: Array<Title>;
}

export class TestComposed extends Test implements ITestComposed {

    private _titles?: Array<Title> = [];

    constructor(testComposed?: ITestComposed) {
        super(testComposed?.id, testComposed?.name, testComposed?.slug, testComposed?.price, testComposed?.type, testComposed?.study_id, testComposed?.status, testComposed?.study);
        this._titles = testComposed?.titles ?? [];
    }

    public get titles(): Array<Title> {
        return this._titles;
    }
    public set titles(value: Array<Title>) {
        this._titles = value;
    }

    toJSON() {
        return {
            name: this._name,
            price: this._price,
            study_id: this._study_id,
            status: this._status
        }
    }
}

