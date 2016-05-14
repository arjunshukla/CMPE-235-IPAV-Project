<?php
include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'INSERT INTO users (emailID ,userID, name, phoneNumber, password, role) VALUES (\'' . $_POST['userMail'] . '\',' 
        . $_POST['studentId'] 
        . ',\'' . $_POST['fullname'] . '\','  
        . $_POST['phone'] 
        . ',\'' . md5($_POST['password']) . '\','
        . '\'student\''
        . ');'; 
$result = mysqli_query($conn, $sql);

require('twilio-php/Services/Twilio.php'); 
 
$account_sid = 'ACb65b048cff458736d3f6a61a6c9769d9'; 
$auth_token = 'c7b12c30bd52eb844a73c3f2cec67a30'; 
$client = new Services_Twilio($account_sid, $auth_token); 

$response = $client->account->outgoing_caller_ids->create($_POST['phone'], array(    
)); 

$jsonData = array();
$jsonData[] = array('statusCode' => "SUCCESS", 'validCode' => $response->validation_code);

echo json_encode($jsonData);
$conn->close();
?>