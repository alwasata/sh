import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBenefitRequest } from 'app/shared/model/benefit-request.model';

type EntityResponseType = HttpResponse<IBenefitRequest>;
type EntityArrayResponseType = HttpResponse<IBenefitRequest[]>;

@Injectable({ providedIn: 'root' })
export class BenefitRequestService {
  public resourceUrl = SERVER_API_URL + 'api/benefit-requests';

  constructor(protected http: HttpClient) {}

  create(benefitRequest: IBenefitRequest): Observable<EntityResponseType> {
    return this.http.post<IBenefitRequest>(this.resourceUrl, benefitRequest, { observe: 'response' });
  }

  update(benefitRequest: IBenefitRequest): Observable<EntityResponseType> {
    return this.http.put<IBenefitRequest>(this.resourceUrl, benefitRequest, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBenefitRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBenefitRequest[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
