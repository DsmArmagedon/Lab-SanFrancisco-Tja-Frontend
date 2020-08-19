import { TestComposed } from './test-composed.model';
import { BaseMetaLinks } from './base-meta-links.model';
import { Meta } from './meta.model';
import { Links } from './links.model';

interface ITestComposedCollection {
    data: Array<TestComposed>;
    meta?: Meta;
    links?: Links;
}

export class TestComposedCollection extends BaseMetaLinks implements ITestComposedCollection {
    private _testComposeds: Array<TestComposed> = [];

    constructor(testComposedCollection?: ITestComposedCollection) {
        super(testComposedCollection?.meta, testComposedCollection?.links);
        this._testComposeds = testComposedCollection?.data;
    }

    public get testComposeds(): Array<TestComposed> {
        return this._testComposeds;
    }
    public set data(value: Array<TestComposed>) {
        this._testComposeds = value;
    }
}