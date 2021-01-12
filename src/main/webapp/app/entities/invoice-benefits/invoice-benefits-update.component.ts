import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInvoiceBenefits, InvoiceBenefits } from 'app/shared/model/invoice-benefits.model';
import { InvoiceBenefitsService } from './invoice-benefits.service';
import { IBenefit } from 'app/shared/model/benefit.model';
import { BenefitService } from 'app/entities/benefit/benefit.service';
import { IInvoice } from 'app/shared/model/invoice.model';
import { InvoiceService } from 'app/entities/invoice/invoice.service';

type SelectableEntity = IBenefit | IInvoice;

@Component({
  selector: 'jhi-invoice-benefits-update',
  templateUrl: './invoice-benefits-update.component.html'
})
export class InvoiceBenefitsUpdateComponent implements OnInit {
  isSaving = false;
  benefits: IBenefit[] = [];
  invoices: IInvoice[] = [];

  editForm = this.fb.group({
    id: [],
    pointsCost: [],
    cost: [],
    quantity: [],
    total: [],
    benefitId: [],
    invoiceId: []
  });

  constructor(
    protected invoiceBenefitsService: InvoiceBenefitsService,
    protected benefitService: BenefitService,
    protected invoiceService: InvoiceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invoiceBenefits }) => {
      this.updateForm(invoiceBenefits);

      this.benefitService.query().subscribe((res: HttpResponse<IBenefit[]>) => (this.benefits = res.body || []));

      this.invoiceService.query().subscribe((res: HttpResponse<IInvoice[]>) => (this.invoices = res.body || []));
    });
  }

  updateForm(invoiceBenefits: IInvoiceBenefits): void {
    this.editForm.patchValue({
      id: invoiceBenefits.id,
      pointsCost: invoiceBenefits.pointsCost,
      cost: invoiceBenefits.cost,
      quantity: invoiceBenefits.quantity,
      total: invoiceBenefits.total,
      benefitId: invoiceBenefits.benefitId,
      invoiceId: invoiceBenefits.invoiceId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const invoiceBenefits = this.createFromForm();
    if (invoiceBenefits.id !== undefined) {
      this.subscribeToSaveResponse(this.invoiceBenefitsService.update(invoiceBenefits));
    } else {
      this.subscribeToSaveResponse(this.invoiceBenefitsService.create(invoiceBenefits));
    }
  }

  private createFromForm(): IInvoiceBenefits {
    return {
      ...new InvoiceBenefits(),
      id: this.editForm.get(['id'])!.value,
      pointsCost: this.editForm.get(['pointsCost'])!.value,
      cost: this.editForm.get(['cost'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      total: this.editForm.get(['total'])!.value,
      benefitId: this.editForm.get(['benefitId'])!.value,
      invoiceId: this.editForm.get(['invoiceId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvoiceBenefits>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
