"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const invoice_benefits_controller_1 = require("../web/rest/invoice-benefits.controller");
const invoice_benefits_repository_1 = require("../repository/invoice-benefits.repository");
const invoice_benefits_service_1 = require("../service/invoice-benefits.service");
let InvoiceBenefitsModule = class InvoiceBenefitsModule {
};
InvoiceBenefitsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([invoice_benefits_repository_1.InvoiceBenefitsRepository])],
        controllers: [invoice_benefits_controller_1.InvoiceBenefitsController],
        providers: [invoice_benefits_service_1.InvoiceBenefitsService],
        exports: [invoice_benefits_service_1.InvoiceBenefitsService],
    })
], InvoiceBenefitsModule);
exports.InvoiceBenefitsModule = InvoiceBenefitsModule;
//# sourceMappingURL=invoice-benefits.module.js.map