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
 
    $account_sid = 'AC1455ee0bbd738e954a909af61ecd1139'; 
    $auth_token = '68f23912666fdd213738678e35742e71'; 
    $client = new Services_Twilio($account_sid, $auth_token); 
 
    $client->account->messages->create(array( 
    	'To' => "4087149328", 
    	'From' => "+18442932272", 
    	'Body' => "Hi! " . $row["name"] . "! Your new password is: " . $newPassword,   
    ));
}

$conn->close();
header('Location: ../www/views/home.html');
exit;
?>