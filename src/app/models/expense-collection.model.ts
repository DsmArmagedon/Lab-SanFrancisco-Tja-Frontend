import { Expense } from "./expense.model";
import { BaseMetaLinks } from './base-meta-links.model';

interface IExpenseCollection {
    expenses: Array<Expense>;
}

export class ExpenseCollection extends BaseMetaLinks implements IExpenseCollection {
    private _expenses: Array<Expense>;

    public get expenses(): Array<Expense> {
        return this._expenses;
    }
    public set data(value: Array<Expense>) {
        this._expenses = value;
    }
}