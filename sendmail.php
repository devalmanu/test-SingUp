<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

//От кого письмо
$mail->setFrom('New user!', 'www@www.ru');
//Кому отправить
$mail->addAddress('post-email!');
//Тема письма
$mail->Subject = 'Hello! This is new user';

//Рука
$gender = "female";
if ($_POST['gender'] == "male") {
	$gender = "male";
}

//Тело письма
$body = '<h1>Hello!</h1>';

if (trim(!empty($_POST['name']))) {
	$body .= '<p><strong>First Name:</strong> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['surname']))) {
	$body .= '<p><strong>Last Name:</strong> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
	$body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['gender']))) {
	$body .= '<p><strong>Gender:</strong> ' . $gender . '</p>';
}
if (trim(!empty($_POST['age']))) {
	$body .= '<p><strong>Возраст:</strong> ' . $_POST['age'] . '</p>';
}


$mail->Body = $body;

//Отправляем
if (!$mail->send()) {
	$message = 'Ошибка';
} else {
	$message = 'Регистрация прошла успешно!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
