import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PendingAssessmentService } from '../services/pending-assessment.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-pending-assessment',
  providers: [ PendingAssessmentService,CommonService ],
  templateUrl: './pending-assessment.component.html',
  styleUrls: ['./pending-assessment.component.css']
})
export class PendingAssessmentComponent implements OnInit {

	pendingAssList;
	permissionEntity;
	
	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		 private PendingAssessmentService: PendingAssessmentService, private CommonService: CommonService, private globals: Globals) 
  {
	
  }

  ngOnInit() { 
	this.permissionEntity = {}; 
	if(this.globals.authData.RoleId==4){
		this.permissionEntity.View=1;
		this.permissionEntity.AddEdit=1;
		this.permissionEntity.Delete=1;
		this.default();
	} else {		
		this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Pending Assessment'})
		.then((data) => 
		{
			this.permissionEntity = data;
			if(this.permissionEntity.View==1 ||  this.permissionEntity.AddEdit==1 || this.permissionEntity.Delete==1){
				this.default();
			} else {
				this.router.navigate(['/access-denied']);
			}		
		},
		(error) => 
		{
			alert('error');
		});	
	}			
  }

  default(){
	this.PendingAssessmentService.getPendingAssessment()
	.then((data) => 
	{ 
		this.pendingAssList = data;	
		setTimeout(function(){
		$('#dataTables-example').dataTable( {
			"oLanguage": {
			"sLengthMenu": "_MENU_ Incomplete Assessment per Page",
						"sInfo": "Showing _START_ to _END_ of _TOTAL_ Incomplete Assessment",
						"sInfoFiltered": "(filtered from _MAX_ total Incomplete Assessment)",
						"sInfoEmpty": "Showing 0 to 0 of 0 Incomplete Assessment"
			}
		});
		},100); 	
	}, 
	(error) => 
	{
		//alert('error');
	});
  }

}


