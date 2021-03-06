import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BenefitRequestController } from '../web/rest/benefit-request.controller';
import { BenefitRequestRepository } from '../repository/benefit-request.repository';
import { BenefitRequestService } from '../service/benefit-request.service';
import { HospitalModule } from './hospital.module';

@Module({
    imports: [TypeOrmModule.forFeature([BenefitRequestRepository]),HospitalModule],
    controllers: [BenefitRequestController],
    providers: [BenefitRequestService],
    exports: [BenefitRequestService],
})
export class BenefitRequestModule {}
