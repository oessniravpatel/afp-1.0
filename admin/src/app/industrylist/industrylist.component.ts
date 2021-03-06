import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IndustryService } from '../services/industry.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';

declare var $: any;

@Component({
  selector: 'app-industrylist',
  providers: [ IndustryService,CommonService ],
  templateUrl: './industrylist.component.html',
  styleUrls: ['./industrylist.component.css']
})
export class IndustrylistComponent implements OnInit {
	IndustryList;
	deleteEntity;
	msgflag;
	message;
	type;
	permissionEntity;
 constructor( private http: Http,private globals: Globals, private router: Router, private CommonService: CommonService, private IndustryService: IndustryService,private route:ActivatedRoute) { }

  ngOnInit() { 
		this.permissionEntity = {}; 
		if(this.globals.authData.RoleId==4){
			this.permissionEntity.View=1;
			this.permissionEntity.AddEdit=1;
			this.permissionEntity.Delete=1;
			this.default();
		} else {		
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Industry'})
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
		this.IndustryService.getAll()
		.then((data) => 
		{ 
			this.IndustryList = data;	
			setTimeout(function(){
				$('#dataTables-example').dataTable( {
					"oLanguage": {
						"sLengthMenu": "_MENU_ Industry per Page",
						"sInfo": "Showing _START_ to _END_ of _TOTAL_ Industry",
						"sInfoFiltered": "(filtered from _MAX_ total Industry)"
					}
				});
			},500); 
	
		}, 
		(error) => 
		{
			//alert('error');
		});	
		//this.msgflag = false;
		}

	deleteIndustry(Industry)
	{ 
		this.deleteEntity =  Industry;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(Industry)
	{ 
		var del={'Userid':this.globals.authData.UserId,'id':Industry.IndustryId};
		this.IndustryService.delete(del)
		.then((data) => 
		{
			let index = this.IndustryList.indexOf(Industry);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.IndustryList.splice(index, 1);
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
			this.globals.message = 'Industry Deleted Successfully';
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
