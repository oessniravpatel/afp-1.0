import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/Forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';

import { UserService } from '../services/user.service';
import { Globals } from '../globals';
declare var $: any;
@Component({
  selector: 'app-userlist',
   providers: [ UserService ],
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  userList;
deleteEntity;
	msgflag;
	message;
	type;
	permissionEntity;
   constructor(private http: Http, private router: Router, private route: ActivatedRoute, private UserService: UserService,private globals: Globals,private CommonService: CommonService,) { }

  ngOnInit()
  {
	this.permissionEntity = {}; 
	if(this.globals.authData.RoleId==4){
		this.permissionEntity.View=1;
		this.permissionEntity.AddEdit=1;
		this.permissionEntity.Delete=1;
		this.default();
		
	} else {		
		this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'User'})
	
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
	this.UserService.getAllUser()
	//.map(res => res.json())
	.then((data) => 
	{
		
		this.userList = data;
			setTimeout(function(){
      $('#dataTables-example').dataTable( {
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
  
  deleteUser(user)
	{ 
		this.deleteEntity =  user;
		$('#Delete_Modal').modal('show');					
	}
  
  deleteConfirm(user)
	{ 	
		var del={'Userid':this.globals.authData.UserId,'id':user.UserId};
		this.UserService.deleteUser(del)
		.then((data) => 
		{
			let index = this.userList.indexOf(user);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.userList.splice(index, 1);
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
			this.globals.message = 'User Deleted Successfully';
			this.globals.type = 'success';
			this.globals.msgflag = true;
		}, 
		(error) => 
		{
			$('#Delete_Modal').modal('hide');
			if(error.text){
				this.globals.message = "You can't delete this record because of their dependency";
				this.globals.type = 'danger';
				this.globals.msgflag = true;
			}	
		});		
	}
  

}
