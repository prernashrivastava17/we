// Check whether the email is valid or not
export const isValidEmail = (email) => {
    if (!email) return false;
  
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
    return email.match(regex) ? true : false;
  };
  
  // Check whether the password is valid or not
  export const isPasswordValid = (password) => {
    if (!password) return false;
  
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#]{8,}/;
  
    return password.match(regex) ? true : false;
  };
  
  // check if a field contains only alphabets
  export const isOnlyTextValid = (text) => {
    if (!text) return false;
  
    const regex = /^[A-Za-z]+$/;
  
    return text.match(regex) ? true : false;
  };
  
  export const isInputValid = (input) => {
    return input?.trim();
  };
  
  export const maskCharacter = (str = "", mask = "*", n = 4) => {
    return str.slice(0, -n).replace(/./g, mask) + str.slice(-n);
  };
  
  export const getCardType = (number) => {
    // visa
    let re = new RegExp("^4");
    if (number.match(re) != null) return "Visa";
  
    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
        number
      )
    )
      return "Mastercard";
  
    return false;
  };
  