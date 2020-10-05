import { CompanyPosition } from './company-position.model';
import { Expense } from './expense.model';
import { Role } from './role.model';

interface IUser {
    id?: string;
    ci?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    address?: string;
    phone?: string;
    password?: string;
    role_id?: number;
    images?: any;
    image?: File;
    company_position_id?: number;
    job_title?: string;
    status?: boolean;
    role?: Role;
    companyPosition?: CompanyPosition;
    expenses?: Array<Expense>;
}

export class User implements IUser {
    private _id?: string;
    private _ci?: string;
    private _username?: string;
    private _first_name?: string;
    private _last_name?: string;
    private _email?: string;
    private _address?: string;
    private _phone?: string;
    private _password?: string;
    private _role_id?: number;
    private _images?: any;
    private _image?: File;
    private _company_position_id?: number;
    private _job_title?: string;
    private _status?: boolean;
    private _role?: Role;
    private _companyPosition?: CompanyPosition;
    private _expenses?: Array<Expense> = [];

    constructor(user?: IUser) {
        this._id = user?.id ?? null;
        this._ci = user?.ci ?? null;
        this._username = user?.username ?? null;
        this._first_name = user?.first_name ?? null;
        this._last_name = user?.last_name ?? null;
        this._email = user?.email ?? null;
        this._address = user?.address ?? null;
        this._phone = user?.phone ?? null;
        this._password = user?.password ?? null;
        this._role_id = user?.role_id ?? null;
        this._images = user?.images ?? null;
        this._image = user?.image ?? null;
        this._company_position_id = user?.company_position_id ?? null;
        this._job_title = user?.job_title ?? null;
        this._status = user?.status ?? null;
        this._role = user?.role ?? null;
        this._companyPosition = user?.companyPosition ?? null;
        this._expenses = user?.expenses ?? null;
    }

    public get ci(): string {
        return this._ci;
    }
    public set ci(value: string) {
        this._ci = value;
    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }

    public get first_name(): string {
        return this._first_name;
    }
    public set first_name(value: string) {
        this._first_name = value;
    }

    public get last_name(): string {
        return this._last_name;
    }
    public set last_name(value: string) {
        this._last_name = value;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get address(): string {
        return this._address;
    }
    public set address(value: string) {
        this._address = value;
    }

    public get phone(): string {
        return this._phone;
    }
    public set phone(value: string) {
        this._phone = value;
    }

    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }

    public get role_id(): number {
        return this._role_id;
    }
    public set role_id(value: number) {
        this._role_id = value;
    }

    public get company_position_id(): number {
        return this._company_position_id;
    }
    public set company_position_id(value: number) {
        this._company_position_id = value;
    }

    public get status(): boolean {
        return this._status;
    }
    public set status(value: boolean) {
        this._status = value;
    }

    public get job_title(): string {
        return this._job_title;
    }
    public set job_title(value: string) {
        this._job_title = value;
    }

    public get images(): any {
        return this._images;
    }
    public set images(value: any) {
        this._images = value;
    }

    public get image(): File {
        return this._image;
    }
    public set image(value: File) {
        this._image = value;
    }

    public get role(): Role {
        return this._role;
    }
    public set role(value: Role) {
        this._role = value;
    }

    public get companyPosition(): CompanyPosition {
        return this._companyPosition;
    }
    public set companyPosition(value: CompanyPosition) {
        this._companyPosition = value;
    }

    public get expenses(): Array<Expense> {
        return this._expenses;
    }
    public set expenses(value: Array<Expense>) {
        this._expenses = value;
    }

    public get fullName(): string {
        return (this._first_name != undefined && this._last_name != undefined) ? `${this._first_name} ${this._last_name}` : '';
    }

    toJSON() {
        return {
            ci: this._ci,
            username: this._username,
            email: this._email,
            first_name: this._first_name,
            last_name: this._last_name,
            company_position_id: this._company_position_id,
            job_title: this._job_title,
            phone: this._phone,
            image: this._image,
            address: this._address,
            role_id: this._role_id,
            status: this._status
        }
    }

}
