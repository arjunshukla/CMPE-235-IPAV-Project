<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'SELECT course FROM courseDetails WHERE emailID = "' . $_GET['emailID'] . '";'; 
$result = mysqli_query($conn, $sql);
header('Content-Type: application/json');
$jsonData = array();
while ($arr = mysqli_fetch_row($result)) {
    $jsonData[] = array('course' => $arr[0]);
}
echo json_encode($jsonData);
$conn->close();
?>