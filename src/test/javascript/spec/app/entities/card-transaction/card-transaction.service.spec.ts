import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CardTransactionService } from 'app/entities/card-transaction/card-transaction.service';
import { ICardTransaction, CardTransaction } from 'app/shared/model/card-transaction.model';
import { TransactionAction } from 'app/shared/model/enumerations/transaction-action.model';

describe('Service Tests', () => {
  describe('CardTransaction Service', () => {
    let injector: TestBed;
    let service: CardTransactionService;
    let httpMock: HttpTestingController;
    let elemDefault: ICardTransaction;
    let expectedResult: ICardTransaction | ICardTransaction[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CardTransactionService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new CardTransaction(0, 'AAAAAAA', 0, 0, TransactionAction.PLUS, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a CardTransaction', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CardTransaction()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CardTransaction', () => {
        const returnedFromService = Object.assign(
          {
            transactionNo: 'BBBBBB',
            amount: 1,
            pointsAmount: 1,
            action: 'BBBBBB',
            notes: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CardTransaction', () => {
        const returnedFromService = Object.assign(
          {
            transactionNo: 'BBBBBB',
            amount: 1,
            pointsAmount: 1,
            action: 'BBBBBB',
            notes: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a CardTransaction', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
