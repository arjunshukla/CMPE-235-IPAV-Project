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
 
    $account_sid = 'AC0372d38714d2a97a6f7adc26d844dcbb'; 
    $auth_token = '7955650e0e877d4b8ebba4ebc0962d87'; 
    $client = new Services_Twilio($account_sid, $auth_token); 
    
    $client->account->messages->create(array( 
    	'To' => $row["phoneNumber"], 
    	'From' => "+17035963102", 
    	'Body' => "Hi! " . $row["name"] . "! Your new password is: " . $newPassword,   
    ));
    
    require_once '../vendor/swiftmailer/swiftmailer/lib/swift_required.php';

    $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
      ->setUsername('cmpe235ipav')
      ->setPassword('coolprofsinn');
    
    $mailer = Swift_Mailer::newInstance($transport);
    
    $message = Swift_Message::newInstance('Reset Password')
      ->setFrom(array('cmpe235ipav@gmail.com' => 'mCompute'))
      ->setTo(array($_POST['userMail']))
      ->setBody('Hi! ' . $row["name"] . '! Your new password is: ' . $newPassword);
    
    $resultn = $mailer->send($message);
}
echo "SUCCESS";
$conn->close();
?>