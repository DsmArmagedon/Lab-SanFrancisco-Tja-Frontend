import { Expense } from "./expense.model";
import { BaseMeta } from './base-meta.model';

import { Meta } from './meta.model';

interface IExpenseCollection {
    data?: Array<Expense>;
    meta?: Meta;
}

export class ExpenseCollection extends BaseMeta implements IExpenseCollection {
    private _expenses: Array<Expense>;

    constructor(expenseCollection?: IExpenseCollection) {
        super(expenseCollection?.meta);
        this._expenses = expenseCollection?.data;
    }

    public get expenses(): Array<Expense> {
        return this._expenses;
    }
    public set data(value: Array<Expense>) {
        this._expenses = value;
    }
}