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
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base/base.entity");
const card_entity_1 = require("./card.entity");
const invoice_entity_1 = require("./invoice.entity");
const transaction_action_1 = require("./enumeration/transaction-action");
/**
 * A CardTransaction.
 */
let CardTransaction = class CardTransaction extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'transaction_no', nullable: true }),
    __metadata("design:type", String)
], CardTransaction.prototype, "transactionNo", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', name: 'amount', nullable: true }),
    __metadata("design:type", Number)
], CardTransaction.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', name: 'points_amount', nullable: true }),
    __metadata("design:type", Number)
], CardTransaction.prototype, "pointsAmount", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-enum', name: 'action', enum: transaction_action_1.TransactionAction }),
    __metadata("design:type", String)
], CardTransaction.prototype, "action", void 0);
__decorate([
    typeorm_1.Column({ name: 'notes', nullable: true }),
    __metadata("design:type", String)
], CardTransaction.prototype, "notes", void 0);
__decorate([
    typeorm_1.ManyToOne(type => card_entity_1.Card),
    __metadata("design:type", card_entity_1.Card)
], CardTransaction.prototype, "card", void 0);
__decorate([
    typeorm_1.OneToOne(type => invoice_entity_1.Invoice),
    __metadata("design:type", invoice_entity_1.Invoice)
], CardTransaction.prototype, "invoice", void 0);
CardTransaction = __decorate([
    typeorm_1.Entity('card_transaction')
], CardTransaction);
exports.CardTransaction = CardTransaction;
//# sourceMappingURL=card-transaction.entity.js.map