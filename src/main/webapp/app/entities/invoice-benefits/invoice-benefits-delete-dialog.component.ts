import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInvoiceBenefits } from 'app/shared/model/invoice-benefits.model';
import { InvoiceBenefitsService } from './invoice-benefits.service';

@Component({
  templateUrl: './invoice-benefits-delete-dialog.component.html'
})
export class InvoiceBenefitsDeleteDialogComponent {
  invoiceBenefits?: IInvoiceBenefits;

  constructor(
    protected invoiceBenefitsService: InvoiceBenefitsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.invoiceBenefitsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('invoiceBenefitsListModification');
      this.activeModal.close();
    });
  }
}
