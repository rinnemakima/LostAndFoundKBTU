import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ItemsManagerComponent } from './items-manager/items-manager.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'items', component: ItemsManagerComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ];
