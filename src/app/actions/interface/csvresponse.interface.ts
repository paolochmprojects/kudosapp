export interface Csvresponse {
    success: boolean;
    message: string;
    result:  Result[];
    total:   number;
}

export interface Result {
    index:  number;
    data:   Data;
    errors: Error[];
}

export interface Data {
    name:     string;
    email?:   string;
    password: string;
    age?:     number | string;
}

export interface Error {
    field:  Field;
    value?: number | string;
    errors: string;
}

export enum Field {
    Age = "age",
    Email = "email",
    Password = "password",
    Name = "name",
}
