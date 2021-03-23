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
const hospital_mapper_1 = require("../service/mapper/hospital.mapper");
const hospital_repository_1 = require("../repository/hospital.repository");
const relationshipNames = [];
relationshipNames.push('users');
let HospitalService = class HospitalService {
    constructor(hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
        this.logger = new common_1.Logger('HospitalService');
    }
    async findById(id) {
        const options = { relations: relationshipNames };
        const result = await this.hospitalRepository.findOne(id, options);
        return hospital_mapper_1.HospitalMapper.fromEntityToDTO(result);
    }
    async findByfields(options) {
        const result = await this.hospitalRepository.findOne(options);
        return hospital_mapper_1.HospitalMapper.fromEntityToDTO(result);
    }
    async findAndCount(options) {
        options.relations = relationshipNames;
        const resultList = await this.hospitalRepository.findAndCount(options);
        const hospitalDTO = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(hospital => hospitalDTO.push(hospital_mapper_1.HospitalMapper.fromEntityToDTO(hospital)));
            resultList[0] = hospitalDTO;
        }
        return resultList;
    }
    async getHosbitalIdForUser(id) {
        const options = { relations: relationshipNames };
        const resultList = await this.hospitalRepository.createQueryBuilder('hospital')
            .innerJoinAndSelect('hospital.users', 'user')
            .where('user.id = :id', { id: id })
            .getRawOne();
        return resultList;
    }
    async save(hospitalDTO) {
        const entity = hospital_mapper_1.HospitalMapper.fromDTOtoEntity(hospitalDTO);
        const result = await this.hospitalRepository.save(entity);
        return hospital_mapper_1.HospitalMapper.fromEntityToDTO(result);
    }
    async update(hospitalDTO) {
        const entity = hospital_mapper_1.HospitalMapper.fromDTOtoEntity(hospitalDTO);
        const result = await this.hospitalRepository.save(entity);
        return hospital_mapper_1.HospitalMapper.fromEntityToDTO(result);
    }
    async deleteById(id) {
        await this.hospitalRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new common_1.HttpException('Error, entity not deleted!', common_1.HttpStatus.NOT_FOUND);
        }
        return;
    }
};
HospitalService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(hospital_repository_1.HospitalRepository)),
    __metadata("design:paramtypes", [hospital_repository_1.HospitalRepository])
], HospitalService);
exports.HospitalService = HospitalService;
//# sourceMappingURL=hospital.service.js.map