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
 * A Hospital.
 */
let Hospital = class Hospital extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'name_ar' }),
    __metadata("design:type", String)
], Hospital.prototype, "nameAr", void 0);
__decorate([
    typeorm_1.Column({ name: 'name_en', nullable: true }),
    __metadata("design:type", String)
], Hospital.prototype, "nameEn", void 0);
__decorate([
    typeorm_1.Column({ name: 'email', nullable: true }),
    __metadata("design:type", String)
], Hospital.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ name: 'phone', nullable: true }),
    __metadata("design:type", String)
], Hospital.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ name: 'address', nullable: true }),
    __metadata("design:type", String)
], Hospital.prototype, "address", void 0);
__decorate([
    typeorm_1.ManyToMany(type => user_entity_1.User),
    typeorm_1.JoinTable({
        name: 'hospital_user',
        joinColumn: { name: 'hospital_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Hospital.prototype, "users", void 0);
Hospital = __decorate([
    typeorm_1.Entity('hospital')
], Hospital);
exports.Hospital = Hospital;
//# sourceMappingURL=hospital.entity.js.map