import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ParkingPageComponent } from './pages/parking-page/parking-page.component';
import { ParkingPlacePageComponent } from './pages/parking-place-page/parking-place-page.component';
import { ParkingViewPageComponent } from './pages/parking-view-page/parking-view-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

const routes: Routes = [
  {path: '', component: WelcomePageComponent, data: {title: 'Welcome Page', url: '/'}},
  {path: 'login', component: LoginPageComponent, data: {title: 'Login Page', url: '/'}},
  {path: 'register', component: RegisterPageComponent, data: {title: 'Register Page', url: '/'}},
  {path: 'parking', component: ParkingPageComponent, data: {title: 'Parking Page', url: '/'}},
  {path: 'parking/edit/:parkingID', component: ParkingViewPageComponent, data: {title: 'Parking Page', url: '/'}},
  {path: 'parking/create', component: ParkingViewPageComponent, data: {title: 'Parking Page', url: '/'}},
  {path: 'parking/:parkingID/parkingPlace/create', component: ParkingPlacePageComponent, data: {title: 'ParkingPlace Page', url: '/'}},
  {path: 'parkingPlace/edit/:parkingPlaceID', component: ParkingPlacePageComponent, data: {title: 'ParkingPlace Page', url: '/'}},
  {path: 'profile', component: ProfilePageComponent, data: {title: 'Account Page', url: '/'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
