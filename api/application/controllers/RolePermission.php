<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class RolePermission extends My_Controller {


    public function __construct() {
	
		parent::__construct();
		
		$this->load->model('RolePermission_model');
		
	}

	public function getDefault()
	{
		$data="";		
		$data['role']=$this->RolePermission_model->getuserrolelist();
		$data['permission']=$this->RolePermission_model->getpermissionlist(1);		
		echo json_encode($data);
	}

	public function getRolePermission($role_id = NULL)
	{
		if (!empty($role_id)) {
			$data="";
			$data=$this->RolePermission_model->getpermissionlist($role_id);		
			echo json_encode($data);			
		}		
	}

	public function update_permission() {
		
		$post_permission = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_permission) {
			$result = $this->RolePermission_model->update_permission($post_permission);
			if($result) {
				echo json_encode($result);	
			}							
		}
		
	}	
		
}
