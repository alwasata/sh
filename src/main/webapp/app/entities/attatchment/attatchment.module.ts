import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SahatiSharedModule } from 'app/shared/shared.module';
import { AttatchmentComponent } from './attatchment.component';
import { AttatchmentDetailComponent } from './attatchment-detail.component';
import { AttatchmentUpdateComponent } from './attatchment-update.component';
import { AttatchmentDeleteDialogComponent } from './attatchment-delete-dialog.component';
import { attatchmentRoute } from './attatchment.route';

@NgModule({
  imports: [SahatiSharedModule, RouterModule.forChild(attatchmentRoute)],
  declarations: [AttatchmentComponent, AttatchmentDetailComponent, AttatchmentUpdateComponent, AttatchmentDeleteDialogComponent],
  entryComponents: [AttatchmentDeleteDialogComponent]
})
export class SahatiAttatchmentModule {}
