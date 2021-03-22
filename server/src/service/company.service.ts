import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CompanyDTO } from '../service/dto/company.dto';
import { CompanyMapper } from '../service/mapper/company.mapper';
import { CompanyRepository } from '../repository/company.repository';

const relationshipNames = [];
relationshipNames.push('users');

@Injectable()
export class CompanyService {
    logger = new Logger('CompanyService');

    constructor(@InjectRepository(CompanyRepository) private companyRepository: CompanyRepository) {}

    async findById(id: any): Promise<CompanyDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.companyRepository.findOne(id, options);
        return CompanyMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<CompanyDTO>): Promise<CompanyDTO | undefined> {
        const result = await this.companyRepository.findOne(options);
        return CompanyMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<CompanyDTO>): Promise<[CompanyDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.companyRepository.findAndCount(options);
        const companyDTO: CompanyDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(company => companyDTO.push(CompanyMapper.fromEntityToDTO(company)));
            resultList[0] = companyDTO;
        }
        return resultList;
    }

    async getCompanyIdForUser(user_id : string): Promise<[CompanyDTO[], number]> {
      const options = { relations: relationshipNames };
      const resultList = await this.companyRepository.createQueryBuilder('company')
      .innerJoinAndSelect('company.users', 'user')
      .where('user.id = :id', { id: user_id })
      .getRawOne();
      console.log(resultList);
      return resultList;
    }

    async save(companyDTO: CompanyDTO): Promise<CompanyDTO | undefined> {
        const entity = CompanyMapper.fromDTOtoEntity(companyDTO);
        const result = await this.companyRepository.save(entity);
        return CompanyMapper.fromEntityToDTO(result);
    }

    async update(companyDTO: CompanyDTO): Promise<CompanyDTO | undefined> {
        const entity = CompanyMapper.fromDTOtoEntity(companyDTO);
        const result = await this.companyRepository.save(entity);
        return CompanyMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.companyRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
