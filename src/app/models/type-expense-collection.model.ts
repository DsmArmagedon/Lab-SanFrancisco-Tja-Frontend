import { TypeExpense } from './type-expense.model';
import { BaseMetaLinks } from './base-meta-links.model';
import { Meta } from './meta.model';
import { Links } from './links.model';

interface ITypeExpenseCollection {
    data: Array<TypeExpense>;
    meta?: Meta;
    links?: Links;
}

export class TypeExpenseCollection extends BaseMetaLinks implements ITypeExpenseCollection {
    private _typeExpenses: Array<TypeExpense>;

    constructor(typeExpenseCollection?: ITypeExpenseCollection) {
        super(typeExpenseCollection?.meta, typeExpenseCollection?.links);
        this._typeExpenses = typeExpenseCollection?.data;
    }
    public get typeExpenses(): Array<TypeExpense> {
        return this._typeExpenses;
    }
    public set data(value: Array<TypeExpense>) {
        this._typeExpenses = value;
    }
}