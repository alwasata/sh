import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { SahatiTestModule } from '../../../test.module';
import { InvoiceBenefitsComponent } from 'app/entities/invoice-benefits/invoice-benefits.component';
import { InvoiceBenefitsService } from 'app/entities/invoice-benefits/invoice-benefits.service';
import { InvoiceBenefits } from 'app/shared/model/invoice-benefits.model';

describe('Component Tests', () => {
  describe('InvoiceBenefits Management Component', () => {
    let comp: InvoiceBenefitsComponent;
    let fixture: ComponentFixture<InvoiceBenefitsComponent>;
    let service: InvoiceBenefitsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SahatiTestModule],
        declarations: [InvoiceBenefitsComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(InvoiceBenefitsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InvoiceBenefitsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InvoiceBenefitsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new InvoiceBenefits(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.invoiceBenefits && comp.invoiceBenefits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new InvoiceBenefits(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.invoiceBenefits && comp.invoiceBenefits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
