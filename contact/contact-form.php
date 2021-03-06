<?php
function clean_string($string)
{
    $bad = array("content-type", "bcc:", "to:", "cc:", "href");
    return str_replace($bad, "", $string);
}


if (isset($_POST['Email']) && isset($_POST['Name'])) {
    $email_to = "trakadev@gmail.com";
    $email_subject = "Contacto " . $_POST['Name'];
    $name = $_POST['Name'];
    $email = $_POST['Email'];
    $message = $_POST['Message'];

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

    if (!preg_match($email_exp, $email)) {
        echo json_encode(['ERROR' => 'INVALID EMAIL.']);
    } else {

        $email_message = "Form details below.\n\n";
        $email_message .= "Name: " . clean_string($name) . "\n";
        $email_message .= "Email: " . clean_string($email) . "\n";
        $email_message .= "Message: " . clean_string($message) . "\n";

        // create email headers
        $headers = 'From: ' . "contacto@jorgeluisjaimesanchez.com" . "\r\n" .
            'Reply-To: ' . $email . "\r\n" .
            'X-Mailer: PHP/' . phpversion();
        try {
            mail($email_to, $email_subject, $email_message, $headers);
        } catch (\Throwable $th) {
            echo json_encode(["ERROR" => "FAILED TO SEND EMAIL."]);
        }
        echo json_encode(["SUCCESS" => "MESSAGE SENT."]);
    }
} else {
    echo json_encode(["ERROR" => "EMPTY REQUEST."]);
}