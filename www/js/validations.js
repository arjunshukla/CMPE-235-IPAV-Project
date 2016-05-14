// Regsistration form validations
function validateRegistrationForm() {
  var phoneNumber = document.forms["registerForm"]["phone"].value;
  var password = document.forms["registerForm"]["password"].value;
  var rePassword = document.forms["registerForm"]["confirmPassword"].value;

  if (validPhoneNumber(phoneNumber) && validMatchingPasswords(password, rePassword))
    return true;
  else return false;
}

function validPhoneNumber(enteredNumber) {
  var regStr1 = (new RegExp(/[0-9]{3,3}\s[0-9]{3,3}\s[0-9]{4,4}/)); // 408 123 4567
  var regStr2 = (new RegExp(/\([0-9]{3,3}\)\s[0-9]{3,3}\s[0-9]{4,4}/)); // (408) 123 4567
  var regStr3 = (new RegExp(/\([0-9]{3,3}\)\s[0-9]{3,3}-[0-9]{4,4}/)); // (408) 123-4567
  var regStr4 = (new RegExp(/[0-9]{10,10}/)); // 4081234567

  if (!(regStr1.test(enteredNumber) || regStr2.test(enteredNumber) || regStr3.test(enteredNumber) || regStr4.test(enteredNumber))) {
    alert("Enter a valid phone number.\n Accepted formats are:\n408 123 4567\n(408) 123 4567\n(408) 123-4567\n4081234567");
    return false;
  }
  else return true;
}

function validMatchingPasswords(password, rePassword) {
  if (password == rePassword)
    return true;
  else {
    alert("Passwords must match.");
    return false;
  }
}






// Grade ranges form validations

function validateGradeRanges() {
  // alert("aa");

  var aStart = document.forms["gradeRangeForm"]["aStart"].value;
  var aEnd = document.forms["gradeRangeForm"]["aEnd"].value;

  var bStart = document.forms["gradeRangeForm"]["bStart"].value;
  var bEnd = document.forms["gradeRangeForm"]["bEnd"].value;

  var cStart = document.forms["gradeRangeForm"]["cStart"].value;
  var cEnd = document.forms["gradeRangeForm"]["cEnd"].value;

  var dStart = document.forms["gradeRangeForm"]["dStart"].value;
  var dEnd = document.forms["gradeRangeForm"]["dEnd"].value;

  var fStart = document.forms["gradeRangeForm"]["fStart"].value;
  var fEnd = document.forms["gradeRangeForm"]["fEnd"].value;

  if (((aStart - bEnd) == 1) && aEnd == 100) {
    if ((bStart - cEnd) == 1) {
      if ((cStart - dEnd) == 1) {
        if (((dStart - fEnd) == 1) && fStart == 0) {
          return true;
        } else {
          showGradeRangeSliderAlert("Please check D Garde range.\nD-Min should be 1 greater than F-Max and F-min should be 0.");
          return false;
        }
      } else {
        showGradeRangeSliderAlert("Please check C Garde range.\nC-Min should be 1 greater than D-Max.");
        return false;
      }
    } else {
      showGradeRangeSliderAlert("Please check B Garde range.\n B-Min should be 1 greater than C-Max.");
      return false;
    }
  } else {
    showGradeRangeSliderAlert("Please check A Garde range.\nA-Max should be 100 and A-Min should be 1 greater than B-Max.");
    return false;
  }
}

function showGradeRangeSliderAlert(message) {
  alert(message);
  return false;
}