<?php

header('Content-type: application/json');

$errors = '';

if (empty($errors)) {
  // Retrieve and decode data from http request
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

  // Decalre properties
	$game_name = $request->gameName;
	$game_id = $request->gameId;
	$improvements = $request->improvements;
	$email = 'dev@nicolaosskimas.com';

  // Build Email
	$email_subject = "GSM Games: Suggestion for $game_name";

  $email_body = '<html><body>';
	$email_body .= "<h2>Suggested Improvements for: $game_name ($game_id)</h2>";
	$email_body .= "<p>$improvements</p>";
	$email_body .= '</body></html>';

	$headers = [
    "MIME-Version" => "1.0",
    "Content-Type" => 'text/html; charset=UTF-8',
	  "From" => "$email",
  ];

	if (@mail($email,$email_subject,$email_body,$headers)) {
    $response_array = [
      'status' => 'success',
      'data' => [
        'gameName' => "$game_name",
        'gameId' => "$game_id",
        'improvements' => "$improvements",
      ],
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
