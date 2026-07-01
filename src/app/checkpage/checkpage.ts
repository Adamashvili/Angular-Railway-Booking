import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StepRailwayApi } from '../services/step-railway-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkpage',
  imports: [FormsModule, CommonModule],
  templateUrl: './checkpage.html',
  styleUrl: './checkpage.css',
})
export class Checkpage {
  constructor(private service: StepRailwayApi) {}

  @ViewChild('invoiceArea') protected registerSmsArea!: ElementRef;
  @ViewChild('refundSmsh2') protected refundSmsh2!: ElementRef;

  customerEmail: string = '';
  customerTicketsList = signal<any[]>([]);
  currentInvoice: any;
  currentDate: Date = new Date();
  refundSms = signal<string>('');

  searchTickects() {
    this.service.allTickects().subscribe({
      next: (data: any) => {
        let customerTickets = data.filter(
          (item: any) => item.email == this.customerEmail,
        );
        this.customerTicketsList.set(customerTickets);
      },
      error: () => {},
    });
  }

  refund() {
    this.service.refundTicket(this.currentInvoice.id).subscribe({
      next: (data: any) => {
        this.refundSms.set(data);
        this.refundSmsh2.nativeElement.style.backgroundColor = 'darkgreen';
        this.refundSmsh2.nativeElement.classList.add('refundShow');
        setTimeout(() => {
          this.refundSms.set('');
          this.refundSmsh2.nativeElement.classList.remove('refundShow');
          this.registerSmsArea.nativeElement.classList.remove(
            'invoiceAreaShow',
          );
        }, 2000);
        this.searchTickects();
      },
      error: (err: any) => {
        this.refundSms.set('Ticket Not Found');
        this.refundSmsh2.nativeElement.style.backgroundColor = 'red';
        this.refundSmsh2.nativeElement.classList.add('refundShow');
      },
    });
  }
}
