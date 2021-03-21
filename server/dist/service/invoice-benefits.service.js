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
const invoice_benefits_mapper_1 = require("../service/mapper/invoice-benefits.mapper");
const invoice_benefits_repository_1 = require("../repository/invoice-benefits.repository");
const relationshipNames = [];
relationshipNames.push('benefit');
relationshipNames.push('invoice');
let InvoiceBenefitsService = class InvoiceBenefitsService {
    constructor(invoiceBenefitsRepository) {
        this.invoiceBenefitsRepository = invoiceBenefitsRepository;
        this.logger = new common_1.Logger('InvoiceBenefitsService');
    }
    async findById(id) {
        const result = await this.invoiceBenefitsRepository.createQueryBuilder('invoice_benefits')
            .innerJoinAndSelect('invoice_benefits.benefit', 'benefit')
            .where('invoiceId = :id', { id: id })
            .getManyAndCount();
        return result;
    }
    async findByfields(options) {
        const result = await this.invoiceBenefitsRepository.findOne(options);
        return invoice_benefits_mapper_1.InvoiceBenefitsMapper.fromEntityToDTO(result);
    }
    async findAndCount(options) {
        options.relations = relationshipNames;
        const resultList = await this.invoiceBenefitsRepository.findAndCount(options);
        const invoiceBenefitsDTO = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(invoiceBenefits => invoiceBenefitsDTO.push(invoice_benefits_mapper_1.InvoiceBenefitsMapper.fromEntityToDTO(invoiceBenefits)));
            resultList[0] = invoiceBenefitsDTO;
        }
        return resultList;
    }
    async save(invoiceBenefitsDTO) {
        const entity = invoice_benefits_mapper_1.InvoiceBenefitsMapper.fromDTOtoEntity(invoiceBenefitsDTO);
        const result = await this.invoiceBenefitsRepository.save(entity);
        return invoice_benefits_mapper_1.InvoiceBenefitsMapper.fromEntityToDTO(result);
    }
    async update(invoiceBenefitsDTO) {
        const entity = invoice_benefits_mapper_1.InvoiceBenefitsMapper.fromDTOtoEntity(invoiceBenefitsDTO);
        const result = await this.invoiceBenefitsRepository.save(entity);
        return invoice_benefits_mapper_1.InvoiceBenefitsMapper.fromEntityToDTO(result);
    }
    async deleteById(id) {
        await this.invoiceBenefitsRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new common_1.HttpException('Error, entity not deleted!', common_1.HttpStatus.NOT_FOUND);
        }
        return;
    }
};
InvoiceBenefitsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(invoice_benefits_repository_1.InvoiceBenefitsRepository)),
    __metadata("design:paramtypes", [invoice_benefits_repository_1.InvoiceBenefitsRepository])
], InvoiceBenefitsService);
exports.InvoiceBenefitsService = InvoiceBenefitsService;
//# sourceMappingURL=invoice-benefits.service.js.map