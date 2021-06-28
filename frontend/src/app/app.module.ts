import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
/*import { TokenIntercepterService } from './token-intercepter.service';*/
// ---- importing POS Module ----  //
  import {POSModule} from './pop/pop.module'
  import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// -------IMPORTING ANGULAR MATERIAL
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

//AUTH GUARD
import {AuthGuard} from './auth.guard';

//------importing Font Awsome Icons
//import { AngularFontAwesomeModule } from 'angular-font-awesome';

//import DragDropModule from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ---- importing Components ---- //
import { LoginComponent } from './login/login.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import {DragDropModule} from '@angular/cdk/drag-drop';





@NgModule({
  declarations: [
  
    AppComponent,
  
      // MY COMPONENTS
       LoginComponent,
       LandingpageComponent,
       LandingpageComponent ,

  ],
  imports: [
   
    BrowserModule,
    //  MY MODULES
    POSModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    DragDropModule,
    ToastrModule.forRoot()
   
  ],
  providers: [AuthGuard ,/*{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenIntercepterService,
    multi:true
  }*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
