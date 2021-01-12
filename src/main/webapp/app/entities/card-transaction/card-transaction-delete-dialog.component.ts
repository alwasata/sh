import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICardTransaction } from 'app/shared/model/card-transaction.model';
import { CardTransactionService } from './card-transaction.service';

@Component({
  templateUrl: './card-transaction-delete-dialog.component.html'
})
export class CardTransactionDeleteDialogComponent {
  cardTransaction?: ICardTransaction;

  constructor(
    protected cardTransactionService: CardTransactionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cardTransactionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cardTransactionListModification');
      this.activeModal.close();
    });
  }
}
