function validateForm() {
    var phoneNumber = document.forms["registerForm"]["phone"].value;
    var password = document.forms["registerForm"]["password"].value;
    var rePassword = document.forms["registerForm"]["confirmPassword"].value;
    
    if(validPhoneNumber(phoneNumber) && validMatchingPasswords(password, rePassword))
    return true;
    else return false;
}

function validPhoneNumber(enteredNumber){
	var regStr1 = (new RegExp(/[0-9]{3,3}\s[0-9]{3,3}\s[0-9]{4,4}/)); // 408 123 4567
    var regStr2 = (new RegExp(/\([0-9]{3,3}\)\s[0-9]{3,3}\s[0-9]{4,4}/)); // (408) 123 4567
    var regStr3 = (new RegExp(/\([0-9]{3,3}\)\s[0-9]{3,3}-[0-9]{4,4}/)); // (408) 123-4567
    var regStr4 = (new RegExp(/[0-9]{10,10}/)); // 4081234567

    if(!(regStr1.test(enteredNumber) || regStr2.test(enteredNumber) || regStr3.test(enteredNumber) || regStr4.test(enteredNumber))){
      alert("Enter a valid phone number.\n Accepted formats are:\n408 123 4567\n(408) 123 4567\n(408) 123-4567\n4081234567");
      return false;
    } else return true;
}

function validMatchingPasswords(password, rePassword){
	if(password == rePassword)
	return true;
	else {
		alert("Passwords must match.");
		return false;
	}
}