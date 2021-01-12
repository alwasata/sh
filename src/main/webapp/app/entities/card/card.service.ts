import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICard } from 'app/shared/model/card.model';

type EntityResponseType = HttpResponse<ICard>;
type EntityArrayResponseType = HttpResponse<ICard[]>;

@Injectable({ providedIn: 'root' })
export class CardService {
  public resourceUrl = SERVER_API_URL + 'api/cards';

  constructor(protected http: HttpClient) {}

  create(card: ICard): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(card);
    return this.http
      .post<ICard>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(card: ICard): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(card);
    return this.http
      .put<ICard>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICard>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICard[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(card: ICard): ICard {
    const copy: ICard = Object.assign({}, card, {
      expiryDate: card.expiryDate && card.expiryDate.isValid() ? card.expiryDate.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.expiryDate = res.body.expiryDate ? moment(res.body.expiryDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((card: ICard) => {
        card.expiryDate = card.expiryDate ? moment(card.expiryDate) : undefined;
      });
    }
    return res;
  }
}
