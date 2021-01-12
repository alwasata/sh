import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInvoiceBenefits } from 'app/shared/model/invoice-benefits.model';

@Component({
  selector: 'jhi-invoice-benefits-detail',
  templateUrl: './invoice-benefits-detail.component.html'
})
export class InvoiceBenefitsDetailComponent implements OnInit {
  invoiceBenefits: IInvoiceBenefits | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invoiceBenefits }) => (this.invoiceBenefits = invoiceBenefits));
  }

  previousState(): void {
    window.history.back();
  }
}
