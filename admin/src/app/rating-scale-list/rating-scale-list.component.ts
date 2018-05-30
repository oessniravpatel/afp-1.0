import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RatingScaleService } from '../services/rating-scale.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-rating-scale-list',
  providers: [ RatingScaleService,CommonService ],
  templateUrl: './rating-scale-list.component.html',
  styleUrls: ['./rating-scale-list.component.css']
})
export class RatingScaleListComponent implements OnInit {

	ratingList;
	deleteEntity;
	msgflag;
	message;
	type;
	permissionEntity;
	
	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		 private RatingScaleService: RatingScaleService, private CommonService: CommonService, private globals: Globals) 
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
		this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'Rating Scale'})
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
		this.RatingScaleService.getAll()
	.then((data) => 
	{ 
		this.ratingList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Rating Scale per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Rating Scale",
					"sInfoFiltered": "(filtered from _MAX_ total Rating Scale)",
					"sInfoEmpty": "Showing 0 to 0 of 0 Rating Scale"
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
	
	deleteRatingScale(ratingscale)
	{ 
		this.deleteEntity =  ratingscale;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(ratingscale)
	{ 
		var del={'Userid':this.globals.authData.UserId,'id':ratingscale.RatingScaleId};
		this.RatingScaleService.delete(del)
		.then((data) => 
		{
			let index = this.ratingList.indexOf(ratingscale);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.ratingList.splice(index, 1);			
			}	
			this.globals.message = 'Rating Scale Deleted Successfully';
			this.globals.type = 'success';
			this.globals.msgflag = true;
		}, 
		(error) => 
		{
			$('#Delete_Modal').modal('hide');
			if(error.text){
				this.globals.message = "You can't delete this record because of their dependency";
				this.globals.type = 'danger';
				this.globals.msgflag = true;
			}	
		});		
	}
	
}


