import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'attatchment',
        loadChildren: () => import('./attatchment/attatchment.module').then(m => m.SahatiAttatchmentModule)
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.SahatiEmployeeModule)
      },
      {
        path: 'card',
        loadChildren: () => import('./card/card.module').then(m => m.SahatiCardModule)
      },
      {
        path: 'company',
        loadChildren: () => import('./company/company.module').then(m => m.SahatiCompanyModule)
      },
      {
        path: 'hospital',
        loadChildren: () => import('./hospital/hospital.module').then(m => m.SahatiHospitalModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.SahatiCategoryModule)
      },
      {
        path: 'benefit',
        loadChildren: () => import('./benefit/benefit.module').then(m => m.SahatiBenefitModule)
      },
      {
        path: 'benefit-request',
        loadChildren: () => import('./benefit-request/benefit-request.module').then(m => m.SahatiBenefitRequestModule)
      },
      {
        path: 'card-transaction',
        loadChildren: () => import('./card-transaction/card-transaction.module').then(m => m.SahatiCardTransactionModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then(m => m.SahatiInvoiceModule)
      },
      {
        path: 'invoice-benefits',
        loadChildren: () => import('./invoice-benefits/invoice-benefits.module').then(m => m.SahatiInvoiceBenefitsModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SahatiEntityModule {}
