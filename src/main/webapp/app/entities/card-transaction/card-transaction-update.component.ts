import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICardTransaction, CardTransaction } from 'app/shared/model/card-transaction.model';
import { CardTransactionService } from './card-transaction.service';
import { ICard } from 'app/shared/model/card.model';
import { CardService } from 'app/entities/card/card.service';

@Component({
  selector: 'jhi-card-transaction-update',
  templateUrl: './card-transaction-update.component.html'
})
export class CardTransactionUpdateComponent implements OnInit {
  isSaving = false;
  cards: ICard[] = [];

  editForm = this.fb.group({
    id: [],
    transactionNo: [],
    amount: [],
    pointsAmount: [],
    action: [],
    notes: [],
    cardId: []
  });

  constructor(
    protected cardTransactionService: CardTransactionService,
    protected cardService: CardService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cardTransaction }) => {
      this.updateForm(cardTransaction);

      this.cardService.query().subscribe((res: HttpResponse<ICard[]>) => (this.cards = res.body || []));
    });
  }

  updateForm(cardTransaction: ICardTransaction): void {
    this.editForm.patchValue({
      id: cardTransaction.id,
      transactionNo: cardTransaction.transactionNo,
      amount: cardTransaction.amount,
      pointsAmount: cardTransaction.pointsAmount,
      action: cardTransaction.action,
      notes: cardTransaction.notes,
      cardId: cardTransaction.cardId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cardTransaction = this.createFromForm();
    if (cardTransaction.id !== undefined) {
      this.subscribeToSaveResponse(this.cardTransactionService.update(cardTransaction));
    } else {
      this.subscribeToSaveResponse(this.cardTransactionService.create(cardTransaction));
    }
  }

  private createFromForm(): ICardTransaction {
    return {
      ...new CardTransaction(),
      id: this.editForm.get(['id'])!.value,
      transactionNo: this.editForm.get(['transactionNo'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      pointsAmount: this.editForm.get(['pointsAmount'])!.value,
      action: this.editForm.get(['action'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      cardId: this.editForm.get(['cardId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICardTransaction>>): void {
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

  trackById(index: number, item: ICard): any {
    return item.id;
  }
}
