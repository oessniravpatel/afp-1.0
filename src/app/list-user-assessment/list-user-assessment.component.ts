import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/Forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
 import { ListUserAssessmentService } from '../services/list-user-assessment.service';
//import { CommonService } from '../services/common.service';
import { Globals } from '../globals';
declare var $: any;

@Component({
  
  selector: 'app-list-user-assessment',
  providers: [ ListUserAssessmentService ],
  templateUrl: './list-user-assessment.component.html',
  styleUrls: ['./list-user-assessment.component.css']
})
export class ListUserAssessmentComponent implements OnInit {

  companyList;
	deleteEntity;
	msgflag;
	message;
	type;
  permissionEntity;
  userAssessList;

  constructor(private http: Http, private router: Router, private route: ActivatedRoute, 
		private ListUserAssessmentService: ListUserAssessmentService, private globals: Globals) { }

  ngOnInit() 
  {
    // debugger
    // this.ListUserAssessmentService.getAllCompany	()
    // .then((data) => 
    // { 
    
  
    //   this.companyList = data;	
    //   setTimeout(function(){
    //     $('#dataTables-example').dataTable( {
    //       "oLanguage": {
    //         "sLengthMenu": "_MENU_ Registered Company per Page",
    //         "sInfo": "Showing _START_ to _END_ of _TOTAL_ Registered Company",
    //         "sInfoFiltered": "(filtered from _MAX_ total Registered Company)"
    //       }
    //     });
    //   },500); 
  
    // }, 
    // (error) => 
    // {
    //   //alert('error');
    // });	
    // this.msgflag = false;
  
    
    

    this.ListUserAssessmentService.getAllUserAssess()
    .then((data) => 
    { 
    
  
      this.userAssessList = data;	
      setTimeout(function(){
        $('#dataTables-example1').dataTable( {
          "oLanguage": {
            "sLengthMenu": "_MENU_ Users per Page",
            "sInfo": "Showing _START_ to _END_ of _TOTAL_ Users",
            "sInfoFiltered": "(filtered from _MAX_ total Users)"
          }
        });
      },500); 
  
    }, 
    (error) => 
    {
      //alert('error');
    });	
    this.msgflag = false;



  }



		


}
