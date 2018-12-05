import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NagiosService } from './services';
import { HostsComponent, ServiceComponent } from './components';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ServicesComponent } from './components/services/services.component';
import { HostComponent } from './components/hosts/host/host.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsComponent } from './components/charts/charts.component';


@NgModule({
  declarations: [
    AppComponent,
    HostsComponent,
    ServicesComponent,
    HostComponent,
    ServiceComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [NagiosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
