<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'UPDATE scores'
        . ' SET percentage = ' . $_POST['homeworks']
        . ' WHERE scoreType=\'Homeworks\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE scores'
        . ' SET percentage = ' . $_POST['labs']
        . ' WHERE scoreType=\'Labs\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE scores'
        . ' SET percentage = ' . $_POST['project']
        . ' WHERE scoreType=\'Project\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE scores'
        . ' SET percentage = ' . $_POST['presentation']
        . ' WHERE scoreType=\'Presentation\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE scores'
        . ' SET percentage = ' . $_POST['midterm']
        . ' WHERE scoreType=\'Midterm\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE scores'
        . ' SET percentage = ' . $_POST['final']
        . ' WHERE scoreType=\'Final\';';
$result = mysqli_query($conn, $sql);

$conn->close();
header('Location: ../www/views/professor-dashboard.html');
exit;
?>