//validate the user data as it should follow cetain rules and structure
// before we insert it into the database



//regex synta explanation
// ^       : Start of string
  // [^\s@]+ : One or more characters (excluding spaces and @)
  // @       : Mandatory literal '@' symbol
  // [^\s@]+ : Domain name (no spaces or @)
  // \.      : Mandatory literal dot (simple . means any character so use \. to escape it)
  // [^\s@]+ : Top-level domain (no spaces or @)
  // $       : End of string (prevents trailing text)





//to ensure email format is followed in the input data
export function isValidEmail(email: string): boolean {
    //simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);//.test() is a JS function to check the string against the regex pattern
}



//ensure age is within acceptable range
export function isValidAge(age: number): boolean {      
    return  age >= 0 && age <= 150;
}


export function isValidName(name: string): boolean {
    const trimmedName = name.trim();
    return trimmedName.length >= 2 && trimmedName.length <= 60;
}
