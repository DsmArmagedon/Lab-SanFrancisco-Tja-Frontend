interface IHealthCenter {
    id?: number;
    name?: string;
    slug?: string;
    information?: string;
    deduction?: number;
    phone?: string;
    status?: boolean;
}

export class HealthCenter implements IHealthCenter {
    private _id?: number;
    private _name?: string;
    private _slug?: string;
    private _information?: string;
    private _deduction?: number;
    private _phone?: string;
    private _status?: boolean;

    set id(id:number) {
        this._id = id;
    }
    get id():number {
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

    set information(information: string) {
        this._information = information;
    }
    get information(): string {
        return this._information;
    }

    set deduction(deduction: number) {
        this._deduction = deduction;
    }
    get deduction(): number {
        return this._deduction;
    }

    set phone(phone: string) {
        this._phone = phone;
    }
    get phone(): string {
        return this._phone;
    }

    set status(status: boolean) {
        this._status = status;
    }
    get status(): boolean {
        return this._status;
    }
}