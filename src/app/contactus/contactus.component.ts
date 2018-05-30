import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if ($("body").height() < $(window).height()) {
      $('footer').addClass('footer_fixed');
  }
  }

}
