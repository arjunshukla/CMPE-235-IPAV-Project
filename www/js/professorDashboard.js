window.onload = function(){
    
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
        courseId = document.getElementById('studentScoresForm').elements['courseId'].value;
        var dataString = 'courseId=' + courseId;
        
        var items="<option value=''> Select student </option>";
        
        
         $.ajax({
             type: "GET",
             url: "../../backend/getStudentList.php?courseId="+courseId,
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
        courseId = document.getElementById('studentScoresForm').elements['courseId'].value;
        var dataString = 'courseId=' + courseId;
    
        var items="<option value=''> Select student </option>";
    
    
         $.ajax({
             type: "GET",
             url: "../../backend/getStudentScores.php?courseId="+courseId,
             cache: false,
             success: function(data){
    
                    $.each(data,function(index,item) 
                    {
                      chartData.push(item);
                    });
                    
                    loadChart(courseId, chartData);
                }
      });
         
         
       
    }
    

    getListOfStudents(); 
    
    
    loadChart('CMPE-235', []);
            
}