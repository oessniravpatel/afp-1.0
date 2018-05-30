import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../services/state.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-statelist',
  providers: [ StateService,CommonService ],
  templateUrl: './statelist.component.html',
  styleUrls: ['./statelist.component.css']
})
export class StatelistComponent implements OnInit {
	stateList;
	deleteEntity;
	msgflag;
	message;
	type;
	permissionEntity;
	 constructor(private http: Http, private router: Router, private route: ActivatedRoute, 
		private StateService: StateService, private CommonService: CommonService, private globals: Globals) { }

 ngOnInit()
  {
		this.permissionEntity = {}; 
		if(this.globals.authData.RoleId==4){
			this.permissionEntity.View=1;
			this.permissionEntity.AddEdit=1;
			this.permissionEntity.Delete=1;
			this.default();
		} else {		
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'State'})
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
		this.StateService.getAll()
	//.map(res => res.json())
	.then((data) => 
	{
		this.stateList = data;
	setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ State per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ State",
					"sInfoFiltered": "(filtered from _MAX_ total State)"
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
  
  deleteState(state)
	{ 
		this.deleteEntity =  state;
		$('#Delete_Modal').modal('show');					
	}
  
  deleteConfirm(state)
	{
		var del={'Userid':this.globals.authData.UserId,'id':state.StateId};
		this.StateService.deleteState(del)
		.then((data) => 
		{
			let index = this.stateList.indexOf(state);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.stateList.splice(index, 1);
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
			this.globals.message = 'State Deleted Successfully';
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
