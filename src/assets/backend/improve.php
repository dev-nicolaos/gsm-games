<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');

  // Retrieve data from http request and make sure it's a string (JSON)
  $request = file_get_contents("php://input");

  if (gettype($request) === "string") {

    // Decode JSON data
    $post_data = json_decode($request);

    if (isset($post_data->gameName) &&
        isset($post_data->gameId) &&
        isset($post_data->improvements)) {

      // Declare properties
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

      // Attempt to send email (requires PHP 7.2 to support $headers as array)
      if (@mail($email,$email_subject,$email_body,$headers)) {
        $response_array = [
          'status' => 'success',
          'message' => 'Game improvements successfully submitted',
          'data' => [
            'gameName' => "$game_name",
            'gameId' => "$game_id",
            'improvements' => "$improvements",
          ],
        ];
        http_response_code(200);
        echo json_encode($response_array);
      } else {
        $response_array = [
          'status' => 'error',
          'message' => 'Email could not be sent',
          'data' => $post_data,
        ];
        http_response_code(500);
        echo json_encode($response_array);
      }
    } else {
      // If $post_data doesn't have necessary properties
      handle_bad_request('Request missing required data', $post_data);
    }

  } else {
    // If $request is not a string
    handle_bad_request('Request cannot be parsed');
  }

  function handle_bad_request($reason, $data = 'none') {
    $response_array = [
      'status' => 'error',
      'message' => $reason,
    ];
    if ($data !== 'none') {
      $response_array['data'] = $data;
    }
    http_response_code(400);
    echo json_encode($response_array);
  }

?>
