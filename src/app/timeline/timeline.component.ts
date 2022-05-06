import { Component, OnInit } from '@angular/core';
import { CalendarOptions} from '@fullcalendar/angular';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CommonService } from '../service/common-service.service';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TimelineComponent implements OnInit {
  subscription: Subscription = new Subscription();

  calendarOptions: CalendarOptions = {};

  constructor(
    private commonService: CommonService,
    private localStorageService: LocalStorageService,
    private primengConfig: PrimeNGConfig,
  ) {
    this.calendarOptions = {
      initialView: 'timeGridDay',
      customButtons: {},
      progressiveEventRendering: true,
      height: 600,
      expandRows: true,
      handleWindowResize: true,
      nowIndicator: true,
      eventColor: 'rgb(141,208,255)',
      eventTextColor: 'rgb(42,50,61)',
      slotMinTime: '09:00:00',
      slotMaxTime: '21:00:00',
      titleFormat: {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      },
      headerToolbar: {
        start: 'today',
        center: 'title',
        end: 'prev,next',
      },
      eventOverlap: true,
      editable: true,
      eventStartEditable: true,
      eventResizableFromStart: true,
      eventDurationEditable: true,
      events: localStorageService.getEventList() as any,
    
      eventClick: function (calEvent) {
        console.log('calEvent ', calEvent.event.remove());       
      },
    };
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.subscription = this.commonService.data.subscribe((val) => {
      this.calendarOptions.events = this.localStorageService.addEvent({
        title: val.firstname + ' ' + val.lastname + ' - ' + val.number,
        start: val.date + 'T' + val.hour,
        end: val.date + 'T' + val.duration,
        description: 'test',
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}



