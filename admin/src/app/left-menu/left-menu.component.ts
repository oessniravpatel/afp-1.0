import { Component, OnInit } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
declare var $,PerfectScrollbar: any;
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  constructor(private globals: Globals, private router: Router) { }

  ngOnInit() {  
    new PerfectScrollbar('.sidebar-collapse');
  }

  menuopen(path){ 
    this.globals.msgflag = false;	  
    this.globals.currentLink = this.router.url;
    this.router.navigate([path]);
  }

}

