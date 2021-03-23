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
const company_mapper_1 = require("../service/mapper/company.mapper");
const company_repository_1 = require("../repository/company.repository");
const relationshipNames = [];
relationshipNames.push('users');
let CompanyService = class CompanyService {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
        this.logger = new common_1.Logger('CompanyService');
    }
    async findById(id) {
        const options = { relations: relationshipNames };
        const result = await this.companyRepository.findOne(id, options);
        return company_mapper_1.CompanyMapper.fromEntityToDTO(result);
    }
    async findByfields(options) {
        const result = await this.companyRepository.findOne(options);
        return company_mapper_1.CompanyMapper.fromEntityToDTO(result);
    }
    async findAndCount(options) {
        options.relations = relationshipNames;
        const resultList = await this.companyRepository.findAndCount(options);
        const companyDTO = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(company => companyDTO.push(company_mapper_1.CompanyMapper.fromEntityToDTO(company)));
            resultList[0] = companyDTO;
        }
        return resultList;
    }
    async getCompanyIdForUser(user_id) {
        const options = { relations: relationshipNames };
        const resultList = await this.companyRepository.createQueryBuilder('company')
            .innerJoinAndSelect('company.users', 'user')
            .where('user.id = :id', { id: user_id })
            .getRawOne();
        console.log(resultList);
        return resultList;
    }
    async save(companyDTO) {
        const entity = company_mapper_1.CompanyMapper.fromDTOtoEntity(companyDTO);
        const result = await this.companyRepository.save(entity);
        return company_mapper_1.CompanyMapper.fromEntityToDTO(result);
    }
    async update(companyDTO) {
        const entity = company_mapper_1.CompanyMapper.fromDTOtoEntity(companyDTO);
        const result = await this.companyRepository.save(entity);
        return company_mapper_1.CompanyMapper.fromEntityToDTO(result);
    }
    async deleteById(id) {
        await this.companyRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new common_1.HttpException('Error, entity not deleted!', common_1.HttpStatus.NOT_FOUND);
        }
        return;
    }
};
CompanyService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(company_repository_1.CompanyRepository)),
    __metadata("design:paramtypes", [company_repository_1.CompanyRepository])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map