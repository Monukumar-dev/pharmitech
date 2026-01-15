/**
 * Checks a string is empty/null/undefined.
 * It is preferred to use this method as it checks all mandatory validations for a string.
 * @export
 * @param {*} string
 * @returns
 */
export function empty(string) {
  return string === null || string === undefined || string === "" || string === "undefined";
}

/**
 *Checks if a number is null/undefined or zero.
 *
 * @export
 * @param {*} number
 * @returns
 */
export function emptyOrZero(number) {
  return number === null || number === undefined || number === 0;
}

export function undefinedOrZero(array) {
  return array === null || array === undefined || array.length === 0;
}

/**
 * Checks if an object is null or undefined.
 * It is the preferred way to do this as the check for an object is different that the string or a number.
 *
 * @export
 * @param {*} object
 * @returns
 */
export function undefinedOrNull(object) {
  return object === null || object === undefined;
}

/**
 * Checks if an object is null and undefined.
 * It is the preferred way to do this as the check for an object is different that the string or a number.
 *
 * @export
 * @param {*} object
 * @returns
 */
export function notUndefinedAndNull(object) {
    return object !== null && object !== undefined;
}


/**
 * Checks if value contains only alphabets and digits
 *
 * @export
 * @param {*} string
 * @returns
 */
export function isSpecialCharacter(string) {
  return string.match(/[A-Za-z0-9]+$/);
}
export const mandatoryFields = ["firstName",
  "lastName",
  "email",
  "primaryContact",
  'primaryAddress',
  "primaryAddCountry",
  "primaryAddState",
  "primaryAddCity",
  "shippingAddress",
  "shippingMobileNo",
  "shippingPinCode",
  "shippingCountry",
  "shippingState",
  "shippingAddress1",
  "billingAddress",
  "shippingCity",
  "shippingEmail",
  "username",
  "mobile",
  "state",
  "city",
  "pincode",
  "country"  
]

export const CREATE_INVOICE_MANDATORY_FIELDS = ["firstName",
  "lastName",
  "email",
  "primaryContact",
  'primaryAddress',
  "primaryAddCountry",
  "primaryAddState",
  "primaryAddCity",
  "zipPostal",
  "billingAddress",
  // "billingMobileNo",
  "billingPinCode",
  "billingCountry",
  "billingState",
  "billingCity",
  "shippingAddress1",
  // "shippingMobileNo",
  "shippingPinCode",
  "shippingCountry",
  "shippingState",
  "shippingCity",
  // "shippingEmail",
  // "username"
]
export const CREATE_INVOICE_DROPDOWNFIELDS = [
  "primaryAddCountry",
  "primaryAddState",
  "primaryAddCity",
  "billingCountry",
  "billingState",
  "billingCity", 
  "shippingCountry",
  "shippingState",
  "shippingCity",]
export const dropDownFields = [
  "primaryAddCountry",
  "primaryAddState",
  "primaryAddCity", 
  // "billingCountry",
  // "billingState",
  // "billingCity", 
  "shippingCountry",
  "shippingState",
  "shippingCity",]

export const BUYER_MANDATORY_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "primaryContact",
  "primaryAddress",
  // "billingAddress",
  // "billingMobileNo",
  // "billingPinCode",
  // "billingCountry",
  // "billingState",
  // "billingCity",
  "shippingAddress",
  "shippingMobileNo",
  "shippingPinCode",
  "shippingCountry",
  "shippingState",
  "shippingCity",
  "shippingEmail",
]  


export function isWithinMinMax(value, min, max) {

  let valueLength = value.length;

  if (notUndefinedAndNull(min) && notUndefinedAndNull(max)) {
    // if(nextProps.type === 'number'){
    //   valueLength = parseInt(nextProps.value);
    // }else{
    // valueLength = nextProps.value.length;
    // }

    if (valueLength < min || valueLength > max) {
      return false;
    } else if (valueLength > max) {
      return false;
    } else if (valueLength < min) {
      return false;
    }
    return true;
  }

  return true;
}

export function isValidRegExpChar(exp, char) {
  if (empty(exp) || empty(char)) {
    return true;
  } else {
    return exp.test(char);
  }
}

export const validateAddress = (value, name) => {
  let error = "";

  if (!(value?.trim()) && mandatoryFields.includes(name)) {
    error = "Address is required.";
  } 
  // Allow alphanumeric characters, spaces, commas, dashes, and periods
  else if (!/^[a-zA-Z0-9\s,.-]+$/.test(value)) {
    error = "Address should only contain alphanumeric characters, spaces, commas, periods, and dashes.";
  }

  return error;
};

export const validateStreetName = (value, name) => {
  let error = "";

  if (!(value?.trim()) && mandatoryFields.includes(name)) {
    error = "Street name is required.";
  } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
    error = "Street name should only contain alphanumeric characters and spaces.";
  }

  return error;
};

