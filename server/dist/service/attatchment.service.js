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
const attatchment_mapper_1 = require("../service/mapper/attatchment.mapper");
const attatchment_repository_1 = require("../repository/attatchment.repository");
const relationshipNames = [];
relationshipNames.push('employee');
let AttatchmentService = class AttatchmentService {
    constructor(attatchmentRepository) {
        this.attatchmentRepository = attatchmentRepository;
        this.logger = new common_1.Logger('AttatchmentService');
    }
    async findById(id) {
        const options = { relations: relationshipNames };
        const result = await this.attatchmentRepository.findOne(id, options);
        return attatchment_mapper_1.AttatchmentMapper.fromEntityToDTO(result);
    }
    async findByfields(options) {
        const result = await this.attatchmentRepository.findOne(options);
        return attatchment_mapper_1.AttatchmentMapper.fromEntityToDTO(result);
    }
    async findAndCount(options) {
        options.relations = relationshipNames;
        const resultList = await this.attatchmentRepository.findAndCount(options);
        const attatchmentDTO = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(attatchment => attatchmentDTO.push(attatchment_mapper_1.AttatchmentMapper.fromEntityToDTO(attatchment)));
            resultList[0] = attatchmentDTO;
        }
        return resultList;
    }
    async save(attatchmentDTO) {
        const entity = attatchment_mapper_1.AttatchmentMapper.fromDTOtoEntity(attatchmentDTO);
        const result = await this.attatchmentRepository.save(entity);
        return attatchment_mapper_1.AttatchmentMapper.fromEntityToDTO(result);
    }
    async update(attatchmentDTO) {
        const entity = attatchment_mapper_1.AttatchmentMapper.fromDTOtoEntity(attatchmentDTO);
        const result = await this.attatchmentRepository.save(entity);
        return attatchment_mapper_1.AttatchmentMapper.fromEntityToDTO(result);
    }
    async deleteById(id) {
        await this.attatchmentRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new common_1.HttpException('Error, entity not deleted!', common_1.HttpStatus.NOT_FOUND);
        }
        return;
    }
};
AttatchmentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(attatchment_repository_1.AttatchmentRepository)),
    __metadata("design:paramtypes", [attatchment_repository_1.AttatchmentRepository])
], AttatchmentService);
exports.AttatchmentService = AttatchmentService;
//# sourceMappingURL=attatchment.service.js.map