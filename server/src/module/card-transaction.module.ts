import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardTransactionController } from '../web/rest/card-transaction.controller';
import { CardTransactionRepository } from '../repository/card-transaction.repository';
import { CardTransactionService } from '../service/card-transaction.service';

@Module({
    imports: [TypeOrmModule.forFeature([CardTransactionRepository])],
    controllers: [CardTransactionController],
    providers: [CardTransactionService],
    exports: [CardTransactionService],
})
export class CardTransactionModule {}
