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
 
$account_sid = ''; 
$auth_token = ''; 
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
