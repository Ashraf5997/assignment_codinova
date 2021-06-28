
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import {PopService} from './../pop.service';



// SERVICE
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router : Router, private service:PopService) { }


  // user input fields
  email     = "";
  password  = "";
  errMsg    = "";

  isSpinnerOn = false;

   login(){

        let reqObj={
          email :this.email,
          password :this.password
        }

        if(this.email && this.password){

             this.isSpinnerOn = true;
             this.errMsg = " ";
             setTimeout(()=>{ this.isSpinnerOn=false }, 2000);

           //  setTimeout( function(isSpinnerOn:any){ this.isSpinnerOn = false }, 3000);

             
             this.service.Login( reqObj ).subscribe(response=>{
             //  alert(JSON.stringify(response))

               if(response.status == 200){

                   localStorage.setItem('token',response.access_token)
                   localStorage.setItem('username',response.userData[0].fullname)  
                   this.service.autologgedout();                 
                   if(response.userData[0].accesstype === 'admin-user'){
                        this.router.navigate(['landingpage']);    
                   }else{
                        this.router.navigate(['catelog']);   
                   }
               }
                  this.errMsg = " Access Denied Invalid Credentials ";
                  this.isSpinnerOn=false
             })
        }else{
          this.errMsg = " Please provide credentials ";
        }
   }

   timeOut(s:any) {
    setTimeout(()=>{ this.isSpinnerOn=false }, 3000);
  }
   
  ngOnInit(): void {
  }

}
