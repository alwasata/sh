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
const card_dto_1 = require("./card.dto");
const invoice_dto_1 = require("./invoice.dto");
const transaction_action_1 = require("../../domain/enumeration/transaction-action");
/**
 * A CardTransaction DTO object.
 */
class CardTransactionDTO extends base_dto_1.BaseDTO {
}
__decorate([
    swagger_1.ApiModelProperty({ description: 'transactionNo field', required: false }),
    __metadata("design:type", String)
], CardTransactionDTO.prototype, "transactionNo", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'amount field', required: false }),
    __metadata("design:type", Number)
], CardTransactionDTO.prototype, "amount", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'pointsAmount field', required: false }),
    __metadata("design:type", Number)
], CardTransactionDTO.prototype, "pointsAmount", void 0);
__decorate([
    swagger_1.ApiModelProperty({ enum: transaction_action_1.TransactionAction, description: 'action enum field', required: false }),
    __metadata("design:type", String)
], CardTransactionDTO.prototype, "action", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'notes field', required: false }),
    __metadata("design:type", String)
], CardTransactionDTO.prototype, "notes", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: card_dto_1.CardDTO, description: 'card relationship' }),
    __metadata("design:type", card_dto_1.CardDTO)
], CardTransactionDTO.prototype, "card", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: invoice_dto_1.InvoiceDTO, description: 'invoice relationship' }),
    __metadata("design:type", invoice_dto_1.InvoiceDTO)
], CardTransactionDTO.prototype, "invoice", void 0);
exports.CardTransactionDTO = CardTransactionDTO;
//# sourceMappingURL=card-transaction.dto.js.map