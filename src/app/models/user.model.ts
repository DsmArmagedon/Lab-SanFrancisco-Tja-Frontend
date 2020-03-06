import { CompanyPosition } from './company-position.model';
import { Role } from './role.model';
interface IUser {
    id?: string;
    ci: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    address?: string;
    phone?: string;
    password?: string;
    role_id?: number;
    role?: Role;
    images?: any;
    image?: File;
    company_position_id?: number;
    job_title?: string;
    companyPosition?: CompanyPosition;
    status?: boolean;
}

export class User implements IUser {
    private _id?: string;
    private _ci: string;
    private _username?: string;
    private _first_name: string;
    private _last_name?: string;
    private _email?: string;
    private _address?: string;
    private _phone?:  string;
    private _password?: string;
    private _role_id?: number;
    private _role: Role;
    private _images: any;
    private _image?: File;
    private _company_position_id?: number;
    private _companyPosition?: CompanyPosition; 
    private _job_title: string;
    private _status?: boolean;

    set id(id: string) {
        this._id = id;
    }

    get id(): string {
        return this._id;
    }

    set ci(ci: string) {
        this._ci = ci;
    }
    get ci(): string {
        return this._ci;
    }
    set username(username: string) {
        this._username = username;
    }
    get username(): string {
        return this._username;
    }

    set first_name(first_name: string) {
        this._first_name = first_name;
    }

    get first_name(): string {
        return this._first_name;
    }

    set last_name(last_name: string) {
        this._last_name = last_name;
    }
    get last_name(): string {
        return this._last_name;
    }

    set email(email: string) {
        this._email = email;
    }
    get email(): string {
        return this._email;
    }

    set address(address: string) {
        this._address = address;
    }
    get address(): string {
        return this._address;
    }

    set phone(phone: string) {
        this._phone = phone;
    }
    get phone(): string {
        return this._phone;
    }

    set password(password: string) {
        this._password =password;
    }
    get password(): string {
        return this._password;
    }

    set role_id(role_id: number) {
        this._role_id = role_id;
    }
    get role_id(): number {
        return this._role_id;
    }

    set company_position_id(company_position_id: number) {
        this._company_position_id = company_position_id;
    }
    get company_position_id(): number {
        return this._company_position_id;
    }

    set status(status: boolean) {
        this._status = status;
    }
    get status(): boolean {
        return this._status;
    }
    
    set role(role: Role) {
        this._role = role;
    }

    get role(): Role {
        return this._role;
    }

    set companyPosition(companyPosition: CompanyPosition) {
        this._companyPosition = companyPosition;
    }

    get companyPosition(): CompanyPosition {
        return this._companyPosition;
    }

    set job_title(job_title: string) {
        this._job_title = job_title;
    }

    get job_title(): string {
        return this._job_title;
    }
    set images(images: any) {
        this._images = images;
    }

    get images(): any {
        return this._images;
    }

    set image( image: File ) {
        this._image = image;
    }

    get image(): File {
        return this._image;
    }

    get fullName(): string {
        return (this._first_name != undefined && this._last_name != undefined) ? `${this._first_name} ${this._last_name}` : '';
    }
}