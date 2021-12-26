import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ParkingPageComponent } from './pages/parking-page/parking-page.component';
import { ParkingPlacePageComponent } from './pages/parking-place-page/parking-place-page.component';
import { ParkingViewPageComponent } from './pages/parking-view-page/parking-view-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserViewPageComponent } from './pages/user-view-page/user-view-page.component';
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
  {path: 'profile', component: ProfilePageComponent, data: {title: 'Account Page', url: '/'}},
  {path: 'statistics', component: StatisticPageComponent, data: {title: 'Statistics Page', url: '/'}},
  {path: 'users', component: UserPageComponent, data: {title: 'Users Page', url: '/'}},
  {path: 'user/create', component: UserViewPageComponent, data: {title: 'User Page', url: '/'}},
  {path: 'user/edit/:userID', component: UserViewPageComponent, data: {title: 'User Page', url: '/'}},
  {path: 'statistics', component: StatisticPageComponent, data: {title: 'Statistics Page', url: '/'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
