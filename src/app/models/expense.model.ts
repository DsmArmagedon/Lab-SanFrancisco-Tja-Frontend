import { User } from './user.model';
import { TypeExpense } from './type-expense.model';

interface IExpense {
    id?: string;
    code?: string;
    type_expense_id?: number;
    typeExpense?: TypeExpense;
    description?: string;
    date_expense?: string;
    amount?: number;
    document?: string;
    serial_document?: string;
    name_responsible?: string;
    user_id?: string;
    user?: User;
    status?: boolean;
}

export class Expense implements IExpense {
    private _id?: string;
    private _code?: string;
    private _type_expense_id?: number;
    private _typeExpense?: TypeExpense;
    private _description?: string;
    private _date_expense?: string;
    private _amount?: number;
    private _document?: string;
    private _serial_document?: string;
    private _name_responsible?: string;
    private _user_id?: string;
    private _user: User;
    private _status?: boolean;

    set id(id: string) {
        this._id = id;
    }
    get id(): string {
        return this._id;
    }
    
    set code(code: string) {
        this._code = code;
    }
    get code(): string {
        return this._code;
    }

    set type_expense_id(type_expense_id: number) {
        this._type_expense_id = type_expense_id;
    }
    get type_expense_id(): number {
        return this._type_expense_id;
    }

    set typeExpense(typeExpense: TypeExpense) {
        this._typeExpense = typeExpense;
    }
    get typeExpense(): TypeExpense {
        return this._typeExpense;
    }

    set description(description: string) {
        this._description = description;
    }
    get description(): string {
        return this._description;
    }

    set date_expense(date_expense: string) {
        this._date_expense = date_expense;
    }
    get date_expense(): string {
        return this._date_expense;
    }

    set amount(amount: number) {
        this._amount = amount;
    }
    get amount(): number {
        return this._amount;
    }

    set document(document: string) {
        this._document = document;
    }
    get document(): string {
        return this._document;
    }

    set serial_document(serial_document: string) {
        this._serial_document = serial_document;
    }
    get serial_document(): string {
        return this._serial_document;
    }

    set name_responsible(name_responsible: string) {
        this._name_responsible = name_responsible;
    }
    get name_responsible(): string {
        return this._name_responsible;
    }

    set user_id(user_id: string) {
        this._user_id = user_id;
    }
    get user_id(): string {
        return this._user_id;
    }

    set user(user: User) {
        this._user = user;
    }
    get user(): User {
        return this._user;
    }

    set status(status: boolean) {
        this._status = status;
    }
    get status(): boolean {
        return this._status;
    }
}