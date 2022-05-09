import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import moment from 'moment';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { Subscription } from 'rxjs';
import { CommonService } from '../service/common-service.service';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class TimelineComponent implements OnInit {
  subscription: Subscription = new Subscription();

  calendarOptions: CalendarOptions = {};
  title = '';
  id = '';
  date: string = '';
  startTime: any;
  endTime: any;
  start: any;
  end: any;
  description: any;
  events = this.localStorageService.getEventList();
  display: boolean = false;
  openModal: boolean = false;
  selectedEvent: CalendarOptions = this.calendarOptions;
  image: string = '';
  openEdit: boolean = false;

  constructor(
    private commonService: CommonService,
    private localStorageService: LocalStorageService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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
      eventClick: this.handleEventClick.bind(this),
    };
  }

  deleteEvent(event: string) {
    const eventList = this.localStorageService.getEventList();
    for (let event in eventList) {
      const newEvent = this.localStorageService.getEventById(+event + 1)!;
      console.log(newEvent);
      if (newEvent.id == +this.id) {
        this.localStorageService.deleteEventById(newEvent.id);
        this.display = false;
      }
    }
  }

  showTopRight(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'tl',
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  confirm(event: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this event?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteEvent(event);
        this.showTopRight('success', 'Approved', 'Event deleted');
      },
      reject: () => {
        this.showTopRight('error', 'Recejted', 'Event did not get deleted');
      },
    });
  }

  handleEventClick(model: EventClickArg) {
    this.title = model.event.title;
    this.id = model.event.id;
    this.start = moment(model.event.start).format('h:mm a');
    this.end = moment(model.event.end).format('h:mm a');
    this.startTime = moment(model.event.start).fromNow();
    this.endTime = moment(model.event.end).fromNow();
    const event = this.localStorageService.getEventById(+this.id);
    this.description = event?.description;
    this.display = true;
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.subscription = this.commonService.data.subscribe((val) => {
      this.calendarOptions.events = this.localStorageService.addEvent({
        title: val.firstname + ' ' + val.lastname,
        start: val.date + 'T' + val.hour,
        end: val.date + 'T' + val.duration,
        description: val.number,
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  edit() {
    this.openModal = true;
  }

  showModal(value: boolean) {
    this.openModal = value;
  }

  activate(event: any) {
    console.log('activate', event);
  }

  getValue(value: Event) {
    console.log(value);
  }

  someData: string = '';
  confirmEvent(id: string, value: string) {
    if (this.someData !== '') {
      const event = this.localStorageService.getEventById(+id)!;
      event.title = this.localStorageService.editEventTitle(+id, value);
      this.localStorageService.deleteEventById(+id);
      this.localStorageService.addEvent(event);
      console.log(this.events)
      this.display = false;
    }
  }
}
