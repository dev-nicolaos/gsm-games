<?php

header('Content-type: application/json');

$errors = '';

if (empty($errors)) {
  // Retrieve and decode data from http request
	$postdata = file_get_contents("php://input");
	$game = json_decode($postdata);

  // Decalre properties
	$email = 'dev@nicolaosskimas.com';

  // Build Email
	$email_subject = "GSM Games: New Game! ($game->name)";

  $email_body = '<html><body>';
	$email_body .= "<h2>$game->name</h2>";
  $email_body .= "<ol>
    <li>Events: print_r($game->events)</li>
    <li>Spaces: print_r($game->spaces)</li>
    <li>Settings: print_r($game->settings)</li>
  </ol>";
  $email_body .= '<h4>Game Description</h4>';
  $email_body .= "<p>$game->description</p>";
	$email_body .= '</body></html>';

	$headers = [
    "MIME-Version" => "1.0",
    "Content-Type" => 'text/html; charset=UTF-8',
	  "From" => "$email",
  ];

	if (@mail($email,$email_subject,$email_body,$headers)) {
    $response_array = [
      'status' => 'success',
      'data' => $game,
    ];
    json_encode($response_array);
    header($response_array);
    return;
  } else {
    $response_array = [
      'status' => 'error',
      'data' => [
        'message' => 'Email could not be sent',
      ],
    ];
    json_encode($response_array);
    header($response_array);
    return;
  }

} else {
	$response_array = [
    'status' => 'error',
    'data' => [
      'message': 'Error in submission',
    ]
    ];
	json_encode($response_array);
	header($response_array);
}

?>
