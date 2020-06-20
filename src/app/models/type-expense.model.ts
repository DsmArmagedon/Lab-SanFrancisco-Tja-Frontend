import { BaseMetaLinks } from './base-meta-links.model';

interface ITypeExpense {
    id?: number;
    name?: string;
    slug?: string;
    description?: string;
    status?: boolean;
}

interface ITypeExpenseCollection {
    typeExpenses: Array<TypeExpense>;
}

export class TypeExpense implements ITypeExpense {
    private _id?: number;
    private _name?: string;
    private _slug?: string;
    private _description?: string;
    private _status?: boolean;

    set id(id: number) {
        this._id = id;
    }
    get id(): number {
        return this._id;
    }

    set name(name: string) {
        this._name = name;
    }
    get name(): string {
        return this._name;
    }

    set slug(slug: string) {
        this._slug = slug;
    }
    get slug(): string {
        return this._slug;
    }

    set description(description: string) {
        this._description = description;
    }
    get description(): string {
        return this._description;
    }

    set status(status: boolean) {
        this._status = status;
    }
    get status(): boolean {
        return this._status;
    }

    get nameToUpperCase() {
        return this._name.toUpperCase();
    }
}

export class TypeExpenseCollection extends BaseMetaLinks implements ITypeExpenseCollection {
    private _typeExpenses: Array<TypeExpense>;

    set data(typeExpenses: Array<TypeExpense>) {
        this._typeExpenses = typeExpenses.map((e) => {
            return Object.assign(new TypeExpense, e);
        });
    }
    get typeExpenses(): Array<TypeExpense> {
        return this._typeExpenses;
    }
}