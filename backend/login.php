<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'SELECT * FROM users WHERE emailID = "' . $_POST['name'] . '" and password = "' . md5($_POST['password']) . '"'; 
$result = mysqli_query($conn, $sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo($row["role"]);
} else {
   $errValue = "ERROR";
   echo($errValue);
}

$conn->close();
exit;
?>