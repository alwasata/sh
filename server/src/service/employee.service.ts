import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { EmployeeDTO } from '../service/dto/employee.dto';
import { EmployeeMapper } from '../service/mapper/employee.mapper';
import { EmployeeRepository } from '../repository/employee.repository';

const relationshipNames = [];
relationshipNames.push('company');

@Injectable()
export class EmployeeService {
  logger = new Logger('EmployeeService');

  constructor(@InjectRepository(EmployeeRepository) private employeeRepository: EmployeeRepository) {}

  async findById(id: string): Promise<EmployeeDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.employeeRepository.findOne(id, options);
    return EmployeeMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<EmployeeDTO>): Promise<EmployeeDTO | undefined> {
    const result = await this.employeeRepository.findOne(options);
    return EmployeeMapper.fromEntityToDTO(result);
  }

  async findAndCount(company_id : any,options: FindManyOptions<EmployeeDTO>): Promise<[EmployeeDTO[], number]> {
    options.relations = relationshipNames;
    var resultList = [][0];

    if(company_id == "all") {
      resultList = await this.employeeRepository.createQueryBuilder('employee')
      .innerJoinAndSelect('employee.company', 'company')
      .innerJoinAndSelect('employee.createdBy', 'createdBy')
      .leftJoinAndSelect('employee.lastModifiedBy', 'lastModifiedBy')
      .getManyAndCount();
    } else {
      resultList = await this.employeeRepository.createQueryBuilder('employee')
      .innerJoinAndSelect('employee.company', 'company')
      .innerJoinAndSelect('employee.createdBy', 'createdBy')
      .leftJoinAndSelect('employee.lastModifiedBy', 'lastModifiedBy')
      .where('company.id = :id', { id: company_id })
      .getManyAndCount();
    }

    const employeeDTO: EmployeeDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(employee => employeeDTO.push(EmployeeMapper.fromEntityToDTO(employee)));
      resultList[0] = employeeDTO;
    }
    return resultList;
  }

  async save(employeeDTO: EmployeeDTO): Promise<EmployeeDTO | undefined> {
    const entity = EmployeeMapper.fromDTOtoEntity(employeeDTO);
    const result = await this.employeeRepository.save(entity);
    return EmployeeMapper.fromEntityToDTO(result);
  }

  async update(employeeDTO: EmployeeDTO): Promise<EmployeeDTO | undefined> {
    const entity = EmployeeMapper.fromDTOtoEntity(employeeDTO);
    const result = await this.employeeRepository.save(entity);
    return EmployeeMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.employeeRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
