import { Study } from "./study.model";
import { Title } from "./title.model";
enum TestType {
    'simple',
    'compuesto'
}
interface ITestComposed {
    id?: number;
    name?: string;
    slug?: string;
    price?: number;
    type?: TestType;
    study_id?: number;
    study?: Study;
    status?: boolean;
    titles?: Title[];
}

export class TestComposed implements ITestComposed {
    private _id?: number;
    private _name?: string;
    private _slug?: string;
    private _price?: number;
    private _type?: TestType;
    private _study_id?: number;
    private _status?: boolean;
    private _study?: Study = new Study;
    private _titles?: Title[] = [];

    set id(id: number) {
        this._id = id;
    }
    get id(): number {
        return this._id;
    }

    set name(name: string) {
        this._name = name;
    }
    get name(): string {
        return this._name;
    }

    set slug(slug: string) {
        this._slug = slug;
    }
    get slug(): string {
        return this._slug;
    }

    set price(price: number) {
        this._price = price;
    }
    get price(): number {
        return this._price;
    }

    set type(type: TestType) {
        this._type = type;
    }
    get type(): TestType {
        return this._type;
    }

    set study_id(study_id: number) {
        this._study_id = study_id;
    }
    get study_id(): number {
        return this._study_id;
    }

    set study(study: Study) {
        this._study = study;
    }
    get study(): Study {
        return this._study;
    }

    set status(status: boolean) {
        this._status = status;
    }
    get status(): boolean {
        return this._status;
    }

    set titles(titles: Array<Title>) {
        this._titles = titles.map( (e) => {
            return Object.assign(new Title, e);
        });
    }
    get titles(): Array<Title> {
        return this._titles;
    }
}