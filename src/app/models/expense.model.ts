import { TypeExpense } from './type-expense.model';
import { User } from './user.model';

interface IExpense {
    id?: string;
    code?: string;
    type_expense_id?: number;
    description?: string;
    date_expense?: string;
    amount?: number;
    document?: string;
    serial_document?: string;
    name_responsible?: string;
    user_id?: string;
    status?: boolean;
    typeExpense?: TypeExpense;
    user?: User;
}

export class Expense implements IExpense {
    private _id?: string = null;
    private _code?: string = null;
    private _type_expense_id?: number = null;
    private _description?: string = null;
    private _date_expense?: string = null;
    private _amount?: number = null;
    private _document?: string = null;
    private _serial_document?: string = null;
    private _name_responsible?: string = null;
    private _user_id?: string = null;
    private _status?: boolean = true;
    private _typeExpense?: TypeExpense;
    private _user: User;

    constructor(expense?: IExpense) {
        this._id = expense?.id;
        this._code = expense?.code;
        this._type_expense_id = expense?.type_expense_id;
        this._description = expense?.description;
        this._date_expense = expense?.date_expense;
        this._amount = expense?.amount;
        this._document = expense?.document;
        this._serial_document = expense?.serial_document;
        this._name_responsible = expense?.name_responsible;
        this._user_id = expense?.user_id;
        this._status = expense?.status;
        this._typeExpense = expense?.typeExpense;
        this._user = expense?.user;
    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get code(): string {
        return this._code;
    }
    public set code(value: string) {
        this._code = value;
    }

    public get type_expense_id(): number {
        return this._type_expense_id;
    }
    public set type_expense_id(value: number) {
        this._type_expense_id = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get date_expense(): string {
        return this._date_expense;
    }
    public set date_expense(value: string) {
        this._date_expense = value;
    }

    public get amount(): number {
        return this._amount;
    }
    public set amount(value: number) {
        this._amount = value;
    }

    public get document(): string {
        return this._document;
    }
    public set document(value: string) {
        this._document = value;
    }

    public get serial_document(): string {
        return this._serial_document;
    }
    public set serial_document(value: string) {
        this._serial_document = value;
    }

    public get name_responsible(): string {
        return this._name_responsible;
    }
    public set name_responsible(value: string) {
        this._name_responsible = value;
    }

    public get user_id(): string {
        return this._user_id;
    }
    public set user_id(value: string) {
        this._user_id = value;
    }

    public get status(): boolean {
        return this._status;
    }
    public set status(value: boolean) {
        this._status = value;
    }

    public get typeExpense(): TypeExpense {
        return this._typeExpense;
    }
    public set typeExpense(value: TypeExpense) {
        this._typeExpense = value
    }

    public get user(): User {
        return this._user;
    }
    public set user(value: User) {
        this._user = value;
    }

    toJSON() {
        return {
            type_expense_id: this._type_expense_id,
            description: this._description,
            date_expense: this._date_expense,
            amount: this._amount,
            name_responsible: this._name_responsible,
            serial_document: this._serial_document,
            document: this._document
        }
    }
}