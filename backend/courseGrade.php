<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'SELECT c.course , s.term, c.emailID, c.description, s.grade FROM courseDetails c INNER JOIN studentCourse s ON s.course = c.course WHERE s.emailID = "' . $_GET['emailID'] . '";'; 
$result = mysqli_query($conn, $sql);
header('Content-Type: application/json');
$jsonData = array();
while ($arr = mysqli_fetch_row($result)) {
    $jsonData[] = array('course' => $arr[0], 'term' => $arr[1],'professor' => $arr[2], 'desc' => $arr[3], 'grade' => $arr[4]);
}
echo json_encode($jsonData);
$conn->close();
?>