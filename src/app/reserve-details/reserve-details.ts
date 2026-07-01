import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepRailwayApi } from '../services/step-railway-api';

@Component({
  selector: 'app-reserve-details',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './reserve-details.html',
  styleUrl: './reserve-details.css',
})
export class ReserveDetails {
  constructor(private service: StepRailwayApi) {}
  @ViewChild('registerSmsArea') protected registerSmsArea!: ElementRef;

  protected resDetails: any = JSON.parse(sessionStorage.getItem('resDetails')!);
  protected passengers: any = +sessionStorage.getItem('passenger')!;

  protected vagon!: number;
  protected occupiedSeat: string = '';
  protected isPopupShown: boolean = false;

  protected peopleSeats: any[] = [];
  protected passengerFirstName: FormControl = new FormControl('');
  protected ownerEmail: FormControl = new FormControl('');
  protected ownerPhone: FormControl = new FormControl('');
  protected passengerSurName: FormControl = new FormControl('');
  protected passengerID: FormControl = new FormControl('');
  protected passengerSeatId: string = '';

  protected invoiceSeatsInfo: any[] = [];
  protected invoiceSeatNum!: string;
  protected invoiceSeatPrice!: number;
  protected invoiceTotal!: number;
  protected registerSMS = signal<string>('');

  addSeat() {
    this.peopleSeats.push({
      seatId: this.passengerSeatId,
      name: this.passengerFirstName.value,
      surname: this.passengerSurName.value,
      idNumber: this.passengerID.value,
      status: '0',
      payoutCompleted: true,
    });

    this.invoiceSeatsInfo.push({
      num: this.invoiceSeatNum,
      price: this.invoiceSeatPrice,
    });

    this.invoiceTotal = this.invoiceSeatsInfo
      .map((item: any) => item.price)
      .reduce((x: number, y: any) => x + y);
  }

  edit(i: number) {
    this.peopleSeats.splice(i, 1, {
      seatId: this.passengerSeatId,
      name: this.passengerFirstName.value,
      surname: this.passengerSurName.value,
      idNumber: this.passengerID.value,
      status: '0',
      payoutCompleted: true,
    });

    this.invoiceSeatsInfo.splice(i, 1, {
      num: this.invoiceSeatNum,
      price: this.invoiceSeatPrice,
    });

    this.invoiceTotal = this.invoiceSeatsInfo
      .map((item: any) => item.price)
      .reduce((x: number, y: any) => x + y);
  }

  reserveTicket() {
    let info = {
      trainId: this.resDetails.id,
      date: sessionStorage.getItem('date'),
      email: this.ownerEmail.value,
      phoneNumber: this.ownerPhone.value,
      people: this.peopleSeats,
    };

    this.service.registerTickects(info).subscribe({
      next: (data: any) => {
        this.registerSMS.set(data);

        this.registerSmsArea.nativeElement.classList.add('registerSmsAreaShow');
      },
      error: (err: any) => {
        this.registerSMS.set(err.error);
        this.registerSmsArea.nativeElement.classList.add('registerSmsAreaShow');
      },
    });
  }
}
