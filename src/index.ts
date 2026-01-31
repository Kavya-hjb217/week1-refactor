import { UserRepository } from "./repositories/user.repository.js";
import { EmailService } from "./services/email.service.js";


//initialize repository and services (create instances)
const userRepository = new UserRepository();
const emailService = new EmailService();

console.log("User Repository and Email Service initialized.");


//create a new user (valid data)
const newUserResult = userRepository.create({
name: "Kavya Barodia",
email: "kavya.barodia@example.com",
age: 22
});



if(newUserResult.success) {
    console.log("User created successfully:", newUserResult.data);

    const emailResult = emailService.sendWelcomeEmail(newUserResult.data);
    if(emailResult.success) {
        console.log("Welcome email sent successfully.");
    } else {
        console.error("Failed to send welcome email:", emailResult.error);
    }
 }
else {
    console.error("Error creating user:", newUserResult.error);
}


// duplicate email test
const duplicateUserResult = userRepository.create({
name: "Sameer",
email: "kavya.barodia@example.com",
age: 25
});
if(!duplicateUserResult.success) {
    console.error("Expected error for duplicate email:", duplicateUserResult.error);
}

//invalid name format : less than 2 characters
const invalidNameResult = userRepository.create({
name: "K",
email: "kavya123@example.com",
age: 22
});
if(!invalidNameResult.success) {
    console.error("Expected error for invalid name format:", invalidNameResult.error);
}   



//invalid age 
const invalidAgeResult = userRepository.create({
name: "Rohan Sharma",
email: "rohan.sharma@example.com", 
age: 0
});

if(!invalidAgeResult.success) {
    console.error("Expected error for invalid age:", invalidAgeResult.error);
}   

//print all users in the repository
console.log("All users in the repository:");
for (const user of userRepository.getAll()) {
    console.log(user);
}   


const newUserResult2 = userRepository.create({
    name: "Sameer Gupta",
    email: "sameer.gupta@example.com",
    age: 28
});

if(newUserResult2.success) {
    console.log("Second user created successfully:", newUserResult2.data);
} else {
    console.error("Error creating second user:", newUserResult2.error);
}