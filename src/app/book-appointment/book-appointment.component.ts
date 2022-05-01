<<<<<<< Updated upstream
import { Component, OnInit } from '@angular/core';

=======
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { barberService } from '../shared/barberService.model';
import { CommonService } from '../service/common-service.service';
import moment from 'moment';
>>>>>>> Stashed changes
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
})
export class BookAppointmentComponent implements OnInit {
<<<<<<< Updated upstream
  ngOnInit(): void {
    throw new Error('Method not implemented.');
=======
  constructor(private commonService: CommonService) {}

  addNewAppointmentForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
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
  @Input() selectedService = [];
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

  checkedValues: Array<Number> = [];
  checkValue(event: any, service: barberService){
    if (event.checked.length == 1) {
      this.checkedValues.push(service.time);
    } else  {
      const index = this.checkedValues.indexOf(service.time);
        this.checkedValues.splice(index, 1);
    }
  }
  
  calculateTime(){
     return this.checkedValues.reduce((accumulator: any, curr: any) => accumulator + curr);
  }

  addNewAppointment(event: any) {
    event.preventDefault();
    const units: moment.unitOfTime.DurationConstructor = 'minutes';
    let object = {
      firstname: this.addNewAppointmentForm.value.firstname,
      lastname: this.addNewAppointmentForm.value.lastname,
      number: this.addNewAppointmentForm.value.number,
      date: moment(this.addNewAppointmentForm.value.date).format('YYYY-MM-DD'),
      hour: moment(this.addNewAppointmentForm.value.hour).format('HH:mm:ss'),
      duration: moment(moment(this.addNewAppointmentForm.value.hour).add(this.calculateTime() as moment.DurationInputArg1, units)).format('HH:mm:ss'),
    };
    this.commonService.data.next(object);
  }

  display: boolean = false;
  showDialog() {
    this.display = true;
>>>>>>> Stashed changes
  }
}
