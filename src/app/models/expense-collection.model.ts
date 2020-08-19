import { Expense } from "./expense.model";
import { BaseMetaLinks } from './base-meta-links.model';
import { Links } from './links.model';
import { Meta } from './meta.model';

interface IExpenseCollection {
    data?: Array<Expense>;
    meta?: Meta;
    links?: Links;
}

export class ExpenseCollection extends BaseMetaLinks implements IExpenseCollection {
    private _expenses: Array<Expense>;

    constructor(expenseCollection?: IExpenseCollection) {
        super(expenseCollection?.meta, expenseCollection?.links);
        this._expenses = expenseCollection?.data;
    }

    public get expenses(): Array<Expense> {
        return this._expenses;
    }
    public set data(value: Array<Expense>) {
        this._expenses = value;
    }
}