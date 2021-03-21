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
const benefit_request_controller_1 = require("../web/rest/benefit-request.controller");
const benefit_request_repository_1 = require("../repository/benefit-request.repository");
const benefit_request_service_1 = require("../service/benefit-request.service");
const hospital_module_1 = require("./hospital.module");
let BenefitRequestModule = class BenefitRequestModule {
};
BenefitRequestModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([benefit_request_repository_1.BenefitRequestRepository]), hospital_module_1.HospitalModule],
        controllers: [benefit_request_controller_1.BenefitRequestController],
        providers: [benefit_request_service_1.BenefitRequestService],
        exports: [benefit_request_service_1.BenefitRequestService],
    })
], BenefitRequestModule);
exports.BenefitRequestModule = BenefitRequestModule;
//# sourceMappingURL=benefit-request.module.js.map