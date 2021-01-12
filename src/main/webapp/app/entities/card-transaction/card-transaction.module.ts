import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SahatiSharedModule } from 'app/shared/shared.module';
import { CardTransactionComponent } from './card-transaction.component';
import { CardTransactionDetailComponent } from './card-transaction-detail.component';
import { CardTransactionUpdateComponent } from './card-transaction-update.component';
import { CardTransactionDeleteDialogComponent } from './card-transaction-delete-dialog.component';
import { cardTransactionRoute } from './card-transaction.route';

@NgModule({
  imports: [SahatiSharedModule, RouterModule.forChild(cardTransactionRoute)],
  declarations: [
    CardTransactionComponent,
    CardTransactionDetailComponent,
    CardTransactionUpdateComponent,
    CardTransactionDeleteDialogComponent
  ],
  entryComponents: [CardTransactionDeleteDialogComponent]
})
export class SahatiCardTransactionModule {}
