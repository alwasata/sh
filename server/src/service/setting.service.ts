import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { SettingDTO } from '../service/dto/setting.dto';
import { SettingMapper } from '../service/mapper/setting.mapper';
import { SettingRepository } from '../repository/setting.repository';

const relationshipNames = [];

@Injectable()
export class SettingService {
  logger = new Logger('SettingService');

  constructor(@InjectRepository(SettingRepository) private settingRepository: SettingRepository) {
  }

  async findById(id: string): Promise<SettingDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.settingRepository.findOne(id, options);
    return SettingMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<SettingDTO>): Promise<SettingDTO | undefined> {
    const result = await this.settingRepository.findOne(options);
    return SettingMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<SettingDTO>): Promise<[SettingDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.settingRepository.findAndCount(options);
    const settingDTO: SettingDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(setting => settingDTO.push(SettingMapper.fromEntityToDTO(setting)));
      resultList[0] = settingDTO;
    }
    return resultList;
  }

  async save(settingDTO: SettingDTO): Promise<SettingDTO | undefined> {
    const entity = SettingMapper.fromDTOtoEntity(settingDTO);
    const result = await this.settingRepository.save(entity);
    return SettingMapper.fromEntityToDTO(result);
  }

  async update(settingDTO: SettingDTO): Promise<SettingDTO | undefined> {
    const entity = SettingMapper.fromDTOtoEntity(settingDTO);
    const result = await this.settingRepository.save(entity);
    return SettingMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.settingRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
