import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { CommonService } from '../service/common-service.service';
import { LocalStorageService } from '../service/local-storage.service';
// import { Event } from '..service/localStorageService';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  subscription: Subscription = new Subscription();

  value: number = 30;
  hourList: Array<number> = [];
  maxHours: number = 12;
  totalHours: number = 0;

  constructor(
    private commonService: CommonService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.value = this.calculateProgressBar();
  }

  findTotalHours(): number {
    const eventList = this.localStorageService.getEventList();
    for (let event in eventList) {
      const today = new Date();
      if (
        moment(this.localStorageService.getEventById(+event + 1)!.start).isSame(
          today,
          'day'
        )
      ) {
        console.log(
          'moment ' + this.localStorageService.getEventById(+event + 1)!.start
        );
        let a = moment(
          this.localStorageService.getEventById(+event + 1)!.start
        );
        let b = moment(this.localStorageService.getEventById(+event + 1)!.end);
        this.hourList.push(b.diff(a, 'hours'));
        console.log(this.hourList);
      }
    }
    return this.hourList.reduce(
      (accumulator: any, curr: any) => accumulator + curr
    );
  }

  calculateProgressBar() {
    this.totalHours = this.findTotalHours();
    console.log((this.maxHours / this.totalHours) * 100);
    return (this.totalHours / this.maxHours) * 100;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
