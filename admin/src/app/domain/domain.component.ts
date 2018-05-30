import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DomainService } from '../services/domain.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';

@Component({
  selector: 'app-domain',
  providers: [ DomainService,CommonService ],
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})

export class DomainComponent implements OnInit 
{	
	domainEntity;
	submitted;
	btn_disable;
	header;
	
  constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute, 
	private domainService: DomainService, private CommonService:CommonService, private globals: Globals)
    {
		
	}
  ngOnInit() 
  {
	if(this.globals.authData.RoleId==4){		
		this.default();
	} else {
		this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Domain'})
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
	this.domainEntity = {};
	let id = this.route.snapshot.paramMap.get('id');
	this.globals.msgflag = false;
	if(id){
		this.header = 'Edit';
		this.domainService.getById(id)
		.then((data) => 
		{ 
			if(data!=""){
				this.domainEntity = data;
			} else {
				this.router.navigate(['/dashboard']);
			}			
		}, 
		(error) => 
		{
			alert('error');
		});	 
	} else {
		this.header = 'Add';
		this.domainEntity = {};
		this.domainEntity.DomainId = 0;
		this.domainEntity.IsActive = '1';
	}
  }
	
	addDomain(domainForm)
	{		
		let id = this.route.snapshot.paramMap.get('id');
		if(id){			
			this.domainEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {			
			this.domainEntity.CreatedBy = this.globals.authData.UserId;
			this.domainEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if(domainForm.valid){
			this.btn_disable = true;
			this.domainService.add(this.domainEntity)
			.then((data) => 
			{
				//alert('success');
				this.btn_disable = false;
				this.submitted = false;
				this.domainEntity = {};
				domainForm.form.markAsPristine();
				if(id){
					this.globals.message = 'Domain Updated Successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
					//setTimeout(()=>{ this.globals.msgflag = false; },5000);
					
				} else {
					this.globals.message = 'Domain Added Successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
					//setTimeout(()=>{ this.globals.msgflag = false; },5000);
				}				
				this.router.navigate(['/domain/list']);
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});
		} 		
	}
	
	clearForm(domainForm)
	{
		this.domainEntity = {};	
		this.domainEntity.DomainId = 0;
    	this.domainEntity.IsActive = '1';	
		this.submitted = false;
		domainForm.form.markAsPristine();
	}	
	
}

