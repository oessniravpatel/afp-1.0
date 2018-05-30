import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Globals } from '../globals';
@Component({
  selector: 'app-headerhome',
  templateUrl: './headerhome.component.html',
  styleUrls: ['./headerhome.component.css']
})
export class HeaderhomeComponent implements OnInit {

  constructor(  private authService: AuthService,private router: Router,private globals: Globals) { }

  ngOnInit() 
  {
  }
  home()
  {
    if(this.globals.currentLink!='/'){
      this.globals.check_login=false;
      this.router.navigate(['/dashboard']);
    }

  }
}
