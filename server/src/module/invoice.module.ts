import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceController } from '../web/rest/invoice.controller';
import { InvoiceRepository } from '../repository/invoice.repository';
import { InvoiceService } from '../service/invoice.service';
import { BenefitRequestModule } from './benefit-request.module';
import { CardTransactionModule } from './card-transaction.module';
import { HospitalModule } from './hospital.module';
import { BenefitModule } from './benefit.module';
import { InvoiceBenefitsModule } from './invoice-benefits.module';
import { SettingModule } from './setting.module';
import { CardModule } from './card.module';

@Module({
    imports: [TypeOrmModule.forFeature([InvoiceRepository]), SettingModule,CardModule , InvoiceBenefitsModule, BenefitModule, CardTransactionModule, BenefitRequestModule, HospitalModule],
    controllers: [InvoiceController],
    providers: [InvoiceService],
    exports: [InvoiceService],
})
export class InvoiceModule {}
