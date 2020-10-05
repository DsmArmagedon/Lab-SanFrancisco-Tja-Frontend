import { TypeExpense } from './type-expense.model';
import { BaseMeta } from './base-meta.model';
import { Meta } from './meta.model';

interface ITypeExpenseCollection {
    data: Array<TypeExpense>;
    meta?: Meta;
}

export class TypeExpenseCollection extends BaseMeta implements ITypeExpenseCollection {
    private _typeExpenses: Array<TypeExpense>;

    constructor(typeExpenseCollection?: ITypeExpenseCollection) {
        super(typeExpenseCollection?.meta);
        this._typeExpenses = typeExpenseCollection?.data;
    }
    public get typeExpenses(): Array<TypeExpense> {
        return this._typeExpenses;
    }
    public set data(value: Array<TypeExpense>) {
        this._typeExpenses = value;
    }
}