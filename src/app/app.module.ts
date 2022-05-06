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
import { CheckboxModule } from 'primeng/checkbox'
import timeGridPlugin from '@fullcalendar/timegrid';
import { BarberServicesComponent } from './barber-services/barber-services.component';
import { AddServiceComponent } from './barber-services/add-service/add-service.component';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { FileUploadModule } from "primeng/fileupload";
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputNumberModule} from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from "@angular/common/http";
import {ToastModule} from 'primeng/toast';
import {SpeedDialModule} from 'primeng/speeddial';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ProgressBarModule} from 'primeng/progressbar';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { HeaderComponent } from './header/header.component';
import {InputSwitchModule} from 'primeng/inputswitch';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    BookAppointmentComponent,
    TimelineComponent,
    BarberServicesComponent,
    AddServiceComponent,
    ProgressBarComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule, 
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
    MessagesModule,
    CardModule,
    ConfirmDialogModule,
    FileUploadModule,
    CalendarModule,
    BrowserAnimationsModule,
    InputNumberModule,
    InputMaskModule,
    InputTextModule,
    HttpClientModule,
    ToastModule,
    SpeedDialModule,
    ProgressSpinnerModule,
    ConfirmPopupModule,
    ProgressBarModule,
    InputSwitchModule,
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }