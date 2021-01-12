import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalController } from '../web/rest/hospital.controller';
import { HospitalRepository } from '../repository/hospital.repository';
import { HospitalService } from '../service/hospital.service';

@Module({
    imports: [TypeOrmModule.forFeature([HospitalRepository])],
    controllers: [HospitalController],
    providers: [HospitalService],
    exports: [HospitalService],
})
export class HospitalModule {}
