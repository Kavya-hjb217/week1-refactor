

//import interfaces , validators and helpers 
import { User, CreateUserInput, UpdateUserInput, UserError } from "../types/user.types.js";
import { Result, ok, err } from "../utils/result.helpers.js";
import { isValidEmail, isValidAge, isValidName } from "../validator/user.validator.js";



//interface that defines the rules for user repository operations
export interface IUserRepository {
  create(input: CreateUserInput): Result<User, UserError>;
  findByEmail(email: string): Result<User, UserError>;
  findById(id: string): Result<User, UserError>;
  update(id: string, input: UpdateUserInput): Result<User, UserError>;
  delete(id: string): Result<void, UserError>;
  getAll(): User[];
}


export class UserRepository implements IUserRepository {
 
 //key is Id and value is user object with O(1) access time
    private users: Map<string, User> = new Map(); // Private state



    //implementation of create method to add new user
  create(input: CreateUserInput): Result<User, UserError> {
    // 1. Validate Input
    if (!isValidName(input.name)) return err("InvalidName");
    if (!isValidEmail(input.email)) return err("InvalidEmail");
    if (!isValidAge(input.age)) return err("InvalidAge");

    // 2. Check for duplicate email


    //this.users.values() is a built-in method of Map in JS that returns an iterator of all the values in the map
    
    //Array.from(...):This converts the Iterator into a standard Array as we need to use .some() which is an array method

 


    //.some(): This method checks if at least one element in the array satisfies the provided testing function
    // Here, we check if any user in the array has the same email as the input email(duplicate check)
    const isDuplicate = Array.from(this.users.values()).some(u => u.email === input.email);
    if (isDuplicate) return err("DuplicateEmail");

    // 3. Generate ID and timestamps
    const now = new Date();
    const newUser: User = {
      id: crypto.randomUUID(), // Modern UUID generation
      ...input,//spread operator to copy properties from input object to newUser object
      createdAt: now,
      updatedAt: now
    };

    // 4. Store user
    this.users.set(newUser.id, newUser);//.set() is a built-in method of Map in JS that adds or updates an element with a specified key and value to the Map object.
    return ok(newUser);
  }

  findById(id: string): Result<User, UserError> {
    const user = this.users.get(id);// built-in method of Map in JS that retrieves the value associated with the specified key from the Map object.
    return user ? ok(user) : err("UserNotFound");
  }

  findByEmail(email: string): Result<User, UserError> {
    const user = Array.from(this.users.values()).find(u => u.email === email);//.find() is an array method that returns the first element in the array that satisfies the provided testing function
    return user ? ok(user) : err("UserNotFound");
  }

  update(id: string, input: UpdateUserInput): Result<User, UserError> {
    const existing = this.users.get(id);
    if (!existing) return err("UserNotFound");

    // Immutable update: create a new object
    const updatedUser: User = {
      ...existing,//copy existing user properties
      ...input,//overwrite with input properties
      updatedAt: new Date()
    };

    this.users.set(id, updatedUser);//update the user in the map
    return ok(updatedUser);
  }

  delete(id: string): Result<void, UserError> {
    if (!this.users.has(id)) return err("UserNotFound");
    this.users.delete(id);//remove the user from the map
    return ok(undefined);
  }

  getAll(): User[] {
    return Array.from(this.users.values());//return all users as an array
  }
}