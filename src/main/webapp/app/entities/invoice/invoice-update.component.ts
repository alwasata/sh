import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IInvoice, Invoice } from 'app/shared/model/invoice.model';
import { InvoiceService } from './invoice.service';
import { ICardTransaction } from 'app/shared/model/card-transaction.model';
import { CardTransactionService } from 'app/entities/card-transaction/card-transaction.service';

@Component({
  selector: 'jhi-invoice-update',
  templateUrl: './invoice-update.component.html'
})
export class InvoiceUpdateComponent implements OnInit {
  isSaving = false;
  cardtransactions: ICardTransaction[] = [];
  invoiceDateDp: any;
  payDateDp: any;

  editForm = this.fb.group({
    id: [],
    invoiceNo: [],
    invoiceDate: [],
    payDate: [],
    total: [],
    invoiceStatus: [],
    notes: [],
    cardTransactionId: []
  });

  constructor(
    protected invoiceService: InvoiceService,
    protected cardTransactionService: CardTransactionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invoice }) => {
      this.updateForm(invoice);

      this.cardTransactionService
        .query({ 'invoiceId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<ICardTransaction[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICardTransaction[]) => {
          if (!invoice.cardTransactionId) {
            this.cardtransactions = resBody;
          } else {
            this.cardTransactionService
              .find(invoice.cardTransactionId)
              .pipe(
                map((subRes: HttpResponse<ICardTransaction>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICardTransaction[]) => (this.cardtransactions = concatRes));
          }
        });
    });
  }

  updateForm(invoice: IInvoice): void {
    this.editForm.patchValue({
      id: invoice.id,
      invoiceNo: invoice.invoiceNo,
      invoiceDate: invoice.invoiceDate,
      payDate: invoice.payDate,
      total: invoice.total,
      invoiceStatus: invoice.invoiceStatus,
      notes: invoice.notes,
      cardTransactionId: invoice.cardTransactionId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const invoice = this.createFromForm();
    if (invoice.id !== undefined) {
      this.subscribeToSaveResponse(this.invoiceService.update(invoice));
    } else {
      this.subscribeToSaveResponse(this.invoiceService.create(invoice));
    }
  }

  private createFromForm(): IInvoice {
    return {
      ...new Invoice(),
      id: this.editForm.get(['id'])!.value,
      invoiceNo: this.editForm.get(['invoiceNo'])!.value,
      invoiceDate: this.editForm.get(['invoiceDate'])!.value,
      payDate: this.editForm.get(['payDate'])!.value,
      total: this.editForm.get(['total'])!.value,
      invoiceStatus: this.editForm.get(['invoiceStatus'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      cardTransactionId: this.editForm.get(['cardTransactionId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvoice>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICardTransaction): any {
    return item.id;
  }
}
