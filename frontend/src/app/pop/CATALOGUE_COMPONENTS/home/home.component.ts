import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {PopService} from '../../../pop.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subamount=0;
  totalamount= 0;
  vat=0;

  productList :any;
  mycart:any;
  username:any;
  cartItem:any;
  totalLength:any;
  j:any;

  constructor( public dialog: MatDialog,private service : PopService ,private router:Router,private toastr:ToastrService) {
    this.username = localStorage.getItem('username');
    this.fetchProducts();
    this.fetchCartProduct(this.username);
   }

   //mycart =[{'id':254,'productname':'sasasa','productprice':25,'productcategory':'good','productquantity':25,'createdby':'asgraf'}]

  ngOnInit(): void {
  }
  menuLinks = [
    "Laptop",
    "Fruits",
    "Cloths",
    "Services",
    "Burger",
    "Pizza"
  ]

  searchfield="";
  
  search(){
    this.menuRender(this.searchfield);
 }

 menuRender(name:any){
       
  this.service.productcategory(name).subscribe(response =>{
   // this.service.shareData(response.productData)
    if(response.productData== ""){
      this.toastr.warning(" ITEM NOT EXIST TRY WITH ANOTHER"," Hi "+this.username);  
    }else{
        this.productList = response.productData; 
    }

  })
}
logout(){
  this.service.loggedout();
}

  // FETCH PRODUCT
  fetchProducts(){
    this.subamount=0
     this.service.fetchProducts().subscribe(response =>{
     // alert(JSON.stringify(response.productData))
     this.productList  = response.productData;
     this.totalLength = Object.keys(this.productList).length
     // this.mycart = response.productData;
    })
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        let eventData =event.container.data[event.currentIndex];
                         
                       if(Object.keys(this.productList).length < this.totalLength){

                          console.log("add")
                          this.addToCart(eventData);
                        }
     }
  }


  addToCart( eventData:any){
    for (const i in this.mycart) {
      if( this.mycart[i] == eventData){
        
          let reqObj={
          productname       : this.mycart[i].productname,
          productcategory   : this.mycart[i].productcategory,
          productprice      : this.mycart[i].productprice,
          productquantity   : 1,//this.mycart[i].productquantity,
          createdby         : this.mycart[i].createdby,
          productowner      : this.username
        }
         // calling service
             this.service.addToCart(reqObj).subscribe(response =>{
             this.refresh()
          })
       }
    } 
  }
  
  
  
  addOne(qty:any , pid :any){
    qty = qty+1;
    if(qty <= 5){ 
       this.thenUpdate(qty,pid)
       this.toastr.success("One item added to your cart"," Hi "+this.username);
      }
      else{
         this.toastr.warning("SORRY WE CANNOT PROCESS MORE THAN FIVE ITEMS"," Hi "+this.username);    
       }
  }

  removeOne(qty:any , pid:any){
    qty = qty-1;
    if(qty >=0){  
      this.thenUpdate(qty,pid)
    this.toastr.success("One item reduced from your cart"," Hi "+this.username);

    }
  }

  thenUpdate(qty:any,pid:any){
    let reqObj ={
      id:pid,
      productowner:this.username,
      productquantity:qty
    }
    this.service.editCartItem(reqObj).subscribe(response =>{
        this.refresh()
    })
  }
  

  removecart(pid:any){
     this.service.removecart(pid).subscribe(response =>{
     this.toastr.success("Item removed from your cart"," Hi "+this.username);
     this.refresh()
    })
   }
  

  refresh(){
    this.fetchCartProduct(this.username);
    this.fetchProducts();
  }

  
  // FETCH PRODUCT
  fetchCartProduct(username:any){
    this.service.fetchCartProducts(username).subscribe(response =>{
    //alert(JSON.stringify(response.productData))
    this.mycart= response.productData;
    this.cartItem = Object.keys(this.mycart).length

    for(let i in this.mycart){
       this.subamount += this.mycart[i].productquantity*this.mycart[i].productprice; 
    }
      this.totalAmount(this.subamount)
    })
  }

  
  totalAmount(amt:any){
    this.vat = 15/100*amt;
    this.totalamount = amt+this.vat;
   }





}



 



  


