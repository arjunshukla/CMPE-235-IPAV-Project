<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'SELECT course , grade, COUNT(*) AS count FROM studentCourse GROUP BY course, grade having course = "' . $_GET['courseId'] . '";'; 
$result = mysqli_query($conn, $sql);
if($result->num_rows > 0){
    $jsonData = array();
    while ($arr = mysqli_fetch_row($result)) {
        $jsonData[] = array('grade' => $arr[1], 'count' => $arr[2]);
    }
    echo json_encode($jsonData);
}
else{
    echo "ERROR";
}
$conn->close();
?>