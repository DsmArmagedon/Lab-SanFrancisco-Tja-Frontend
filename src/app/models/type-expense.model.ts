import { Expense } from './expense.model';

interface ITypeExpense {
    id?: number;
    name?: string;
    slug?: string;
    description?: string;
    status?: boolean;
    expenses?: Array<Expense>;
}

export class TypeExpense implements ITypeExpense {
    private _id?: number;
    private _name?: string;
    private _slug?: string;
    private _description?: string;
    private _status?: boolean;
    private _expenses?: Array<Expense>;

    constructor(typeExpense?: ITypeExpense) {
        this._id = typeExpense?.id ?? null;
        this._name = typeExpense?.name ?? null;
        this._slug = typeExpense?.slug ?? null;
        this._description = typeExpense?.description ?? null;
        this._status = typeExpense?.status ?? true;
        this._expenses = typeExpense?.expenses ?? [];
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get slug(): string {
        return this._slug;
    }
    public set slug(value: string) {
        this._slug = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get status(): boolean {
        return this._status;
    }
    public set status(value: boolean) {
        this._status = value;
    }

    public get expenses(): Array<Expense> {
        return this._expenses;
    }
    public set expenses(value: Array<Expense>) {
        this._expenses = value;
    }

    public get nameToUpperCase() {
        return this._name.toUpperCase();
    }

    toJSON() {
        return {
            name: this._name,
            description: this._description,
            status: this._status
        }
    }

}