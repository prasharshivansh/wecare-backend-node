export function UserValidator(user) {
  let err = null;
  switch (true) {
    case !ValidateName(user.name):
      err = {
        status: 400,
        message: "Name should have minimum 3 and maximum 50 characters",
      };
      break;
    case !ValidatePassword(user.password):
      err = {
        status: 400,
        message: "Password should have minimum 5 and maximum 10 characters",
      };
      break;
    case !ValidateAge(user.dateOfBirth):
      err = {
        status: 400,
        message: "Age should be greater than 20 and less than 100",
      };
      break;
    case !ValidateGender(user.gender):
      err = {
        status: 400,
        message: "Gender should be either M or F",
      };
      break;
    case !ValidatePhoneNumber(user.mobileNumber):
      err = {
        status: 400,
        message: "Mobile Number should have 10 digits",
      };
      break;
    case !ValidateEmail(user.email):
      err = {
        status: 400,
        message: "Email should be a valid one",
      };
      break;
    case !ValidatePinCode(user.pincode):
      err = {
        status: 400,
        message: "Pincode should have 6 digits",
      };
      break;
    case !ValidateAddress(user.city):
      err = {
        status: 400,
        message: "City should have minimum 3 and maximum 20 characters",
      };
      break;
    case !ValidateAddress(user.state):
      err = {
        status: 400,
        message: "State should have minimum 3 and maximum 20 characters",
      };
      break;
    case !ValidateAddress(user.country):
      err = {
        status: 400,
        message: "Country should have minimum 3 and maximum 20 characters",
      };
      break;
    default:
      break;
  }
  return err;
}

export const CoachValidator = (coach) => {
  let err = null;
  switch (true) {
    case !ValidateName(coach.name):
      err = {
        status: 400,
        message: "Name should have minimum 3 and maximum 50 characters",
      };
      break;
    case !ValidatePassword(coach.password):
      err = {
        status: 400,
        message: "Password should have minimum 5 and maximum 10 characters",
      };
      break;
    case !ValidateAge(coach.dateOfBirth):
      err = {
        status: 400,
        message: "Age should be greater than 20 and less than 100",
      };
      break;
    case !ValidateGender(coach.gender):
      err = {
        status: 400,
        message: "Gender should be either M or F",
      };
      break;
    case !ValidatePhoneNumber(coach.mobileNumber):
      err = {
        status: 400,
        message: "Mobile Number should have 10 digits",
      };
      break;
    case !ValidateSpeciality(coach.speciality):
      err = {
        status: 400,
        message: "Specialty should have 10 to 50 characters",
      };
      break;
    default:
      break;
  }
  return err;
};

export function ValidateSpeciality(spec) {
  return spec.length >= 10 && spec.length <= 50;
}

export function ValidateName(name) {
  const userNameRegex = new RegExp(/^[a-zA-Z\s'-]{3,50}$/);
  return userNameRegex.test(name);
}
export function ValidatePassword(password) {
  const passwordRegex = new RegExp(/^.{5,10}$/);
  return passwordRegex.test(password);
}
export function ValidateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age > 20 && age < 100;
}
export function ValidateGender(gender) {
  return gender === "M" || gender === "F";
}

export function ValidatePhoneNumber(phoneNumber) {
  return phoneNumber.toString().length === 10;
}
export function ValidateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ValidatePinCode(pinCode) {
  return pinCode.toString().length === 6;
}

export function ValidateAddress(address) {
  return address.length >= 3 && address.length <= 20;
}
