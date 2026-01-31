import { UserRepository } from "./repositories/user.repository.js";
import { EmailService } from "./services/email.service.js";
//initialize repository and services (create instances)
const userRepository = new UserRepository();
const emailService = new EmailService();
console.log("User Repository and Email Service initialized.");
//create a new user
const newUserResult = userRepository.create({
    name: "Kavya Barodia",
    email: "kavya.barodia@example.com",
    age: 22
});
if (newUserResult.success) {
    console.log("User created successfully:", newUserResult.data);
    const emailResult = emailService.sendWelcomeEmail(newUserResult.data);
    if (emailResult.success) {
        console.log("Welcome email sent successfully.");
    }
    else {
        console.error("Failed to send welcome email:", emailResult.error);
    }
}
else {
    console.error("Error creating user:", newUserResult.error);
}
//# sourceMappingURL=index.js.map