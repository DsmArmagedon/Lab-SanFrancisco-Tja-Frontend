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
    private _id?: string = null;
    private _ci?: string = null;
    private _username?: string = null;
    private _first_name?: string = null;
    private _last_name?: string = null;
    private _email?: string = null;
    private _address?: string = null;
    private _phone?: string = null;
    private _password?: string = null;
    private _role_id?: number = null;
    private _images?: any = null;
    private _image?: File = null;
    private _company_position_id?: number = null;
    private _job_title?: string = null;
    private _status?: boolean = null;
    private _role?: Role;
    private _companyPosition?: CompanyPosition;
    private _expenses?: Array<Expense> = [];

    constructor(user?: IUser) {
        this._id = user?.id;
        this._ci = user?.ci;
        this._username = user?.username;
        this._first_name = user?.first_name;
        this._last_name = user?.last_name;
        this._email = user?.email;
        this._address = user?.address;
        this._phone = user?.phone;
        this._password = user?.password;
        this._role_id = user?.role_id;
        this._images = user?.images;
        this._image = user?.image;
        this._company_position_id = user?.company_position_id;
        this._job_title = user?.job_title;
        this._status = user?.status;
        this._role = user?.role
        this._companyPosition = user?.companyPosition;
        this._expenses = user?.expenses;
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
