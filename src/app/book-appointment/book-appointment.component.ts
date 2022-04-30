import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { barberService } from '../shared/barberService.model';
//TO DO importo moment
//TO DO Krijo nje service për të kaluar të dhënat te komponenti timeline
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
})
export class BookAppointmentComponent implements OnInit {


  
  constructor(private primengConfig: PrimeNGConfig) {}

  addNewAppointmentForm: FormGroup = new FormGroup({});
  
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    
    this.addNewAppointmentForm = new FormGroup({
      firstname: new FormControl(null),
      lastname: new FormControl(null),
      number: new FormControl(null),
      date: new FormControl(null),
      hour: new FormControl(null),
      servicesList: new FormControl(null),
    });
  }

  @Input() services: barberService[] = [];
  @Input() firstname: string = '';
  @Input() lastname: string = '';
  @Input() number: number = 0;
  @Input() date: Date = new Date();
  @Input() hour: Date = new Date();
  // @Input() selectedService = [];
  timeValue: string = '';

  onSelect($event: Date) {
    let hour = new Date($event).getHours();
    let min = new Date($event).getMinutes();
    if (min < 10) {
      this.timeValue = `${hour}:0${min}`;
    } else {
      this.timeValue = `${hour}:${min}`;
    }
  }

  val: string = '';

  calculateTime(listItem: barberService){
    const index = this.services.indexOf(listItem);
  }

  addNewAppointment(event: any) {
    event.preventDefault();
    let object = {
      firstname: this.addNewAppointmentForm.value.firstname,
      lastname: this.addNewAppointmentForm.value.lastname,
      number: this.addNewAppointmentForm.value.number,
      // date: moment(this.addNewAppointmentForm.value.date).format('YYYY-MM-DD'),
      // hour: moment(this.addNewAppointmentForm.value.hour).format('HH:mm:ss'),
      // selectedService: this.addNewAppointmentForm.value.selectedService,
    };
  }

  display: boolean = false;
  showDialog() {
    this.display = true;

  }
}
