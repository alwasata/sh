import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from '../web/rest/employee.controller';
import { EmployeeRepository } from '../repository/employee.repository';
import { EmployeeService } from '../service/employee.service';
import { CompanyModule } from './company.module';
@Module({
    imports: [TypeOrmModule.forFeature([EmployeeRepository]), CompanyModule],
    controllers: [EmployeeController],
    providers: [EmployeeService],
    exports: [EmployeeService],
})
export class EmployeeModule {}
