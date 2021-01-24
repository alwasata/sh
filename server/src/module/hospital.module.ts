import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalController } from '../web/rest/hospital.controller';
import { HospitalRepository } from '../repository/hospital.repository';
import { HospitalService } from '../service/hospital.service';
import { UserModule } from './user.module';

@Module({
    imports: [TypeOrmModule.forFeature([HospitalRepository]), UserModule],
    controllers: [HospitalController],
    providers: [HospitalService],
    exports: [HospitalService],
})
export class HospitalModule {}
