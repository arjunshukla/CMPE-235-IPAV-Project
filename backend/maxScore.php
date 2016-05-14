<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'UPDATE scores'
        . ' SET maxScore = ' . $_POST['homeworksMP']
        . ' WHERE scoreType=\'Homeworks\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE scores'
        . ' SET maxScore = ' . $_POST['labsMP']
        . ' WHERE scoreType=\'Labs\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE scores'
        . ' SET maxScore = ' . $_POST['projectMP']
        . ' WHERE scoreType=\'Project\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE scores'
        . ' SET maxScore = ' . $_POST['presentationMP']
        . ' WHERE scoreType=\'Presentation\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE scores'
        . ' SET maxScore = ' . $_POST['midtermMP']
        . ' WHERE scoreType=\'Midterm\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE scores'
        . ' SET maxScore = ' . $_POST['finalMP']
        . ' WHERE scoreType=\'Final\';';
$result = mysqli_query($conn, $sql);

$conn->close();
header('Location: ../www/views/professor-dashboard.html');
exit;
?>