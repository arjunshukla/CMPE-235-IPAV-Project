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
 
$account_sid = 'AC4c866685a6d0eaf86abe30675bd3b3e2'; 
$auth_token = 'b3b37c0df31b3402e3ea2cc43c95ff0f'; 
$client = new Services_Twilio($account_sid, $auth_token); 
$jsonData = array();

try{
$response = $client->account->outgoing_caller_ids->create($_POST['phone'], array(    
)); 
$jsonData[] = array('statusCode' => "SUCCESS", 'validCode' => $response->validation_code);
}
catch (Services_Twilio_RestException $e) {
    echo $e->getMessage();
}
echo json_encode($jsonData);
$conn->close();
?>