import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ForgotpasswordService } from '../services/forgotpassword.service';
declare var $: any;

@Component({
  selector: 'app-forgotpassword',
   providers: [ForgotpasswordService],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
	fgpassEntity;
	submitted;
	type;
	btn_disable;
 constructor( private http: Http,private globals: Globals, private router: Router,private route:ActivatedRoute,private ForgotpasswordService:ForgotpasswordService) { }

  ngOnInit() {
	if ($("body").height() < $(window).height()) {
        $('footer').addClass('footer_fixed');
    }  
	this.fgpassEntity={};
  }
  
  
  addFgpass(fgpassForm)
	{		
	 var msg=this.fgpassEntity.EmailAddress;
		
			this.submitted = true;
		
		if(fgpassForm.valid){
			 this.fgpassEntity.EmailAddress;
		
			this.btn_disable = true;
			this.globals.isLoading = true;
			this.ForgotpasswordService.add(this.fgpassEntity)
			.then((data) => 
			{debugger
				
				if(data=='Code duplicate')
				{
						this.globals.message = 'Couldn\'t find your Email Address';
						this.globals.type = 'danger';
						this.globals.isLoading = false;
						this.globals.msgflag = true;
						this.btn_disable = false;
						this.submitted = false;
					//this.router.navigate(['/fgpass/']);
				}else
				{
						//alert('success');
					this.btn_disable = false;
					this.submitted = false;
					localStorage.setItem('EmailAddress',this.fgpassEntity.EmailAddress);
					this.fgpassEntity = {};
					fgpassForm.form.markAsPristine();
					this.globals.isLoading = false;
					this.globals.message = 'An email with a password reset link was just sent to : ' + msg;
					this.globals.type = 'success';
					this.globals.msgflag = true;
						
					
					
						//alert(id);
				
				
					
				}
				this.router.navigate(['/forgotpassword']);
			}, 
			(error) => 
			{
				this.globals.isLoading = false;
				//alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});
		} 		
	}
  
  
  
  


  
}
