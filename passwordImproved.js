// This section defines the required characteristics of the users password, establishes required and invalid symbols, and sets the ASCII ranges for numbers/letters
const minPasswordLength = 10; 
const requiredSymbols = ["!", "#", "$", "%", "&", "*", "+", ",", "-", ".", "/", ":", ";", "=", "?", "@", "^", "_", "~", "|"];
const invalidSymbols = ["(", ")", "<", ">", "[", "]", "{", "}"];
const lowercaseMin = 97;
const lowercaseMax = 122;
const uppercaseMin = 65;
const uppercaseMax = 90;
const numberMin = 48;
const numberMax = 57;

console.log("");
console.log("Welcome to the Password Validator Tool!"); // User greeting and instructions
console.log("Your Password MUST:");
console.log(`Be at least ${minPasswordLength} characters long`);
console.log("Contain at least one number (0-9), one uppercase letter (A-Z), one lowercase letter (a-z)");
console.log(`Contain at least one of the following symbols ${Scrub(requiredSymbols, " ")}`);
console.log(`NOT contain any of the following symbols ${Scrub(invalidSymbols, " ")}`);

const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

reader.question("Please enter a password: ", function(input){

    let passwordIssues = []; // contains all the reasons the password is invalid to provide the user feedback if an invalid password is entered
    
    if (input.length < minPasswordLength) {
        passwordIssues.push(`Your entry was too short. It must be a minimum of ${minPasswordLength} characters long`);
    }

    if (!validateASCIIRange(input, numberMin, numberMax)) {
        passwordIssues.push(`Your entry must contain at least one number 0-9.`);
    }

    if (!validateASCIIRange(input, uppercaseMin, uppercaseMax)) {
        passwordIssues.push(`Your entry must contain at least one uppercase letter.`);
    }

    if (!validateASCIIRange(input, lowercaseMin, lowercaseMax)) {
        passwordIssues.push(`Your entry must contain at least one lower case letter.`);
    }

    if (!validateSymbol(input, requiredSymbols, false)) {
        passwordIssues.push(`Your entry must contain at least one of the following required symbols: ${Scrub(requiredSymbols, " ")}.`);
    }

    if (!validateSymbol(input, invalidSymbols, true)) {
        passwordIssues.push(`Your entry contains at least one of the following invalid symbols: ${Scrub(invalidSymbols, " ")}.`);
    }


    if (passwordIssues.length === 0){ // If there are no password issues, set the flag to true to exit the while loop
        console.log("You have entered a valid password. Thank you!");
    } else {

        for (let i = 0; i < passwordIssues.length; i++) { // else log the list of issues
            console.log(passwordIssues[i]);
        }
    }

    reader.close(); // close the console reader

}); // End of reader question.



function validateASCIIRange(input, min, max) {// used to validate if the password contains a number, an uppercase letter, or a lowercase letter based on the ASCII value of the char and the provided range

    let valid = false;
    let i = 0;

    while (!valid && i < input.length){

        if (input[i].charCodeAt() >= min && input[i].charCodeAt() <= max) {
            valid = true;
        }

        i++
    }

    return valid;

}

function validateSymbol(input, symbols, validity) {// flips the validity if an element of the symbols array is found

    let flipValidity = false;
    let i = 0;

    while (!flipValidity && i < input.length){

        if (symbols.includes(input[i])) {
            flipValidity = true;
        }
        i++
    }
    
    if (flipValidity) {
        validity = !validity;
    }

    return validity;

}

function Scrub(arr, spacer){ // Iterates over an array and returns a single string with the elements seperated by a porivded spacer

    let result = "";

    for (let i = 0; i < arr.length; i++){
        if (result === "") {
            result = `${arr[i]}`;
        } else {
            result = `${result}${spacer}${arr[i]}`;
        }
        
    }

    return result;

}