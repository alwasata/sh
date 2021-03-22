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

  async findById(id: string): Promise<InvoiceDTO[] | any> {
    const options = { relations: relationshipNames };
    const result = await this.invoiceRepository.createQueryBuilder('invoice')
    .innerJoinAndSelect('invoice.cardTransaction', 'cardTransaction')
    .innerJoinAndSelect('cardTransaction.card', 'card')
    .innerJoinAndSelect('card.employee', 'employee')
    .innerJoinAndSelect('employee.company', 'company')
    .where('invoice.id = :id', { id: id })
    .getOneOrFail();
    return result;
  }

  async findByfields(options: FindOneOptions<InvoiceDTO>): Promise<InvoiceDTO | undefined> {
    const result = await this.invoiceRepository.findOne(options);
    return InvoiceMapper.fromEntityToDTO(result);
  }

  async findByInvoice(options: FindManyOptions<InvoiceDTO>): Promise<InvoiceDTO[] | any> {
    options.relations = relationshipNames;
    const resultList = await this.invoiceRepository.findAndCount(options);
    return resultList;
  }
  async getAll(): Promise<InvoiceDTO[] | any> {
    const resultList = await this.invoiceRepository.findAndCount();
    return resultList;
  }
  async findAndCount(search : string, id : any, options: FindManyOptions<InvoiceDTO>): Promise<InvoiceDTO[] | any> {
    options.relations = relationshipNames;
    search = search == "false" ? "" : search;
    var resultList = {};
    console.log(search);
    if(id == "all") {
      resultList = await this.invoiceRepository.createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.mainInvoice', 'mainInvoice')
      .leftJoinAndSelect('invoice.createdBy', 'createdBy')
      .innerJoinAndSelect('invoice.cardTransaction', 'cardTransaction')
      .innerJoinAndSelect('cardTransaction.card', 'card')
      .innerJoinAndSelect('card.employee', 'employee')
      .innerJoinAndSelect('employee.company', 'company')
      .innerJoinAndSelect('invoice.hospital', 'hospital')
      .where('invoice.invoiceNo like :invoiceNo', { invoiceNo: '%' + search + '%' })
      .where('invoice.invoiceNo like :invoiceNo', { invoiceNo: '%' + search + '%' })
      .orWhere('employee.name like :firstName', { firstName: '%' + search + '%' })
      .skip(options.skip)
      .take(options.take)
      .getManyAndCount();
    } else {
      resultList = await this.invoiceRepository.createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.mainInvoice', 'mainInvoice')
      .leftJoinAndSelect('invoice.createdBy', 'createdBy')
      .innerJoinAndSelect('invoice.cardTransaction', 'cardTransaction')
      .innerJoinAndSelect('cardTransaction.card', 'card')
      .innerJoinAndSelect('card.employee', 'employee')
      .innerJoinAndSelect('employee.company', 'company')
      .innerJoinAndSelect('invoice.hospital', 'hospital')
      .where('invoice.invoiceNo like :invoiceNo', { invoiceNo: '%' + search + '%' })
      .orWhere('employee.name like :firstName', { firstName: '%' + search + '%' })
      .andWhere('hospital.id = :id', { id: id })
      .skip(options.skip)
      .take(options.take)
      .getManyAndCount();
    }
    const invoiceDTO: InvoiceDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(invoice => invoiceDTO.push(InvoiceMapper.fromEntityToDTO(invoice)));
      resultList[0] = invoiceDTO;
    }
    return resultList;
  }

  async count(): Promise<number> {
    const resultList = await this.invoiceRepository.count();
    console.log(resultList);
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
