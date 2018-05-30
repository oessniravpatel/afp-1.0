import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CourselevelService } from '../services/courselevel.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
declare var $: any;
@Component({
  selector: 'app-courselevellist',
  providers: [ CourselevelService,CommonService ],
  templateUrl: './courselevellist.component.html',
  styleUrls: ['./courselevellist.component.css']
})
export class CourselevellistComponent implements OnInit {
	CourselevelList;
	deleteEntity;
	msgflag;
	message;
	type;
	permissionEntity;
 constructor(private http: Http, private router: Router, private route: ActivatedRoute, 
	private CourselevelService: CourselevelService, private CommonService: CommonService, private globals: Globals) 
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
		this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Course Level'})
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
	this.CourselevelService.getAll()
	.then((data) => 
	{ 
		this.CourselevelList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Course Level per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Course Level",
					"sInfoFiltered": "(filtered from _MAX_ total Course Level)"
        }
      });
    },500); 

	}, 
	(error) => 
	{
		//alert('error');
	});		
  }
	
	deleteCourselevel(Courselevel)
	{ 
		this.deleteEntity =  Courselevel;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(Courselevel)
	{ 	
		var del={'Userid':this.globals.authData.UserId,'id':Courselevel.ConfigurationId};
	  this.CourselevelService.delete(del)
		.then((data) => 
		{
			let index = this.CourselevelList.indexOf(Courselevel);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.CourselevelList.splice(index, 1);
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
			this.globals.message = 'Course Level Deleted Successfully';
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
