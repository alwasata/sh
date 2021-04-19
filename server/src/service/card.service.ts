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

  async findAndCount(search : string, company_id :string,options: FindManyOptions<CardDTO>): Promise<CardDTO[] | any> {
    search = search == "false" ? "" : search;
    options.relations = relationshipNames;
    var resultList = [][0];
    
    if(company_id == "all") {
      resultList = await this.cardRepository.createQueryBuilder('card')
      .innerJoinAndSelect('card.employee', 'employee')
      .innerJoinAndSelect('employee.company', 'company')
      .innerJoinAndSelect('card.createdBy', 'createdBy')
      .leftJoinAndSelect('card.lastModifiedBy', 'lastModifiedBy')
      .where('card.createdDate like :createdDate', { createdDate: '%' + search + '%' })
      .orWhere('card.lastModifiedDate like :lastModifiedDate', { lastModifiedDate: '%' + search + '%' })
      .orWhere('card.isActive like :isActive', { isActive: '%' + search + '%' })
      .orWhere('card.cardNo like :cardNo', { cardNo: '%' + search + '%' })
      .orWhere('card.expiryDate like :expiryDate', { expiryDate: '%' + search + '%' })
      .orWhere('createdBy.login like :login', { login: '%' + search + '%' })
      .orWhere('lastModifiedBy.login like :login', { login: '%' + search + '%' })
      .orWhere('employee.name like :name', { name: '%' + search + '%' })
      .orWhere('employee.phone like :phone', { phone: '%' + search + '%' })
      .orWhere('company.email like :email', { email: '%' + search + '%' })
      .orWhere('company.nameAr like :nameAr', { nameAr: '%' + search + '%' })
      .orWhere('company.nameEn like :nameEn', { nameEn: '%' + search + '%' })
      .getManyAndCount();
    } else {
      resultList = await this.cardRepository.createQueryBuilder('card')
      .innerJoinAndSelect('card.employee', 'employee')
      .innerJoinAndSelect('employee.company', 'company')
      .innerJoinAndSelect('card.createdBy', 'createdBy')
      .leftJoinAndSelect('card.lastModifiedBy', 'lastModifiedBy')
      .where('employee.company.id = :id', { id: company_id })
      .where('card.createdDate like :createdDate', { createdDate: '%' + search + '%' })
      .orWhere('card.lastModifiedDate like :lastModifiedDate', { lastModifiedDate: '%' + search + '%' })
      .orWhere('card.isActive like :isActive', { isActive: '%' + search + '%' })
      .orWhere('card.cardNo like :cardNo', { cardNo: '%' + search + '%' })
      .orWhere('card.expiryDate like :expiryDate', { expiryDate: '%' + search + '%' })
      .orWhere('createdBy.login like :login', { login: '%' + search + '%' })
      .orWhere('lastModifiedBy.login like :login', { login: '%' + search + '%' })
      .orWhere('employee.name like :name', { name: '%' + search + '%' })
      .orWhere('employee.phone like :phone', { phone: '%' + search + '%' })
      .orWhere('company.email like :email', { email: '%' + search + '%' })
      .orWhere('company.nameAr like :nameAr', { nameAr: '%' + search + '%' })
      .orWhere('company.nameEn like :nameEn', { nameEn: '%' + search + '%' })
      .getManyAndCount();
    }
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
