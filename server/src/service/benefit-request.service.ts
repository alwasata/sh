import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { BenefitRequestDTO } from '../service/dto/benefit-request.dto';
import { BenefitRequestMapper } from '../service/mapper/benefit-request.mapper';
import { BenefitRequestRepository } from '../repository/benefit-request.repository';

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

  async findAndCount(hosbital_id :string,options: FindManyOptions<BenefitRequestDTO>): Promise<[BenefitRequestDTO[], number]> {
    options.relations = relationshipNames;

    // const resultList = await this.benefitRequestRepository.findAndCount(options);
    var resultList = [][0];

    if(hosbital_id == "all") {
      resultList = await this.benefitRequestRepository.findAndCount(options);
    } else {
      resultList = await this.benefitRequestRepository.createQueryBuilder('benefit_request')
      .innerJoinAndSelect('benefit_request.hospital', 'hospital')
      .innerJoinAndSelect('benefit_request.category', 'category')
      .innerJoinAndSelect('benefit_request.benefit', 'benefit')
      .where('hospital.id = :id', { id: hosbital_id })
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
