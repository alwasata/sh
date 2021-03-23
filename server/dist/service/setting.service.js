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
const setting_mapper_1 = require("../service/mapper/setting.mapper");
const setting_repository_1 = require("../repository/setting.repository");
const relationshipNames = [];
let SettingService = class SettingService {
    constructor(settingRepository) {
        this.settingRepository = settingRepository;
        this.logger = new common_1.Logger('SettingService');
    }
    async findById(id) {
        const options = { relations: relationshipNames };
        const result = await this.settingRepository.findOne(id, options);
        return setting_mapper_1.SettingMapper.fromEntityToDTO(result);
    }
    async findByfields(options) {
        const result = await this.settingRepository.findOne(options);
        return setting_mapper_1.SettingMapper.fromEntityToDTO(result);
    }
    async findAndCount(options) {
        options.relations = relationshipNames;
        const resultList = await this.settingRepository.findAndCount(options);
        const settingDTO = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(setting => settingDTO.push(setting_mapper_1.SettingMapper.fromEntityToDTO(setting)));
            resultList[0] = settingDTO;
        }
        return resultList;
    }
    async save(settingDTO) {
        const entity = setting_mapper_1.SettingMapper.fromDTOtoEntity(settingDTO);
        const result = await this.settingRepository.save(entity);
        return setting_mapper_1.SettingMapper.fromEntityToDTO(result);
    }
    async update(settingDTO) {
        const entity = setting_mapper_1.SettingMapper.fromDTOtoEntity(settingDTO);
        const result = await this.settingRepository.save(entity);
        return setting_mapper_1.SettingMapper.fromEntityToDTO(result);
    }
    async deleteById(id) {
        await this.settingRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new common_1.HttpException('Error, entity not deleted!', common_1.HttpStatus.NOT_FOUND);
        }
        return;
    }
};
SettingService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(setting_repository_1.SettingRepository)),
    __metadata("design:paramtypes", [setting_repository_1.SettingRepository])
], SettingService);
exports.SettingService = SettingService;
//# sourceMappingURL=setting.service.js.map