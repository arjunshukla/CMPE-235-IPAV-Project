function loadChart(name, sData) {
    $('#studentPerformanceBellCurve').highcharts({
         chart: {
            type: 'bar'
        },
        title: {
            text: 'Grade Distribution'
        },
        legend: {
            enabled: false
        },
       xAxis: {
            categories: ['A', 'B', 'C', 'D', 'E'],
            title: {
                text: null
            }
        },
        yAxis: {
            title: {
                text: '# of students'
            }
        },
        tooltip: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Grades',
            data: sData
        }],
    });
}


function getListOfStudents() {
    var courseId;
    //courseId = document.forms["studentScoresForm"]["courseId"].value;
    courseId = sessionStorage.getItem('professorCourse');
    //

    
    //courseId = document.getElementById('studentScoresForm').elements['courseId'].value;
    var dataString = 'courseId=' + courseId;

    var items = "<option value='' selected> Select student </option>";


    $.ajax({
        type: "GET",
        url: "https://cmpe235ipav-arjunshukla.c9users.io/backend/getStudentList.php?courseId=" + courseId,
        cache: false,
        success: function(data) {

            $.each(data, function(index, item) {
                items += "<option value='" + item.emailID + "'>" + item.emailID + "</option>";
            });
            $("#studentList").html(items);

        }
    });



}


function getStudentScores() {
    var courseId;
    var chartData = [0,0,0,0,0];
    //courseId = document.getElementById('studentScoresForm').elements['courseId'].value;
    courseId = sessionStorage.getItem('professorCourse');

    $.ajax({
        type: "GET",
        url: "https://cmpe235ipav-arjunshukla.c9users.io/backend/studentGrade.php?courseId=" + courseId,
        cache: false,
        success: function(data) {
            
            var categories = ["A", "B", "C", "D", "F"];
            var tData = JSON.parse(data);
            
            $.each(tData, function(index, item) {
                if(tData[index].grade == "A") {
                    chartData[0] = parseInt(tData[index].count); 
                } else if(tData[index].grade == "B") {
                    chartData[1] =  parseInt(tData[index].count); 
                } else if(tData[index].grade == "C") {
                    chartData[2] =  parseInt(tData[index].count); 
                } else if(tData[index].grade == "D") {
                    chartData[3] =  parseInt(tData[index].count); 
                } else if(tData[index].grade == "F") {
                    chartData[4] =  parseInt(tData[index].count); 
                } 
                
             });

            loadChart(courseId, chartData);
        }
    });



}




function validateChangePasswordForm() {
    var userMail = sessionStorage.getItem('userMail');
    var oldPassword = document.forms["changePasswordForm"]["oldPassword"].value;
    var newPassword = document.forms["changePasswordForm"]["password"].value;
    var rePassword = document.forms["changePasswordForm"]["confirmPassword"].value;

    var dataString = 'name=' + userMail + '&password=' + oldPassword;
    $.ajax({
        type: "POST",
        url: "https://cmpe235ipav-arjunshukla.c9users.io/backend/login.php",
        data: dataString,
        cache: false,
        success: function(result) {
            var result = trim(result);
            if (result == "ERROR") {
                $("#wrong-password-message").popup("open");
            }
            else {
                if (newPassword == rePassword) {
                    $.post('https://cmpe235ipav-arjunshukla.c9users.io/backend/updatePassword.php', {
                            userMail: userMail,
                            password: newPassword
                        },
                        function(data, status) {
                            if (data == "student") {
                                window.location = '../student-dashboard.html';
                            }
                            else {
                                window.location = '../professor-dashboard.html';
                            }
                        });
                }
            }
        }
    });

}


function trim(str) {
    var str = str.replace(/^\s+|\s+$/, '');
    return str;
}


function validateStudentScores() {
    var courseId;
    courseId = sessionStorage.getItem('professorCourse');
    //= document.forms["studentScoresForm"]["courseId"].value;

    var userMail = document.forms["studentScoresForm"]["studentList"].value;
    
    var homeworks = document.forms["studentScoresForm"]["homeworks"].value;
    var labs = document.forms["studentScoresForm"]["labs"].value;
    var project = document.forms["studentScoresForm"]["project"].value;
    var presentation = document.forms["studentScoresForm"]["presentation"].value;
    var midterm = document.forms["studentScoresForm"]["midterm"].value;
    var final = document.forms["studentScoresForm"]["final"].value;

    $.post('https://cmpe235ipav-arjunshukla.c9users.io/backend/assignScore.php', {
            courseId: courseId,
            studentList: userMail,
            homeworks: homeworks,
            labs: labs,
            project: project,
            presentation: presentation,
            midterm: midterm,
            final: final
        },
        function(data, status) {
            alert('Saved Successfully');
        });
        
        return false;
}



