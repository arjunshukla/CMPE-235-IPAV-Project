<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'UPDATE users'
        . ' SET password = \'' . md5($_POST['password']) 
        . ' \' WHERE emailID = \'' . $_POST['userMail'] . '\';';
$result = mysqli_query($conn, $sql);

$sql1 = 'SELECT * FROM users WHERE emailID = "' . $_POST['userMail'] . '"'; 
$result1 = mysqli_query($conn, $sql1);

$row = $result->fetch_assoc();
$jsonData = array();
$jsonData[] = array('role' => $row["role"]);
echo json_encode($jsonData);
$conn->close();
?>