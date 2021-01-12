import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAttatchment } from 'app/shared/model/attatchment.model';
import { AttatchmentService } from './attatchment.service';

@Component({
  templateUrl: './attatchment-delete-dialog.component.html'
})
export class AttatchmentDeleteDialogComponent {
  attatchment?: IAttatchment;

  constructor(
    protected attatchmentService: AttatchmentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.attatchmentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('attatchmentListModification');
      this.activeModal.close();
    });
  }
}
