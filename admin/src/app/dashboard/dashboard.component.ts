import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { Globals } from '.././globals';
declare var AmCharts: any;

@Component({
  selector: 'app-dashboard',
   providers: [ DashboardService ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 Dashboard;
   constructor( private http: Http,private globals: Globals, private router: Router, private DashboardService: DashboardService,private route:ActivatedRoute) { }

  ngOnInit() {debugger
  this.Dashboard={};
	this.DashboardService.getAll()
	//.map(res => res.json())
	.then((data) => 
	{
		this.Dashboard.user = data['user'];
		this.Dashboard.domain = data['domain'];
		this.Dashboard.Carea = data['Carea'];
		this.Dashboard.Tksa = data['Tksa'];
		this.Dashboard.Course = data['Course'];
		this.Dashboard.Company = data['Company'];
	}, 
	(error) => 
	{
		//alert('error');
	});	  
  }

}
