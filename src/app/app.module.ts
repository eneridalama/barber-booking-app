import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { CheckboxModule } from 'primeng/checkbox';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from "primeng/inputtext";


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
]);

@NgModule({
  declarations: [AppComponent, BookAppointmentComponent, TimelineComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
    CommonModule,
    CalendarModule,
    BrowserAnimationsModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
