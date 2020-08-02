import { TypeExpense } from './type-expense.model';
import { BaseMetaLinks } from '../custom/base-meta-links.model';

interface ITypeExpenseCollection {
    typeExpenses: Array<TypeExpense>;
}

export class TypeExpenseCollection extends BaseMetaLinks implements ITypeExpenseCollection {
    private _typeExpenses: Array<TypeExpense>;

    public get typeExpenses(): Array<TypeExpense> {
        return this._typeExpenses;
    }
    public set data(value: Array<TypeExpense>) {
        this._typeExpenses = value;
    }
}