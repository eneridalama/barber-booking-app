import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Subscription } from 'rxjs';
import { CommonService } from '../service/common-service.service';
import { LocalStorageService } from '../service/local-storage.service';

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
    height: 600,
    expandRows: true,
    handleWindowResize: true,
    nowIndicator: true,
    eventColor: 'rgb(141,208,255)',
    eventTextColor: 'rgb(42,50,61)',
    // slotMinTime: '09:00:00',
    // slotMaxTime: '21:00:00',
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
    eventOverlap: false,
    editable: true,
    eventStartEditable: true,
    eventResizableFromStart: true,
    eventDurationEditable: true,
   
    events: [
      
    ]
  };
  
  constructor(private commonService: CommonService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {

    this.subscription = this.commonService.data.subscribe((val) => {  
      this.calendarOptions.events = [
        ...this.calendarOptions.events as any,{
          id: val.firstname,
          title: val.firstname + ' ' + val.lastname+ ' - ' + val.number,
          start: val.date + 'T' + val.hour,
          end: val.date + 'T' + val.duration, 
        },
        
      ];
      this.localStorageService.getItem(JSON.stringify(this.calendarOptions.events))
    });
    console.log(this.calendarOptions.events)
  }
  

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
