import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
declare var $: any;
@Component({
  selector: 'app-courselist',
  providers: [ CourseService,CommonService ],
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {
	CourseList;
	deleteEntity;
	msgflag;
	message;
	type;
	permissionEntity;
 constructor( private http: Http,private globals: Globals, private router: Router, 
	private CourseService: CourseService,private CommonService: CommonService, private route:ActivatedRoute) { }
	
	ngOnInit() { 
		this.permissionEntity = {}; 
		if(this.globals.authData.RoleId==4){
			this.permissionEntity.View=1;
			this.permissionEntity.AddEdit=1;
			this.permissionEntity.Delete=1;
			this.default();
		} else {		
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Course'})
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
		this.CourseService.getAll()
	.then((data) => 
	{ 
		this.CourseList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Course per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Course",
					"sInfoFiltered": "(filtered from _MAX_ total Course)"
        }
      });
    },100); 

	}, 
	(error) => 
	{
		//alert('error');
	});	
	this.msgflag = false;
	}

	deleteCourse(Course)
	{ 
		this.deleteEntity =  Course;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(Course)
	{ 
		var del={'Userid':this.globals.authData.UserId,'id':Course.CourseId};
		this.CourseService.delete(del)
		.then((data) => 
		{
			let index = this.CourseList.indexOf(Course);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.CourseList.splice(index, 1);
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
			this.globals.message = 'Course Deleted Successfully';
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
