import { Title } from "./title.model";
import { Test } from './test.model';
import { BaseMetaLinks } from './base-meta-links.model';

interface ITestComposed {
    titles?: Array<Title>;
}

interface ITestComposedCollection {
    testComposeds: Array<TestComposed>;
}

export class TestComposed extends Test implements ITestComposed {

    private _titles?: Array<Title>;

    set titles(titles: Array<Title>) {
        this._titles = titles.map((e) => {
            return Object.assign(new Title, e);
        });
    }
    get titles(): Array<Title> {
        return this._titles;
    }
}

export class TestComposedCollection extends BaseMetaLinks implements ITestComposedCollection {
    private _testComposeds: Array<TestComposed>;

    set data(testComposeds: Array<TestComposed>) {
        this._testComposeds = testComposeds.map((e) => {
            return Object.assign(new TestComposed, e);
        })
    }
    get testComposeds(): Array<TestComposed> {
        return this._testComposeds;
    }
}