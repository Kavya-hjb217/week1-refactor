import { ok } from "../utils/result.helpers.js";
export class EmailService {
    sendWelcomeEmail(user) {
        // Logic for sending email
        console.log(`[EmailService] Sending welcome email to: ${user.email}`);
        return ok(undefined);
    }
}
//# sourceMappingURL=email.service.js.map