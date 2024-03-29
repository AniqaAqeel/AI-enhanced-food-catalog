export const validatePassword = (password: string) => {
    //Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (passwordRegex.test(password)) {
        return "";
    }
    return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character";

}

export const validateEmail = (email: string) => {
    //Email must be valid
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (emailRegex.test(email)) {
        return "";
    }
    return "Email must be valid";
}