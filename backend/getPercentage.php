<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'SELECT scoreType, percentage FROM scores;'; 
$result = mysqli_query($conn, $sql);

header('Content-Type: application/json');
$jsonData = array();
while ($row = mysqli_fetch_row($result)) {
    $jsonData[] = array('scoreType' => $row[0], 'percentage' => $row[1]);
}
echo json_encode($jsonData);

$conn->close();
exit;
?>