import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SahatiTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { InvoiceBenefitsDeleteDialogComponent } from 'app/entities/invoice-benefits/invoice-benefits-delete-dialog.component';
import { InvoiceBenefitsService } from 'app/entities/invoice-benefits/invoice-benefits.service';

describe('Component Tests', () => {
  describe('InvoiceBenefits Management Delete Component', () => {
    let comp: InvoiceBenefitsDeleteDialogComponent;
    let fixture: ComponentFixture<InvoiceBenefitsDeleteDialogComponent>;
    let service: InvoiceBenefitsService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SahatiTestModule],
        declarations: [InvoiceBenefitsDeleteDialogComponent]
      })
        .overrideTemplate(InvoiceBenefitsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InvoiceBenefitsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InvoiceBenefitsService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
