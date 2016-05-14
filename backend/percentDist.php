<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'UPDATE scores'
        . ' SET percentage = ' . $_POST['homeworksPD']
        . ' WHERE scoreType=\'Homeworks\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE scores'
        . ' SET percentage = ' . $_POST['labsPD']
        . ' WHERE scoreType=\'Labs\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE scores'
        . ' SET percentage = ' . $_POST['projectPD']
        . ' WHERE scoreType=\'Project\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE scores'
        . ' SET percentage = ' . $_POST['presentationPD']
        . ' WHERE scoreType=\'Presentation\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE scores'
        . ' SET percentage = ' . $_POST['midtermPD']
        . ' WHERE scoreType=\'Midterm\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE scores'
        . ' SET percentage = ' . $_POST['finalPD']
        . ' WHERE scoreType=\'Final\';';
$result = mysqli_query($conn, $sql);
echo("SUCCESS");
$conn->close();
?>