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
const category_entity_1 = require("./category.entity");
const hospital_entity_1 = require("./hospital.entity");
const benefit_entity_1 = require("./benefit.entity");
const benefit_status_1 = require("./enumeration/benefit-status");
/**
 * A BenefitRequest.
 */
let BenefitRequest = class BenefitRequest extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'name_ar' }),
    __metadata("design:type", String)
], BenefitRequest.prototype, "nameAr", void 0);
__decorate([
    typeorm_1.Column({ name: 'name_en', nullable: true }),
    __metadata("design:type", String)
], BenefitRequest.prototype, "nameEn", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', name: 'cost', nullable: true }),
    __metadata("design:type", Number)
], BenefitRequest.prototype, "cost", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-enum', name: 'benefit_status', enum: benefit_status_1.BenefitStatus }),
    __metadata("design:type", String)
], BenefitRequest.prototype, "benefitStatus", void 0);
__decorate([
    typeorm_1.Column({ name: 'notes', nullable: true }),
    __metadata("design:type", String)
], BenefitRequest.prototype, "notes", void 0);
__decorate([
    typeorm_1.ManyToOne(type => category_entity_1.Category),
    __metadata("design:type", category_entity_1.Category)
], BenefitRequest.prototype, "category", void 0);
__decorate([
    typeorm_1.ManyToOne(type => hospital_entity_1.Hospital),
    __metadata("design:type", hospital_entity_1.Hospital)
], BenefitRequest.prototype, "hospital", void 0);
__decorate([
    typeorm_1.ManyToOne(type => benefit_entity_1.Benefit),
    __metadata("design:type", benefit_entity_1.Benefit)
], BenefitRequest.prototype, "benefit", void 0);
BenefitRequest = __decorate([
    typeorm_1.Entity('benefit_request')
], BenefitRequest);
exports.BenefitRequest = BenefitRequest;
//# sourceMappingURL=benefit-request.entity.js.map