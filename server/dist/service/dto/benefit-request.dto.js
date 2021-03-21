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
const class_validator_1 = require("class-validator");
const base_dto_1 = require("./base.dto");
const category_dto_1 = require("./category.dto");
const hospital_dto_1 = require("./hospital.dto");
const benefit_dto_1 = require("./benefit.dto");
const benefit_status_1 = require("../../domain/enumeration/benefit-status");
/**
 * A BenefitRequest DTO object.
 */
class BenefitRequestDTO extends base_dto_1.BaseDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty({ description: 'nameAr field' }),
    __metadata("design:type", String)
], BenefitRequestDTO.prototype, "nameAr", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'nameEn field', required: false }),
    __metadata("design:type", String)
], BenefitRequestDTO.prototype, "nameEn", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'cost field', required: false }),
    __metadata("design:type", Number)
], BenefitRequestDTO.prototype, "cost", void 0);
__decorate([
    swagger_1.ApiModelProperty({ enum: benefit_status_1.BenefitStatus, description: 'benefitStatus enum field', required: false }),
    __metadata("design:type", String)
], BenefitRequestDTO.prototype, "benefitStatus", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'notes field', required: false }),
    __metadata("design:type", String)
], BenefitRequestDTO.prototype, "notes", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: category_dto_1.CategoryDTO, description: 'category relationship' }),
    __metadata("design:type", category_dto_1.CategoryDTO)
], BenefitRequestDTO.prototype, "category", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: hospital_dto_1.HospitalDTO, description: 'hospital relationship' }),
    __metadata("design:type", hospital_dto_1.HospitalDTO)
], BenefitRequestDTO.prototype, "hospital", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: benefit_dto_1.BenefitDTO, description: 'benefit relationship' }),
    __metadata("design:type", benefit_dto_1.BenefitDTO)
], BenefitRequestDTO.prototype, "benefit", void 0);
exports.BenefitRequestDTO = BenefitRequestDTO;
//# sourceMappingURL=benefit-request.dto.js.map