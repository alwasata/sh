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
const category_mapper_1 = require("../service/mapper/category.mapper");
const category_repository_1 = require("../repository/category.repository");
const relationshipNames = [];
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
        this.logger = new common_1.Logger('CategoryService');
    }
    async findById(id) {
        const options = { relations: relationshipNames };
        const result = await this.categoryRepository.findOne(id, options);
        return category_mapper_1.CategoryMapper.fromEntityToDTO(result);
    }
    async findByfields(options) {
        const result = await this.categoryRepository.findOne(options);
        return category_mapper_1.CategoryMapper.fromEntityToDTO(result);
    }
    async findAndCount(options) {
        options.relations = relationshipNames;
        const resultList = await this.categoryRepository.findAndCount(options);
        const categoryDTO = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(category => categoryDTO.push(category_mapper_1.CategoryMapper.fromEntityToDTO(category)));
            resultList[0] = categoryDTO;
        }
        return resultList;
    }
    async save(categoryDTO) {
        const entity = category_mapper_1.CategoryMapper.fromDTOtoEntity(categoryDTO);
        const result = await this.categoryRepository.save(entity);
        return category_mapper_1.CategoryMapper.fromEntityToDTO(result);
    }
    async update(categoryDTO) {
        const entity = category_mapper_1.CategoryMapper.fromDTOtoEntity(categoryDTO);
        const result = await this.categoryRepository.save(entity);
        return category_mapper_1.CategoryMapper.fromEntityToDTO(result);
    }
    async deleteById(id) {
        await this.categoryRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new common_1.HttpException('Error, entity not deleted!', common_1.HttpStatus.NOT_FOUND);
        }
        return;
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(category_repository_1.CategoryRepository)),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map