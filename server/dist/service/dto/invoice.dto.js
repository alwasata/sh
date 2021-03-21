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
const card_transaction_dto_1 = require("./card-transaction.dto");
const hospital_dto_1 = require("./hospital.dto");
const invoice_status_1 = require("../../domain/enumeration/invoice-status");
/**
 * A Invoice DTO object.
 */
class InvoiceDTO extends base_dto_1.BaseDTO {
}
__decorate([
    swagger_1.ApiModelProperty({ description: 'invoiceNo field', required: false }),
    __metadata("design:type", String)
], InvoiceDTO.prototype, "invoiceNo", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'invoiceDate field', required: false }),
    __metadata("design:type", Object)
], InvoiceDTO.prototype, "invoiceDate", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'payDate field', required: false }),
    __metadata("design:type", Object)
], InvoiceDTO.prototype, "payDate", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'total field', required: false }),
    __metadata("design:type", Number)
], InvoiceDTO.prototype, "total", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'total points', required: false, default: null }),
    __metadata("design:type", Number)
], InvoiceDTO.prototype, "totalPoints", void 0);
__decorate([
    swagger_1.ApiModelProperty({ enum: invoice_status_1.InvoiceStatus, description: 'invoiceStatus enum field', required: false }),
    __metadata("design:type", String)
], InvoiceDTO.prototype, "invoiceStatus", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'notes field', required: false }),
    __metadata("design:type", String)
], InvoiceDTO.prototype, "notes", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: card_transaction_dto_1.CardTransactionDTO, description: 'cardTransaction relationship' }),
    __metadata("design:type", card_transaction_dto_1.CardTransactionDTO)
], InvoiceDTO.prototype, "cardTransaction", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: hospital_dto_1.HospitalDTO, description: 'Hospital relationship' }),
    __metadata("design:type", hospital_dto_1.HospitalDTO)
], InvoiceDTO.prototype, "hospital", void 0);
exports.InvoiceDTO = InvoiceDTO;
//# sourceMappingURL=invoice.dto.js.map