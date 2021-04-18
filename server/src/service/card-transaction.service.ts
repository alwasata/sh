import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CardTransactionDTO } from '../service/dto/card-transaction.dto';
import { CardTransactionMapper } from '../service/mapper/card-transaction.mapper';
import { CardTransactionRepository } from '../repository/card-transaction.repository';

const relationshipNames = [];
relationshipNames.push('card');

@Injectable()
export class CardTransactionService {
    logger = new Logger('CardTransactionService');

    constructor(@InjectRepository(CardTransactionRepository) private cardTransactionRepository: CardTransactionRepository) {}

    async findById(id: string): Promise<CardTransactionDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.cardTransactionRepository.findOne(id, options);
        return CardTransactionMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<CardTransactionDTO>): Promise<CardTransactionDTO | undefined> {
        const result = await this.cardTransactionRepository.findOne(options);
        return CardTransactionMapper.fromEntityToDTO(result);
    }

    async findAndCount(id: string,options: FindManyOptions<CardTransactionDTO>): Promise<[CardTransactionDTO[], number]> {
        options.relations = relationshipNames;
        const resultList  = await this.cardTransactionRepository.createQueryBuilder('cardTransaction')
      .innerJoinAndSelect('cardTransaction.card', 'card')
      .innerJoinAndSelect('cardTransaction.createdBy', 'createdBy')
      .where('card.id = :id', { id: id })
      .getManyAndCount();
        const cardTransactionDTO: CardTransactionDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(cardTransaction => cardTransactionDTO.push(CardTransactionMapper.fromEntityToDTO(cardTransaction)));
            resultList[0] = cardTransactionDTO;
        }
        return resultList;
    }

    async save(cardTransactionDTO: CardTransactionDTO): Promise<CardTransactionDTO | undefined> {
        const entity = CardTransactionMapper.fromDTOtoEntity(cardTransactionDTO);
        const result = await this.cardTransactionRepository.save(entity);
        return CardTransactionMapper.fromEntityToDTO(result);
    }

    async update(cardTransactionDTO: CardTransactionDTO): Promise<CardTransactionDTO | undefined> {
        const entity = CardTransactionMapper.fromDTOtoEntity(cardTransactionDTO);
        const result = await this.cardTransactionRepository.save(entity);
        return CardTransactionMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.cardTransactionRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }

    async findByCardNo(card_no : string): Promise<CardTransactionDTO[] | any>  {

        var resultList = await this.cardTransactionRepository.createQueryBuilder('card_transaction')
        .innerJoinAndSelect('card_transaction.card', 'card')
        .innerJoinAndSelect('card.employee', 'employee')
        .innerJoinAndSelect('employee.company', 'company')
        .where('card.card_no = :id', { id: card_no })
        .getManyAndCount();
      return resultList;
    }
}
