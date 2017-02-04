// Imports
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KittensComponent } from './kittens/kittens.component';

// Route Configuration
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'kittens', component: KittensComponent }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);