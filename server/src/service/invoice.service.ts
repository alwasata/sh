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

  async findByInvoice(id: string): Promise<InvoiceDTO[] | any> {
    return await this.invoiceRepository.createQueryBuilder('invoice')
    .where('invoice.mainInvoice = :id', { id: id })
    .getMany();
  }
  async getAll(): Promise<InvoiceDTO[] | any> {
    const resultList = await this.invoiceRepository.findAndCount();
    return resultList;
  }
  async findAndCount(search : string, id : any, options: FindManyOptions<InvoiceDTO>): Promise<InvoiceDTO[] | any> {
    options.relations = relationshipNames;
    search = search == "false" ? "" : search;
    var resultList = {};
    console.log("Query =" +search);
    if(id == "all") {
      resultList = await this.invoiceRepository.createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.mainInvoice', 'mainInvoice')
      .leftJoinAndSelect('invoice.createdBy', 'createdBy')
      .leftJoinAndSelect('invoice.lastModifiedBy', 'lastModifiedBy')
      .innerJoinAndSelect('invoice.cardTransaction', 'cardTransaction')
      .innerJoinAndSelect('cardTransaction.card', 'card')
      .innerJoinAndSelect('card.employee', 'employee')
      .innerJoinAndSelect('employee.company', 'company')
      .innerJoinAndSelect('invoice.hospital', 'hospital')
      .where('invoice.invoiceNo like :invoiceNo', { invoiceNo: '%' + search + '%' })
      .orWhere('invoice.invoiceDate like :invoiceDate', { invoiceDate: '%' + search + '%' })
      .orWhere('invoice.payDate like :payDate', { payDate: '%' + search + '%' })
      .orWhere('invoice.invoiceStatus like :invoiceStatus', { invoiceStatus: '%' + search + '%' })
      .orWhere('createdBy.login like :login', { login: '%' + search + '%' })
      .orWhere('lastModifiedBy.login like :login', { login: '%' + search + '%' })
      .orWhere('employee.name like :firstName', { firstName: '%' + search + '%' })
      .orWhere('employee.phone like :phone', { phone: '%' + search + '%' })
      .orWhere('employee.identityNo like :identityNo', { identityNo: '%' + search + '%' })
      // .orWhere('employee.employeeStatus like :employeeStatus', { employeeStatus: '%' + search + '%' })
      .orWhere('company.nameAr like :nameAr', { nameAr: '%' + search + '%' })
      .orWhere('company.nameEn like :nameEn', { nameEn: '%' + search + '%' })
      .skip(options.skip)
      .take(options.take)
      .getManyAndCount();
    } else {
      resultList = await this.invoiceRepository.createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.mainInvoice', 'mainInvoice')
      .leftJoinAndSelect('invoice.createdBy', 'createdBy')
      .leftJoinAndSelect('invoice.lastModifiedBy', 'lastModifiedBy')
      .innerJoinAndSelect('invoice.cardTransaction', 'cardTransaction')
      .innerJoinAndSelect('cardTransaction.card', 'card')
      .innerJoinAndSelect('card.employee', 'employee')
      .innerJoinAndSelect('employee.company', 'company')
      .innerJoinAndSelect('invoice.hospital', 'hospital')
      .where('invoice.invoiceNo like :invoiceNo', { invoiceNo: '%' + search + '%' })
      .orWhere('invoice.invoiceDate like :invoiceDate', { invoiceDate: '%' + search + '%' })
      .orWhere('invoice.payDate like :payDate', { payDate: '%' + search + '%' })
      .orWhere('invoice.invoiceStatus like :invoiceStatus', { invoiceStatus: '%' + search + '%' })
      .orWhere('createdBy.login like :login', { login: '%' + search + '%' })
      .orWhere('lastModifiedBy.login like :login', { login: '%' + search + '%' })
      .orWhere('employee.name like :firstName', { firstName: '%' + search + '%' })
      .orWhere('employee.phone like :phone', { phone: '%' + search + '%' })
      .orWhere('employee.identityNo like :identityNo', { identityNo: '%' + search + '%' })
      // .orWhere('employee.employeeStatus like :employeeStatus', { employeeStatus: '%' + search + '%' })
      .orWhere('company.nameAr like :nameAr', { nameAr: '%' + search + '%' })
      .orWhere('company.nameEn like :nameEn', { nameEn: '%' + search + '%' })
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

  async invoicesReport(status : string, id : any, dateFrom: Date, dateTo: Date, options: FindManyOptions<InvoiceDTO>): Promise<InvoiceDTO[] | any> {
    options.relations = relationshipNames;
    var resultList = {};
    console.log("Query =" + id + " Status = " + status);
    
      resultList = await this.invoiceRepository.createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.mainInvoice', 'mainInvoice')
      .leftJoinAndSelect('invoice.createdBy', 'createdBy')
      .leftJoinAndSelect('invoice.lastModifiedBy', 'lastModifiedBy')
      .innerJoinAndSelect('invoice.cardTransaction', 'cardTransaction')
      .innerJoinAndSelect('cardTransaction.card', 'card')
      .innerJoinAndSelect('card.employee', 'employee')
      .innerJoinAndSelect('employee.company', 'company')
      .innerJoinAndSelect('invoice.hospital', 'hospital')
      .where('invoice.invoiceDate >= :invoiceDate1', { invoiceDate1: dateFrom })
      .andWhere('invoice.invoiceDate <= :invoiceDate', { invoiceDate: dateTo })
      .andWhere('invoice.invoiceStatus like :invoiceStatus', { invoiceStatus: '%' + status + '%' })
      .andWhere('hospital.id = :id', { id: id })

      .getManyAndCount();
  
    const invoiceDTO: InvoiceDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(invoice => invoiceDTO.push(InvoiceMapper.fromEntityToDTO(invoice)));
      resultList[0] = invoiceDTO;
    }
    console.log(resultList);
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
