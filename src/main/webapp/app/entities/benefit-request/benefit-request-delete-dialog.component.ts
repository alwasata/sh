import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBenefitRequest } from 'app/shared/model/benefit-request.model';
import { BenefitRequestService } from './benefit-request.service';

@Component({
  templateUrl: './benefit-request-delete-dialog.component.html'
})
export class BenefitRequestDeleteDialogComponent {
  benefitRequest?: IBenefitRequest;

  constructor(
    protected benefitRequestService: BenefitRequestService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.benefitRequestService.delete(id).subscribe(() => {
      this.eventManager.broadcast('benefitRequestListModification');
      this.activeModal.close();
    });
  }
}
