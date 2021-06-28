import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {PopService} from './pop.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private service : PopService , private router : Router){}

  canActivate():boolean{
    if(this.service.isLoggedIn()){
      return true
    }
    else{
      this.router.navigate(['']);
      return false
    }
  }

  
  canActivate1():boolean{
    if(this.service.isLoggedIn()){
      return false
    }
    else{
      this.router.navigate(['']);
      return false
    }
  }


  
}
