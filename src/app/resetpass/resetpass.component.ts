import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ResetpassService } from '../services/resetpass.service';
import { JwtHelper } from 'angular2-jwt';
declare var $: any;

@Component({
  selector: 'app-resetpass',
     providers: [ResetpassService],
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {
	resetEntity;
	submitted;
	btn_disable;
	header;
	same;
   constructor( private http: Http,private globals: Globals, private router: Router,private route:ActivatedRoute,private ResetpassService:ResetpassService) { }


  ngOnInit() {
    if ($("body").height() < $(window).height()) {
        $('footer').addClass('footer_fixed');
    }

	   debugger
	  this.resetEntity={};
	let id = this.route.snapshot.paramMap.get('id');
	id=new JwtHelper().decodeToken(id);
	this.ResetpassService.getResetlink(id)
	this.ResetpassService.getResetlink2(id)
	.then((data) => 
	{ debugger
		if(data=='fail'){

			this.globals.message = 'You are already used this link';
			this.globals.type = 'danger';
			this.globals.msgflag = true;
			this.router.navigate(['/login']);
		} 	
		//alert('success');
		
		
		
	}, 
	(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});	
		
  }
  
  

  addPassword(resetForm)
  {	
	let id = this.route.snapshot.paramMap.get('id');
		
	var id1=new JwtHelper().decodeToken(id);
	
	
	this.resetEntity.UserId = id1.UserId;
		if(id1){
			this.submitted = false;
		} else {
			this.resetEntity.UserId = 0;
			this.submitted = true;
		}
		if(resetForm.valid)
		{
			this.btn_disable = true;
			this.ResetpassService.add(this.resetEntity)
			.then((data) => 
			{
				if(data='Code duplicate')
				{
					//alert('success');
					this.globals.message = 'Your Password Changed Successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				}else
					{
						
					
				alert('error');
				//this.aa=true;
				this.btn_disable = false;
				this.submitted = false;
				this.resetEntity = {};
				resetForm.form.markAsPristine();
				// if(id){
					// alert('success');
					// this.globals.message = 'Update successfully';
					// this.globals.type = 'success';
					// this.globals.msgflag = true;
				// } else {
					// this.globals.message = 'Add successfully';
					// this.globals.type = 'success';
					// this.globals.msgflag = true;
				// }	
				}
				this.router.navigate(['/login/']);
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});	
		
		}
	}
	
	 checkpassword(){ 
		if(this.resetEntity.cPassword != this.resetEntity.Password){
			this.same = true;
		} else {
			this.same = false;
		}
		
	}
  
}
