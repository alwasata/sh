import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SahatiTestModule } from '../../../test.module';
import { InvoiceBenefitsDetailComponent } from 'app/entities/invoice-benefits/invoice-benefits-detail.component';
import { InvoiceBenefits } from 'app/shared/model/invoice-benefits.model';

describe('Component Tests', () => {
  describe('InvoiceBenefits Management Detail Component', () => {
    let comp: InvoiceBenefitsDetailComponent;
    let fixture: ComponentFixture<InvoiceBenefitsDetailComponent>;
    const route = ({ data: of({ invoiceBenefits: new InvoiceBenefits(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SahatiTestModule],
        declarations: [InvoiceBenefitsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(InvoiceBenefitsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InvoiceBenefitsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load invoiceBenefits on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.invoiceBenefits).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
