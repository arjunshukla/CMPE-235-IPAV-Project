<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sqln = 'INSERT INTO studentScore (emailID ,course, homeworks, labs, project, presentation, midterm, final) VALUES (\'' . $_POST['studentList'] . '\',' 
        . '\'' . $_POST['courseId'] . '\',' 
        . $_POST['homeworks'] 
        . ',' . $_POST['labs']
        . ',' . $_POST['project']
        . ',' . $_POST['presentation']  
        . ',' . $_POST['midterm']
        . ',' . $_POST['final']
        . ') ON DUPLICATE KEY UPDATE homeworks=' 
        . $_POST['homeworks']
        . ', labs = ' . $_POST['labs']
        . ', project = ' . $_POST['project']
        . ', presentation = ' . $_POST['presentation']  
        . ', midterm = ' . $_POST['midterm']
        . ', final = ' . $_POST['final']
        . ';'; 
$resultn = mysqli_query($conn, $sqln);

$studentSum = 0;
$totalSum = 0;
$sql = 'SELECT scoreType, percentage, maxScore FROM scores;';
$result = mysqli_query($conn, $sql);
while ($arr = mysqli_fetch_row($result)) {
    
    switch ($arr[0]) {
        case "Homeworks":
            $sql1 = 'SELECT homeworks FROM studentScore WHERE emailID = "' . $_POST['studentList'] . '" and course = "' . $_POST['courseId'] . '";';
            $result1 = mysqli_query($conn, $sql1);
            $row = $result1->fetch_assoc();
            $studentSum += ($row["homeworks"] * $arr[1]) ;
            break;
        case "Labs":
            $sql1 = 'SELECT labs FROM studentScore WHERE emailID = "' . $_POST['studentList'] . '" and course = "' . $_POST['courseId'] . '";';
            $result1 = mysqli_query($conn, $sql1);
            $row = $result1->fetch_assoc();
            $studentSum += ($row["labs"]  * $arr[1]) ;
            break;
        case "Project":
            $sql1 = 'SELECT project FROM studentScore WHERE emailID = "' . $_POST['studentList'] . '" and course = "' . $_POST['courseId'] . '";';
            $result1 = mysqli_query($conn, $sql1);
            $row = $result1->fetch_assoc();
            $studentSum += ($row["project"]  * $arr[1]) ;
            break;
        case "Presentation":
            $sql1 = 'SELECT presentation FROM studentScore WHERE emailID = "' . $_POST['studentList'] . '" and course = "' . $_POST['courseId'] . '";';
            $result1 = mysqli_query($conn, $sql1);
            $row = $result1->fetch_assoc();
            $studentSum += ($row["presentation"]  * $arr[1]) ;
            break;
        case "Midterm":
            $sql1 = 'SELECT midterm FROM studentScore WHERE emailID = "' . $_POST['studentList'] . '" and course = "' . $_POST['courseId'] . '";';
            $result1 = mysqli_query($conn, $sql1);
            $row = $result1->fetch_assoc();
            $studentSum += ($row["midterm"]  * $arr[1]) ;
            break;
        case "Final":
            $sql1 = 'SELECT final FROM studentScore WHERE emailID = "' . $_POST['studentList'] . '" and course = "' . $_POST['courseId'] . '";';
            $result1 = mysqli_query($conn, $sql1);
            $row = $result1->fetch_assoc();
            $studentSum += ($row["final"]  * $arr[1]) ;
            break;
    }
    $totalSum += $arr[2] * $arr[1];
}

$grade = ( $studentSum / $totalSum ) * 100;
$sql2 = 'SELECT grade FROM gradeRange WHERE endRange >= ' . $grade . ' and startRange <= ' . $grade . ' ;';
$result2 = mysqli_query($conn, $sql2);
$arr2 = mysqli_fetch_row($result2);

$jsonData = array();
$jsonData[] = array('grade' => $arr2[0]);
$gradeValue = $arr2[0];

$sqlm = 'INSERT INTO studentCourse (emailID ,course, grade, term) VALUES (\'' . $_POST['studentList'] . '\',' 
        . '\'' . $_POST['courseId'] . '\',' 
        . '\'' . $gradeValue . '\',' 
        . '\'SPRING16\''
        . ') ON DUPLICATE KEY UPDATE grade=' 
        . '\'' . $gradeValue . '\''
        . ', term = \'SPRING16\'' 
        . ';'; 
$resultm = mysqli_query($conn, $sqlm);

require_once '../vendor/swiftmailer/swiftmailer/lib/swift_required.php';

    $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
      ->setUsername('cmpe235ipav')
      ->setPassword('coolprofsinn');
    
    $mailer = Swift_Mailer::newInstance($transport);
    
    $message = Swift_Message::newInstance('Grade for ' . $_POST['courseId'] )
      ->setFrom(array('cmpe235ipav@gmail.com' => 'mCompute'))
      ->setTo(array($_POST['studentList']))
      ->setBody('Hi! Your grade is: ' . $gradeValue . '. You got a score of sum ' . $studentSum . ' from the total of ' . $totalSum . '.' );
    
    $resultn = $mailer->send($message);
    
echo "SUCCESS";
$conn->close();
?>