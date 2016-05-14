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
    $newPassword = substr(uniqid(rand()),0,7);
    $code = md5($newPassword);
    $email = $_POST['userMail'];
    $sql1 = 'UPDATE users'
        . ' SET password = \'' . $code 
        . ' \' WHERE emailID = \'' . $_POST['userMail'] . '\';';
    $result1 = mysqli_query($conn, $sql1);
    
    require('twilio-php/Services/Twilio.php'); 
 
    $account_sid = 'ACb65b048cff458736d3f6a61a6c9769d9'; 
    $auth_token = 'c7b12c30bd52eb844a73c3f2cec67a30'; 
    $client = new Services_Twilio($account_sid, $auth_token); 
    
    $client->account->messages->create(array( 
    	'To' => $row["phoneNumber"], 
    	'From' => "+17315034388", 
    	'Body' => "Hi! " . $row["name"] . "! Your new password is: " . $newPassword,   
    ));
}
echo "SUCCESS";
$conn->close();
?>