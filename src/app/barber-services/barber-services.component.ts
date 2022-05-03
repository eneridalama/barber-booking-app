import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Service } from './service';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-barber-services',
  templateUrl: './barber-services.component.html',
  styleUrls: ['./barber-services.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class BarberServicesComponent implements OnInit {
  @Input() services: Service[] = [];

  display: boolean = false;
  openModal: boolean = false;
  selectedService: Service = { image: '', title: '', time: 0, price: 0 };
  image: string = '';
  openEdit: boolean = false;

  msgs: Message[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';



  constructor(private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  addService(event: any) {
    if (this.openEdit) {
      const index = this.services.indexOf(this.selectedService);
      this.services.map((item, indx) => {
        console.log(index);
        if (index === indx) {
          this.services[index] = event;
        }
      });
      this.openEdit = false;
      console.log('if'+this.selectedService)
    } else {
      event['image'] = 'assets/images/new-haircut.webp';
      this.services.unshift(event);
      console.log('else' + this.selectedService);
    }
  }

  deleteService(listItem: Service) {
    console.log(listItem)
    const index = this.services.indexOf(listItem);
    this.services.splice(index, 1);
  }

  confirm(listItem: Service) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteService(listItem); 
        this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
      },
      reject: () => {
          this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
  });
}



  editService(event: any) {
    this.selectedService = event;
    this.openModal = true;
    this.openEdit = true;
  }

  showDialog() {
    this.display = true;
  }

  showModal(value: boolean) {
    this.openModal = value;
    this.selectedService = { image: '', title: '', time: 0, price: 0};
  }

  onPress() {
    this.display = !this.display;
  }

}