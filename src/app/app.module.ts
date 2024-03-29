import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ParkingPageComponent } from './pages/parking-page/parking-page.component';
import { HeaderComponent } from './header/app-header.component';
import { ParkingViewPageComponent } from './pages/parking-view-page/parking-view-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ParkingPlacePageComponent } from './pages/parking-place-page/parking-place-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserViewPageComponent } from './pages/user-view-page/user-view-page.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HeaderComponent,
    ParkingPageComponent,
    ParkingViewPageComponent,
    ParkingPlacePageComponent,
    ProfilePageComponent,
    StatisticPageComponent,
    UserPageComponent,
    UserViewPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgApexchartsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: 'en'
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
