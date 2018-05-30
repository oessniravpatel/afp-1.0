import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { IndustryService } from '../services/industry.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
	selector: 'app-industry',
	providers: [IndustryService, CommonService],
	templateUrl: './industry.component.html',
	styleUrls: ['./industry.component.css']
})
export class IndustryComponent implements OnInit {
	IndustryEntity;
	submitted;
	btn_disable;
	header;
	constructor(private http: Http, private globals: Globals, private router: Router, private IndustryService: IndustryService,
		private route: ActivatedRoute, private CommonService: CommonService) { }


	ngOnInit() {
		if(this.globals.authData.RoleId==4){		
			this.default();
		} else {
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Industry'})
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
				//alert('error');
			});	
		}
	}

	default(){
		this.globals.msgflag = false;

		this.IndustryEntity = {};
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.header = 'Edit';
			this.IndustryService.getById(id)
				.then((data) => {
					this.IndustryEntity = data;


				},
				(error) => {
					alert('error');
				});
		} else {
			this.header = 'Add';
			this.IndustryEntity = {};
			this.IndustryEntity.IndustryId = 0;
			this.IndustryEntity.IsActive = '1';
		}
	}

	addIndustry(IndustryForm) {
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.IndustryEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.IndustryEntity.CreatedBy = this.globals.authData.UserId;
			this.IndustryEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if (IndustryForm.valid) {
			this.btn_disable = true;
			this.IndustryService.add(this.IndustryEntity)
				.then((data) => {
					//alert('success');
					this.btn_disable = false;
					this.submitted = false;
					this.IndustryEntity = {};
					IndustryForm.form.markAsPristine();

					if (id) {
						this.globals.message = 'Industry Updated Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					} else {
						this.globals.message = 'Industry Added Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					}
					this.router.navigate(['/industry/list']);
				},
				(error) => {
					alert('error');
					this.btn_disable = false;
					this.submitted = false;
				});
		}
	}

	clearForm(IndustryForm) {
		this.IndustryEntity = {};
		this.IndustryEntity.IndustryId = 0;
		this.IndustryEntity.IsActive = '1';
		this.submitted = false;
		IndustryForm.form.markAsPristine();
	}
}
