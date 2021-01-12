import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICardTransaction } from 'app/shared/model/card-transaction.model';

type EntityResponseType = HttpResponse<ICardTransaction>;
type EntityArrayResponseType = HttpResponse<ICardTransaction[]>;

@Injectable({ providedIn: 'root' })
export class CardTransactionService {
  public resourceUrl = SERVER_API_URL + 'api/card-transactions';

  constructor(protected http: HttpClient) {}

  create(cardTransaction: ICardTransaction): Observable<EntityResponseType> {
    return this.http.post<ICardTransaction>(this.resourceUrl, cardTransaction, { observe: 'response' });
  }

  update(cardTransaction: ICardTransaction): Observable<EntityResponseType> {
    return this.http.put<ICardTransaction>(this.resourceUrl, cardTransaction, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICardTransaction>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardTransaction[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
