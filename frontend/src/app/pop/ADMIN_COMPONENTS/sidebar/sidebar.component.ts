import { Component, OnInit } from '@angular/core';

import {PopService} from '../../../pop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private route :Router , private service: PopService) { }

   menuLinks = [

   
     "Laptop",
     "Fruits",
     "Cloths",
     "Services",
     "Burger",
     "Pizza"

   ]

   username = localStorage.getItem('username');

    renderMenu(name :any){
       
      this.service.productcategory(name).subscribe(response =>{
          this.service.shareData(response.productData)
      })
     
    }

  ngOnInit(): void {
  }

}
