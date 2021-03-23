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
const user_entity_1 = require("./user.entity");
/**
 * A Company.
 */
let Company = class Company extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'name_ar' }),
    __metadata("design:type", String)
], Company.prototype, "nameAr", void 0);
__decorate([
    typeorm_1.Column({ name: 'name_en', nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "nameEn", void 0);
__decorate([
    typeorm_1.Column({ name: 'email', nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ name: 'phone', nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ name: 'address', nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "address", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', name: 'discount', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Company.prototype, "discount", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', name: 'fixed_discount', nullable: true, default: true }),
    __metadata("design:type", Boolean)
], Company.prototype, "fixedDiscount", void 0);
__decorate([
    typeorm_1.ManyToMany(type => user_entity_1.User),
    typeorm_1.JoinTable({
        name: 'company_user',
        joinColumn: { name: 'company_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Company.prototype, "users", void 0);
Company = __decorate([
    typeorm_1.Entity('company')
], Company);
exports.Company = Company;
//# sourceMappingURL=company.entity.js.map