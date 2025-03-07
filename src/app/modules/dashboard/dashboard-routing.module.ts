import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesModule } from './pages/courses/courses.module';
import { authGuard } from '../../core/guards/auth.guard';
import { adminGuard } from '../../core/guards/admin.guard';

// aca estamos posicionados en el /dashboard

const routes: Routes = [
  {
    // si quiero hacer dashboar/home """" / lo que sea
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),

  },
  {

    path: 'students',
    loadChildren: () => import('./pages/students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.module').then ((m) => m.CoursesModule)

  },
  {
    path: 'users',
    canActivate: [adminGuard],
    loadChildren: () => import('./pages/users/users.module').then ((m) => m.UsersModule)

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
