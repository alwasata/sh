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
const company_entity_1 = require("./company.entity");
const employee_status_1 = require("./enumeration/employee-status");
/**
 * A Employee.
 */
let Employee = class Employee extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'name', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'phone', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ name: 'identity_no', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "identityNo", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-enum', name: 'employee_status', enum: employee_status_1.EmployeeStatus }),
    __metadata("design:type", String)
], Employee.prototype, "employeeStatus", void 0);
__decorate([
    typeorm_1.Column({ name: 'notes', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "notes", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.Company),
    __metadata("design:type", company_entity_1.Company)
], Employee.prototype, "company", void 0);
Employee = __decorate([
    typeorm_1.Entity('employee')
], Employee);
exports.Employee = Employee;
//# sourceMappingURL=employee.entity.js.map