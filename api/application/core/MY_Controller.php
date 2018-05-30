<?php

  if (!defined('BASEPATH'))
    exit('No direct script access allowed');
    use \Firebase\JWT\JWT;

  class MY_Controller extends CI_Controller {
	
    public function __construct() {
      parent::__construct();
      include APPPATH . 'vendor/firebase/php-jwt/src/JWT.php';
     
      if($this->input->get_request_header('Authorization')) {
        $token = $this->input->get_request_header('Authorization');
        try {
          $jwt = JWT::decode($token, "MyGeneratedKey",array('HS256'));
            if(isset($jwt->UserId) && !empty($jwt->UserId)){

              //success

            } else {
              $success = "FALSE";
              $msg = "Some thing went wrong please take re-login and try again.";
              $code = 2008;
              $response_data['success'] = $success;
              $response_data['message'] = (string) $msg;
              $response_data['error_code'] = $code;
              echo json_encode($response_data);
              die;  
            }            
          } catch (Exception $e) { // Also tried JwtException
            $success = "FALSE";
            $msg = "Some thing went wrong please take re-login and try again.";
            $code = 2008;
            $response_data['success'] = $success;
            $response_data['message'] = (string) $msg;
            $response_data['error_code'] = $code;
            echo json_encode($response_data);
            die;  
          }
      } else {
        $success = "FALSE";
        $msg = "Some thing went wrong please take re-login and try again.";
        $code = 2008;
        $response_data['success'] = $success;
        $response_data['message'] = (string) $msg;
        $response_data['error_code'] = $code;
        echo json_encode($response_data);
        die;  
      }
    }
	
  }
  
  
?>