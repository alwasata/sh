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
const benefit_controller_1 = require("../web/rest/benefit.controller");
const benefit_repository_1 = require("../repository/benefit.repository");
const benefit_service_1 = require("../service/benefit.service");
const hospital_module_1 = require("./hospital.module");
const benefit_request_module_1 = require("./benefit-request.module");
let BenefitModule = class BenefitModule {
};
BenefitModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([benefit_repository_1.BenefitRepository]), hospital_module_1.HospitalModule, benefit_request_module_1.BenefitRequestModule],
        controllers: [benefit_controller_1.BenefitController],
        providers: [benefit_service_1.BenefitService],
        exports: [benefit_service_1.BenefitService],
    })
], BenefitModule);
exports.BenefitModule = BenefitModule;
//# sourceMappingURL=benefit.module.js.map