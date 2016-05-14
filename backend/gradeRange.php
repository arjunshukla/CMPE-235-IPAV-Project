<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'UPDATE gradeRange'
        . ' SET startRange = ' . $_POST['aStart'] . ', endRange = ' . $_POST['aEnd']
        . ' WHERE grade=\'A\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE gradeRange'
        . ' SET startRange = ' . $_POST['bStart'] . ', endRange = ' . $_POST['bEnd']
        . ' WHERE grade=\'B\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE gradeRange'
        . ' SET startRange = ' . $_POST['cStart'] . ', endRange = ' . $_POST['cEnd']
        . ' WHERE grade=\'C\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE gradeRange'
        . ' SET startRange = ' . $_POST['dStart'] . ', endRange = ' . $_POST['dEnd']
        . ' WHERE grade=\'D\';';
$result = mysqli_query($conn, $sql);

$sql = 'UPDATE gradeRange'
        . ' SET startRange = ' . $_POST['fStart'] . ', endRange = ' . $_POST['fEnd']
        . ' WHERE grade=\'F\';';
$result = mysqli_query($conn, $sql);

$conn->close();
echo("SUCCESS");
?>