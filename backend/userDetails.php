<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'SELECT * FROM users WHERE emailID = "' . $_POST['emailID'] . '"'; 
$result = mysqli_query($conn, $sql);

header('Content-Type: application/json');
$jsonData = array();
while ($row = mysqli_fetch_row($result)) {
    $jsonData[] = array('emailID' => $row["emailID"], 'userID' => $row["userID"], 'name' => $row["name"], 
    'phoneNumber' => $row["phoneNumber"], 'role' => $row["role"]);
}
echo json_encode($jsonData);

$conn->close();
exit;
?>