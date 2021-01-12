import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAttatchment, Attatchment } from 'app/shared/model/attatchment.model';
import { AttatchmentService } from './attatchment.service';
import { AttatchmentComponent } from './attatchment.component';
import { AttatchmentDetailComponent } from './attatchment-detail.component';
import { AttatchmentUpdateComponent } from './attatchment-update.component';

@Injectable({ providedIn: 'root' })
export class AttatchmentResolve implements Resolve<IAttatchment> {
  constructor(private service: AttatchmentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAttatchment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((attatchment: HttpResponse<Attatchment>) => {
          if (attatchment.body) {
            return of(attatchment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Attatchment());
  }
}

export const attatchmentRoute: Routes = [
  {
    path: '',
    component: AttatchmentComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'sahatiApp.attatchment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AttatchmentDetailComponent,
    resolve: {
      attatchment: AttatchmentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sahatiApp.attatchment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AttatchmentUpdateComponent,
    resolve: {
      attatchment: AttatchmentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sahatiApp.attatchment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AttatchmentUpdateComponent,
    resolve: {
      attatchment: AttatchmentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sahatiApp.attatchment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
