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
const benefit_mapper_1 = require("../service/mapper/benefit.mapper");
const benefit_repository_1 = require("../repository/benefit.repository");
// import {getConnection} from "typeorm";
const relationshipNames = [];
relationshipNames.push('category');
relationshipNames.push('hospital');
let BenefitService = class BenefitService {
    constructor(benefitRepository) {
        this.benefitRepository = benefitRepository;
        this.logger = new common_1.Logger('BenefitService');
    }
    async findById(id) {
        const options = { relations: relationshipNames };
        const result = await this.benefitRepository.findOne(id, options);
        return benefit_mapper_1.BenefitMapper.fromEntityToDTO(result);
    }
    async findByfields(options) {
        const result = await this.benefitRepository.findOne(options);
        return benefit_mapper_1.BenefitMapper.fromEntityToDTO(result);
    }
    async findAndCount(hosbital_id, options) {
        options.relations = relationshipNames;
        var resultList = [][0];
        if (hosbital_id == "all") {
            resultList = await this.benefitRepository.findAndCount(options);
        }
        else {
            resultList = await this.benefitRepository.createQueryBuilder('benefit')
                .innerJoinAndSelect('benefit.hospital', 'hospital')
                .innerJoinAndSelect('benefit.category', 'category')
                .where('hospital.id = :id', { id: hosbital_id })
                .getManyAndCount();
        }
        const benefitDTO = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(benefit => benefitDTO.push(benefit_mapper_1.BenefitMapper.fromEntityToDTO(benefit)));
            resultList[0] = benefitDTO;
        }
        return resultList;
    }
    async save(benefitDTO) {
        const entity = benefit_mapper_1.BenefitMapper.fromDTOtoEntity(benefitDTO);
        const result = await this.benefitRepository.save(entity);
        return benefit_mapper_1.BenefitMapper.fromEntityToDTO(result);
    }
    async update(benefitDTO) {
        const entity = benefit_mapper_1.BenefitMapper.fromDTOtoEntity(benefitDTO);
        const result = await this.benefitRepository.save(entity);
        return benefit_mapper_1.BenefitMapper.fromEntityToDTO(result);
    }
    async deleteById(id) {
        await this.benefitRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new common_1.HttpException('Error, entity not deleted!', common_1.HttpStatus.NOT_FOUND);
        }
        return;
    }
};
BenefitService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(benefit_repository_1.BenefitRepository)),
    __metadata("design:paramtypes", [benefit_repository_1.BenefitRepository])
], BenefitService);
exports.BenefitService = BenefitService;
//# sourceMappingURL=benefit.service.js.map