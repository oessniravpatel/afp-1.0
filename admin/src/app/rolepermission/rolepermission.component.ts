import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RolepermissionService } from '../services/rolepermission.service';
import { Globals } from '.././globals';

@Component({
  selector: 'app-rolepermission',
  providers: [ RolepermissionService ],
  templateUrl: './rolepermission.component.html',
  styleUrls: ['./rolepermission.component.css']
})
export class RolepermissionComponent implements OnInit {

  roleEntity;
  roleList;
  permissionList;
  btn_disable;
  

  constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute, private RolepermissionService: RolepermissionService, private globals: Globals)
    {		

	  }
  ngOnInit() {

    if(this.globals.authData.RoleId!=4){
      this.router.navigate(['/access-denied']);
    }

    this.roleEntity = {};
    this.roleEntity.RoleId = 1;
    this.RolepermissionService.getDefault()
    .then((data) => 
    { 
      this.roleList = data['role'];
      this.permissionList = data['permission'];
    }, 
    (error) => 
    {
      alert('error');
    });	 
  }

  getRolePermission(){ 
    this.RolepermissionService.getRolePermission(this.roleEntity.RoleId)
    .then((data) => 
    { 
      this.permissionList = data;
    }, 
    (error) => 
    {
      alert('error');
    });	 
  }

  updatePermission()
	{	
    this.btn_disable = true;
    this.RolepermissionService.update_permission(this.permissionList)
    .then((data) => 
    {
      this.globals.message = 'Data Updated Successfully!';
			this.globals.type = 'success';
			this.globals.msgflag = true;
      this.btn_disable = false;
    }, 
    (error) => 
    {
      this.btn_disable = false;
      alert('error');
    });
	}

}
