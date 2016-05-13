<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

//$sql = 'INSERT INTO users (emailID, userID, name, phoneNumber, password, role ) VALUES (\'ish@gmail.com\', 009877764, \'ishneet kaur\', 4087149328, \'password\', \'student\');';
$sql = 'INSERT INTO users (emailID ,userID, name, phoneNumber, password, role) VALUES (\'' . $_POST['userMail'] . '\',' 
        . $_POST['studentId'] 
        . ',\'' . $_POST['fullname'] . '\','  
        . $_POST['phone'] 
        . ',\'' . md5($_POST['password']) . '\','
        . '\'student\''
        . ');'; 
$result = mysqli_query($conn, $sql);

$conn->close();
header('Location: ../www/views/home.html');
exit;
?>