
//define user interface to structure user data
export interface User{

    readonly id: string;
    name: string;
    email: string;
    age: number;

    readonly createdAt: Date;
    updatedAt: Date;
}


//input structure for creating a new user
export interface CreateUserInput{
    name: string;
    email: string;
    age: number;
}


//make fields optional for update operation
export interface UpdateUserInput{
    name?: string;
    email?: string;
    age?: number;
}   

//define possible error types related to user operations
export type UserError = 
  | "UserNotFound"
  | "InvalidEmail"
  | "InvalidAge"
  | "InvalidName"
  | "DuplicateEmail"
  | "ValidationFailed"
  | "EmptyInput";


