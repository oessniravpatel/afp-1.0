import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DomainService } from '../services/domain.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-domain-list',
  providers: [ DomainService,CommonService ],
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.css']
})
export class DomainListComponent implements OnInit {

	domainList;
	deleteEntity;
	msgflag;
	message;
	type;
	permissionEntity;
	
	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		 private domainService: DomainService, private CommonService: CommonService, private globals: Globals) 
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
		this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Domain'})
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
	this.domainService.getAll()
	.then((data) => 
	{ 
		this.domainList = data;	
		setTimeout(function(){
		$('#dataTables-example').dataTable( {
			"oLanguage": {
			"sLengthMenu": "_MENU_ Domain per Page",
						"sInfo": "Showing _START_ to _END_ of _TOTAL_ Domain",
						"sInfoFiltered": "(filtered from _MAX_ total Domain)",
						"sInfoEmpty": "Showing 0 to 0 of 0 Domain"
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
	
	deleteDomain(domain)
	{ 
		this.deleteEntity =  domain;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(domain)
	{ var del={'Userid':this.globals.authData.UserId,'id':domain.DomainId};
		this.domainService.delete(del)
		.then((data) => 
		{
			let index = this.domainList.indexOf(domain);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.domainList.splice(index, 1);
				//this.router.navigate(['/domain/list']);
				// setTimeout(function(){
				// 	$('#dataTables-example').dataTable( {
				// 		"oLanguage": {
				// 			"sLengthMenu": "_MENU_ Domains per Page",
				// 			"sInfo": "Showing _START_ to _END_ of _TOTAL_ Domains",
				// 			"sInfoFiltered": "(filtered from _MAX_ total Domains)"
				// 		}
				// 	});
				// },3000); 
			}			
			//alert(data);
			this.globals.message = 'Domain Deleted Successfully';
			this.globals.type = 'success';
			this.globals.msgflag = true;
			
		}, 
		(error) => 
		{
			$('#Delete_Modal').modal('hide');
			if(error.text){
				this.globals.message = "You can't delete this record because of their dependency!";
				this.globals.type = 'danger';
				this.globals.msgflag = true;
			}	
		});		
	}
	
}

