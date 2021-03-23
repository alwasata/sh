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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("./base.dto");
const company_dto_1 = require("./company.dto");
const employee_status_1 = require("../../domain/enumeration/employee-status");
/**
 * A Employee DTO object.
 */
class EmployeeDTO extends base_dto_1.BaseDTO {
}
__decorate([
    swagger_1.ApiModelProperty({ description: 'name field', required: false }),
    __metadata("design:type", String)
], EmployeeDTO.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'phone field', required: false }),
    __metadata("design:type", String)
], EmployeeDTO.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'identityNo field', required: false }),
    __metadata("design:type", String)
], EmployeeDTO.prototype, "identityNo", void 0);
__decorate([
    swagger_1.ApiModelProperty({ enum: employee_status_1.EmployeeStatus, description: 'employeeStatus enum field', required: false }),
    __metadata("design:type", String)
], EmployeeDTO.prototype, "employeeStatus", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'notes field', required: false }),
    __metadata("design:type", String)
], EmployeeDTO.prototype, "notes", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: company_dto_1.CompanyDTO, description: 'company relationship' }),
    __metadata("design:type", company_dto_1.CompanyDTO)
], EmployeeDTO.prototype, "company", void 0);
exports.EmployeeDTO = EmployeeDTO;
//# sourceMappingURL=employee.dto.js.map