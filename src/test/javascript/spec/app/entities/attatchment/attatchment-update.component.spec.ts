import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SahatiTestModule } from '../../../test.module';
import { AttatchmentUpdateComponent } from 'app/entities/attatchment/attatchment-update.component';
import { AttatchmentService } from 'app/entities/attatchment/attatchment.service';
import { Attatchment } from 'app/shared/model/attatchment.model';

describe('Component Tests', () => {
  describe('Attatchment Management Update Component', () => {
    let comp: AttatchmentUpdateComponent;
    let fixture: ComponentFixture<AttatchmentUpdateComponent>;
    let service: AttatchmentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SahatiTestModule],
        declarations: [AttatchmentUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AttatchmentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AttatchmentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AttatchmentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Attatchment(123);
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
        const entity = new Attatchment();
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
