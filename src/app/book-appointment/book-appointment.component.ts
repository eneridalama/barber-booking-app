import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { barberService } from '../shared/barberService.model';
import { CommonService } from '../service/common-service.service';
import moment from 'moment';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
})
export class BookAppointmentComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  addNewAppointmentForm: FormGroup = new FormGroup({});


// rirendirizon faqen per te shfaqur editimete e reja
  set object(item: any) {
    setTimeout(() => {
      if (item !== undefined) {
        this.addNewAppointmentForm = this.initializeForm(item);
      }
    });
  }

  ngOnInit(): void {
    this.addNewAppointmentForm = this.initializeForm(null);
    // this.localStore.saveData('id', 'jk123');
  }

  initializeForm(value: any): FormGroup {
    return this.formBuilder.group({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      hour: new FormControl(null, Validators.required),
      servicesList: new FormControl(null, Validators.required),
    });
  }
 
  @Input() services: barberService[] = [];
  @Input() firstname: string = '';
  @Input() lastname: string = '';
  @Input() number: number = 0;
  @Input() date: Date = new Date();
  @Input() hour: Date = new Date();

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
  checkValue(event: any, service: barberService) {
    if (event.checked.length == 1) {
      this.checkedValues.push(service.time);
    } else {
      const index = this.checkedValues.indexOf(service.time);
      this.checkedValues.splice(index, 1);
    }
  }

  calculateTime() {
    return this.checkedValues.reduce(
      (accumulator: any, curr: any) => accumulator + curr
    );
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
      duration: moment(
        moment(this.addNewAppointmentForm.value.hour).add(
          this.calculateTime() as moment.DurationInputArg1,
          units
          )
          ).format('HH:mm:ss'),
        };
        this.commonService.data.next(object);
        // this.localStorageService.setItem(object.firstname,  JSON.stringify(object))
        this.addNewAppointmentForm.reset();
        this.showDialog(false);
  }

  
  display: boolean = false;
  showDialog(value: boolean) {
    this.display = value;
    this.addNewAppointmentForm.reset();
  }
}
