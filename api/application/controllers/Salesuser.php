<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Salesuser extends MY_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Salesuser_model');
		$this->load->model('DashboardUser_model');
		
	}

	// public function getAllAssement($UserId = NULL) {
		
	// 	if (!empty($UserId)) {
	// 		$data="";
	// 		$data['complete']=$this->Salesuser_model->getAllAssement($UserId);	
	// 		$data['pending']=$this->Salesuser_model->getPendingAssement($UserId);		
	// 		echo json_encode($data);			
	// 	}				
	// }

	public function getUserAssessDetail($CAssessmentId = NULL) {
		
		if (!empty($CAssessmentId)) {
			$data="";
			$data['domain']=$this->Salesuser_model->getUserAssessDetail($CAssessmentId);
			$data['perdomain']=$this->Salesuser_model->getUserAssessDomain($CAssessmentId);
			$data['ratingscale']=$this->Salesuser_model->getUserAssessRating($CAssessmentId);
			$data['areaksa']=$this->Salesuser_model->getUserAssessareaksa($CAssessmentId);
			$data['rcourse']=$this->Salesuser_model->getReCommendcourse($CAssessmentId);
			$data['allcourse']=$this->Salesuser_model->getallcourse($CAssessmentId);
			$data['ksa']=$this->Salesuser_model->getUserksa($CAssessmentId);
			$data['assessment']=$this->Salesuser_model->getUserassessment($CAssessmentId);
			echo json_encode($data);			
		}				
	}

	public function getUserReport($UserId = NULL) {		
		if (!empty($UserId)) {
			$data="";
			$data['domainAss']=$this->Salesuser_model->getUserReport($UserId);
			$data['assList']=$this->Salesuser_model->getAssessmentList($UserId);
			$data['user']=$this->DashboardUser_model->getuser($UserId);	
			if($data){
				echo json_encode($data);
			}							
		}				
	}

	public function report(){
		$data=$this->Salesuser_model->getAssessmentList(18);
		print_r($data);
		// $UserId = 18;
		// $data = $this->db->query('SELECT DomainId,Name as domain FROM tblmstdomain');
		// $obj = '';		
		// foreach($data->result() as $row)
		// {	
		// 	$i = 1;
		// 	$obj1 = json_decode(json_encode($row), True);
		// 	$data1 = $this->db->query('SELECT dk.DomainKSAId,dk.CAssessmentId,dk.DomainId,dk.AvgRatingScale FROM tbldomainwiseksa AS dk LEFT JOIN tblcandidateassessment AS ca ON dk.CAssessmentId = ca.CAssessmentId WHERE ca.UserId = '.$UserId.' AND dk.DomainId = '.$row->DomainId.' order by ca.CAssessmentId asc');			 
		// 	foreach($data1->result() as $row1){
		// 		$obj1['ass'.$i] = $row1->AvgRatingScale;
		// 		$i++;
		// 	}
		// 	$obj[] = $obj1;
		// }  
		// print_r($obj);
		// die;
	}
	
}
