import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { InvoiceDTO } from '../service/dto/invoice.dto';
import { InvoiceMapper } from '../service/mapper/invoice.mapper';
import { InvoiceRepository } from '../repository/invoice.repository';

const relationshipNames = [];

@Injectable()
export class InvoiceService {
    logger = new Logger('InvoiceService');

    constructor(@InjectRepository(InvoiceRepository) private invoiceRepository: InvoiceRepository) {}

    async findById(id: string): Promise<InvoiceDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.invoiceRepository.findOne(id, options);
        return InvoiceMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<InvoiceDTO>): Promise<InvoiceDTO | undefined> {
        const result = await this.invoiceRepository.findOne(options);
        return InvoiceMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<InvoiceDTO>): Promise<[InvoiceDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.invoiceRepository.findAndCount(options);
        const invoiceDTO: InvoiceDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(invoice => invoiceDTO.push(InvoiceMapper.fromEntityToDTO(invoice)));
            resultList[0] = invoiceDTO;
        }
        return resultList;
    }

    async save(invoiceDTO: InvoiceDTO): Promise<InvoiceDTO | undefined> {
        const entity = InvoiceMapper.fromDTOtoEntity(invoiceDTO);
        const result = await this.invoiceRepository.save(entity);
        return InvoiceMapper.fromEntityToDTO(result);
    }

    async update(invoiceDTO: InvoiceDTO): Promise<InvoiceDTO | undefined> {
        const entity = InvoiceMapper.fromDTOtoEntity(invoiceDTO);
        const result = await this.invoiceRepository.save(entity);
        return InvoiceMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.invoiceRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
