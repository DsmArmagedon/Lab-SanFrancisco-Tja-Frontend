import { TestComposed } from './test-composed.model';
import { BaseMetaLinks } from './base-meta-links.model';

interface ITestComposedCollection {
    testComposeds: Array<TestComposed>;
}

export class TestComposedCollection extends BaseMetaLinks implements ITestComposedCollection {
    private _testComposeds: Array<TestComposed> = [];

    public get testComposeds(): Array<TestComposed> {
        return this._testComposeds;
    }
    public set data(value: Array<TestComposed>) {
        this._testComposeds = value;
    }
}