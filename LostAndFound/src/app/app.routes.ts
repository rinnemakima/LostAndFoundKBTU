import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ItemsManagerComponent } from './items-manager/items-manager.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'items', component: ItemsManagerComponent },
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent},
    
  ];
