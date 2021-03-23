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
const benefit_dto_1 = require("../../service/dto/benefit.dto");
const benefit_service_1 = require("../../service/benefit.service");
const pagination_entity_1 = require("../../domain/base/pagination.entity");
const security_1 = require("../../security");
const header_util_1 = require("../../client/header-util");
const logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
const hospital_service_1 = require("../../service/hospital.service");
const benefit_request_service_1 = require("../../service/benefit-request.service");
const benefit_request_dto_1 = require("../../service/dto/benefit-request.dto");
let BenefitController = class BenefitController {
    constructor(benefitService, hospitalService, benefitRequestService) {
        this.benefitService = benefitService;
        this.hospitalService = hospitalService;
        this.benefitRequestService = benefitRequestService;
        this.logger = new common_1.Logger('BenefitController');
    }
    async getAll(req) {
        const pageRequest = new pagination_entity_1.PageRequest(req.query.page, req.query.size, req.query.sort);
        var hospital;
        if (req.user["authorities"].includes('ROLE_ADMIN') == true) {
            hospital = "all";
        }
        else {
            hospital = await this.hospitalService.getHosbitalIdForUser(req.user["id"]);
            hospital = hospital["hospital_id"];
        }
        const [results, count] = await this.benefitService.findAndCount(hospital, {
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        header_util_1.HeaderUtil.addPaginationHeaders(req.res, new pagination_entity_1.Page(results, count, pageRequest));
        return results;
    }
    async getOne(id) {
        return await this.benefitService.findById(id);
    }
    async post(req, benefitDTO) {
        if (req.user["authorities"].includes('ROLE_HOSPITAL_ADMIN') === true) {
            var hospital_id = await this.hospitalService.getHosbitalIdForUser(req.user["id"]);
            var hospital = await this.hospitalService.findById(hospital_id["hospital_id"]);
            benefitDTO.hospital = hospital;
        }
        // benefitDTO.pointsCost = ;
        const created = await this.benefitService.save(benefitDTO);
        const benefitRequestDTO = new benefit_request_dto_1.BenefitRequestDTO();
        benefitRequestDTO.nameAr = benefitDTO.nameAr;
        benefitRequestDTO.nameEn = benefitDTO.nameEn;
        // benefitRequestDTO.pointsCost = benefitDTO.cost*1.1;
        benefitRequestDTO.cost = benefitDTO.cost;
        benefitRequestDTO.hospital = benefitDTO.hospital;
        benefitRequestDTO.category = benefitDTO.category;
        benefitRequestDTO.benefit = created;
        await this.benefitRequestService.save(benefitRequestDTO);
        header_util_1.HeaderUtil.addEntityCreatedHeaders(req.res, 'Benefit', created.id);
        return created;
    }
    async put(req, benefitDTO) {
        // benefitDTO.pointsCost = benefitDTO.cost*1.1;
        header_util_1.HeaderUtil.addEntityCreatedHeaders(req.res, 'Benefit', benefitDTO.id);
        return await this.benefitService.update(benefitDTO);
    }
    async deleteById(req, id) {
        header_util_1.HeaderUtil.addEntityDeletedHeaders(req.res, 'Benefit', id);
        return await this.benefitService.deleteById(id);
    }
};
__decorate([
    common_1.Get('/'),
    security_1.Roles(security_1.RoleType.HOSPITAL_ADMIN, security_1.RoleType.ADMIN),
    swagger_1.ApiResponse({
        status: 200,
        description: 'List all records',
        type: benefit_dto_1.BenefitDTO,
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BenefitController.prototype, "getAll", null);
__decorate([
    common_1.Get('/:id'),
    security_1.Roles(security_1.RoleType.HOSPITAL_ADMIN, security_1.RoleType.ADMIN),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The found record',
        type: benefit_dto_1.BenefitDTO,
    }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BenefitController.prototype, "getOne", null);
__decorate([
    common_1.Post('/'),
    security_1.Roles(security_1.RoleType.HOSPITAL_ADMIN, security_1.RoleType.ADMIN),
    swagger_1.ApiOperation({ title: 'Create benefit' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: benefit_dto_1.BenefitDTO,
    }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, benefit_dto_1.BenefitDTO]),
    __metadata("design:returntype", Promise)
], BenefitController.prototype, "post", null);
__decorate([
    common_1.Put('/'),
    security_1.Roles(security_1.RoleType.HOSPITAL_ADMIN, security_1.RoleType.ADMIN),
    swagger_1.ApiOperation({ title: 'Update benefit' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: benefit_dto_1.BenefitDTO,
    }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, benefit_dto_1.BenefitDTO]),
    __metadata("design:returntype", Promise)
], BenefitController.prototype, "put", null);
__decorate([
    common_1.Delete('/:id'),
    security_1.Roles(security_1.RoleType.HOSPITAL_ADMIN, security_1.RoleType.ADMIN),
    swagger_1.ApiOperation({ title: 'Delete benefit' }),
    swagger_1.ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    }),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BenefitController.prototype, "deleteById", null);
BenefitController = __decorate([
    common_1.Controller('api/benefits'),
    common_1.UseGuards(security_1.AuthGuard, security_1.RolesGuard),
    common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('benefits'),
    __metadata("design:paramtypes", [benefit_service_1.BenefitService,
        hospital_service_1.HospitalService,
        benefit_request_service_1.BenefitRequestService])
], BenefitController);
exports.BenefitController = BenefitController;
//# sourceMappingURL=benefit.controller.js.map