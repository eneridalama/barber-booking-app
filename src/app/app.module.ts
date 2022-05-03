import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AppointmentInfoComponent } from './timeline/appointment-info/appointment-info.component';
import { BarberServicesComponent } from './barber-services/barber-services.component';
import { AddServiceComponent } from './barber-services/add-service/add-service.component';


@NgModule({
  declarations: [
    AppComponent,
    BookAppointmentComponent,
    TimelineComponent,
    AppointmentInfoComponent,
    BarberServicesComponent,
    AddServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
