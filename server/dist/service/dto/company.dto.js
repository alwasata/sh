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
const user_dto_1 = require("./user.dto");
/**
 * A Company DTO object.
 */
class CompanyDTO extends base_dto_1.BaseDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty({ description: 'nameAr field' }),
    __metadata("design:type", String)
], CompanyDTO.prototype, "nameAr", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'nameEn field', required: false }),
    __metadata("design:type", String)
], CompanyDTO.prototype, "nameEn", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'email field', required: false }),
    __metadata("design:type", String)
], CompanyDTO.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'phone field', required: false }),
    __metadata("design:type", String)
], CompanyDTO.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'address field', required: false }),
    __metadata("design:type", String)
], CompanyDTO.prototype, "address", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'discount field', required: false }),
    __metadata("design:type", Number)
], CompanyDTO.prototype, "discount", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'fixed discount field', required: false }),
    __metadata("design:type", Boolean)
], CompanyDTO.prototype, "fixedDiscount", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: user_dto_1.UserDTO, isArray: true, description: 'users relationship' }),
    __metadata("design:type", Array)
], CompanyDTO.prototype, "users", void 0);
exports.CompanyDTO = CompanyDTO;
//# sourceMappingURL=company.dto.js.map