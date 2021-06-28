import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import {PopService} from './../pop.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor( private router : Router, private service:PopService ) { }

  RedirectToadmin(){
    this.router.navigate(['admindashboard']);   
  }
  RedirectTocatelogue(){
    this.router.navigate(['catelog']);   
  }
  ngOnInit(): void {
  }

}
