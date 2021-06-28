import { Component, OnInit } from '@angular/core';

import {PopService} from '../../../pop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {
  productList:any;
  constructor( private service : PopService , private router:Router) {

    this.fetchProducts();

   }

  ngOnInit(): void {
  }
  searchfield="";

  menuLinks = [
    "Laptop",
    "Fruits",
    "Cloths",
    "Services",
    "Burger",
    "Pizza"
  ]

  search(){
   
     this.menuRender(this.searchfield);
  }

  menuRender(name:any){
       
    this.service.productcategory(name).subscribe(response =>{
     // this.service.shareData(response.productData)
     if(response.productData== ""){
           alert("Data not found please try with another")     
     }else{
          this.productList = response.productData; 
     }

    })
  }

  
  logout(){
    this.service.loggedout();
  }
  login(){

  }
  
  // FETCH PRODUCT
  fetchProducts(){
    this.service.fetchProducts().subscribe(response =>{
    // alert(JSON.stringify(response.productData))
    this.productList = response.productData;
   })
  }

}
