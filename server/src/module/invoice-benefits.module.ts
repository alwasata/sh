import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceBenefitsController } from '../web/rest/invoice-benefits.controller';
import { InvoiceBenefitsRepository } from '../repository/invoice-benefits.repository';
import { InvoiceBenefitsService } from '../service/invoice-benefits.service';

@Module({
    imports: [TypeOrmModule.forFeature([InvoiceBenefitsRepository])],
    controllers: [InvoiceBenefitsController],
    providers: [InvoiceBenefitsService],
    exports: [InvoiceBenefitsService],
})
export class InvoiceBenefitsModule {}
