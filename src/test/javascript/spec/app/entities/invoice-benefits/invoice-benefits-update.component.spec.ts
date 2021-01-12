import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SahatiTestModule } from '../../../test.module';
import { InvoiceBenefitsUpdateComponent } from 'app/entities/invoice-benefits/invoice-benefits-update.component';
import { InvoiceBenefitsService } from 'app/entities/invoice-benefits/invoice-benefits.service';
import { InvoiceBenefits } from 'app/shared/model/invoice-benefits.model';

describe('Component Tests', () => {
  describe('InvoiceBenefits Management Update Component', () => {
    let comp: InvoiceBenefitsUpdateComponent;
    let fixture: ComponentFixture<InvoiceBenefitsUpdateComponent>;
    let service: InvoiceBenefitsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SahatiTestModule],
        declarations: [InvoiceBenefitsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(InvoiceBenefitsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InvoiceBenefitsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InvoiceBenefitsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new InvoiceBenefits(123);
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
        const entity = new InvoiceBenefits();
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
