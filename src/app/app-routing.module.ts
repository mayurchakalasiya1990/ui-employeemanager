import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/component/employee/employee.component';
import { AuthGuard } from './login/authguard/auth.guard';
import { LoginComponent } from './login/component/login/login.component';


const routes: Routes = [
  { path: '', 
    component: LoginComponent 
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:EmployeeComponent,
    canActivate:[AuthGuard]
  },
  { 
    path: '**', 
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }