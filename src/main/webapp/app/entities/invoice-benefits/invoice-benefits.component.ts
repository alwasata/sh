import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInvoiceBenefits } from 'app/shared/model/invoice-benefits.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { InvoiceBenefitsService } from './invoice-benefits.service';
import { InvoiceBenefitsDeleteDialogComponent } from './invoice-benefits-delete-dialog.component';

@Component({
  selector: 'jhi-invoice-benefits',
  templateUrl: './invoice-benefits.component.html'
})
export class InvoiceBenefitsComponent implements OnInit, OnDestroy {
  invoiceBenefits?: IInvoiceBenefits[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected invoiceBenefitsService: InvoiceBenefitsService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.invoiceBenefitsService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IInvoiceBenefits[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInInvoiceBenefits();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInvoiceBenefits): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInvoiceBenefits(): void {
    this.eventSubscriber = this.eventManager.subscribe('invoiceBenefitsListModification', () => this.loadPage());
  }

  delete(invoiceBenefits: IInvoiceBenefits): void {
    const modalRef = this.modalService.open(InvoiceBenefitsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.invoiceBenefits = invoiceBenefits;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IInvoiceBenefits[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/invoice-benefits'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.invoiceBenefits = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
