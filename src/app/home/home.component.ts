import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HomeService } from '../services/home.service';
import { Globals } from '.././globals';
declare var $: any;
@Component({
  selector: 'app-home',
  providers: [ HomeService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
Disinv;
 constructor( private http: Http,private globals: Globals,  private HomeService: HomeService) { }
ngOnInit() {debugger
	  
	  $('.bxslider').bxSlider({
		 mode: 'fade',
		 captions: true,
  		 auto:true,
		 controls : false
	});
	this.Disinv = '';
  this.HomeService.getAll()
	//.map(res => res.json())
	.then((data) => 
	{
			this.Disinv = data['Disinv'];
	}, 
	(error) => 
	{
		alert('error');
	});	
  
  }

}

 