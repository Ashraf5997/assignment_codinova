import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule  , HTTP_INTERCEPTORS} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ########### IMPORTING ANGULAR MATERIAL MODULES
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule} from '@angular/material/icon';
import { MatDividerModule} from '@angular/material/divider';
import { MatListModule} from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

//import { TokenIntercepterService } from '../token-intercepter.service';
// ###########  IMPORTING COMPONENTS
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './ADMIN_COMPONENTS/sidebar/sidebar.component';
import { HomeComponent } from './CATALOGUE_COMPONENTS/home/home.component';
import { IndexbarComponent } from './ADMIN_COMPONENTS/indexbar/indexbar.component';
import { NavigationbarComponent } from './CATALOGUE_COMPONENTS/navigationbar/navigationbar.component';
import { AdmindashboardComponent } from './ADMIN_COMPONENTS/admindashboard/admindashboard.component';
//import { CartComponent } from '/cart/cart.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    IndexbarComponent,
    NavigationbarComponent,
    AdmindashboardComponent,
   
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    DragDropModule,
    MatTableModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule
    //HTTP_INTERCEPTORS

  ],

  providers:[ /*{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenIntercepterService,
    multi:true
  }*/],
  exports:[ FooterComponent  ]
})
export class POSModule { }
