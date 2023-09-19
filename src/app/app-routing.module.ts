import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './Edit/edit/edit.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProjectsComponent } from './projects/projects.component';
import { ResultsComponent } from './results/results.component';
import { CreateformComponent } from './createform/createform.component';
import { AuthGuard } from './isauthenticate.guard';
import { JmxComponent } from './jmx/jmx.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent ,canActivate:[AuthGuard]} ,
  { path: 'edit', component: EditComponent } ,
  { path: 'forgot', component: ForgotPasswordComponent } ,
  { path: 'projects', component:ProjectsComponent } ,
  { path: 'results', component:ResultsComponent } ,
  { path: 'create', component:CreateformComponent } ,
  { path: 'jmx/:projectId', component: JmxComponent }, 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
