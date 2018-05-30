import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
	selector: 'app-course',
	providers: [CourseService, CommonService],
	templateUrl: './course.component.html',
	styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
	CourseEntity;
	submitted;
	btn_disable;
	CourseLevelList;
	header;
	domainList;
	constructor(private http: Http, private globals: Globals, private router: Router,
		private CourseService: CourseService, private route: ActivatedRoute, private CommonService: CommonService) { }

	ngOnInit() {
		
		if(this.globals.authData.RoleId==4){		
			this.default();
		} else {
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Course'})
			.then((data) => 
			{
				if(data['AddEdit']==1){
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
		this.globals.msgflag = false;
		this.CourseService.getCourseLevelList()
			.then((data) => {
				this.CourseLevelList = data;
			},
			(error) => {
				alert('error');
			});
			this.CourseService.getDomainList()
			.then((data) => {
				this.domainList = data;
			},
			(error) => {
				alert('error');
			});


		this.CourseEntity = {};
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.header = 'Edit';
			this.CourseService.getById(id)
				.then((data) => {
					this.CourseEntity = data;


				},
				(error) => {
					alert('error');
				});
		} else {
			this.header = 'Add';
			this.CourseEntity = {};
			this.CourseEntity.CourseId = 0;
			this.CourseEntity.IsActive = '1';
			this.CourseEntity.CourseLevelId = '';
			this.CourseEntity.DomainId = '';
			
		}

	}

	addCourse(CourseForm) {
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.CourseEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.CourseEntity.CreatedBy = this.globals.authData.UserId;
			this.CourseEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if (CourseForm.valid) {
			this.btn_disable = true;
			this.CourseService.add(this.CourseEntity)
				.then((data) => {
					//alert('success');
					this.btn_disable = false;
					this.submitted = false;
					this.CourseEntity = {};
					CourseForm.form.markAsPristine();
					if (id) {
						this.globals.message = 'Course Updated Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					} else {
						this.globals.message = 'Course Added Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					}
					this.router.navigate(['/course/list']);
				},
				(error) => {
					alert('error');
					this.btn_disable = false;
					this.submitted = false;
				});
		}
	}

	clearForm(CourseForm) {
		this.CourseEntity = {};
		this.CourseEntity.CourseId = 0;
		this.CourseEntity.IsActive = '1';
		this.CourseEntity.CourseLevelId = '';
		this.CourseEntity.DomainId = '';
		this.submitted = false;
		CourseForm.form.markAsPristine();
	}
}
