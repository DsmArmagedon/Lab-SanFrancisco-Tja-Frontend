import { Category } from "./category.model";
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
    categories?: Array<Category>;
}

export class TestComposed extends Test implements ITestComposed {

    private _categories?: Array<Category> = [];

    constructor(testComposed?: ITestComposed) {
        super(testComposed?.id, testComposed?.name, testComposed?.slug, testComposed?.price, testComposed?.type, testComposed?.study_id, testComposed?.status, testComposed?.study);
        this._categories = testComposed?.categories ?? [];
    }

    public get categories(): Array<Category> {
        return this._categories;
    }
    public set categories(value: Array<Category>) {
        this._categories = value;
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

