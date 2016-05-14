<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'INSERT INTO studentScore (emailID ,course, homeworks, labs, project, presentation, midterm, final) VALUES (\'' . $_POST['studentList'] . '\',' 
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
$result = mysqli_query($conn, $sql);

$conn->close();
header('Location: ../www/views/professor-dashboard.html');
exit;
?>