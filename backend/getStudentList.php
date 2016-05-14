<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'SELECT emailID FROM studentCourse WHERE course = "' . $_GET['courseId'] . '";'; 
$result = mysqli_query($conn, $sql);
header('Content-Type: application/json');
$jsonData = array();
while ($arr = mysqli_fetch_row($result)) {
    $jsonData[] = array('emailID' => $arr);
}
echo json_encode($jsonData);
$conn->close();

?>