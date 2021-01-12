import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SahatiSharedModule } from 'app/shared/shared.module';
import { BenefitRequestComponent } from './benefit-request.component';
import { BenefitRequestDetailComponent } from './benefit-request-detail.component';
import { BenefitRequestUpdateComponent } from './benefit-request-update.component';
import { BenefitRequestDeleteDialogComponent } from './benefit-request-delete-dialog.component';
import { benefitRequestRoute } from './benefit-request.route';

@NgModule({
  imports: [SahatiSharedModule, RouterModule.forChild(benefitRequestRoute)],
  declarations: [
    BenefitRequestComponent,
    BenefitRequestDetailComponent,
    BenefitRequestUpdateComponent,
    BenefitRequestDeleteDialogComponent
  ],
  entryComponents: [BenefitRequestDeleteDialogComponent]
})
export class SahatiBenefitRequestModule {}
