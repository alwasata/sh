import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { BenefitDTO } from '../service/dto/benefit.dto';
import { BenefitMapper } from '../service/mapper/benefit.mapper';
import { BenefitRepository } from '../repository/benefit.repository';
// import {getConnection} from "typeorm";

const relationshipNames = [];
relationshipNames.push('category');
relationshipNames.push('hospital');

@Injectable()
export class BenefitService {
  logger = new Logger('BenefitService');

  constructor(@InjectRepository(BenefitRepository) private benefitRepository: BenefitRepository) {}

  async findById(id: string): Promise<BenefitDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.benefitRepository.findOne(id, options);
    return BenefitMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<BenefitDTO>): Promise<BenefitDTO | undefined> {
    const result = await this.benefitRepository.findOne(options);
    return BenefitMapper.fromEntityToDTO(result);
  }

  async findAndCount(search : string, hosbital_id : string ,options: FindManyOptions<BenefitDTO>): Promise<[BenefitDTO[], number]> {
    options.relations = relationshipNames;
    search = search == "false" ? "" : search;
    var resultList = [][0];

    if(hosbital_id == "all") {
      resultList = await this.benefitRepository.createQueryBuilder('benefit')
      .innerJoinAndSelect('benefit.hospital', 'hospital')
      .innerJoinAndSelect('benefit.category', 'category')
      .where('benefit.active = :active', { active: 1 })
      .where('benefit.nameAr like :nameAr', { nameAr: '%' + search + '%' })
      .orWhere('benefit.nameEn like :nameEn', { nameEn: '%' + search + '%' })
      .orWhere('hospital.nameAr like :nameAr', { nameAr: '%' + search + '%' })
      .orWhere('hospital.nameEn like :nameEn', { nameEn: '%' + search + '%' })
      .orWhere('category.nameAr like :nameAr', { nameAr: '%' + search + '%' })
      .orWhere('category.nameEn like :nameEn', { nameEn: '%' + search + '%' })
      .getManyAndCount();
    } else {
      resultList = await this.benefitRepository.createQueryBuilder('benefit')
      .innerJoinAndSelect('benefit.hospital', 'hospital')
      .innerJoinAndSelect('benefit.category', 'category')
      .where('hospital.id = :id', { id: hosbital_id })
      .where('benefit.active = :active', { active: 1 })
      .orWhere('benefit.nameAr like :nameAr', { nameAr: '%' + search + '%' })
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .andWhere('benefit.active = :active', { active: 1 })
      .orWhere('benefit.nameEn like :nameEn', { nameEn: '%' + search + '%' })
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .andWhere('benefit.active = :active', { active: 1 })
      .orWhere('hospital.nameAr like :nameAr', { nameAr: '%' + search + '%' })
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .andWhere('benefit.active = :active', { active: 1 })
      .orWhere('hospital.nameEn like :nameEn', { nameEn: '%' + search + '%' })
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .andWhere('benefit.active = :active', { active: 1 })
      .orWhere('category.nameAr like :nameAr', { nameAr: '%' + search + '%' })
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .andWhere('benefit.active = :active', { active: 1 })
      .orWhere('category.nameEn like :nameEn', { nameEn: '%' + search + '%' })
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .andWhere('benefit.active = :active', { active: 1 })
      .getManyAndCount();
    }

    const benefitDTO: BenefitDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(benefit => benefitDTO.push(BenefitMapper.fromEntityToDTO(benefit)));
      resultList[0] = benefitDTO;
    }
    return resultList;
  }

  async save(benefitDTO: BenefitDTO): Promise<BenefitDTO | undefined> {
    const entity = BenefitMapper.fromDTOtoEntity(benefitDTO);
    const result = await this.benefitRepository.save(entity);
    return BenefitMapper.fromEntityToDTO(result);
  }

  async update(benefitDTO: BenefitDTO): Promise<BenefitDTO | undefined> {
    const entity = BenefitMapper.fromDTOtoEntity(benefitDTO);
    const result = await this.benefitRepository.save(entity);
    return BenefitMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.benefitRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
