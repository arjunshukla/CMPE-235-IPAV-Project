<?php
require_once '../vendor/swiftmailer/swiftmailer/lib/swift_required.php';

$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
  ->setUsername('cmpe235ipav')
  ->setPassword('coolprofsinn');

$mailer = Swift_Mailer::newInstance($transport);

$message = Swift_Message::newInstance('Thank you for contacting us')
  ->setFrom(array('cmpe235ipav@gmail.com' => 'mCompute'))
  ->setTo(array($_POST['mail']))
  ->setBody('Hi, ' . $_POST['naam'] . '. Your subject of ' . $_POST['subject'] . ' and message having - ' . $_POST['message'] . 'was received.');

$result = $mailer->send($message);
?>