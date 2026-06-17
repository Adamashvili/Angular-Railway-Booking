import { Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserve-details',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './reserve-details.html',
  styleUrl: './reserve-details.css',
})
export class ReserveDetails {
  constructor() {
   // console.log(this.resDetails);
    // console.log(this.passengers);
  }

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
  protected invoiceSeatPrice!: number
  protected invoiceTotal!: number


  addSeat() {
    this.peopleSeats.push({
      seatId: this.passengerSeatId,
      name: this.passengerFirstName.value,
      surname: this.passengerSurName.value,
      idNumber: this.passengerID.value,
      status: '0',
      payoutCompleted: false,
    });

   this.invoiceSeatsInfo.push( {
    num: this.invoiceSeatNum,
    price: this.invoiceSeatPrice,
   } )

   this.invoiceTotal = this.invoiceSeatsInfo.map( (item:any) => item.price ).reduce( (x: number, y:any) => x + y )
   console.log(this.invoiceTotal);
   
   
  }

  edit(i:number) {
    this.peopleSeats.splice(i, 1, {
      seatId: this.passengerSeatId,
      name: this.passengerFirstName.value,
      surname: this.passengerSurName.value,
      idNumber: this.passengerID.value,
      status: '0',
      payoutCompleted: false,
    })

    this.invoiceSeatsInfo.splice(i, 1, {
    num: this.invoiceSeatNum,
    price: this.invoiceSeatPrice,
   } )

   this.invoiceTotal = this.invoiceSeatsInfo.map( (item:any) => item.price ).reduce( (x: number, y:any) => x + y )
  }

  reserveTicket() {
    let info = {
      trainId: this.resDetails.id,
      date: sessionStorage.getItem("date"),
      email: this.ownerEmail.value,
      phoneNumber: this.ownerPhone.value,
      people: this.peopleSeats,
    };


    console.log(info);
    
  }
}
