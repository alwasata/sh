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
const swagger_1 = require("@nestjs/swagger");
const card_dto_1 = require("../../service/dto/card.dto");
const card_service_1 = require("../../service/card.service");
const pagination_entity_1 = require("../../domain/base/pagination.entity");
const security_1 = require("../../security");
const header_util_1 = require("../../client/header-util");
const logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
const card_transaction_service_1 = require("../../service/card-transaction.service");
const card_transaction_dto_1 = require("../../service/dto/card-transaction.dto");
const setting_service_1 = require("../../service/setting.service");
let CardController = class CardController {
    constructor(cardService, cardTransactionService, settingService) {
        this.cardService = cardService;
        this.cardTransactionService = cardTransactionService;
        this.settingService = settingService;
        this.logger = new common_1.Logger('CardController');
    }
    async getAll(req) {
        const pageRequest = new pagination_entity_1.PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.cardService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        header_util_1.HeaderUtil.addPaginationHeaders(req.res, new pagination_entity_1.Page(results, count, pageRequest));
        return results;
    }
    async getOne(id) {
        const results = await this.cardTransactionService.findAndCount({
            where: { card: id },
        });
        var points = 0;
        var pointsPlus = 0;
        var pointsMinus = 0;
        results[0].forEach(element => {
            console.log(points);
            if (element.action == 'PLUS') {
                pointsPlus = pointsPlus + element.pointsAmount;
            }
            else {
                pointsMinus = pointsMinus + element.pointsAmount;
                if (pointsMinus < 0) {
                    pointsMinus = pointsMinus * -1;
                }
            }
        });
        points = pointsPlus - pointsMinus;
        if (points < 0) {
            points = points * -1;
        }
        console.log(points);
        var card = await this.cardService.findById(id);
        var data = {
            'points': points,
            'card': card
        };
        return data;
    }
    async post(req, cardDTO) {
        const created = await this.cardService.save(cardDTO);
        header_util_1.HeaderUtil.addEntityCreatedHeaders(req.res, 'Card', created.id);
        return created;
    }
    async put(req, cardDTO) {
        header_util_1.HeaderUtil.addEntityCreatedHeaders(req.res, 'Card', cardDTO.id);
        return await this.cardService.update(cardDTO);
    }
    async deleteById(req, id) {
        header_util_1.HeaderUtil.addEntityDeletedHeaders(req.res, 'Card', id);
        return await this.cardService.deleteById(id);
    }
    async chargeCard(req, data) {
        const pageRequest = new pagination_entity_1.PageRequest(req.query.page, req.query.size, req.query.sort);
        var resualtSettings = await this.settingService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        var cardTransactionDTO = new card_transaction_dto_1.CardTransactionDTO();
        cardTransactionDTO.amount = data.points / resualtSettings[0][0].value;
        cardTransactionDTO.pointsAmount = data.points;
        cardTransactionDTO.card = data.card.id;
        cardTransactionDTO.action = "PLUS";
        cardTransactionDTO.notes = "اضافة نقاط الى البطاقة ( شحن البطاقة )";
        cardTransactionDTO.createdBy = req.user.id;
        const created = await this.cardTransactionService.save(cardTransactionDTO);
        return data.card;
    }
};
__decorate([
    common_1.Get('/'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiResponse({
        status: 200,
        description: 'List all records',
        type: card_dto_1.CardDTO,
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "getAll", null);
__decorate([
    common_1.Get('/:id'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The found record',
        type: card_dto_1.CardDTO,
    }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "getOne", null);
__decorate([
    common_1.Post('/'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Create card' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: card_dto_1.CardDTO,
    }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, card_dto_1.CardDTO]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "post", null);
__decorate([
    common_1.Put('/'),
    security_1.Roles(security_1.RoleType.ADMIN),
    swagger_1.ApiOperation({ title: 'Update card' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: card_dto_1.CardDTO,
    }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, card_dto_1.CardDTO]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "put", null);
__decorate([
    common_1.Delete('/:id'),
    security_1.Roles(security_1.RoleType.ADMIN),
    swagger_1.ApiOperation({ title: 'Delete card' }),
    swagger_1.ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    }),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "deleteById", null);
__decorate([
    common_1.Put('chargecard'),
    security_1.Roles(security_1.RoleType.USER),
    swagger_1.ApiOperation({ title: 'Create card' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: card_dto_1.CardDTO,
    }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "chargeCard", null);
CardController = __decorate([
    common_1.Controller('api/cards'),
    common_1.UseGuards(security_1.AuthGuard, security_1.RolesGuard),
    common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('cards'),
    __metadata("design:paramtypes", [card_service_1.CardService,
        card_transaction_service_1.CardTransactionService,
        setting_service_1.SettingService])
], CardController);
exports.CardController = CardController;
//# sourceMappingURL=card.controller.js.map