import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBenefitRequest, BenefitRequest } from 'app/shared/model/benefit-request.model';
import { BenefitRequestService } from './benefit-request.service';
import { BenefitRequestComponent } from './benefit-request.component';
import { BenefitRequestDetailComponent } from './benefit-request-detail.component';
import { BenefitRequestUpdateComponent } from './benefit-request-update.component';

@Injectable({ providedIn: 'root' })
export class BenefitRequestResolve implements Resolve<IBenefitRequest> {
  constructor(private service: BenefitRequestService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBenefitRequest> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((benefitRequest: HttpResponse<BenefitRequest>) => {
          if (benefitRequest.body) {
            return of(benefitRequest.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BenefitRequest());
  }
}

export const benefitRequestRoute: Routes = [
  {
    path: '',
    component: BenefitRequestComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'sahatiApp.benefitRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BenefitRequestDetailComponent,
    resolve: {
      benefitRequest: BenefitRequestResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sahatiApp.benefitRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BenefitRequestUpdateComponent,
    resolve: {
      benefitRequest: BenefitRequestResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sahatiApp.benefitRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BenefitRequestUpdateComponent,
    resolve: {
      benefitRequest: BenefitRequestResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sahatiApp.benefitRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
