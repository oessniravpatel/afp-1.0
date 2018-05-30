import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { KsaService } from '../services/ksa.service';
import { Globals } from '.././globals';
import { CommonService } from '../services/common.service';

@Component({
	selector: 'app-ksa',
	providers: [KsaService, CommonService],
	templateUrl: './ksa.component.html',
	styleUrls: ['./ksa.component.css']
})

export class KsaComponent implements OnInit {
	ksaEntity;
	areaList;
	submitted;
	btn_disable;
	header;

	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute, private KsaService: KsaService,
		private globals: Globals, private CommonService: CommonService) {

	}
	ngOnInit() {
		if(this.globals.authData.RoleId==4){		
			this.default();
		} else {
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'KSA'})
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
		this.ksaEntity = {};
		let id = this.route.snapshot.paramMap.get('id');
		this.globals.msgflag = false;
		this.KsaService.getCAreaList()
			.then((data) => {
				this.areaList = data;
			},
			(error) => {
				alert('error');
			});
		if (id) {
			this.header = 'Edit';
			this.KsaService.getById(id)
				.then((data) => {
					if (data != "") {
						this.ksaEntity = data;
					} else {
						this.router.navigate(['/dashboard']);
					}
				},
				(error) => {
					alert('error');
				});
		} else {
			this.header = 'Add';
			this.ksaEntity = {};
			this.ksaEntity.KSAId = 0;
			this.ksaEntity.IsActive = '1';
			this.ksaEntity.CAreaId = '';
		}	
	}

	addKSA(ksaForm) {
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.ksaEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.ksaEntity.CreatedBy = this.globals.authData.UserId;
			this.ksaEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if (ksaForm.valid) {
			this.btn_disable = true;
			this.KsaService.add(this.ksaEntity)
				.then((data) => {
					//alert('success');
					this.btn_disable = false;
					this.submitted = false;
					this.ksaEntity = {};
					ksaForm.form.markAsPristine();
					if (id) {
						this.globals.message = 'KSA Updated Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					} else {
						this.globals.message = 'KSA Added Successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					}
					this.router.navigate(['/ksa/list']);
				},
				(error) => {
					alert('error');
					this.btn_disable = false;
					this.submitted = false;
				});
		}
	}

	clearForm(ksaForm) {
		this.ksaEntity = {};
		this.ksaEntity.KSAId = 0;
		this.ksaEntity.IsActive = '1';
		this.ksaEntity.CAreaId = '';
		this.submitted = false;
		ksaForm.form.markAsPristine();
	}

}

