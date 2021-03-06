import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { BenefitRequestDTO } from '../service/dto/benefit-request.dto';
import { BenefitRequestMapper } from '../service/mapper/benefit-request.mapper';
import { BenefitRequestRepository } from '../repository/benefit-request.repository';
import { BenefitStatus } from '../domain/enumeration/benefit-status';

const relationshipNames = [];
relationshipNames.push('category');
relationshipNames.push('hospital');
relationshipNames.push('benefit');

@Injectable()
export class BenefitRequestService {
  logger = new Logger('BenefitRequestService');

  constructor(@InjectRepository(BenefitRequestRepository) private benefitRequestRepository: BenefitRequestRepository) {}

  async findById(id: string): Promise<BenefitRequestDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.benefitRequestRepository.findOne(id, options);
    return BenefitRequestMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<BenefitRequestDTO>): Promise<BenefitRequestDTO | undefined> {
    const result = await this.benefitRequestRepository.findOne(options);
    return BenefitRequestMapper.fromEntityToDTO(result);
  }

  async findAndCount(search: string, hosbital_id :string,options: FindManyOptions<BenefitRequestDTO>): Promise<[BenefitRequestDTO[], number]> {
    options.relations = relationshipNames;
    search = search == "false" ? "" : search;
    var resultList = [][0];
    console.log(options.where)
    if(options.where != undefined && hosbital_id == "all"){
      resultList = await this.benefitRequestRepository.findAndCount(options);
    }
    else if(hosbital_id == "all") {
      resultList = await this.benefitRequestRepository.createQueryBuilder('benefit_request')
      .innerJoinAndSelect('benefit_request.hospital', 'hospital')
      .innerJoinAndSelect('benefit_request.category', 'category')
      .innerJoinAndSelect('benefit_request.benefit', 'benefit')
      .innerJoinAndSelect('benefit_request.createdBy', 'createdBy')
      .leftJoinAndSelect('benefit_request.lastModifiedBy', 'lastModifiedBy')
      .where('benefit_request.nameAr like :nameAr', { nameAr: '%' + search + '%' })
      .orWhere('benefit_request.nameEn like :nameEn', { nameEn: '%' + search + '%' })
      .orWhere('benefit_request.createdDate like :createdDate', { createdDate: '%' + search + '%' })
      .orWhere('benefit_request.lastModifiedDate like :lastModifiedDate', { lastModifiedDate: '%' + search + '%' })
      .orWhere('benefit_request.benefitStatus like :benefitStatus', { benefitStatus: '%' + search + '%' })
      .orWhere('createdBy.login like :login', { login: '%' + search + '%' })
      .orWhere('lastModifiedBy.login like :login', { login: '%' + search + '%' })
      .orWhere('hospital.nameAr like :nameAr', { nameAr: '%' + search + '%' })
      .orWhere('hospital.nameEn like :nameEn', { nameEn: '%' + search + '%' })
      .orWhere('category.nameAr like :nameAr', { nameAr: '%' + search + '%' })
      .orWhere('category.nameEn like :nameEn', { nameEn: '%' + search + '%' })
      .orderBy("benefit_request.benefitStatus","ASC")
      .getManyAndCount();
    } else {
      resultList = await this.benefitRequestRepository.createQueryBuilder('benefit_request')
      .innerJoinAndSelect('benefit_request.hospital', 'hospital')
      .innerJoinAndSelect('benefit_request.category', 'category')
      .innerJoinAndSelect('benefit_request.benefit', 'benefit')
      .innerJoinAndSelect('benefit_request.createdBy', 'createdBy')
      .leftJoinAndSelect('benefit_request.lastModifiedBy', 'lastModifiedBy')
      .where('hospital.id = :id', { id: hosbital_id })
      .andWhere('benefit_request.benefitStatus = :status', { status: BenefitStatus.APPROVED })
      .orWhere('benefit_request.nameAr like :nameAr', { nameAr: '%' + search + '%' })
      .andWhere('benefit_request.benefitStatus = :status', { status: BenefitStatus.APPROVED })
    
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .orWhere('benefit_request.nameEn like :nameEn', { nameEn: '%' + search + '%' })
      .andWhere('benefit_request.benefitStatus = :status', { status: BenefitStatus.APPROVED })
    
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .orWhere('benefit_request.createdDate like :createdDate', { createdDate: '%' + search + '%' })
      .andWhere('benefit_request.benefitStatus = :status', { status: BenefitStatus.APPROVED })
    
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .orWhere('benefit_request.lastModifiedDate like :lastModifiedDate', { lastModifiedDate: '%' + search + '%' })
      .andWhere('benefit_request.benefitStatus = :status', { status: BenefitStatus.APPROVED })
    
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .orWhere('benefit_request.benefitStatus like :benefitStatus', { benefitStatus: '%' + search + '%' })
      .andWhere('benefit_request.benefitStatus = :status', { status: BenefitStatus.APPROVED })
    
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .orWhere('createdBy.login like :login', { login: '%' + search + '%' })
      .andWhere('benefit_request.benefitStatus = :status', { status: BenefitStatus.APPROVED })
    
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .orWhere('lastModifiedBy.login like :login', { login: '%' + search + '%' })
      .andWhere('benefit_request.benefitStatus = :status', { status: BenefitStatus.APPROVED })
    
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .orWhere('hospital.nameAr like :nameAr', { nameAr: '%' + search + '%' })
      .andWhere('benefit_request.benefitStatus = :status', { status: BenefitStatus.APPROVED })
    
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .orWhere('hospital.nameEn like :nameEn', { nameEn: '%' + search + '%' })
      .andWhere('benefit_request.benefitStatus = :status', { status: BenefitStatus.APPROVED })
    
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .orWhere('category.nameAr like :nameAr', { nameAr: '%' + search + '%' })
      .andWhere('benefit_request.benefitStatus = :status', { status: BenefitStatus.APPROVED })
    
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .orWhere('category.nameEn like :nameEn', { nameEn: '%' + search + '%' })
      .andWhere('benefit_request.benefitStatus = :status', { status: BenefitStatus.APPROVED })
    
      .andWhere('hospital.id = :id', { id: hosbital_id })
      .getManyAndCount();
    }
    const benefitRequestDTO: BenefitRequestDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(benefitRequest => benefitRequestDTO.push(BenefitRequestMapper.fromEntityToDTO(benefitRequest)));
      resultList[0] = benefitRequestDTO;
    }
    return resultList;
  }

  async save(benefitRequestDTO: BenefitRequestDTO): Promise<BenefitRequestDTO | undefined> {
    const entity = BenefitRequestMapper.fromDTOtoEntity(benefitRequestDTO);
    const result = await this.benefitRequestRepository.save(entity);
    return BenefitRequestMapper.fromEntityToDTO(result);
  }

  async update(benefitRequestDTO: BenefitRequestDTO): Promise<BenefitRequestDTO | undefined> {
    const entity = BenefitRequestMapper.fromDTOtoEntity(benefitRequestDTO);
    const result = await this.benefitRequestRepository.save(entity);
    return BenefitRequestMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.benefitRequestRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
