<?php
// Pear Mail Library
// require_once ".:/usr/share/php:/usr/share/pear/Mail.php";
// include_once("Mail.php");
// include('.:/usr/share/php:/usr/share/pear/Mail.php');

require_once (__DIR__."Mail.php");

$from = 'cmpe235ipav@gmail.com';
$to = 'arjun.shukla@sjsu.edu';
$subject = 'Hi!';
$body = "Hi,\n\nHow are you?";

$headers = array(
    'From' => $from,
    'To' => $to,
    'Subject' => $subject
);

$smtp = Mail::factory('smtp', array(
        'host' => 'ssl://smtp.gmail.com',
        'port' => '465',
        'auth' => true,
        'username' => 'cmpe235ipav@gmail.com',
        'password' => 'coolprofsinn'
    ));

$mail = $smtp->send($to, $headers, $body);

if (PEAR::isError($mail)) {
    echo('<p>' . $mail->getMessage() . '</p>');
} else {
    echo('<p>Message successfully sent!</p>');
}
?>