import { BaseMetaLinks } from './base-meta-links.model';
import { Study } from './study.model';

interface IStudyCollection {
    studies: Array<Study>;
}

export class StudyCollection extends BaseMetaLinks implements IStudyCollection {
    private _studies: Array<Study>;

    public get studies(): Array<Study> {
        return this._studies;
    }
    public set data(value: Array<Study>) {
        this._studies = value;
    }
}