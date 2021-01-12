import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICardTransaction } from 'app/shared/model/card-transaction.model';

@Component({
  selector: 'jhi-card-transaction-detail',
  templateUrl: './card-transaction-detail.component.html'
})
export class CardTransactionDetailComponent implements OnInit {
  cardTransaction: ICardTransaction | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cardTransaction }) => (this.cardTransaction = cardTransaction));
  }

  previousState(): void {
    window.history.back();
  }
}
