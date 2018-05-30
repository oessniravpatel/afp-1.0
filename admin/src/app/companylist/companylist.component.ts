import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/Forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { CommonService } from '../services/common.service';
import { Globals } from '../globals';
declare var $: any;


@Component({
  selector: 'app-companylist',
  providers: [ CompanyService,CommonService ],
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.css']
})
export class CompanylistComponent implements OnInit {

	companyList;
	deleteEntity;
	msgflag;
	message;
	type;
	permissionEntity;
	 constructor(private http: Http, private router: Router, private route: ActivatedRoute, 
		private CompanyService: CompanyService,private CommonService: CommonService, private globals: Globals) { }

		ngOnInit() { 
			
			this.permissionEntity = {}; 
			if(this.globals.authData.RoleId==4){
				this.permissionEntity.View=1;
				this.permissionEntity.AddEdit=1;
				this.permissionEntity.Delete=1;
				this.default();
			} else {		
				this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Company'})
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
		this.CompanyService.getAllCompany	()
	.then((data) => 
	{ 
		this.globals.isLoading = false;

		this.companyList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Company per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Company",
					"sInfoFiltered": "(filtered from _MAX_ total Company)"
        }
      });
    },500); 

	}, 
	(error) => 
	{
		//alert('error');
	});	
	this.msgflag = false;
	}

	deleteCompany(company)
	{ 
		this.deleteEntity =  company;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(company)
	{ 	
		var del={'Userid':this.globals.authData.UserId,'id':company.CompanyId};
		this.CompanyService.deleteCompany(del)
		.then((data) => 
		{
			let index = this.companyList.indexOf(company);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.companyList.splice(index, 1);
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
			this.globals.message = 'Company Deleted Successfully';
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
