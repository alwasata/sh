import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth.module';
import { ormconfig } from './orm.config';
import { config } from './config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AttatchmentModule } from './module/attatchment.module';
import { EmployeeModule } from './module/employee.module';
import { CardModule } from './module/card.module';
import { CompanyModule } from './module/company.module';
import { HospitalModule } from './module/hospital.module';
import { CategoryModule } from './module/category.module';
import { BenefitModule } from './module/benefit.module';
import { BenefitRequestModule } from './module/benefit-request.module';
import { CardTransactionModule } from './module/card-transaction.module';
import { InvoiceModule } from './module/invoice.module';
import { InvoiceBenefitsModule } from './module/invoice-benefits.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
    imports: [
        TypeOrmModule.forRoot(ormconfig),
        ServeStaticModule.forRoot({
            rootPath: config.getClientPath(),
        }),
        AuthModule,
        AttatchmentModule,
        EmployeeModule,
        CardModule,
        CompanyModule,
        HospitalModule,
        CategoryModule,
        BenefitModule,
        BenefitRequestModule,
        CardTransactionModule,
        InvoiceModule,
        InvoiceBenefitsModule,
    // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
    ],
    controllers: [
    // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
    ],
    providers: [
    // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
    ],
})
export class AppModule {}
