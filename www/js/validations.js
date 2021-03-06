// Regsistration form validations
function validateRegistrationForm() {
  var phoneNumber = document.forms["registerForm"]["phone"].value;
  var password = document.forms["registerForm"]["password"].value;
  var rePassword = document.forms["registerForm"]["confirmPassword"].value;

  if (validPhoneNumber(phoneNumber) && validMatchingPasswords(password, rePassword)) {
    submitRegister();
    return true;
  }
  else {
    $("#error-message").popup("open");
    return false;
  }
}


function submitRegister() {
  var userMail = document.forms["registerForm"]["userMail"].value;
  var studentId = document.forms["registerForm"]["studentId"].value;
  var fullname = document.forms["registerForm"]["fullname"].value;
  var phone = document.forms["registerForm"]["phone"].value;
  var password = document.forms["registerForm"]["password"].value;


  $.post('https://cmpe235ipav-arjunshukla.c9users.io/backend/register.php', {
      userMail: userMail,
      studentId: studentId,
      fullname: fullname,
      phone: phone,
      password: password
    },
    function(data, status) {
      alert('Note this code to verify phone : ' + data);
      //if (data[0].statusCode == "SUCCESS") {
        //var validationCode = data[0].validCode;
        //alert('Note this code to verify phone : ' + validationCode);
        //document.getElementById('validationCode').html = 'Note this code to verify phone :' + validationCode;
        //$("#phone-validation-message").popup( "open" );
        //setTimeout(function() {
        /*  window.location = 'index.html';
          return true;
        }, 3000);*/
      //}
      //else {
        //return false;
      //}
    });
}


function validateForgotPassword() {
  
  var userMail = document.forms["forgotPasswordForm"]["userMail"].value;
  $.post('https://cmpe235ipav-arjunshukla.c9users.io/backend/forgotPassword.php', {
      userMail: userMail
    },
    function(data, status) {

      if (data == "SUCCESS") {
        window.location = 'index.html';
        return true;
      }
      else {
        window.location = 'index.html';
        return false;
      }
    });
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


// Login
function validLogin() {
  var uname = $('#name').val();
  var password = $('#password1').val();
  var dataString = 'name=' + uname + '&password=' + password;
  $.ajax({
    type: "POST",
    url: "https://cmpe235ipav-arjunshukla.c9users.io/backend/login.php",
    data: dataString,
    cache: false,
    success: function(result) {
      var result = trim(result);
      if (result == "ERROR") {
        $("#dlg-invalid-credentials").popup("open");
      }
      else if (result == "student") {
        //var storage = window.sessionStorage;
        sessionStorage.setItem("userMail", uname);
        
        window.location = 'student-dashboard.html';
      }
      else {
        //var storage = window.sessionStorage;
        sessionStorage.setItem("userMail", uname);
        window.location = 'professor-dashboard.html';
      }

    }
  });
}


function trim(str) {
  var str = str.replace(/^\s+|\s+$/, '');
  return str;
}


function validateContactUs() {
  
  var naam = $('#naam').val();
  var mail = $('#mail').val();
  var telefoon = $('#telefoon').val();
  var subject = $('#subject').val();
  var message = $('#message').val();
  var dataString = 'naam=' + naam + '&mail=' + mail + '&telefoon=' + telefoon + '&subject=' + subject + '&message=' + message;
  
  $.ajax({
    type: "POST",
    url: "https://cmpe235ipav-arjunshukla.c9users.io/backend/mail.php",
    data: dataString,
    cache: false,
    success: function(result) {
      alert('Sent Successfully !!');
    }
  });
  
  return false;
}