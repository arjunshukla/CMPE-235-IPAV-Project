<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'SELECT grade, startRange, endRange FROM gradeRange;'; 
$result = mysqli_query($conn, $sql);

header('Content-Type: application/json');
$jsonData = array();
while ($row = mysqli_fetch_row($result)) {
    $jsonData[] = array('grade' => $row[0], 'startRange' => $row[1], 'endRange' => $row[2]);
}
echo json_encode($jsonData);

$conn->close();
exit;
?>