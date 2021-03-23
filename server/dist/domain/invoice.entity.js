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
var Invoice_1;
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base/base.entity");
const card_transaction_entity_1 = require("./card-transaction.entity");
const hospital_entity_1 = require("./hospital.entity");
const invoice_status_1 = require("./enumeration/invoice-status");
/**
 * A Invoice.
 */
let Invoice = Invoice_1 = class Invoice extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'invoice_no', nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "invoiceNo", void 0);
__decorate([
    typeorm_1.Column({ type: 'date', name: 'invoice_date', nullable: true }),
    __metadata("design:type", Object)
], Invoice.prototype, "invoiceDate", void 0);
__decorate([
    typeorm_1.Column({ type: 'date', name: 'pay_date', nullable: true }),
    __metadata("design:type", Object)
], Invoice.prototype, "payDate", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', name: 'total', nullable: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "total", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', name: 'totalPoints', nullable: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "totalPoints", void 0);
__decorate([
    typeorm_1.OneToOne(type => Invoice_1),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Invoice)
], Invoice.prototype, "mainInvoice", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-enum', name: 'invoice_status', enum: invoice_status_1.InvoiceStatus }),
    __metadata("design:type", String)
], Invoice.prototype, "invoiceStatus", void 0);
__decorate([
    typeorm_1.Column({ name: 'notes', nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "notes", void 0);
__decorate([
    typeorm_1.OneToOne(type => card_transaction_entity_1.CardTransaction),
    typeorm_1.JoinColumn(),
    __metadata("design:type", card_transaction_entity_1.CardTransaction)
], Invoice.prototype, "cardTransaction", void 0);
__decorate([
    typeorm_1.ManyToOne(type => hospital_entity_1.Hospital),
    typeorm_1.JoinColumn(),
    __metadata("design:type", hospital_entity_1.Hospital)
], Invoice.prototype, "hospital", void 0);
Invoice = Invoice_1 = __decorate([
    typeorm_1.Entity('invoice')
], Invoice);
exports.Invoice = Invoice;
//# sourceMappingURL=invoice.entity.js.map