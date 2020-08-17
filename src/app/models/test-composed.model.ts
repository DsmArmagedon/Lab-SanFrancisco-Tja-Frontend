import { Title } from "./title.model";
import { Test } from './test.model';

interface ITestComposed {
    titles?: Array<Title>;
}

export class TestComposed extends Test implements ITestComposed {

    private _titles?: Array<Title> = [];

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

