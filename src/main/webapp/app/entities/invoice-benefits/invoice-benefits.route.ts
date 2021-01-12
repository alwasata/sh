import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInvoiceBenefits, InvoiceBenefits } from 'app/shared/model/invoice-benefits.model';
import { InvoiceBenefitsService } from './invoice-benefits.service';
import { InvoiceBenefitsComponent } from './invoice-benefits.component';
import { InvoiceBenefitsDetailComponent } from './invoice-benefits-detail.component';
import { InvoiceBenefitsUpdateComponent } from './invoice-benefits-update.component';

@Injectable({ providedIn: 'root' })
export class InvoiceBenefitsResolve implements Resolve<IInvoiceBenefits> {
  constructor(private service: InvoiceBenefitsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInvoiceBenefits> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((invoiceBenefits: HttpResponse<InvoiceBenefits>) => {
          if (invoiceBenefits.body) {
            return of(invoiceBenefits.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InvoiceBenefits());
  }
}

export const invoiceBenefitsRoute: Routes = [
  {
    path: '',
    component: InvoiceBenefitsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'sahatiApp.invoiceBenefits.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: InvoiceBenefitsDetailComponent,
    resolve: {
      invoiceBenefits: InvoiceBenefitsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sahatiApp.invoiceBenefits.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: InvoiceBenefitsUpdateComponent,
    resolve: {
      invoiceBenefits: InvoiceBenefitsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sahatiApp.invoiceBenefits.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: InvoiceBenefitsUpdateComponent,
    resolve: {
      invoiceBenefits: InvoiceBenefitsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sahatiApp.invoiceBenefits.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
