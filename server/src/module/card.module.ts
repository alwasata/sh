import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from '../web/rest/card.controller';
import { CardRepository } from '../repository/card.repository';
import { CardService } from '../service/card.service';
import { CardTransactionModule } from './card-transaction.module';
import { SettingModule } from './setting.module';
import { CompanyModule } from './company.module';

@Module({
    imports: [TypeOrmModule.forFeature([CardRepository]), CardTransactionModule, SettingModule,CompanyModule],
    controllers: [CardController],
    providers: [CardService],
    exports: [CardService],
})
export class CardModule {}
