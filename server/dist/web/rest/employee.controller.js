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
const employee_dto_1 = require("../../service/dto/employee.dto");
const employee_service_1 = require("../../service/employee.service");
const pagination_entity_1 = require("../../domain/base/pagination.entity");
const security_1 = require("../../security");
const header_util_1 = require("../../client/header-util");
const logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
const company_service_1 = require("../../service/company.service");
let EmployeeController = class EmployeeController {
    constructor(employeeService, companyService) {
        this.employeeService = employeeService;
        this.companyService = companyService;
        this.logger = new common_1.Logger('EmployeeController');
    }
    async getAll(req) {
        var company = "";
        if (req.user.authorities.includes('ROLE_ADMIN') == true) {
            company = "all";
        }
        else {
            company = await this.companyService.getCompanyIdForUser(req.user.id);
        }
        console.log(company);
        const pageRequest = new pagination_entity_1.PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.employeeService.findAndCount(company, {
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        header_util_1.HeaderUtil.addPaginationHeaders(req.res, new pagination_entity_1.Page(results, count, pageRequest));
        return results;
    }
    async getOne(id) {
        return await this.employeeService.findById(id);
    }
    async post(req, employeeDTO) {
        employeeDTO.createdBy = req.user.id;
        if (req.user.authorities.includes('ROLE_COMPANY_ADMIN') == true) {
            var company_id = await this.companyService.getCompanyIdForUser(req.user.id);
            employeeDTO.company = company_id;
        }
        const created = await this.employeeService.save(employeeDTO);
        header_util_1.HeaderUtil.addEntityCreatedHeaders(req.res, 'Employee', created.id);
        return created;
    }
    async put(req, employeeDTO) {
        employeeDTO.lastModifiedBy = req.user.id;
        header_util_1.HeaderUtil.addEntityCreatedHeaders(req.res, 'Employee', employeeDTO.id);
        return await this.employeeService.update(employeeDTO);
    }
    async deleteById(req, id) {
        header_util_1.HeaderUtil.addEntityDeletedHeaders(req.res, 'Employee', id);
        return await this.employeeService.deleteById(id);
    }
};
__decorate([
    common_1.Get('/'),
    security_1.Roles(security_1.RoleType.COMPANY_ADMIN, security_1.RoleType.ADMIN),
    swagger_1.ApiResponse({
        status: 200,
        description: 'List all records',
        type: employee_dto_1.EmployeeDTO,
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getAll", null);
__decorate([
    common_1.Get('/:id'),
    security_1.Roles(security_1.RoleType.COMPANY_ADMIN, security_1.RoleType.ADMIN),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The found record',
        type: employee_dto_1.EmployeeDTO,
    }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getOne", null);
__decorate([
    common_1.Post('/'),
    security_1.Roles(security_1.RoleType.COMPANY_ADMIN, security_1.RoleType.ADMIN),
    swagger_1.ApiOperation({ title: 'Create employee' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: employee_dto_1.EmployeeDTO,
    }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, employee_dto_1.EmployeeDTO]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "post", null);
__decorate([
    common_1.Put('/'),
    security_1.Roles(security_1.RoleType.COMPANY_ADMIN, security_1.RoleType.ADMIN),
    swagger_1.ApiOperation({ title: 'Update employee' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: employee_dto_1.EmployeeDTO,
    }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, employee_dto_1.EmployeeDTO]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "put", null);
__decorate([
    common_1.Delete('/:id'),
    security_1.Roles(security_1.RoleType.COMPANY_ADMIN, security_1.RoleType.ADMIN),
    swagger_1.ApiOperation({ title: 'Delete employee' }),
    swagger_1.ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    }),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "deleteById", null);
EmployeeController = __decorate([
    common_1.Controller('api/employees'),
    common_1.UseGuards(security_1.AuthGuard, security_1.RolesGuard),
    common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('employees'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService,
        company_service_1.CompanyService])
], EmployeeController);
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee.controller.js.map