"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const invoice_mapper_1 = require("../service/mapper/invoice.mapper");
const invoice_repository_1 = require("../repository/invoice.repository");
const relationshipNames = [];
let InvoiceService = class InvoiceService {
    constructor(invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
        this.logger = new common_1.Logger('InvoiceService');
    }
    async findById(id) {
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
    async findByfields(options) {
        const result = await this.invoiceRepository.findOne(options);
        return invoice_mapper_1.InvoiceMapper.fromEntityToDTO(result);
    }
    async findByInvoice(options) {
        options.relations = relationshipNames;
        const resultList = await this.invoiceRepository.findAndCount(options);
        return resultList;
    }
    async getAll() {
        const resultList = await this.invoiceRepository.findAndCount();
        return resultList;
    }
    async findAndCount(search, id, options) {
        options.relations = relationshipNames;
        search = search == "false" ? "" : search;
        var resultList = {};
        console.log(search);
        if (id == "all") {
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
        }
        else {
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
        const invoiceDTO = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(invoice => invoiceDTO.push(invoice_mapper_1.InvoiceMapper.fromEntityToDTO(invoice)));
            resultList[0] = invoiceDTO;
        }
        return resultList;
    }
    async count() {
        const resultList = await this.invoiceRepository.count();
        console.log(resultList);
        return resultList;
    }
    async save(invoiceDTO) {
        const entity = invoice_mapper_1.InvoiceMapper.fromDTOtoEntity(invoiceDTO);
        const result = await this.invoiceRepository.save(entity);
        return invoice_mapper_1.InvoiceMapper.fromEntityToDTO(result);
    }
    async update(invoiceDTO) {
        const entity = invoice_mapper_1.InvoiceMapper.fromDTOtoEntity(invoiceDTO);
        const result = await this.invoiceRepository.save(entity);
        return invoice_mapper_1.InvoiceMapper.fromEntityToDTO(result);
    }
    async deleteById(id) {
        await this.invoiceRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new common_1.HttpException('Error, entity not deleted!', common_1.HttpStatus.NOT_FOUND);
        }
        return;
    }
};
InvoiceService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(invoice_repository_1.InvoiceRepository)),
    __metadata("design:paramtypes", [invoice_repository_1.InvoiceRepository])
], InvoiceService);
exports.InvoiceService = InvoiceService;
//# sourceMappingURL=invoice.service.js.map