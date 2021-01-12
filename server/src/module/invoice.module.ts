import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceController } from '../web/rest/invoice.controller';
import { InvoiceRepository } from '../repository/invoice.repository';
import { InvoiceService } from '../service/invoice.service';

@Module({
    imports: [TypeOrmModule.forFeature([InvoiceRepository])],
    controllers: [InvoiceController],
    providers: [InvoiceService],
    exports: [InvoiceService],
})
export class InvoiceModule {}
