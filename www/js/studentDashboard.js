// Get func to get courses
// using response display on left column
// - generate string

function getStudentCourses(){
    var userMail = sessionStorage.getItem('userMail');
    var items = "<option value='' selected> Select Course </option>";
    var courseData = '';

     $.ajax({
         type: "GET",
         url: "https://cmpe235ipav-arjunshukla.c9users.io/backend/courseGrade.php?emailID="+userMail,
         cache: false,
         success: function(data){
                $.each(data,function(index,item) 
                {
                    items += "<option value='" + item.course + "'>" + item.course + "</option>";
                    courseData += populateCourseDetails(item);
                });
            
           
                $("#courseList").html(items);
                
                document.getElementById('coursesContainer').innerHTML= courseData;
                
            }
  });
}



function validateChangePasswordForm() {
    var userMail = sessionStorage.getItem('userMail');
    var oldPassword = document.forms["changePasswordForm"]["oldPassword"].value;
    var newPassword = document.forms["changePasswordForm"]["password"].value;
    var rePassword = document.forms["changePasswordForm"]["confirmPassword"].value;

    var dataString = 'name='+ userMail + '&password='+ oldPassword;
    $.ajax({
             type: "POST",
             url: "https://cmpe235ipav-arjunshukla.c9users.io/backend/login.php",
             data: dataString,
             cache: false,
             success: function(result){
                 var result=trim(result);
                 if(result == "ERROR") {
                        $("#wrong-password-message").popup( "open" );  
                 } else {
                     if(newPassword == rePassword) {
                         $.post('https://cmpe235ipav-arjunshukla.c9users.io/backend/updatePassword.php', {
                          userMail: userMail,
                          password: newPassword
                        },
                        function(data,status){
                            if (data == "student") {
                                 window.location = '../student-dashboard.html';
                            } else {
                                 window.location = '../professor-dashboard.html';
                            }
                        });
                     }
                }
            }
      });

}


 function trim(str){
      var str=str.replace(/^\s+|\s+$/,'');
      return str;
}
    
    
    
    function populateCourseDetails(item) {
        
        var courseStr = '<div id="'+item.course +'" class="courseDetails" style="display: none;">'+
                        '<h1 id="about">'+ item.course +'</h1>'+
                        '<hr/>'+
                        '<p><strong>Term :</strong> ' + item.term + '</p>'+
                        '<p><strong>Instructor :</strong> ' + item.professor + ' </p>'+
                        '<p><strong>Description :</strong> ' + item.desc + '</p>'+
                        '<p><strong>Grades :</strong> ' + item.grade + '</p></div>';
                        
        return courseStr;
        
    }
    
    
    
    
function displayCourse() {
    var course =  $("#courseList").val();
    $('.courseDetails').hide();
    $('#'+course).show();
}
    
function getStudentData() {
        var userMail = sessionStorage.getItem('userMail');
        $.ajax({
        type: "GET",
        url: "https://cmpe235ipav-arjunshukla.c9users.io/backend/userDetails.php?emailID=" + userMail,
        cache: false,
        success: function(data) {
           document.getElementById("userName").innerHTML =  '<a target="_blank" href="#">'+data[0].name+'</a>';
           document.getElementById("studentId").innerHTML = data[0].userID;
           document.getElementById("userMail").innerHTML = userMail;
           document.getElementById("phoneNumber").innerHTML = data[0].phoneNumber;
        }
    });

}



function resetSession() {
    sessionStorage.removeItem('userMail');
    window.location = 'index.html';
}