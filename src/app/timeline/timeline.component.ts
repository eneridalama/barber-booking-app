import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridDay',
    customButtons: {},
    progressiveEventRendering: true,
    height: 700,
    contentHeight: 600,
    handleWindowResize: true,
    nowIndicator: true,
    slotMinTime: '09:00:00',
    slotMaxTime: '20:00:00',
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
  
  constructor() { }

  ngOnInit(): void {
  }

}
