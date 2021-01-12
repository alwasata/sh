import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CardDTO } from '../service/dto/card.dto';
import { CardMapper } from '../service/mapper/card.mapper';
import { CardRepository } from '../repository/card.repository';

const relationshipNames = [];
relationshipNames.push('employee');

@Injectable()
export class CardService {
    logger = new Logger('CardService');

    constructor(@InjectRepository(CardRepository) private cardRepository: CardRepository) {}

    async findById(id: string): Promise<CardDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.cardRepository.findOne(id, options);
        return CardMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<CardDTO>): Promise<CardDTO | undefined> {
        const result = await this.cardRepository.findOne(options);
        return CardMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<CardDTO>): Promise<[CardDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.cardRepository.findAndCount(options);
        const cardDTO: CardDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(card => cardDTO.push(CardMapper.fromEntityToDTO(card)));
            resultList[0] = cardDTO;
        }
        return resultList;
    }

    async save(cardDTO: CardDTO): Promise<CardDTO | undefined> {
        const entity = CardMapper.fromDTOtoEntity(cardDTO);
        const result = await this.cardRepository.save(entity);
        return CardMapper.fromEntityToDTO(result);
    }

    async update(cardDTO: CardDTO): Promise<CardDTO | undefined> {
        const entity = CardMapper.fromDTOtoEntity(cardDTO);
        const result = await this.cardRepository.save(entity);
        return CardMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.cardRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
