import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInvoiceBenefits } from 'app/shared/model/invoice-benefits.model';

type EntityResponseType = HttpResponse<IInvoiceBenefits>;
type EntityArrayResponseType = HttpResponse<IInvoiceBenefits[]>;

@Injectable({ providedIn: 'root' })
export class InvoiceBenefitsService {
  public resourceUrl = SERVER_API_URL + 'api/invoice-benefits';

  constructor(protected http: HttpClient) {}

  create(invoiceBenefits: IInvoiceBenefits): Observable<EntityResponseType> {
    return this.http.post<IInvoiceBenefits>(this.resourceUrl, invoiceBenefits, { observe: 'response' });
  }

  update(invoiceBenefits: IInvoiceBenefits): Observable<EntityResponseType> {
    return this.http.put<IInvoiceBenefits>(this.resourceUrl, invoiceBenefits, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInvoiceBenefits>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInvoiceBenefits[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
