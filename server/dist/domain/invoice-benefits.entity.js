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
const benefit_entity_1 = require("./benefit.entity");
const invoice_entity_1 = require("./invoice.entity");
/**
 * A InvoiceBenefits.
 */
let InvoiceBenefits = class InvoiceBenefits extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ type: 'float', name: 'points_cost', nullable: true }),
    __metadata("design:type", Number)
], InvoiceBenefits.prototype, "pointsCost", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', name: 'cost', nullable: true }),
    __metadata("design:type", Number)
], InvoiceBenefits.prototype, "cost", void 0);
__decorate([
    typeorm_1.Column({ type: 'integer', name: 'quantity', nullable: true }),
    __metadata("design:type", Number)
], InvoiceBenefits.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', name: 'total', nullable: true }),
    __metadata("design:type", Number)
], InvoiceBenefits.prototype, "total", void 0);
__decorate([
    typeorm_1.ManyToOne(type => benefit_entity_1.Benefit),
    __metadata("design:type", benefit_entity_1.Benefit)
], InvoiceBenefits.prototype, "benefit", void 0);
__decorate([
    typeorm_1.ManyToOne(type => invoice_entity_1.Invoice),
    __metadata("design:type", invoice_entity_1.Invoice)
], InvoiceBenefits.prototype, "invoice", void 0);
InvoiceBenefits = __decorate([
    typeorm_1.Entity('invoice_benefits')
], InvoiceBenefits);
exports.InvoiceBenefits = InvoiceBenefits;
//# sourceMappingURL=invoice-benefits.entity.js.map