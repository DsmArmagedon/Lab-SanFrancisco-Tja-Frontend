import { TestComposed } from './test-composed.model';
import { BaseMeta } from './base-meta.model';
import { Meta } from './meta.model';

interface ITestComposedCollection {
    data: Array<TestComposed>;
    meta?: Meta;
}

export class TestComposedCollection extends BaseMeta implements ITestComposedCollection {
    private _testComposeds: Array<TestComposed> = [];

    constructor(testComposedCollection?: ITestComposedCollection) {
        super(testComposedCollection?.meta);
        this._testComposeds = testComposedCollection?.data;
    }

    public get testComposeds(): Array<TestComposed> {
        return this._testComposeds;
    }
    public set data(value: Array<TestComposed>) {
        this._testComposeds = value;
    }
}