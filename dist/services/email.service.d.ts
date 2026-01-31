import { User } from "../types/user.types.js";
import { Result } from "../utils/result.helpers.js";
export interface IEmailService {
    sendWelcomeEmail(user: User): Result<void, string>;
}
export declare class EmailService implements IEmailService {
    sendWelcomeEmail(user: User): Result<void, string>;
}
