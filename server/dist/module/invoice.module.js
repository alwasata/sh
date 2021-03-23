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
const invoice_controller_1 = require("../web/rest/invoice.controller");
const invoice_repository_1 = require("../repository/invoice.repository");
const invoice_service_1 = require("../service/invoice.service");
const benefit_request_module_1 = require("./benefit-request.module");
const card_transaction_module_1 = require("./card-transaction.module");
const hospital_module_1 = require("./hospital.module");
const benefit_module_1 = require("./benefit.module");
const invoice_benefits_module_1 = require("./invoice-benefits.module");
const setting_module_1 = require("./setting.module");
const card_module_1 = require("./card.module");
let InvoiceModule = class InvoiceModule {
};
InvoiceModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([invoice_repository_1.InvoiceRepository]), setting_module_1.SettingModule, card_module_1.CardModule, invoice_benefits_module_1.InvoiceBenefitsModule, benefit_module_1.BenefitModule, card_transaction_module_1.CardTransactionModule, benefit_request_module_1.BenefitRequestModule, hospital_module_1.HospitalModule],
        controllers: [invoice_controller_1.InvoiceController],
        providers: [invoice_service_1.InvoiceService],
        exports: [invoice_service_1.InvoiceService],
    })
], InvoiceModule);
exports.InvoiceModule = InvoiceModule;
//# sourceMappingURL=invoice.module.js.map