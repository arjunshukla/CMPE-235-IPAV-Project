<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'SELECT emailID FROM studentCourse WHERE course = "CMPE-235";'; 
$result = mysqli_query($conn, $sql);

$jsonData = array();

while ($arr = mysql_fetch_row($result)) {
    $jsonData[] = $arr;
}
echo json_encode($jsonData);
$conn->close();

?>