function validateMaximumPoints() {
    var courseId;
    courseId = sessionStorage.getItem('professorCourse');
    //= document.forms["maximumPointsForm"]["courseId"].value;
    var homeworks = document.forms["maximumPointsForm"]["homeworksMP"].value;
    var labs = document.forms["maximumPointsForm"]["labsMP"].value;
    var project = document.forms["maximumPointsForm"]["projectMP"].value;
    var presentation = document.forms["maximumPointsForm"]["presentationMP"].value;
    var midterm = document.forms["maximumPointsForm"]["midtermMP"].value;
    var final = document.forms["maximumPointsForm"]["finalMP"].value;

    $.post('https://cmpe235ipav-arjunshukla.c9users.io/backend/maxScore.php', {
            courseId: courseId,
            homeworksMP: homeworks,
            labsMP: labs,
            projectMP: project,
            presentationMP: presentation,
            midtermMP: midterm,
            finalMP: final
        },
        function(data, status) {
            alert('Saved Successfully');
        });
    return false;
}


function validatePercentageDist() {
    var courseId; 
    courseId = sessionStorage.getItem('professorCourse');
    
    //= document.forms["percentageDistributionForm"]["courseId"].value;
    var homeworks = document.forms["percentageDistributionForm"]["homeworksPD"].value;
    var labs = document.forms["percentageDistributionForm"]["labsPD"].value;
    var project = document.forms["percentageDistributionForm"]["projectPD"].value;
    var presentation = document.forms["percentageDistributionForm"]["presentationPD"].value;
    var midterm = document.forms["percentageDistributionForm"]["midtermPD"].value;
    var final = document.forms["percentageDistributionForm"]["finalPD"].value;

    var total = parseInt(homeworks) + parseInt(labs) + parseInt(project) + parseInt(presentation) + parseInt(midterm) + parseInt(final);

    if (total == 100) {
        $.post('https://cmpe235ipav-arjunshukla.c9users.io/backend/percentDist.php', {
                courseIdPD: courseId,
                homeworksPD: homeworks,
                labsPD: labs,
                projectPD: project,
                presentationPD: presentation,
                midtermPD: midterm,
                finalPD: final
            },
            function(data, status) {
                alert('Saved Successfully');
            });
            return false;
    }
    else {
        alert("Sum of percentage distribution must equal 100%");
        return false;
    }
}



function validateGradeRanges() {

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
                    submitGradeRanges();
                    return false;
                }
                else {
                    showGradeRangeSliderAlert("Please check D Garde range.\nD-Min should be 1 greater than F-Max and F-min should be 0.");
                    return false;
                }
            }
            else {
                showGradeRangeSliderAlert("Please check C Garde range.\nC-Min should be 1 greater than D-Max.");
                return false;
            }
        }
        else {
            showGradeRangeSliderAlert("Please check B Garde range.\n B-Min should be 1 greater than C-Max.");
            return false;
        }
    }
    else {
        showGradeRangeSliderAlert("Please check A Garde range.\nA-Max should be 100 and A-Min should be 1 greater than B-Max.");
        return false;
    }
}

function showGradeRangeSliderAlert(message) {
    alert(message);
    return false;
}


function submitGradeRanges() {
    var courseId;
    courseId = sessionStorage.getItem('professorCourse');
    // = document.forms["percentageDistributionForm"]["courseId"].value;
    var aStart = document.forms["gradeRangeForm"]["aStart"].value;
    var bStart = document.forms["gradeRangeForm"]["bStart"].value;
    var cStart = document.forms["gradeRangeForm"]["cStart"].value;
    var dStart = document.forms["gradeRangeForm"]["dStart"].value;
    var fStart = document.forms["gradeRangeForm"]["fStart"].value;
    var aEnd = document.forms["gradeRangeForm"]["aEnd"].value;
    var bEnd = document.forms["gradeRangeForm"]["bEnd"].value;
    var cEnd = document.forms["gradeRangeForm"]["cEnd"].value;
    var dEnd = document.forms["gradeRangeForm"]["dEnd"].value;
    var fEnd = document.forms["gradeRangeForm"]["fEnd"].value;


    $.post('https://cmpe235ipav-arjunshukla.c9users.io/backend/gradeRange.php', {
            aStart: aStart,
            bStart: bStart,
            cStart: cStart,
            dStart: dStart,
            fStart: fStart,
            aEnd: aEnd,
            bEnd: bEnd,
            cEnd: cEnd,
            dEnd: dEnd,
            fEnd: fEnd
        },
        function(data, status) {
            alert('Save Successfully');
        });
    return false;
}


