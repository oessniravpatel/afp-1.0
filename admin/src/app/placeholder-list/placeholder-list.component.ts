import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PlaceholderService } from '../services/placeholder.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-placeholder-list',
  providers: [ PlaceholderService,CommonService ],
  templateUrl: './placeholder-list.component.html',
  styleUrls: ['./placeholder-list.component.css']
})
export class PlaceholderListComponent implements OnInit {

	placeholderList;
	deleteEntity;
	msgflag;
	message;
	type;
	permissionEntity;
	
	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		 private PlaceholderService: PlaceholderService, private CommonService: CommonService, private globals: Globals) 
  {
	
  }

  ngOnInit() { 

	if(this.globals.authData.RoleId!=4){
		this.router.navigate(['/access-denied']);
	  }

		this.permissionEntity = {}; 
	if(this.globals.authData.RoleId==4){
		this.permissionEntity.View=1;
		this.permissionEntity.AddEdit=1;
		this.permissionEntity.Delete=1;
		this.default();
	} else {		
		this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Placeholder Screen'})
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
				//this.globals.msgflag = false;
	this.PlaceholderService.getAll()
	.then((data) => 
	{ 
		this.placeholderList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Placeholder per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Placeholder",
					"sInfoFiltered": "(filtered from _MAX_ total Placeholder)",
					"sInfoEmpty": "Showing 0 to 0 of 0 Placeholder"
        }
      });
    },500); 

	}, 
	(error) => 
	{
		//alert('error');
	});		
		}
	
	deleteplaceholder(placeholder)
	{ 
		this.deleteEntity =  placeholder;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(placeholder)
	{ 
		this.PlaceholderService.delete(placeholder.PlaceholderId)
		.then((data) => 
		{
			let index = this.placeholderList.indexOf(placeholder);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.placeholderList.splice(index, 1);			
			}	
			this.globals.message = 'Placeholder Deleted Successfully!';
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


