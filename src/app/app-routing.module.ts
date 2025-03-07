import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
  path: 'dashboard',
  component : DashboardComponent,
  canActivate: [authGuard],
  ///loadchildren es para cargar las rutas hijas del modulo apuntando a la ruta de la carpeta correspondiente
  loadChildren:() => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
},
{

  path: 'auth',
  loadChildren:() => import('./modules/auth/auth.module').then((m) => m.AuthModule),
},
{
  ///para cuando el usuario no pone /etc para que la pantalla no quede en blanco **doble asterisco es una manera de representar todas las rutas
  path:'**',
  redirectTo: 'auth/login'

},
];
///FORROOT NACE DE ACA MI ARBOL DE RUTA 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
