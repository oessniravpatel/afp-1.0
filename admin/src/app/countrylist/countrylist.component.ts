import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/country.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
declare var $: any;
@Component({
  selector: 'app-countrylist',
    providers: [ CountryService,CommonService ],
  templateUrl: './countrylist.component.html',
  styleUrls: ['./countrylist.component.css']
})
export class CountrylistComponent implements OnInit {
    CountryList;
	deleteEntity;
	msgflag;
	message;
	type;
	permissionEntity;
 constructor( private http: Http,private globals: Globals, private router: Router, 
	private CountryService: CountryService,private CommonService: CommonService, private route:ActivatedRoute) { }


  ngOnInit() { 
		this.permissionEntity = {}; 
		if(this.globals.authData.RoleId==4){
			this.permissionEntity.View=1;
			this.permissionEntity.AddEdit=1;
			this.permissionEntity.Delete=1;
			this.default();
		} else {		
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Country'})
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
		this.CountryService.getAll()
	.then((data) => 
	{ 
		this.CountryList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Country per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Country",
					"sInfoFiltered": "(filtered from _MAX_ total Country)"
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

	deleteCountry(Country)
	{ 
		this.deleteEntity =  Country;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(Country)
	{ 	
		var del={'Userid':this.globals.authData.UserId,'id':Country.CountryId};
		this.CountryService.delete(del)
		.then((data) => 
		{
			let index = this.CountryList.indexOf(Country);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.CountryList.splice(index, 1);
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
		this.globals.message = 'Country Deleted Successfully';
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
