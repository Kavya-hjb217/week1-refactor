export interface User{

    readonly id: string;
    name: string;
    email: string;
    age: number;

    readonly createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserInput{
    name: string;
    email: string;
    age: number;
}

export interface UpdateUserInput{
    name?: string;
    email?: string;
    age?: number;
}   


export type UserError = 
  | "UserNotFound"
  | "InvalidEmail"
  | "InvalidAge"
  | "InvalidName"
  | "DuplicateEmail"
  | "ValidationFailed"
  | "EmptyInput";


