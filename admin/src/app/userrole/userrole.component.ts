import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserroleService } from '../services/userrole.service';

@Component({
  selector: 'app-userrole',
   providers: [UserroleService],
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.css']
})
export class UserroleComponent implements OnInit {
	
    userroleEntity;
	submitted;
	btn_disable;
	header;
	
   constructor( private http: Http,private globals: Globals, private router: Router,private route:ActivatedRoute,private UserroleService:UserroleService ) { }

  
  ngOnInit() 
  {
	
	 
	  let id = this.route.snapshot.paramMap.get('id');
	 if(id)
	 {	
		 this.header = 'Edit';
		this.UserroleService.getById(id)
			.then((data) => 
			{
				this.userroleEntity=data;
				
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});
	 }
	 else
	 {
			 this.userroleEntity = {};
			 this.userroleEntity.RoleId = 0;
			  this.userroleEntity.IsActive = '1';
	 }
  } 
  
  
  addUserrole(userroleForm)
  {		
		let id = this.route.snapshot.paramMap.get('id');
		if(id){
			this.submitted = false;
		} else {
			this.userroleEntity.RoleId = 0;
			this.submitted = true;
		}
		if(userroleForm.valid){
			this.btn_disable = true;
			this.UserroleService.add(this.userroleEntity)
			.then((data) => 
			{
				alert('success');
				//this.aa=true;
				this.btn_disable = false;
				this.submitted = false;
				this.userroleEntity = {};
				userroleForm.form.markAsPristine();
				if(id){
					this.globals.message = 'Data Updated successfully!';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				} else {
					this.globals.message = 'Data Added successfully!';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				}	
				
				
				this.router.navigate(['userrole/list']);
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});	
		
		}
	}

  clearForm(userroleForm)
	{
		this.userroleEntity = {};	
		this.userroleEntity.RoleId = 0;
    this.userroleEntity.IsActive = '1';	
		this.submitted = false;
		userroleForm.form.markAsPristine();
	}	

}
