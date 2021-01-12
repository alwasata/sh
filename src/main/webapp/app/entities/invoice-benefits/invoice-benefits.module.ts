import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SahatiSharedModule } from 'app/shared/shared.module';
import { InvoiceBenefitsComponent } from './invoice-benefits.component';
import { InvoiceBenefitsDetailComponent } from './invoice-benefits-detail.component';
import { InvoiceBenefitsUpdateComponent } from './invoice-benefits-update.component';
import { InvoiceBenefitsDeleteDialogComponent } from './invoice-benefits-delete-dialog.component';
import { invoiceBenefitsRoute } from './invoice-benefits.route';

@NgModule({
  imports: [SahatiSharedModule, RouterModule.forChild(invoiceBenefitsRoute)],
  declarations: [
    InvoiceBenefitsComponent,
    InvoiceBenefitsDetailComponent,
    InvoiceBenefitsUpdateComponent,
    InvoiceBenefitsDeleteDialogComponent
  ],
  entryComponents: [InvoiceBenefitsDeleteDialogComponent]
})
export class SahatiInvoiceBenefitsModule {}
