
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

    constructor(healthCenter?: IHealthCenter) {
        this._id = healthCenter?.id ?? null;
        this._name = healthCenter?.name ?? null;
        this._slug = healthCenter?.slug ?? null;
        this._information = healthCenter?.information ?? null;
        this._deduction = healthCenter?.deduction ?? null;
        this._phone = healthCenter?.phone ?? null;
        this._status = healthCenter?.status ?? true;
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

    public get information(): string {
        return this._information;
    }
    public set information(value: string) {
        this._information = value;
    }

    public get deduction(): number {
        return this._deduction;
    }
    public set deduction(value: number) {
        this._deduction = value;
    }

    public get phone(): string {
        return this._phone;
    }
    public set phone(value: string) {
        this._phone = value;
    }

    public get status(): boolean {
        return this._status;
    }
    public set status(value: boolean) {
        this._status = value;
    }

    toJSON() {
        return {
            name: this._name,
            phone: this._phone,
            information: this._information,
            deduction: this._deduction,
            status: this._status
        }
    }
}