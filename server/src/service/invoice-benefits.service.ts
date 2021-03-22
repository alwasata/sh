import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { InvoiceBenefitsDTO } from '../service/dto/invoice-benefits.dto';
import { InvoiceBenefitsMapper } from '../service/mapper/invoice-benefits.mapper';
import { InvoiceBenefitsRepository } from '../repository/invoice-benefits.repository';

const relationshipNames = [];
relationshipNames.push('benefit');
relationshipNames.push('invoice');

@Injectable()
export class InvoiceBenefitsService {
    logger = new Logger('InvoiceBenefitsService');

    constructor(@InjectRepository(InvoiceBenefitsRepository) private invoiceBenefitsRepository: InvoiceBenefitsRepository) {}

    async findById(id: string): Promise<any> {
        const result = await this.invoiceBenefitsRepository.createQueryBuilder('invoice_benefits')
        .innerJoinAndSelect('invoice_benefits.benefit', 'benefit')
        .where('invoiceId = :id', { id: id })
        .getManyAndCount();
        return result;
    }

    async findByfields(options: FindOneOptions<InvoiceBenefitsDTO>): Promise<InvoiceBenefitsDTO | undefined> {
        const result = await this.invoiceBenefitsRepository.findOne(options);
        return InvoiceBenefitsMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<InvoiceBenefitsDTO>): Promise<any> {
        options.relations = relationshipNames;
        const resultList = await this.invoiceBenefitsRepository.findAndCount(options);
        const invoiceBenefitsDTO: InvoiceBenefitsDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(invoiceBenefits => invoiceBenefitsDTO.push(InvoiceBenefitsMapper.fromEntityToDTO(invoiceBenefits)));
            resultList[0] = invoiceBenefitsDTO;
        }
        return resultList;
    }

    async save(invoiceBenefitsDTO: InvoiceBenefitsDTO): Promise<InvoiceBenefitsDTO | undefined> {
        const entity = InvoiceBenefitsMapper.fromDTOtoEntity(invoiceBenefitsDTO);
        const result = await this.invoiceBenefitsRepository.save(entity);
        return InvoiceBenefitsMapper.fromEntityToDTO(result);
    }

    async update(invoiceBenefitsDTO: InvoiceBenefitsDTO): Promise<InvoiceBenefitsDTO | undefined> {
        const entity = InvoiceBenefitsMapper.fromDTOtoEntity(invoiceBenefitsDTO);
        const result = await this.invoiceBenefitsRepository.save(entity);
        return InvoiceBenefitsMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.invoiceBenefitsRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
