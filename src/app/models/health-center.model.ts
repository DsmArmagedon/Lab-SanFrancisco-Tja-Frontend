
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
    private _id?: number = null;
    private _name?: string = null;
    private _slug?: string = null;
    private _information?: string = null;
    private _deduction?: number = null;
    private _phone?: string = null;
    private _status?: boolean = true;

    constructor(healthCenter?: IHealthCenter) {
        this._id = healthCenter?.id;
        this._name = healthCenter?.name;
        this._slug = healthCenter?.slug;
        this._information = healthCenter?.information;
        this._deduction = healthCenter?.deduction;
        this._phone = healthCenter?.phone;
        this._status = healthCenter?.status;
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