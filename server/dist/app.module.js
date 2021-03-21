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
const auth_module_1 = require("./module/auth.module");
const orm_config_1 = require("./orm.config");
const config_1 = require("./config");
const serve_static_1 = require("@nestjs/serve-static");
const attatchment_module_1 = require("./module/attatchment.module");
const employee_module_1 = require("./module/employee.module");
const card_module_1 = require("./module/card.module");
const company_module_1 = require("./module/company.module");
const hospital_module_1 = require("./module/hospital.module");
const category_module_1 = require("./module/category.module");
const benefit_module_1 = require("./module/benefit.module");
const benefit_request_module_1 = require("./module/benefit-request.module");
const card_transaction_module_1 = require("./module/card-transaction.module");
const invoice_module_1 = require("./module/invoice.module");
const invoice_benefits_module_1 = require("./module/invoice-benefits.module");
const setting_module_1 = require("./module/setting.module");
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(orm_config_1.ormconfig),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: config_1.config.getClientPath()
            }),
            auth_module_1.AuthModule,
            attatchment_module_1.AttatchmentModule,
            employee_module_1.EmployeeModule,
            card_module_1.CardModule,
            company_module_1.CompanyModule,
            hospital_module_1.HospitalModule,
            category_module_1.CategoryModule,
            benefit_module_1.BenefitModule,
            benefit_request_module_1.BenefitRequestModule,
            card_transaction_module_1.CardTransactionModule,
            invoice_module_1.InvoiceModule,
            invoice_benefits_module_1.InvoiceBenefitsModule,
            setting_module_1.SettingModule
            // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
        ],
        controllers: [
        // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
        ],
        providers: [
        // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map