import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SahatiTestModule } from '../../../test.module';
import { CardTransactionUpdateComponent } from 'app/entities/card-transaction/card-transaction-update.component';
import { CardTransactionService } from 'app/entities/card-transaction/card-transaction.service';
import { CardTransaction } from 'app/shared/model/card-transaction.model';

describe('Component Tests', () => {
  describe('CardTransaction Management Update Component', () => {
    let comp: CardTransactionUpdateComponent;
    let fixture: ComponentFixture<CardTransactionUpdateComponent>;
    let service: CardTransactionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SahatiTestModule],
        declarations: [CardTransactionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CardTransactionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CardTransactionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CardTransactionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CardTransaction(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new CardTransaction();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
