<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');

  // Retrieve and decode data from http request
	$post_data = json_decode(file_get_contents("php://input"));

  // Decalre properties
	$game_name = $post_data->gameName;
	$game_id = $post_data->gameId;
	$improvements = $post_data->improvements;
	$email = 'dev@nicolaosskimas.com';

  // Build Email
	$email_subject = "GSM Games: Suggestion for $game_name";

  $email_body = '<html><body>';
	$email_body .= "<h2>Suggested Improvements for: $game_name ($game_id)</h2>";
	$email_body .= "<p>$improvements</p>";
	$email_body .= '</body></html>';

  // Set Email Headers
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
