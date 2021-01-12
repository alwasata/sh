import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SahatiTestModule } from '../../../test.module';
import { BenefitRequestDetailComponent } from 'app/entities/benefit-request/benefit-request-detail.component';
import { BenefitRequest } from 'app/shared/model/benefit-request.model';

describe('Component Tests', () => {
  describe('BenefitRequest Management Detail Component', () => {
    let comp: BenefitRequestDetailComponent;
    let fixture: ComponentFixture<BenefitRequestDetailComponent>;
    const route = ({ data: of({ benefitRequest: new BenefitRequest(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SahatiTestModule],
        declarations: [BenefitRequestDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BenefitRequestDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BenefitRequestDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load benefitRequest on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.benefitRequest).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
