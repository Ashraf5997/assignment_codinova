import { Component, OnInit } from '@angular/core';
//import {POSService} from '../../pos-service.service';
import { ToastrService } from 'ngx-toastr';
import {PopService} from '../../../pop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indexbar',
  templateUrl: './indexbar.component.html',
  styleUrls: ['./indexbar.component.css']
})
export class IndexbarComponent implements OnInit {

   productList:any;
   username:any;

  constructor( private service : PopService , private router:Router, private toastr :ToastrService) {
      this.username = localStorage.getItem('username');
      this.fetchProducts();

      // RECEVING DATA FROM DIFFERENT COMPONENTS
        this.service.receiver.subscribe(res=>{
        this.productList=res
     
      })
  }

  // USERS INPUT FIELDS
  fullname   ="";
  email      ="";
  password   ="";
  accesstype ="";
  createdby  = localStorage.getItem('username');


  productname      ="";
  productcategory  ="";
  productprice     ="";
  productquantity  ="";
  productid        ="";


  // TOOL KEY
  displayUserForm =false;
  displayProductForm = false;
  editMode = false;


  OPEN_FORM(name:any){
     if(name == 'addproduct'){this.displayProductForm = true}
     else{this.displayUserForm=true;}
  }

  CLOSE_FORM(name:any){
    if(name == this.displayProductForm){this.displayProductForm = false}
    else{this.displayUserForm=false;}
 }

 
  saveuser(){
    //creating obj
     var reqObj={

        email :this.email,
        password :this.password,
        fullname:this.fullname,
        accesstype :this.accesstype,
        createdby: this.username,

      }
        if((this.accesstype && this.fullname)&&( this.email && this.password)){
                try{

                this.service.createUser(reqObj).subscribe(response=>{
                //  alert(response.message)
                this.toastr.success( response.message," Hi "+this.username)

                  this.clearVariables()
                })}catch(err){alert(err)}
        }else {
         this.toastr.warning(" Insert Data "," Hi "+this.username)
        }
}


 // creating product
  saveProduct(){
        //creating obj
       // alert(localStorage.getItem('token'));

    var reqObj={
      productname      :this.productname,
      productprice     :this.productprice,
      productquantity  :this.productquantity,
      productcategory  :this.productcategory,
      createdby        :this.username
    }
   
      if((this.productcategory && this.productname)&&( this.productprice && this.productquantity)){

               if(this.editMode){

                     this.service.editProducts(reqObj , this.productid).subscribe(response =>{
                     this.editMode=false;
                    // alert(response.message)
                     this.toastr.success( response.message," Hi "+this.username)

                   })

               }else{

                    this.service.createProduct(reqObj).subscribe(response =>{
                  //  alert(response.message)
                     this.toastr.success( response.message," Hi "+this.username)

                    })
               }
            
            this.clearVariables()
            this.fetchProducts();
            this.displayProductForm = false
            

      }else {
        this.toastr.warning(" Insert Data "," Hi "+this.username)
      }
  }


  // FETCH PRODUCT
  fetchProducts(){
    this.service.fetchProducts().subscribe(response =>{
    // alert(JSON.stringify(response.productData))
    this.productList = response.productData;
   })
  }

  // DELETE PRODUCT
  deleteProduct(p_id:any){

      this.service.deleteProducts(p_id).subscribe(response =>{
    //  this.productList = response.message;
       this.fetchProducts();
       //alert(response.message)
       this.toastr.success( response.message," Hi "+this.username)

     })
  }

  //DELETE PRODUCTS
  editProduct(p_id:any,pn:any , pc:any ,pp:any,pq:any){

        this.displayProductForm = true;
        this.editMode = true;
        this.productname=pn;
        this.productcategory=pc;
        this.productprice=pp;
        this.productquantity=pq;
        this.productid= p_id;
  }


  loggedout(){
    this.service.loggedout();
  }
  
 clearVariables(){
    this. productname      =" ";
    this. productcategory  =" ";
    this. productprice     =" ";
    this .productquantity  =" ";
    
  
 }

  ngOnInit(): void {
  }

}


