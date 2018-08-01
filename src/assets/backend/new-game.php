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
        isset($post_data->events) &&
        isset($post_data->spaces) &&
        isset($post_data->settings) &&
        isset($post_data->description)) {

      // Declare properties
      $game_name = $post_data->gameName;
      $events = $post_data->events;
      $spaces = $post_data->spaces;
      $settings = $post_data->settings;
      $description = $post_data->description;
      $email = 'dev@nicolaosskimas.com';

      $events_info = print_r($events, true);
      $spaces_info = print_r($spaces, true);
      $settings_info = print_r($settings, true);

      // Build Email
      $email_subject = "GSM Games: New Game! ($game_name)";

      $email_body = '<html><body>';
      $email_body .= "<h2>$game_name</h2>";
      $email_body .= "<ol>
        <li>Events: $events_info</li>
        <li>Spaces: $spaces_info</li>
        <li>Settings: $settings_info</li>
      </ol>";
      $email_body .= '<h4>Game Description</h4>';
      $email_body .= "<p>$description</p>";
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
          'message' => "New game successfully submitted",
          'data' => [
            'gameName' => $game_name,
            'events' => $events,
            'spaces' => $spaces,
            'settings' => $settings,
            'description' => $description,
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
