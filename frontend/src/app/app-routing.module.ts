import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ---- importing Components ---- //
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './pop/ADMIN_COMPONENTS/admindashboard/admindashboard.component';
import { HomeComponent } from './pop/CATALOGUE_COMPONENTS/home/home.component';
// AUTH GUARD
import {AuthGuard} from './auth.guard'

const routes: Routes = [
  
       {path:'',component:LoginComponent},
       {path:'catelog',component:HomeComponent,canActivate:[AuthGuard]},
       {path:'admindashboard' , component:AdmindashboardComponent ,canActivate:[AuthGuard]},
       {path:'landingpage',component:LandingpageComponent ,canActivate:[AuthGuard]}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
