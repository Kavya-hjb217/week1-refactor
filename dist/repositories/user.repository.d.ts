import { User, CreateUserInput, UpdateUserInput, UserError } from "../types/user.types.js";
import { Result } from "../utils/result.helpers.js";
export interface IUserRepository {
    create(input: CreateUserInput): Result<User, UserError>;
    findByEmail(email: string): Result<User, UserError>;
    findById(id: string): Result<User, UserError>;
    update(id: string, input: UpdateUserInput): Result<User, UserError>;
    delete(id: string): Result<void, UserError>;
    getAll(): User[];
}
export declare class UserRepository implements IUserRepository {
    private users;
    create(input: CreateUserInput): Result<User, UserError>;
    findById(id: string): Result<User, UserError>;
    findByEmail(email: string): Result<User, UserError>;
    update(id: string, input: UpdateUserInput): Result<User, UserError>;
    delete(id: string): Result<void, UserError>;
    getAll(): User[];
}
