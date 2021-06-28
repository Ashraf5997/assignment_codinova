import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs' ;
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PopService {
 

  private  loginUrl          =     "http://localhost:9000/api/v1/login";
  private  userUrl           =     "http://localhost:9000/api/v1/user";
  private  productUrl        =     "http://localhost:9000/api/v1/product";
  private  productCartUrl    =     "http://localhost:9000/api/v1/cart/product";


  private token =localStorage.getItem('token')
  
  private config={ headers:{  authorisation: `Bearer ${this.token}`}}
 
  constructor(private http:HttpClient , private router:Router) {
   
  }

    
    //  TO SEND DATA ONE TO ANOTHER COMPONNETS 
    private sendToCom = new Subject<[]>();
    receiver=this.sendToCom.asObservable(); 
    shareData(data:any){
        this.sendToCom.next(data);
    }


   // LOGIN 
   Login(reqObj: { email: string; password: string }){
    return this.http.post<any>(this.loginUrl,reqObj);
  }

   // CREATE  USER
   createUser(reqObj: {email:string;password:string;fullname:string;accesstype:string;createdby:string}){
    return this.http.post<any>(this.userUrl,reqObj,this.config   );
  } 
 
  //CREATE PRODUCT
   createProduct(reqObj: { productname: string; productcategory: string ; productprice:string ; createdby:string ;productquantity:string }){
      return this.http.post<any>(this.productUrl, reqObj, this.config );
  }
  
  //FETCH PRODUCTS
  fetchProducts(){
    return this.http.get<any>(this.productUrl, );
}

  //FETCH PRODUCTS
  deleteProducts(id:any){
    return this.http.delete<any>(this.productUrl+"/"+id,this.config ); 
  }

   //FETCH PRODUCTS FROM CART
   fetchCartProducts(name:any){
    return this.http.get<any>(this.productCartUrl+"/"+name ); 
  }

   //ADD TO CART
   addToCart(eventdata :any ,){
    return this.http.post<any>(this.productCartUrl,eventdata); 
  }

  //REMOVE FROM CART
  removeFromCart(reqObj:any ,id:any){
    return this.http.delete<any>(this.productCartUrl+"/"+id ,reqObj ); 
  }

  //REMOVE FROM CART
  removecart( id:any){
    return this.http.delete<any>(this.productCartUrl+"/"+id); 
  }

  editCartItem(reqObj:any){
    return this.http.put<any>(this.productCartUrl,reqObj)
  }


   //EDIT PRODUCTS
   editProducts( reqObj:any,id:any){
    return this.http.put<any>(this.productUrl+"/"+id,reqObj,this.config ); 
  }
 
   //GET PRODUCTS BY CATEGORY
   productcategory( name:any){
    return this.http.get<any>(this.productUrl+"/"+name ); 
  }

   isLoggedIn(){
      return  !!localStorage.getItem('token');
   }
   
/*

   getToken(){
    return  localStorage.getItem('token');
 }*/

 
 autologgedout(){
  setTimeout(()=>{
       this.loggedout();
  },300000)
}

loggedout(){
 localStorage.removeItem('token');
 localStorage.removeItem('username');

 this.router.navigate([''])

}

}