export const validateMobileNo = (value, name) => {
  let error = "";
  if (!(value?.trim()) && mandatoryFields.includes(name)) {
    error = "Mobile Number is required"
  }
  else if (!/^[0-9]{10}$/.test(value)) {
    error = "Mobile Number Must be 10 digits.";
  }
  return error;
};

export const validatePinCode = (value, name) => {
  let error = ""
  if (!(value?.trim()) && mandatoryFields.includes(name)) {
    error = "Pincode is required"
  }
  else if (!/^[0-9]{6}$/.test(value)) {
    error = "Pincode must be 6 digits.";
  }
  return error;
};


export const validateEmail = (value) => {
  let error = ""
  if (!value?.trim() && mandatoryFields.includes("email")) {
    error = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(value)) {
    error = "Please enter a valid email address";
  }
  return error
}

export const validatePassword = (password, minLength = 8) => {
  if (!password) return "Password is required.";
  if (minLength && password.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }
  return "";
};

export const validatePAN = (value, name) => {
  let error = "";
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!value?.trim() && mandatoryFields.includes(name)) {
    error = "PAN Number is required";
  } else if (!panRegex.test(value)) {
    error = "Please enter a valid 10-character PAN";
  }

  return error;
};

export const validateCompanyName = (value, name) => {
  let error = ""
  const companyRegex = /^[a-zA-Z0-9\s.,'-]{2,50}$/
   if (!companyRegex.test(value)) {
    error = "Please enter a valid Company Name";
  }

  return error;
}

export const validateSelectDropdownFields = (value, name) => {
  const errors = {};
  
  if (!value?.trim() && mandatoryFields.includes(name)) {
    errors[name] = `${name} is required.`;
  }
  
  return errors; 
};


export const validateField = (name, value) => {
  const errors = {};

  const isMandatory = (name) => mandatoryFields.includes(name);

  const formatName = (name) => {
    return name
      .replace(/([A-Z])/g, ' $1') 
      .replace(/^./, (str) => str.toUpperCase()); 
  };

  if ((name === "firstName" || name === "lastName" || name === "middleName" ||name === "first_name" || name === "last_name" || name === "middle_name")) {
    if (!(value?.trim()) && isMandatory(name)) {
      errors[name] = `${formatName(name)} is required.`;
    } else if (!/^[a-zA-Z\s]+$/.test(value) ) {
      errors[name] = `${formatName(name)} should only contain letters.`;
    } else {
      errors[name] = "";
    }
  }
  

  // Email validation
  if (name === "email" || name==="shippingEmail" || name === "emailId") {
    errors[name] = validateEmail(value);
  }

  // Contact validation
  if (name === "primaryContact" ||name === "mobile" || name==="mobileNumber" ||name ==="phoneNumber") {
    errors[name] = validateMobileNo(value, name);
  }
  // Address-related validations
  if (name === "primaryAddress" || name === "billingAddress" || name === "shippingAddress") {
    errors[name] = validateAddress(value, name);
  }

  // Street validation
  if (name === "street") {
    errors[name] = validateStreetName(value, name);
  }

  // GST validation
  if (name === "gst_in" || name === "gstNo" || name==="GSTNumber") {
    const trimmedValue = value?.trim(); 
    if (!trimmedValue && isMandatory(name)) {
      errors[name] = "GST IN is required.";
    } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/.test(trimmedValue)) {
      errors[name] = "GSTIN is invalid. It should be a 15-character alphanumeric code.";
    } else {
      errors[name] = "";
    }
  }
  

  if(name === "pan_number" || name === "panCard"){
    errors[name] = validatePAN(value,name)
  }

  if(name === "company_name"){
    errors[name] = validateCompanyName(value,name)
  }

  // ZIP code validation
  if (name === "zipPostal") {
    if (!(value?.trim()) && isMandatory(name)) {
      errors[name] = "ZIP code is required.";
    } else if (!/^\d{6}$/.test(value)) {
      errors[name] = "ZIP code is invalid. It should be a 6-digit number.";
    }
    else {
      errors[name] = "";
    }
  }

  // Mobile and Pin validations
  if (name === "billingMobileNo" || name === "shippingMobileNo") {
    errors[name] = validateMobileNo(value, name);
  }

  if (name === "billingPinCode" || name === "shippingPinCode" || name==="pinCode" || name === "pincode") {
    errors[name] = validatePinCode(value, name);
  }

  if (name === "billingFaxNumber" || name === "shippingFaxNumber" || name === "faxNumber") {
    if (!(value?.trim()) && isMandatory(name)) {
      errors[name] = "Fax Number is required.";
    } else if (!/^\+?[0-9\s\-().]+$/.test(value)) {
      errors[name] = "Fax number must contain only digits.";
    }
    else {
      errors[name] = "";
    }
  }

  return errors;
};


