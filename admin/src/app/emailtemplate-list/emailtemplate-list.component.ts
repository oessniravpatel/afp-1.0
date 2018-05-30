import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EmailtemplateService } from '../services/emailtemplate.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
import { forEach } from '@angular/router/src/utils/collection';
declare var $: any;

@Component({
  selector: 'app-emailtemplate-list',
  providers: [ EmailtemplateService,CommonService ],
  templateUrl: './emailtemplate-list.component.html',
  styleUrls: ['./emailtemplate-list.component.css']
})
export class EmailtemplateListComponent implements OnInit {
  EmailList;
	deleteEntity;
	msgflag;
	message;
	type;
	permissionEntity;

 constructor( private http: Http,private globals: Globals, private router: Router, 
	private EmailtemplateService: EmailtemplateService,private CommonService: CommonService, private route:ActivatedRoute) { }


ngOnInit() {  
	this.permissionEntity = {}; 
	if(this.globals.authData.RoleId==4){
		this.permissionEntity.View=1;
		this.permissionEntity.AddEdit=1;
		this.permissionEntity.Delete=1;
		this.default();
	} else {		
		this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Email Template'})
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
			//alert('error');
		});	
	}		
	}
	
	default(){
		this.EmailtemplateService.getAll()
		.then((data) => 
		{ debugger
			//alert(data);		
			// for(var i=1; i<=data.length; i++){
			// 	data[i].To=data[i].To.toString().replace("1","Admin");	
			// }		
			this.EmailList = data;
			setTimeout(function(){
				$('#dataTables-example').dataTable( {
					"oLanguage": {
						"sLengthMenu": "_MENU_ Email per Page",
						"sInfo": "Showing _START_ to _END_ of _TOTAL_ Email",
						"sInfoFiltered": "(filtered from _MAX_ total Email)"
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

	deleteEmail(Email)
	{ 
		this.deleteEntity =  Email;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(Email)
	{ 
		this.EmailtemplateService.delete(Email.EmailId)
		.then((data) => 
		{
			let index = this.EmailList.indexOf(Email);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.EmailList.splice(index, 1);
			}	
		this.globals.message = 'Email Template Deleted Successfully!';
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

