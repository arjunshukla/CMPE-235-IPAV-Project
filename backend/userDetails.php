<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'SELECT emailID, userID, name, phoneNumber, role FROM users WHERE emailID = "' . $_GET['emailID'] . '";'; 
$result = mysqli_query($conn, $sql);

header('Content-Type: application/json');
$jsonData = array();
while ($row = mysqli_fetch_row($result)) {
    $jsonData[] = array('emailID' => $row[0], 'userID' => $row[1], 'name' => $row[2], 'phoneNumber' => $row[3], 'role' => $row[4]);
}
echo json_encode($jsonData);
$conn->close();
exit;
?>