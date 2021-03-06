import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuditlogService } from '../services/auditlog.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-activity-log',
  providers: [ AuditlogService ],
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {

	activitylogList;
	
	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		 private AuditlogService: AuditlogService, private globals: Globals) 
  {
	
  }

  ngOnInit() { 
    if(this.globals.authData.RoleId==4){
      this.AuditlogService.getActivityLog()
      .then((data) => 
      { 
        this.activitylogList = data;	
        setTimeout(function(){
        $('#dataTables-example').dataTable( {
          "oLanguage": {
          "sLengthMenu": "_MENU_ Log per Page",
                "sInfo": "Showing _START_ to _END_ of _TOTAL_ Log",
                "sInfoFiltered": "(filtered from _MAX_ total Log)",
                "sInfoEmpty": "Showing 0 to 0 of 0 Log"
          }
        });
        },100); 	
      }, 
      (error) => 
      {
        alert('error');
      });    
    } else {		
      this.router.navigate(['/access-denied']);
    }			
  }

}


