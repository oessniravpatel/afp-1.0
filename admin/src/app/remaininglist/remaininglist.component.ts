import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/Forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
import { RemainingService } from '../services/remaining.service';

@Component({
  selector: 'app-remaininglist',
  templateUrl: './remaininglist.component.html',
  styleUrls: ['./remaininglist.component.css']
})
export class RemaininglistComponent implements OnInit {
	remainingList;
	constructor(private http: Http, private router: Router, private route: ActivatedRoute, private RemainingService: RemainingService,private globals: Globals) { }

  ngOnInit()
  {
	 debugger
	this.RemainingService.getAll()
	//.map(res => res.json())
	.then((data) => 
	{
		this.remainingList = data;
			
	}, 
	(error) => 
	{
		//alert('error');
	});	
    	
  }

}
