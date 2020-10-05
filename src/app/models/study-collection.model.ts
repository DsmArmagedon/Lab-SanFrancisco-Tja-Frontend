import { BaseMeta } from './base-meta.model';
import { Study } from './study.model';
import { Meta } from './meta.model';

interface IStudyCollection {
    data?: Array<Study>;
    meta?: Meta;
}

export class StudyCollection extends BaseMeta implements IStudyCollection {
    private _studies: Array<Study>;

    constructor(studyCollection?: IStudyCollection) {
        super(studyCollection?.meta);
        this._studies = studyCollection?.data;
    }

    public get studies(): Array<Study> {
        return this._studies;
    }
    public set data(value: Array<Study>) {
        this._studies = value;
    }
}