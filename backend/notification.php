<?php
require_once '../vendor/swiftmailer/swiftmailer/lib/swift_required.php';

include 'connect.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = 'SELECT emailID FROM studentCourse WHERE course = "' . $_POST['courseId'] . '";'; 
$result = mysqli_query($conn, $sql);

while ($arr = mysqli_fetch_row($result)) {
    $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
      ->setUsername('cmpe235ipav')
      ->setPassword('coolprofsinn');
    $mailer = Swift_Mailer::newInstance($transport);
    $message = Swift_Message::newInstance('Announcement')
      ->setFrom(array('cmpe235ipav@gmail.com' => 'mCompute'))
      ->setTo(array($arr[0]))
      ->setBody($_POST['message']);
    
    $resultm = $mailer->send($message);   
}
$conn->close();
?>