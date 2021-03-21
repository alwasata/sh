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
const card_mapper_1 = require("../service/mapper/card.mapper");
const card_repository_1 = require("../repository/card.repository");
const relationshipNames = [];
relationshipNames.push('employee');
let CardService = class CardService {
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
        this.logger = new common_1.Logger('CardService');
    }
    async findById(id) {
        const options = { relations: relationshipNames };
        const result = await this.cardRepository.findOne(id, options);
        return card_mapper_1.CardMapper.fromEntityToDTO(result);
    }
    async findByfields(options) {
        const result = await this.cardRepository.findOne(options);
        return card_mapper_1.CardMapper.fromEntityToDTO(result);
    }
    async findAndCount(options) {
        options.relations = relationshipNames;
        const resultList = await this.cardRepository.findAndCount(options);
        const cardDTO = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(card => cardDTO.push(card_mapper_1.CardMapper.fromEntityToDTO(card)));
            resultList[0] = cardDTO;
        }
        return resultList;
    }
    async save(cardDTO) {
        const entity = card_mapper_1.CardMapper.fromDTOtoEntity(cardDTO);
        const result = await this.cardRepository.save(entity);
        return card_mapper_1.CardMapper.fromEntityToDTO(result);
    }
    async update(cardDTO) {
        const entity = card_mapper_1.CardMapper.fromDTOtoEntity(cardDTO);
        const result = await this.cardRepository.save(entity);
        return card_mapper_1.CardMapper.fromEntityToDTO(result);
    }
    async deleteById(id) {
        await this.cardRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new common_1.HttpException('Error, entity not deleted!', common_1.HttpStatus.NOT_FOUND);
        }
        return;
    }
};
CardService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(card_repository_1.CardRepository)),
    __metadata("design:paramtypes", [card_repository_1.CardRepository])
], CardService);
exports.CardService = CardService;
//# sourceMappingURL=card.service.js.map