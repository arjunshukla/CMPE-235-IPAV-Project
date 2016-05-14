<?php
require_once '../vendor/swiftmailer/swiftmailer/lib/swift_required.php';

$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
  ->setUsername('cmpe235ipav')
  ->setPassword('coolprofsinn');

$mailer = Swift_Mailer::newInstance($transport);

$message = Swift_Message::newInstance('Test Subject')
  ->setFrom(array('cmpe235ipav@gmail.com' => 'ABC'))
  ->setTo(array('arjun.shukla@sjsu.edu'))
  ->setBody('This is a test mail.');

$result = $mailer->send($message);
?>

