import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttatchmentController } from '../web/rest/attatchment.controller';
import { AttatchmentRepository } from '../repository/attatchment.repository';
import { AttatchmentService } from '../service/attatchment.service';

@Module({
    imports: [TypeOrmModule.forFeature([AttatchmentRepository])],
    controllers: [AttatchmentController],
    providers: [AttatchmentService],
    exports: [AttatchmentService],
})
export class AttatchmentModule {}
