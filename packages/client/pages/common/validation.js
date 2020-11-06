let numberregex = /^[0-9]*$/;
let emailregex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
let passwordregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const RequiredValidation = (inputvalue) => {
  if (!inputvalue) {
    return { helerText: "* Required" };
  } else {
    return { helerText: "" };
  }
};

export const NumberValidation = (inputvalue) => {
  if (!inputvalue) {
    return { helerText: "* Required" };
  } else if (!inputvalue.match(numberregex)) {
    return { helerText: "* Alphabets or Special chars not allowed" };
  } else {
    return { helerText: "" };
  }
};

export const EmailValidation = (inputvalue) => {
  if (!inputvalue) {
    return { helerText: "* Required" };
  } else if (!inputvalue.match(emailregex)) {
    return { helerText: "Invalid Email" };
  } else {
    return { helerText: "" };
  }
};

export const PasswordValidation = (inputvalue) => {
  if (!inputvalue) {
    return { helerText: "* Required" };
  } else if (!inputvalue.match(passwordregex)) {
    return {
      helerText:
        "length should be between 6-16,at least 1 number,1 special character.",
    };
  } else {
    return { helerText: "" };
  }
};

export default RequiredValidation;
