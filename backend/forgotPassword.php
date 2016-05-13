<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'SELECT * FROM users WHERE emailID = "' . $_POST['userMail'] . '"'; 
$result = mysqli_query($conn, $sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo($row["password"]);
    // Change to random gen pwd + send email to userMail
    $newPassword = "password";
    $sql1 = 'UPDATE users'
        . ' SET password = \'' . md5($newPassword) 
        . ' \' WHERE emailID = \'' . $_POST['userMail'] . '\';';
    $result1 = mysqli_query($conn, $sql1);
    
}

$conn->close();
header('Location: ../www/views/home.html');
exit;
?>