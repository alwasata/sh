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
const benefit_request_mapper_1 = require("../service/mapper/benefit-request.mapper");
const benefit_request_repository_1 = require("../repository/benefit-request.repository");
const relationshipNames = [];
relationshipNames.push('category');
relationshipNames.push('hospital');
relationshipNames.push('benefit');
let BenefitRequestService = class BenefitRequestService {
    constructor(benefitRequestRepository) {
        this.benefitRequestRepository = benefitRequestRepository;
        this.logger = new common_1.Logger('BenefitRequestService');
    }
    async findById(id) {
        const options = { relations: relationshipNames };
        const result = await this.benefitRequestRepository.findOne(id, options);
        return benefit_request_mapper_1.BenefitRequestMapper.fromEntityToDTO(result);
    }
    async findByfields(options) {
        const result = await this.benefitRequestRepository.findOne(options);
        return benefit_request_mapper_1.BenefitRequestMapper.fromEntityToDTO(result);
    }
    async findAndCount(hosbital_id, options) {
        options.relations = relationshipNames;
        // const resultList = await this.benefitRequestRepository.findAndCount(options);
        var resultList = [][0];
        if (hosbital_id == "all") {
            resultList = await this.benefitRequestRepository.findAndCount(options);
        }
        else {
            resultList = await this.benefitRequestRepository.createQueryBuilder('benefit_request')
                .innerJoinAndSelect('benefit_request.hospital', 'hospital')
                .innerJoinAndSelect('benefit_request.category', 'category')
                .innerJoinAndSelect('benefit_request.benefit', 'benefit')
                .where('hospital.id = :id', { id: hosbital_id })
                .getManyAndCount();
        }
        const benefitRequestDTO = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(benefitRequest => benefitRequestDTO.push(benefit_request_mapper_1.BenefitRequestMapper.fromEntityToDTO(benefitRequest)));
            resultList[0] = benefitRequestDTO;
        }
        return resultList;
    }
    async save(benefitRequestDTO) {
        const entity = benefit_request_mapper_1.BenefitRequestMapper.fromDTOtoEntity(benefitRequestDTO);
        const result = await this.benefitRequestRepository.save(entity);
        return benefit_request_mapper_1.BenefitRequestMapper.fromEntityToDTO(result);
    }
    async update(benefitRequestDTO) {
        const entity = benefit_request_mapper_1.BenefitRequestMapper.fromDTOtoEntity(benefitRequestDTO);
        const result = await this.benefitRequestRepository.save(entity);
        return benefit_request_mapper_1.BenefitRequestMapper.fromEntityToDTO(result);
    }
    async deleteById(id) {
        await this.benefitRequestRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new common_1.HttpException('Error, entity not deleted!', common_1.HttpStatus.NOT_FOUND);
        }
        return;
    }
};
BenefitRequestService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(benefit_request_repository_1.BenefitRequestRepository)),
    __metadata("design:paramtypes", [benefit_request_repository_1.BenefitRequestRepository])
], BenefitRequestService);
exports.BenefitRequestService = BenefitRequestService;
//# sourceMappingURL=benefit-request.service.js.map