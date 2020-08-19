import { BaseMetaLinks } from './base-meta-links.model';
import { Study } from './study.model';
import { Meta } from './meta.model';
import { Links } from './links.model';

interface IStudyCollection {
    data?: Array<Study>;
    meta?: Meta;
    links?: Links;
}

export class StudyCollection extends BaseMetaLinks implements IStudyCollection {
    private _studies: Array<Study>;

    constructor(studyCollection?: IStudyCollection) {
        super(studyCollection?.meta, studyCollection?.links);
        this._studies = studyCollection?.data;
    }

    public get studies(): Array<Study> {
        return this._studies;
    }
    public set data(value: Array<Study>) {
        this._studies = value;
    }
}