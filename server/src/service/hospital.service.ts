import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { HospitalDTO } from '../service/dto/hospital.dto';
import { HospitalMapper } from '../service/mapper/hospital.mapper';
import { HospitalRepository } from '../repository/hospital.repository';

const relationshipNames = [];
relationshipNames.push('users');

@Injectable()
export class HospitalService {
  logger = new Logger('HospitalService');

  constructor(@InjectRepository(HospitalRepository) private hospitalRepository: HospitalRepository) {}

  async findById(id: string): Promise<HospitalDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.hospitalRepository.findOne(id, options);
    return HospitalMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<HospitalDTO>): Promise<HospitalDTO | undefined> {
    const result = await this.hospitalRepository.findOne(options);
    return HospitalMapper.fromEntityToDTO(result);
  }

  async findAndCount(search : string, options: FindManyOptions<HospitalDTO>): Promise<[HospitalDTO[], number]> {
    search = search == "false" ? "" : search;
    options.relations = relationshipNames;
    const resultList = await this.hospitalRepository.createQueryBuilder('hospital')
    .innerJoinAndSelect('hospital.createdBy', 'createdBy')
    .leftJoinAndSelect('hospital.lastModifiedBy', 'lastModifiedBy')
    .where('hospital.nameAr like :nameAr', { nameAr: '%' + search + '%' })
    .orWhere('hospital.nameEn like :nameEn', { nameEn: '%' + search + '%' })
    .orWhere('hospital.email like :email', { email: '%' + search + '%' })
    .orWhere('hospital.phone like :phone', { phone: '%' + search + '%' })
    .orWhere('hospital.address like :address', { address: '%' + search + '%' })
    .orWhere('hospital.city like :city', { city: '%' + search + '%' })
    .orWhere('hospital.lat like :lat', { lat: '%' + search + '%' })
    .orWhere('hospital.lng like :lng', { lng: '%' + search + '%' })
    .orWhere('hospital.phoneSecond like :phoneSecond', { phoneSecond: '%' + search + '%' })
    .orWhere('hospital.phoneThird like :phoneThird', { phoneThird: '%' + search + '%' })
    .orWhere('hospital.type like :type', { type: '%' + search + '%' })
    .orWhere('createdBy.login like :login', { login: '%' + search + '%' })
    .orWhere('lastModifiedBy.login like :login', { login: '%' + search + '%' })
    .getManyAndCount();
    const hospitalDTO: HospitalDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(hospital => hospitalDTO.push(HospitalMapper.fromEntityToDTO(hospital)));
      resultList[0] = hospitalDTO;
    }
    return resultList;
  }

  async getHosbitalIdForUser(id : string): Promise<[HospitalDTO[]]> {
    const options = { relations: relationshipNames };
    const resultList = await this.hospitalRepository.createQueryBuilder('hospital')
    .innerJoinAndSelect('hospital.users', 'user')
    .where('user.id = :id', { id: id })
    .getRawOne();
    return resultList;
  }

  async save(hospitalDTO: HospitalDTO): Promise<HospitalDTO | undefined> {
    const entity = HospitalMapper.fromDTOtoEntity(hospitalDTO);
    const result = await this.hospitalRepository.save(entity);
    return HospitalMapper.fromEntityToDTO(result);
  }

  async update(hospitalDTO: HospitalDTO): Promise<HospitalDTO | undefined> {
    const entity = HospitalMapper.fromDTOtoEntity(hospitalDTO);
    const result = await this.hospitalRepository.save(entity);
    return HospitalMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.hospitalRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
