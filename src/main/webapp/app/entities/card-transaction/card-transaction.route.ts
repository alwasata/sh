import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICardTransaction, CardTransaction } from 'app/shared/model/card-transaction.model';
import { CardTransactionService } from './card-transaction.service';
import { CardTransactionComponent } from './card-transaction.component';
import { CardTransactionDetailComponent } from './card-transaction-detail.component';
import { CardTransactionUpdateComponent } from './card-transaction-update.component';

@Injectable({ providedIn: 'root' })
export class CardTransactionResolve implements Resolve<ICardTransaction> {
  constructor(private service: CardTransactionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICardTransaction> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cardTransaction: HttpResponse<CardTransaction>) => {
          if (cardTransaction.body) {
            return of(cardTransaction.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CardTransaction());
  }
}

export const cardTransactionRoute: Routes = [
  {
    path: '',
    component: CardTransactionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'sahatiApp.cardTransaction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CardTransactionDetailComponent,
    resolve: {
      cardTransaction: CardTransactionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sahatiApp.cardTransaction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CardTransactionUpdateComponent,
    resolve: {
      cardTransaction: CardTransactionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sahatiApp.cardTransaction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CardTransactionUpdateComponent,
    resolve: {
      cardTransaction: CardTransactionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sahatiApp.cardTransaction.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
