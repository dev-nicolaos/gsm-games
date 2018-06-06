<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');

  // Retrieve and decode data from http request
	$game_data = json_decode(file_get_contents("php://input"));

  // Decalre properties
	$email = 'dev@nicolaosskimas.com';

  // Build Email
	$email_subject = "GSM Games: New Game! ($post_data->name)";

  $email_body = '<html><body>';
	$email_body .= "<h2>$post_data->name</h2>";
  $email_body .= "<ol>
    <li>Events: print_r($post_data->events)</li>
    <li>Spaces: print_r($post_data->spaces)</li>
    <li>Settings: print_r($post_data->settings)</li>
  </ol>";
  $email_body .= '<h4>Game Description</h4>';
  $email_body .= "<p>$post_data->description</p>";
	$email_body .= '</body></html>';

  // Set Email Headers
	$headers = [
    "MIME-Version" => "1.0",
    "Content-Type" => 'text/html; charset=UTF-8',
	  "From" => "$email",
  ];

  // Try and send email, then send response
	if (@mail($email,$email_subject,$email_body,$headers)) {
    $response_array = [
      'status' => 'success',
      'data' => $post_data,
    ];
    echo json_encode($response_array);
  } else {
    $response_array = [
      'status' => 'error',
      'data' => [
        'message' => 'Email could not be sent',
      ],
    ];
    echo json_encode($response_array);
  }

?>
