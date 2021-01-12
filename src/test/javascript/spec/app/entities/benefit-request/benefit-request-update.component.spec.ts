import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SahatiTestModule } from '../../../test.module';
import { BenefitRequestUpdateComponent } from 'app/entities/benefit-request/benefit-request-update.component';
import { BenefitRequestService } from 'app/entities/benefit-request/benefit-request.service';
import { BenefitRequest } from 'app/shared/model/benefit-request.model';

describe('Component Tests', () => {
  describe('BenefitRequest Management Update Component', () => {
    let comp: BenefitRequestUpdateComponent;
    let fixture: ComponentFixture<BenefitRequestUpdateComponent>;
    let service: BenefitRequestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SahatiTestModule],
        declarations: [BenefitRequestUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BenefitRequestUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BenefitRequestUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BenefitRequestService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BenefitRequest(123);
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
        const entity = new BenefitRequest();
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
