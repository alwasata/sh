import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from '../web/rest/company.controller';
import { CompanyRepository } from '../repository/company.repository';
import { CompanyService } from '../service/company.service';
import { UserModule } from './user.module';

@Module({
    imports: [TypeOrmModule.forFeature([CompanyRepository]), UserModule],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService],
})
export class CompanyModule {}
