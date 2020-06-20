import { BaseMetaLinks } from './base-meta-links.model';

interface IStudy {
    id?: number;
    name?: string;
    slug?: string;
    description?: string;
    status?: boolean;
}

interface IStudyCollection {
    studies: Array<Study>;
}

export class Study implements IStudy {
    private _id?: number;
    private _name?: string;
    private _slug?: string;
    private _description?: string;
    private _status?: boolean;

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

    set description(description: string) {
        this._description = description;
    }
    get description(): string {
        return this._description;
    }

    set status(status: boolean) {
        this._status = status;
    }
    get status(): boolean {
        return this._status;
    }
}

export class StudyCollection extends BaseMetaLinks implements IStudyCollection {
    private _studies: Array<Study>;

    set data(studies: Array<Study>) {
        this._studies = studies.map((e) => {
            return Object.assign(new Study, e);
        })
    }
    get studies(): Array<Study> {
        return this._studies;
    }
}