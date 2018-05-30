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
  selector: 'app-usercopmanyregister',
  providers: [ ListUserAssessmentService ],
  templateUrl: './usercopmanyregister.component.html',
  styleUrls: ['./usercopmanyregister.component.css']
})
export class UsercopmanyregisterComponent implements OnInit {
  companyList;
	deleteEntity;
	msgflag;
	message;
	type;
  constructor(private http: Http, private router: Router, private route: ActivatedRoute, 
		private ListUserAssessmentService: ListUserAssessmentService, private globals: Globals) { }

  ngOnInit()
   {


    debugger
    this.ListUserAssessmentService.getAllCompany	()
    .then((data) => 
    { 
    
  
      this.companyList = data;	
      setTimeout(function(){
        $('#dataTables-example').dataTable( {
          "oLanguage": {
            "sLengthMenu": "_MENU_ Registered Company per Page",
            "sInfo": "Showing _START_ to _END_ of _TOTAL_ Registered Company",
            "sInfoFiltered": "(filtered from _MAX_ total Registered Company)"
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