function getAssignedScores() {
    var request = {
        "async": true,
        "crossDomain": true,
        "url": "https://cmpe235ipav-arjunshukla.c9users.io/backend/getMaxPoints.php",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    };

    $.ajax(request).done(function(response) {

        document.getElementById("homeworks").max = response[0].maxScore;
        document.getElementById("homeworks").value = response[0].maxScore / 2;
        document.getElementById("homeworksMP").value = response[0].maxScore;

        document.getElementById("labs").max = response[1].maxScore;
        document.getElementById("labs").value = response[1].maxScore / 2;
        document.getElementById("labsMP").value = response[1].maxScore;

        document.getElementById("project").max = response[2].maxScore;
        document.getElementById("project").value = response[2].maxScore / 2;
        document.getElementById("projectMP").value = response[2].maxScore;

        document.getElementById("presentation").max = response[3].maxScore;
        document.getElementById("presentation").value = response[3].maxScore / 2;
        document.getElementById("presentationMP").value = response[3].maxScore;

        document.getElementById("midterm").max = response[4].maxScore;
        document.getElementById("midterm").value = response[4].maxScore / 2;
        document.getElementById("midtermMP").value = response[4].maxScore;

        document.getElementById("final").max = response[5].maxScore;
        document.getElementById("final").value = response[5].maxScore / 2;
        document.getElementById("finalMP").value = response[5].maxScore;
    });
}


function getPercentageDistribution() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://cmpe235ipav-arjunshukla.c9users.io/backend/getPercentage.php",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function(response) {
        
        document.getElementById("homeworksPD").max = response[0].percentage;
        document.getElementById("homeworksPD").value = response[0].percentage / 2;

        document.getElementById("labsPD").max = response[1].percentage;
        document.getElementById("labsPD").value = response[1].percentage / 2;

        document.getElementById("projectPD").max = response[2].percentage;
        document.getElementById("projectPD").value = response[2].percentage / 2;

        document.getElementById("presentationPD").max = response[3].percentage;
        document.getElementById("presentationPD").value = response[3].percentage / 2;

        document.getElementById("midtermPD").max = response[4].percentage;
        document.getElementById("midtermPD").value = response[4].percentage / 2;

        document.getElementById("finalPD").max = response[5].percentage;
        document.getElementById("finalPD").value = response[5].percentage / 2;
    });
}





function getProfessorData() {
    var userMail = sessionStorage.getItem('userMail');
    $.ajax({
        type: "GET",
        url: "https://cmpe235ipav-arjunshukla.c9users.io/backend/userDetails.php?emailID=" + userMail,
        cache: false,
        success: function(data) {
            document.getElementById("userName").innerHTML = '<a target="_blank" href="#">' + data[0].name + '</a>';
            document.getElementById("professorId").innerHTML = data[0].userID;
            document.getElementById("userMail").innerHTML = userMail;
            document.getElementById("phoneNumber").innerHTML = data[0].phoneNumber;
            getProfessorCourse(userMail);
        }
    });

}


function getProfessorCourse(userMail) {
    $.ajax({
        type: "GET",
        url: "https://cmpe235ipav-arjunshukla.c9users.io/backend/profCourses.php?emailID=" + userMail,
        cache: false,
        success: function(data) {
            //var storage = window.sessionStorage;
            sessionStorage.setItem("professorCourse", data[0].course);
        
        }
    });

}


function getGradeRanges(){
    var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://cmpe235ipav-arjunshukla.c9users.io/backend/getGradeRange.php",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache"
  }
};

$.ajax(settings).done(function (response) {
  
  document.getElementById("aStart").value = response[0].startRange;
  document.getElementById("aEnd").value = response[0].endRange;
  $('#aStart').slider('refresh');
  $('#aEnd').slider('refresh');
  
  document.getElementById("bStart").value = response[1].startRange;
  document.getElementById("bEnd").value = response[1].endRange;
  $('#bStart').slider('refresh');
  $('#bEnd').slider('refresh');
  
  document.getElementById("cStart").value = response[2].startRange;
  document.getElementById("cEnd").value = response[2].endRange;
  $('#cStart').slider('refresh');
  $('#cEnd').slider('refresh');
  
  document.getElementById("dStart").value = response[3].startRange;
  document.getElementById("dEnd").value = response[3].endRange;
  $('#dStart').slider('refresh');
  $('#dEnd').slider('refresh');
  
  document.getElementById("fStart").value = response[4].startRange;
  document.getElementById("fEnd").value = response[4].endRange;
  $('#fStart').slider('refresh');
  $('#fEnd').slider('refresh');
  
});
}


function resetSession() {
    sessionStorage.removeItem('userMail');
    sessionStorage.removeItem('professorCourse');
    window.location = 'index.html';
}



function validateNotification() {
    var message = document.getElementById('messageArea').value;
    var courseId = sessionStorage.getItem('professorCourse');
    if(message != '') {
        $.post('https://cmpe235ipav-arjunshukla.c9users.io/backend/notification.php', {
           message: message,
           courseId: courseId
        },
        function(data, status) {
            alert('Notification sent successfully!');
        });
        return false;
    } else {
        alert("Please enter a notification message to send.");
        return false;
    }
}