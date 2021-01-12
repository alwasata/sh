import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BenefitRequestService } from 'app/entities/benefit-request/benefit-request.service';
import { IBenefitRequest, BenefitRequest } from 'app/shared/model/benefit-request.model';
import { BenefitStatus } from 'app/shared/model/enumerations/benefit-status.model';

describe('Service Tests', () => {
  describe('BenefitRequest Service', () => {
    let injector: TestBed;
    let service: BenefitRequestService;
    let httpMock: HttpTestingController;
    let elemDefault: IBenefitRequest;
    let expectedResult: IBenefitRequest | IBenefitRequest[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(BenefitRequestService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new BenefitRequest(0, 'AAAAAAA', 'AAAAAAA', 0, 0, BenefitStatus.PENDING, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a BenefitRequest', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new BenefitRequest()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a BenefitRequest', () => {
        const returnedFromService = Object.assign(
          {
            nameAr: 'BBBBBB',
            nameEn: 'BBBBBB',
            pointsCost: 1,
            cost: 1,
            benefitStatus: 'BBBBBB',
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

      it('should return a list of BenefitRequest', () => {
        const returnedFromService = Object.assign(
          {
            nameAr: 'BBBBBB',
            nameEn: 'BBBBBB',
            pointsCost: 1,
            cost: 1,
            benefitStatus: 'BBBBBB',
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

      it('should delete a BenefitRequest', () => {
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
