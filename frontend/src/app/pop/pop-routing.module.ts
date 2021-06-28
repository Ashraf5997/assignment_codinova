
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ************IMPORTING COMPONENTS*****************
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './ADMIN_COMPONENTS/sidebar/sidebar.component';
import { HomeComponent } from './CATALOGUE_COMPONENTS/home/home.component';
import { IndexbarComponent } from './ADMIN_COMPONENTS/indexbar/indexbar.component';
import { NavigationbarComponent } from './CATALOGUE_COMPONENTS/navigationbar/navigationbar.component';

// IMPORTING MENU COMPONENTS
import { ComputerComponent } from './ADMIN_COMPONENTS/Menu/computer/computer.component';

const routes: Routes = [

  {path:'indexbasr', component: IndexbarComponent},
  {path:'home', component: HomeComponent},
  {path:'menu/computer', component: ComputerComponent},
 // {path:'i', component: IndexbarComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class POPRoutingModule { }
