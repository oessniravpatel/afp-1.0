import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { KsaService } from '../services/ksa.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-ksa-list',
  providers: [ KsaService,CommonService ],
  templateUrl: './ksa-list.component.html',
  styleUrls: ['./ksa-list.component.css']
})
export class KsaListComponent implements OnInit {

	ksaList;
	deleteEntity;
	msgflag;
	message;
	permissionEntity;
	
	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		 private KsaService: KsaService, private CommonService: CommonService, private globals: Globals) 
  {
	
  }

  ngOnInit() { 
		this.permissionEntity = {}; 
		if(this.globals.authData.RoleId==4){
			this.permissionEntity.View=1;
			this.permissionEntity.AddEdit=1;
			this.permissionEntity.Delete=1;
			this.default();
		} else {		
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'KSA'})
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
		
		this.KsaService.getAll()
		.then((data) => 
		{ 
			this.ksaList = data;	
			setTimeout(function(){
				$('#dataTables-example').dataTable( {
					"oLanguage": {
						"sLengthMenu": "_MENU_ KSA per Page",
						"sInfo": "Showing _START_ to _END_ of _TOTAL_ KSA",
						"sInfoFiltered": "(filtered from _MAX_ total KSA)",
						"sInfoEmpty": "Showing 0 to 0 of 0 KSA"
					}
				});
			},100); 
	
		}, 
		(error) => 
		{
			//alert('error');
		});	
		this.msgflag = false;
		}
	
	deleteksa(ksa)
	{ 
		this.deleteEntity =  ksa;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(ksa)
	{
		 var del={'Userid':this.globals.authData.UserId,'id':ksa.KSAId};
		this.KsaService.delete(del)
		.then((data) => 
		{
			let index = this.ksaList.indexOf(ksa);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.ksaList.splice(index, 1);			
			}	
			this.globals.message = 'KSA Deleted Successfully';
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



