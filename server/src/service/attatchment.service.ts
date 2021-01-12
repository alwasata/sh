import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AttatchmentDTO } from '../service/dto/attatchment.dto';
import { AttatchmentMapper } from '../service/mapper/attatchment.mapper';
import { AttatchmentRepository } from '../repository/attatchment.repository';

const relationshipNames = [];
relationshipNames.push('employee');

@Injectable()
export class AttatchmentService {
    logger = new Logger('AttatchmentService');

    constructor(@InjectRepository(AttatchmentRepository) private attatchmentRepository: AttatchmentRepository) {}

    async findById(id: string): Promise<AttatchmentDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.attatchmentRepository.findOne(id, options);
        return AttatchmentMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<AttatchmentDTO>): Promise<AttatchmentDTO | undefined> {
        const result = await this.attatchmentRepository.findOne(options);
        return AttatchmentMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<AttatchmentDTO>): Promise<[AttatchmentDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.attatchmentRepository.findAndCount(options);
        const attatchmentDTO: AttatchmentDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(attatchment => attatchmentDTO.push(AttatchmentMapper.fromEntityToDTO(attatchment)));
            resultList[0] = attatchmentDTO;
        }
        return resultList;
    }

    async save(attatchmentDTO: AttatchmentDTO): Promise<AttatchmentDTO | undefined> {
        const entity = AttatchmentMapper.fromDTOtoEntity(attatchmentDTO);
        const result = await this.attatchmentRepository.save(entity);
        return AttatchmentMapper.fromEntityToDTO(result);
    }

    async update(attatchmentDTO: AttatchmentDTO): Promise<AttatchmentDTO | undefined> {
        const entity = AttatchmentMapper.fromDTOtoEntity(attatchmentDTO);
        const result = await this.attatchmentRepository.save(entity);
        return AttatchmentMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.attatchmentRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
