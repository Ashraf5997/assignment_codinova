/*
import { Injectable , Injector } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
import { PopService } from './pop.service';

@Injectable({
  providedIn: 'root'
})

export class TokenIntercepterService implements HttpInterceptor {

  constructor( private injectorr: Injector , private service :PopService) { }
    
    intercept( req:any, next:any){
          let tokenRequest = req.clone({
              setHeaders:{
                authorization: `Bearer ${this.service.getToken}`
              }
     
            })

            return next.handle(tokenRequest)
    }
}*/
