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
const benefit_dto_1 = require("./benefit.dto");
const invoice_dto_1 = require("./invoice.dto");
/**
 * A InvoiceBenefits DTO object.
 */
class InvoiceBenefitsDTO extends base_dto_1.BaseDTO {
}
__decorate([
    swagger_1.ApiModelProperty({ description: 'pointsCost field', required: false }),
    __metadata("design:type", Number)
], InvoiceBenefitsDTO.prototype, "pointsCost", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'cost field', required: false }),
    __metadata("design:type", Number)
], InvoiceBenefitsDTO.prototype, "cost", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'quantity field', required: false }),
    __metadata("design:type", Number)
], InvoiceBenefitsDTO.prototype, "quantity", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'total field', required: false }),
    __metadata("design:type", Number)
], InvoiceBenefitsDTO.prototype, "total", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: benefit_dto_1.BenefitDTO, description: 'benefit relationship' }),
    __metadata("design:type", benefit_dto_1.BenefitDTO)
], InvoiceBenefitsDTO.prototype, "benefit", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: invoice_dto_1.InvoiceDTO, description: 'invoice relationship' }),
    __metadata("design:type", invoice_dto_1.InvoiceDTO)
], InvoiceBenefitsDTO.prototype, "invoice", void 0);
exports.InvoiceBenefitsDTO = InvoiceBenefitsDTO;
//# sourceMappingURL=invoice-benefits.dto.js.map