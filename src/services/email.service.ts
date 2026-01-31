import { User } from "../types/user.types.js";
import { Result, ok } from "../utils/result.helpers.js";


export interface IEmailService {
  sendWelcomeEmail(user: User): Result<void, string>;
}



export class EmailService implements IEmailService {
  sendWelcomeEmail(user: User): Result<void, string> {
    // Logic for sending email
    console.log(`[EmailService] Sending welcome email to: ${user.email}`);
    return ok(undefined);
  }
}