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
const card_transaction_mapper_1 = require("../service/mapper/card-transaction.mapper");
const card_transaction_repository_1 = require("../repository/card-transaction.repository");
const relationshipNames = [];
relationshipNames.push('card');
let CardTransactionService = class CardTransactionService {
    constructor(cardTransactionRepository) {
        this.cardTransactionRepository = cardTransactionRepository;
        this.logger = new common_1.Logger('CardTransactionService');
    }
    async findById(id) {
        const options = { relations: relationshipNames };
        const result = await this.cardTransactionRepository.findOne(id, options);
        return card_transaction_mapper_1.CardTransactionMapper.fromEntityToDTO(result);
    }
    async findByfields(options) {
        const result = await this.cardTransactionRepository.findOne(options);
        return card_transaction_mapper_1.CardTransactionMapper.fromEntityToDTO(result);
    }
    async findAndCount(options) {
        options.relations = relationshipNames;
        const resultList = await this.cardTransactionRepository.findAndCount(options);
        const cardTransactionDTO = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(cardTransaction => cardTransactionDTO.push(card_transaction_mapper_1.CardTransactionMapper.fromEntityToDTO(cardTransaction)));
            resultList[0] = cardTransactionDTO;
        }
        return resultList;
    }
    async save(cardTransactionDTO) {
        const entity = card_transaction_mapper_1.CardTransactionMapper.fromDTOtoEntity(cardTransactionDTO);
        const result = await this.cardTransactionRepository.save(entity);
        return card_transaction_mapper_1.CardTransactionMapper.fromEntityToDTO(result);
    }
    async update(cardTransactionDTO) {
        const entity = card_transaction_mapper_1.CardTransactionMapper.fromDTOtoEntity(cardTransactionDTO);
        const result = await this.cardTransactionRepository.save(entity);
        return card_transaction_mapper_1.CardTransactionMapper.fromEntityToDTO(result);
    }
    async deleteById(id) {
        await this.cardTransactionRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new common_1.HttpException('Error, entity not deleted!', common_1.HttpStatus.NOT_FOUND);
        }
        return;
    }
    async findByCardNo(card_no) {
        var resultList = await this.cardTransactionRepository.createQueryBuilder('card_transaction')
            .innerJoinAndSelect('card_transaction.card', 'card')
            .innerJoinAndSelect('card.employee', 'employee')
            .innerJoinAndSelect('employee.company', 'company')
            .where('card.card_no = :id', { id: card_no })
            .getManyAndCount();
        return resultList;
    }
};
CardTransactionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(card_transaction_repository_1.CardTransactionRepository)),
    __metadata("design:paramtypes", [card_transaction_repository_1.CardTransactionRepository])
], CardTransactionService);
exports.CardTransactionService = CardTransactionService;
//# sourceMappingURL=card-transaction.service.js.map