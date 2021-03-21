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
const employee_dto_1 = require("./employee.dto");
/**
 * A Card DTO object.
 */
class CardDTO extends base_dto_1.BaseDTO {
}
__decorate([
    swagger_1.ApiModelProperty({ description: 'cardNo field', required: false }),
    __metadata("design:type", String)
], CardDTO.prototype, "cardNo", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'expiryDate field', required: false }),
    __metadata("design:type", Object)
], CardDTO.prototype, "expiryDate", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'isActive field', required: false }),
    __metadata("design:type", Boolean)
], CardDTO.prototype, "isActive", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: employee_dto_1.EmployeeDTO, description: 'employee relationship' }),
    __metadata("design:type", employee_dto_1.EmployeeDTO)
], CardDTO.prototype, "employee", void 0);
exports.CardDTO = CardDTO;
//# sourceMappingURL=card.dto.js.map