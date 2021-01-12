import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SahatiTestModule } from '../../../test.module';
import { CardTransactionDetailComponent } from 'app/entities/card-transaction/card-transaction-detail.component';
import { CardTransaction } from 'app/shared/model/card-transaction.model';

describe('Component Tests', () => {
  describe('CardTransaction Management Detail Component', () => {
    let comp: CardTransactionDetailComponent;
    let fixture: ComponentFixture<CardTransactionDetailComponent>;
    const route = ({ data: of({ cardTransaction: new CardTransaction(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SahatiTestModule],
        declarations: [CardTransactionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CardTransactionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CardTransactionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cardTransaction on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cardTransaction).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
