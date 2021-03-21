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
const benefit_request_dto_1 = require("../../service/dto/benefit-request.dto");
const benefit_request_service_1 = require("../../service/benefit-request.service");
const pagination_entity_1 = require("../../domain/base/pagination.entity");
const security_1 = require("../../security");
const header_util_1 = require("../../client/header-util");
const logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
const benefit_status_1 = require("../../domain/enumeration/benefit-status");
const hospital_service_1 = require("../../service/hospital.service");
let BenefitRequestController = class BenefitRequestController {
    constructor(benefitRequestService, hospitalService) {
        this.benefitRequestService = benefitRequestService;
        this.hospitalService = hospitalService;
        this.logger = new common_1.Logger('BenefitRequestController');
    }
    async getAll(req) {
        const pageRequest = new pagination_entity_1.PageRequest(req.query.page, req.query.size, req.query.sort);
        var hospital = "";
        if (req.user.authorities.includes('ROLE_ADMIN') == true) {
            hospital = "all";
        }
        else {
            hospital = await this.hospitalService.getHosbitalIdForUser(req.user.id);
        }
        const [results, count] = await this.benefitRequestService.findAndCount(hospital, {
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        header_util_1.HeaderUtil.addPaginationHeaders(req.res, new pagination_entity_1.Page(results, count, pageRequest));
        return results;
    }
    async getOne(id) {
        return await this.benefitRequestService.findById(id);
    }
    async post(req, benefitRequestDTO) {
        const value = process.env.POINT_COST;
        // benefitRequestDTO.pointsCost = (benefitRequestDTO.cost * value);
        benefitRequestDTO.benefitStatus = benefit_status_1.BenefitStatus.PENDING;
        if (req.user.authorities.includes('ROLE_HOSPITAL_ADMIN') == true) {
            var hospital_id = await this.hospitalService.getHosbitalIdForUser(req.user.id);
            benefitRequestDTO.hospital = hospital_id;
        }
        const created = await this.benefitRequestService.save(benefitRequestDTO);
        header_util_1.HeaderUtil.addEntityCreatedHeaders(req.res, 'BenefitRequest', created.id);
        return created;
    }
    async put(req, benefitRequestDTO) {
        // you can't modify Benefit Request if its not in PENDING status
        // if (benefitRequestDTO.benefitStatus == BenefitStatus.PENDING) {
        header_util_1.HeaderUtil.addEntityCreatedHeaders(req.res, 'BenefitRequest', benefitRequestDTO.id);
        const value = process.env.POINT_COST;
        // benefitRequestDTO.pointsCost = (benefitRequestDTO.cost * value);
        // benefitRequestDTO.benefitStatus = BenefitStatus.PENDING;
        return await this.benefitRequestService.update(benefitRequestDTO);
        // }
        throw new common_1.HttpException("Benefit Request Can't be modified.", common_1.HttpStatus.FORBIDDEN);
    }
    async deleteById(req, id) {
        const benefitRequestDTO = await this.benefitRequestService.findById(id);
        // you can't modify Benefit Request if its not in PENDING status
        if (benefitRequestDTO.benefitStatus == benefit_status_1.BenefitStatus.PENDING) {
            header_util_1.HeaderUtil.addEntityDeletedHeaders(req.res, 'BenefitRequest', id);
            return await this.benefitRequestService.deleteById(id);
        }
        throw new common_1.HttpException("Benefit Request Can't be deleted.", common_1.HttpStatus.FORBIDDEN);
    }
};
__decorate([
    common_1.Get('/'),
    security_1.Roles(security_1.RoleType.ADMIN),
    swagger_1.ApiResponse({
        status: 200,
        description: 'List all records',
        type: benefit_request_dto_1.BenefitRequestDTO,
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BenefitRequestController.prototype, "getAll", null);
__decorate([
    common_1.Get('/:id'),
    security_1.Roles(security_1.RoleType.ADMIN),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The found record',
        type: benefit_request_dto_1.BenefitRequestDTO,
    }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BenefitRequestController.prototype, "getOne", null);
__decorate([
    common_1.Post('/'),
    security_1.Roles(security_1.RoleType.ADMIN),
    swagger_1.ApiOperation({ title: 'Create benefitRequest' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: benefit_request_dto_1.BenefitRequestDTO,
    }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, benefit_request_dto_1.BenefitRequestDTO]),
    __metadata("design:returntype", Promise)
], BenefitRequestController.prototype, "post", null);
__decorate([
    common_1.Put('/'),
    security_1.Roles(security_1.RoleType.ADMIN),
    swagger_1.ApiOperation({ title: 'Update benefitRequest' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: benefit_request_dto_1.BenefitRequestDTO,
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.FORBIDDEN,
        description: "Benefit Request Can't be modified.",
        type: {
            statusCode: common_1.HttpStatus.FORBIDDEN,
            Message: "Benefit Request Can't be modified."
        },
    }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, benefit_request_dto_1.BenefitRequestDTO]),
    __metadata("design:returntype", Promise)
], BenefitRequestController.prototype, "put", null);
__decorate([
    common_1.Delete('/:id'),
    security_1.Roles(security_1.RoleType.ADMIN),
    swagger_1.ApiOperation({ title: 'Delete benefitRequest' }),
    swagger_1.ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.FORBIDDEN,
        description: "Benefit Request Can't be deleted.",
        type: {
            statusCode: common_1.HttpStatus.FORBIDDEN,
            Message: "Benefit Request Can't be deleted."
        },
    }),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BenefitRequestController.prototype, "deleteById", null);
BenefitRequestController = __decorate([
    common_1.Controller('api/benefit-requests'),
    common_1.UseGuards(security_1.AuthGuard, security_1.RolesGuard),
    common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('benefit-requests'),
    __metadata("design:paramtypes", [benefit_request_service_1.BenefitRequestService,
        hospital_service_1.HospitalService])
], BenefitRequestController);
exports.BenefitRequestController = BenefitRequestController;
//# sourceMappingURL=benefit-request.controller.js.map