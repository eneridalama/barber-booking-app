import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Subscription } from 'rxjs';
import { CommonService } from '../service/common-service.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  subscription: Subscription = new Subscription();

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridDay',
    customButtons: {},
    progressiveEventRendering: true,
    height: 800,
    handleWindowResize: true,
    nowIndicator: true,
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
  };
  
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {

    this.subscription = this.commonService.data.subscribe((val) => {
      this.calendarOptions.events = [
        {
          title: val.firstname + ' ' + val.lastname + ' - ' + val.number,
          start: val.date + 'T' + val.hour,
          end: val.date + 'T' + val.duration, 
        },

      ];
    });
  }
  

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
