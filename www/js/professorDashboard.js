

function loadChart(name, data) {
        $('#studentPerformanceBellCurve').highcharts({
            chart: {
                type: 'areaspline'
            },
            title: {
                text: 'Average score'
            },
            legend: {
                enabled:false
            },
            xAxis: {
                categories: [
                    '0',
                    '25',
                    '50',
                    '75',
                    '100'
                ]
            },
            yAxis: {
                title: {
                    text: '# of students'
                }
            },
            tooltip: {
                enabled:false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                enabled:false
            },
            series: [ {
                name: 'Jane',
                data: [5,10,20,35,5],     
                zoneAxis: 'x',
                zones: [{
                   value: 1,
                   color: 'red'
                }, {
                   value: 2,
                   color: 'yellow'
                }, {
                    value: 3,
                   color: 'blue'
                }, {
                    value: 4,
                   color: 'green'
                },{
                    
                   color: 'gray'
                }]
              
            }],
        });
        
}


function getListOfStudents(){
    var courseId;
    courseId = document.forms["studentScoresForm"]["courseId"].value;
    //courseId = document.getElementById('studentScoresForm').elements['courseId'].value;
    var dataString = 'courseId=' + courseId;
    
    var items="<option value=''> Select student </option>";
    
    
     $.ajax({
         type: "GET",
         url: "https://cmpe235ipav-arjunshukla.c9users.io/backend/getStudentList.php?courseId="+courseId,
         cache: false,
         success: function(data){
    
                $.each(data,function(index,item) 
                {
                  items+="<option value='"+item.emailID+"'>"+item.emailID+"</option>";
                });
                $("#studentList").html(items); 
             
            }
    });
     
     

}


function getStudentScores(){
    var courseId;
    var chartData = [];
    //courseId = document.getElementById('studentScoresForm').elements['courseId'].value;
    courseId = document.forms["studentScoresForm"]["courseId"].value;

     $.ajax({
         type: "GET",
         url: "https://cmpe235ipav-arjunshukla.c9users.io/backend/studentGrade.php?courseId="+courseId,
         cache: false,
         success: function(data){
                alert(data);
                $.each(data,function(index,item) 
                {
                  chartData.push(item);
                });
                
                loadChart(courseId, chartData);
            }
  });
     
     
   
}




function validateChangePasswordForm() {
    var userMail = document.forms["changePasswordForm"]["userMail"].value;
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


function validateStudentScores() {
    var courseId = document.forms["studentScoresForm"]["courseId"].value;
    var userMail = document.forms["studentScoresForm"]["studentList"].value;
    var homeworks = document.forms["studentScoresForm"]["homeworks"].value;
    var labs = document.forms["studentScoresForm"]["labs"].value;
    var project = document.forms["studentScoresForm"]["project"].value;
    var presentation = document.forms["studentScoresForm"]["presentation"].value;
    var midterm = document.forms["studentScoresForm"]["midterm"].value;
    var final = document.forms["studentScoresForm"]["final"].value;

    $.post('https://cmpe235ipav-arjunshukla.c9users.io/backend/assignScore.php', {
      courseId: courseId,
      userMail: userMail,
      homeworks: homeworks,
      labs: labs,
      project: project,
      presentation: presentation,
      midterm: midterm,
      final: final
    },
    function(data,status){
        if (data == "SUCCESS") {
             window.location = '../professor-dashboard.html';
             return true;
        } else {
             window.location = '../professor-dashboard.html';
             return false;
        }
    });
}



function validateMaximumPoints() {
    var courseId = document.forms["maximumPointsForm"]["courseId"].value;
    var homeworks = document.forms["maximumPointsForm"]["homeworks"].value;
    var labs = document.forms["maximumPointsForm"]["labs"].value;
    var project = document.forms["maximumPointsForm"]["project"].value;
    var presentation = document.forms["maximumPointsForm"]["presentation"].value;
    var midterm = document.forms["maximumPointsForm"]["midterm"].value;
    var final = document.forms["maximumPointsForm"]["final"].value;

    $.post('https://cmpe235ipav-arjunshukla.c9users.io/backend/maxScore.php', {
      courseId: courseId,
      homeworks: homeworks,
      labs: labs,
      project: project,
      presentation: presentation,
      midterm: midterm,
      final: final
    },
    function(data,status){
        if (data == "SUCCESS") {
             window.location = '../professor-dashboard.html';
             return true;
        } else {
             window.location = '../professor-dashboard.html';
             return false;
        }
    });
}

    
function validatePercentageDist() {
    var courseId = document.forms["percentageDistributionForm"]["courseId"].value;
    var homeworks = document.forms["percentageDistributionForm"]["homeworks"].value;
    var labs = document.forms["percentageDistributionForm"]["labs"].value;
    var project = document.forms["percentageDistributionForm"]["project"].value;
    var presentation = document.forms["percentageDistributionForm"]["presentation"].value;
    var midterm = document.forms["percentageDistributionForm"]["midterm"].value;
    var final = document.forms["percentageDistributionForm"]["final"].value;

    $.post('https://cmpe235ipav-arjunshukla.c9users.io/backend/percentDist.php', {
      courseId: courseId,
      homeworks: homeworks,
      labs: labs,
      project: project,
      presentation: presentation,
      midterm: midterm,
      final: final
    },
    function(data,status){
        if (data == "SUCCESS") {
             window.location = '../professor-dashboard.html';
             return true;
        } else {
             window.location = '../professor-dashboard.html';
             return false;
        }
    });
}
        
        

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


function submitGradeRanges() {
    var courseId = document.forms["percentageDistributionForm"]["courseId"].value;
    var homeworks = document.forms["percentageDistributionForm"]["homeworks"].value;
    var labs = document.forms["percentageDistributionForm"]["labs"].value;
    var project = document.forms["percentageDistributionForm"]["project"].value;
    var presentation = document.forms["percentageDistributionForm"]["presentation"].value;
    var midterm = document.forms["percentageDistributionForm"]["midterm"].value;
    var final = document.forms["percentageDistributionForm"]["final"].value;

    $.post('https://cmpe235ipav-arjunshukla.c9users.io/backend/gradeRange.php', {
      courseId: courseId,
      homeworks: homeworks,
      labs: labs,
      project: project,
      presentation: presentation,
      midterm: midterm,
      final: final
    },
    function(data,status){
        if (data == "SUCCESS") {
             window.location = '../professor-dashboard.html';
             return true;
        } else {
             window.location = '../professor-dashboard.html';
             return false;
        }
    });
}